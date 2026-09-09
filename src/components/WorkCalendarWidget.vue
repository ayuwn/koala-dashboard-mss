<template>
  <div class="glossy-card rounded-2xl p-5 sm:p-6 flex flex-col h-full">
    <!-- Header: Icon + Title & Subtitle + Week Navigation Buttons -->
    <div class="flex items-center justify-between pb-4 border-b border-slate-100/80 mb-4">
      <div class="flex items-center gap-3">
        <!-- Calendar Icon in light blue box -->
        <div class="w-10 h-10 rounded-xl bg-[#D6EBFF] flex items-center justify-center text-koala-blue-800 shadow-2xs">
          <CalendarDays class="w-5 h-5 text-koala-blue-800" />
        </div>
        <div>
          <h3 class="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-tight">
            Work Calendar &amp; Schedule
          </h3>
          <p class="text-xs text-slate-500 font-normal mt-0.5">
            {{ currentMonthYearLabel }}
          </p>
        </div>
      </div>

      <!-- Navigation for Previous & Next Week -->
      <div class="flex items-center gap-1.5">
        <button 
          @click="prevWeek"
          class="p-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-600 hover:text-koala-blue-900 border border-slate-200/80 hover:border-koala-blue-200 shadow-2xs transition-all active:scale-95"
          title="Previous Week"
          aria-label="Previous Week"
        >
          <ChevronLeft class="w-4 h-4" />
        </button>
        <button 
          @click="resetToCurrentWeek"
          class="px-2 py-1 text-[11px] font-semibold rounded-lg bg-white/90 hover:bg-white text-koala-blue-900 border border-slate-200/80 hover:border-koala-blue-200 shadow-2xs transition-all active:scale-95"
          title="Today / Current Week"
        >
          Today
        </button>
        <button 
          @click="nextWeek"
          class="p-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-600 hover:text-koala-blue-900 border border-slate-200/80 hover:border-koala-blue-200 shadow-2xs transition-all active:scale-95"
          title="Next Week"
          aria-label="Next Week"
        >
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Mini Weekly Calendar Strip with Leave Count Badges -->
    <div class="p-2.5 sm:p-3 rounded-xl bg-white/70 border border-slate-100 shadow-2xs mb-5">
      <div class="grid grid-cols-7 gap-1 text-center">
        <div 
          v-for="day in dynamicWeekDays" 
          :key="day.dateKey"
          @click="selectDay(day)"
          class="flex flex-col items-center justify-center py-1 cursor-pointer transition-all group"
        >
          <!-- Day Name (MIN, SEN, SEL, ...) -->
          <span 
            :class="[
              'text-[10px] uppercase font-bold tracking-wider mb-1 transition-colors',
              selectedDateKey === day.dateKey 
                ? 'text-koala-blue-900 font-extrabold' 
                : day.isSundayOrMonday || day.isPast
                  ? 'text-slate-300' 
                  : 'text-slate-400 group-hover:text-slate-600'
            ]"
          >
            {{ day.dayName }}
          </span>

          <!-- Date Number Box Container with Leave Badge -->
          <div class="relative">
            <div 
              :class="[
                'w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all',
                selectedDateKey === day.dateKey 
                  ? 'bg-koala-blue-900 text-white shadow-md shadow-koala-blue-900/25 scale-105' 
                  : day.isToday
                    ? 'border border-koala-blue-600 text-koala-blue-900 bg-koala-blue-50 font-extrabold'
                    : day.isPast
                      ? 'text-slate-400 hover:bg-slate-100/60'
                      : 'text-slate-700 hover:bg-slate-100/80'
              ]"
            >
              {{ day.dateNumber }}
            </div>

            <!-- Small Leave Count Indicator Badge on Bottom-Right of the Date -->
            <span 
              v-if="day.leaveCount > 0"
              :class="[
                'absolute -bottom-1 -right-1.5 min-w-[15px] h-3.5 px-0.5 rounded-full flex items-center justify-center text-[9px] font-extrabold shadow-2xs border transition-all',
                selectedDateKey === day.dateKey
                  ? 'bg-koala-orange-500 text-white border-white ring-1 ring-koala-blue-900/20 scale-105'
                  : 'bg-amber-100 text-amber-800 border-amber-300 group-hover:bg-amber-200'
              ]"
              :title="`${day.leaveCount} upcoming team leave(s)`"
            >
              {{ day.leaveCount }}
            </span>
          </div>

          <!-- Subtle dot indicator for days with scheduled sessions -->
          <div class="h-1 flex items-center justify-center mt-1">
            <span 
              v-if="day.hasSession && selectedDateKey !== day.dateKey" 
              class="w-1 h-1 rounded-full bg-koala-blue-600"
            ></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Section 1: UPCOMING TEAM LEAVE (Filtered by selectedDay) -->
    <div class="space-y-2.5 mb-5">
      <div class="flex items-center justify-between text-slate-400 mb-2">
        <div class="flex items-center gap-1.5">
          <Users class="w-3.5 h-3.5 text-koala-blue-700/70" />
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Upcoming Team Leave
          </span>
        </div>
        <span class="text-[10px] font-medium text-slate-400">
          {{ selectedDayFormatted }}
        </span>
      </div>

      <!-- Active Leaves on Selected Date -->
      <div v-if="filteredTeamLeaves.length > 0" class="space-y-2">
        <div 
          v-for="leave in filteredTeamLeaves" 
          :key="leave.name"
          class="p-2.5 sm:p-3 rounded-xl bg-white/80 border border-slate-100 hover:border-koala-blue-100 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-3"
        >
          <div class="flex items-center gap-3">
            <img 
              :src="leave.avatar" 
              :alt="leave.name" 
              class="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
            />
            <div>
              <h4 class="text-xs font-bold text-slate-900 leading-tight">{{ leave.name }}</h4>
              <p class="text-[11px] text-slate-500 font-normal mt-0.5">{{ leave.type }}</p>
            </div>
          </div>

          <!-- Orange Pill Date Tag -->
          <span class="px-2.5 py-1 rounded-full bg-[#FFF5ED] text-koala-orange-600 border border-[#FDC49B]/60 text-xs font-semibold whitespace-nowrap shadow-2xs">
            {{ leave.period }}
          </span>
        </div>
      </div>

      <!-- Empty State if no leaves on selected date -->
      <div v-else class="p-3.5 rounded-xl bg-white/50 border border-slate-100 text-center flex flex-col items-center justify-center">
        <p class="text-xs font-medium text-slate-500">No team leaves scheduled</p>
        <span class="text-[10px] text-slate-400 mt-0.5">
          {{ isSelectedDatePast ? 'Past date — no upcoming leaves' : 'All team members are active on this date' }}
        </span>
      </div>
    </div>

    <!-- Section 2: SESSIONS & AGENDA (Filtered / Displayed by selectedDay) -->
    <div class="space-y-2.5">
      <div class="flex items-center justify-between text-slate-400 mb-2">
        <div class="flex items-center gap-1.5">
          <Video class="w-3.5 h-3.5 text-koala-blue-700/70" />
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Sessions &amp; Agenda
          </span>
        </div>
        <span class="text-[10px] font-medium text-slate-400">
          {{ filteredSessions.length }} Session{{ filteredSessions.length === 1 ? '' : 's' }}
        </span>
      </div>

      <div v-if="filteredSessions.length > 0" class="space-y-2.5">
        <div 
          v-for="session in filteredSessions" 
          :key="session.title"
          class="p-3 sm:p-3.5 rounded-xl bg-[#F0F7FF] border border-[#D5E9FD] shadow-2xs hover:shadow-xs transition-all flex flex-col gap-1"
        >
          <!-- Top Row: Title & Time -->
          <div class="flex items-center justify-between gap-2">
            <h4 class="text-xs font-bold text-koala-blue-900 leading-snug">
              {{ session.title }}
            </h4>
            <span class="text-xs font-bold text-koala-blue-800 whitespace-nowrap">
              {{ session.time }}
            </span>
          </div>

          <!-- Bottom Row: Room / Zoom & Participants -->
          <p class="text-[11px] text-slate-500 font-normal">
            {{ session.location }} &bull; {{ session.participants }}
          </p>
        </div>
      </div>

      <div v-else class="p-3 rounded-xl bg-[#F0F7FF]/50 border border-[#D5E9FD]/60 text-center">
        <p class="text-xs text-slate-500 font-medium">No sessions scheduled for this date</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { CalendarDays, Users, Video, ChevronLeft, ChevronRight } from 'lucide-vue-next'

// Current local date reference: 9 September 2026
const currentDate = new Date(2026, 8, 9)
const todayMidnight = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).getTime()

// Week navigation offset (0 = current week, +1 = next week, -1 = prev week)
const currentWeekOffset = ref(0)

// Selected date key formatted as 'YYYY-MM-DD'
const selectedDateKey = ref('2026-09-09')

const dayNames = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB']

// Compute start of week (Sunday) based on currentWeekOffset
const startOfWeek = computed(() => {
  const date = new Date(currentDate)
  const currentDayOfWeek = date.getDay() // 0 = Sunday, 3 = Wednesday
  date.setDate(date.getDate() - currentDayOfWeek + (currentWeekOffset.value * 7))
  date.setHours(0, 0, 0, 0)
  return date
})

// Master upcoming team leaves dataset (Only future / upcoming dates, strictly excluding Sunday and Monday)
const masterTeamLeaves = [
  // Current Week (9 - 12 Sep 2026)
  {
    name: 'Gibral Anugrah',
    type: 'Cuti Tahunan',
    period: '9 Sep',
    dateKeys: ['2026-09-09'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    name: 'Sayyid Taqi Al-Haidar',
    type: 'Cuti Tahunan',
    period: '10 – 11 Sep',
    dateKeys: ['2026-09-10', '2026-09-11'],
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  },
  {
    name: 'Zulfahmi Kemal',
    type: 'Cuti Sakit',
    period: '10 Sep',
    dateKeys: ['2026-09-10'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  // {
  //   name: 'Oscar Piastri',
  //   type: 'Remote Working',
  //   period: '11 Sep',
  //   dateKeys: ['2026-09-11'],
  //   avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  // },
  // {
  //   name: 'Ayu Widianingsih',
  //   type: 'Work From Anywhere (WFA)',
  //   period: '12 Sep',
  //   dateKeys: ['2026-09-12'],
  //   avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  // },
  // Next Week (15 - 19 Sep 2026 - Tuesday to Saturday only, Sunday & Monday have 0)
  {
    name: 'Ahmad Mukafi Andrian',
    type: 'Izin Setengah Hari',
    period: '15 Sep',
    dateKeys: ['2026-09-15'],
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
  },
  {
    name: 'Sikah Nurbayati',
    type: 'Cuti Tahunan',
    period: '16 – 17 Sep',
    dateKeys: ['2026-09-16', '2026-09-17'],
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  },
  {
    name: 'Zulfahmi Kemal',
    type: 'WFH',
    period: '16 Sep',
    dateKeys: ['2026-09-16'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    name: 'Ayu Widianingsih',
    type: 'WFH',
    period: '17 Sep',
    dateKeys: ['2026-09-17'],
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  },
  // {
  //   name: 'Sayyid Altaqi',
  //   type: 'Technical Workshop',
  //   period: '18 – 19 Sep',
  //   dateKeys: ['2026-09-18', '2026-09-19'],
  //   avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  // }
]

// Master sessions dataset
const masterSessions = [
  {
    title: 'Daily Engineering Standup',
    time: '09:00 – 09:30 WIB',
    location: 'Meeting Room Alpha / Google Meet',
    participants: '8 Participants',
    dateKeys: ['2026-09-09', '2026-09-10', '2026-09-11', '2026-09-15', '2026-09-16', '2026-09-17', '2026-09-18']
  },
  {
    title: 'Sprint Review & Retro Q3',
    time: '14:00 – 15:30 WIB',
    location: 'Meeting Room Alpha / Zoom',
    participants: '12 Participants',
    dateKeys: ['2026-09-10', '2026-09-17']
  },
  {
    title: 'Squad BSIM Architecture Alignment',
    time: '10:00 – 11:30 WIB',
    location: 'Meeting Room 2',
    participants: '6 Participants',
    dateKeys: ['2026-09-09', '2026-09-16']
  }
]

// Dynamic 7-day strip for the active week
const dynamicWeekDays = computed(() => {
  const days = []
  const start = new Date(startOfWeek.value)

  for (let i = 0; i < 7; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const dayNum = String(d.getDate()).padStart(2, '0')
    const dateKey = `${year}-${month}-${dayNum}`
    const dTime = d.getTime()

    // Condition 1: Dates before current date (past dates) have 0 upcoming leaves
    const isPast = dTime < todayMidnight
    const isToday = dTime === todayMidnight

    // Condition 2: Sunday (0) and Monday (1) have 0 leave data
    const isSundayOrMonday = i === 0 || i === 1

    // Calculate leaves only if NOT past and NOT Sunday/Monday
    let leavesOnDay = []
    if (!isPast && !isSundayOrMonday) {
      leavesOnDay = masterTeamLeaves.filter(leave => leave.dateKeys.includes(dateKey))
    }

    const hasSession = masterSessions.some(session => session.dateKeys.includes(dateKey))

    days.push({
      dateKey,
      dayName: dayNames[i],
      dateNumber: d.getDate(),
      fullDate: d,
      isPast,
      isToday,
      isSundayOrMonday,
      leaveCount: leavesOnDay.length,
      hasSession
    })
  }

  return days
})

// Current month/year label in header
const currentMonthYearLabel = computed(() => {
  const start = new Date(startOfWeek.value)
  const end = new Date(startOfWeek.value)
  end.setDate(end.getDate() + 6)

  const optMonth = { month: 'long', year: 'numeric' }
  return start.toLocaleDateString('en-US', optMonth)
})

// Selected date formatted for section title
const selectedDayFormatted = computed(() => {
  const found = dynamicWeekDays.value.find(d => d.dateKey === selectedDateKey.value)
  if (found) {
    const opt = { day: 'numeric', month: 'short', year: 'numeric' }
    return `${found.dayName}, ${found.fullDate.toLocaleDateString('en-US', opt)}`
  }
  return selectedDateKey.value
})

const isSelectedDatePast = computed(() => {
  const found = dynamicWeekDays.value.find(d => d.dateKey === selectedDateKey.value)
  return found ? found.isPast : false
})

// Filtered Team Leaves strictly based on selectedDateKey
const filteredTeamLeaves = computed(() => {
  const found = dynamicWeekDays.value.find(d => d.dateKey === selectedDateKey.value)
  if (!found || found.isPast || found.isSundayOrMonday) {
    return []
  }
  return masterTeamLeaves.filter(leave => leave.dateKeys.includes(selectedDateKey.value))
})

// Filtered Sessions strictly based on selectedDateKey
const filteredSessions = computed(() => {
  return masterSessions.filter(session => session.dateKeys.includes(selectedDateKey.value))
})

const selectDay = (day) => {
  selectedDateKey.value = day.dateKey
}

const nextWeek = () => {
  currentWeekOffset.value++
  // Auto select Wednesday of that week or the first day of that week
  const nextDays = dynamicWeekDays.value
  selectedDateKey.value = nextDays[3]?.dateKey || nextDays[0]?.dateKey
}

const prevWeek = () => {
  currentWeekOffset.value--
  const prevDays = dynamicWeekDays.value
  selectedDateKey.value = prevDays[3]?.dateKey || prevDays[0]?.dateKey
}

const resetToCurrentWeek = () => {
  currentWeekOffset.value = 0
  selectedDateKey.value = '2026-09-09'
}
</script>
