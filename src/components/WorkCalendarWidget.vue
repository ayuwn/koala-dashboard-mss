<template>
  <div class="glossy-card rounded-2xl p-5 sm:p-6 flex flex-col h-full">
    <!-- Header: Icon + Title & Subtitle + New Meeting Button -->
    <div class="flex items-center justify-between pb-4 border-b border-slate-100/80 mb-4">
      <div class="flex items-center gap-3">
        <!-- Calendar Icon in light blue box -->
        <div class="w-10 h-10 rounded-xl bg-[#D6EBFF] flex items-center justify-center text-koala-blue-800 shadow-2xs">
          <CalendarDays class="w-5 h-5 text-koala-blue-800" />
        </div>
        <div>
          <h3 class="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-tight">
            Work Calendar & Schedule
          </h3>
          <p class="text-xs text-slate-500 font-normal mt-0.5">
            September 2026
          </p>
        </div>
      </div>

      <!-- + New Meeting Button -->
      <!-- <button 
        @click="openNewMeetingModal"
        class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-koala-blue-900 to-koala-blue-800 hover:from-koala-blue-800 hover:to-koala-blue-700 text-white text-xs font-semibold shadow-glossy-btn border border-koala-blue-700/60 transition-all hover:scale-102 active:scale-98"
      >
        <Plus class="w-3.5 h-3.5 stroke-[2.5]" />
        <span>New Meeting</span>
      </button> -->
    </div>

    <!-- Mini Weekly Calendar Strip -->
    <div class="p-2.5 sm:p-3 rounded-xl bg-white/70 border border-slate-100 shadow-2xs mb-5">
      <div class="grid grid-cols-7 gap-1 text-center">
        <div 
          v-for="day in dynamicWeekDays" 
          :key="day.dayName"
          @click="selectedDay = day.date"
          class="flex flex-col items-center justify-center py-1 cursor-pointer transition-all"
        >
          <!-- Day Name (MIN, SEN, SEL, ...) -->
          <span 
            :class="[
              'text-[10px] uppercase font-bold tracking-wider mb-1 transition-colors',
              selectedDay === day.date ? 'text-koala-blue-900' : 'text-slate-400'
            ]"
          >
            {{ day.dayName }}
          </span>

          <!-- Date Number Badge -->
          <div 
            :class="[
              'w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all',
              selectedDay === day.date 
                ? 'bg-koala-blue-900 text-white shadow-md shadow-koala-blue-900/25 scale-105' 
                : 'text-slate-700 hover:bg-slate-100/80'
            ]"
          >
            {{ day.date }}
          </div>

          <!-- Orange dot indicator for days with events -->
          <div class="h-1 flex items-center justify-center mt-1">
            <span 
              v-if="day.hasEvent && selectedDay !== day.date" 
              class="w-1 h-1 rounded-full bg-koala-orange-600"
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
          {{ selectedDayName }}, {{ selectedDay }} Sep 2026
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
        <span class="text-[10px] text-slate-400 mt-0.5">All team members are active on this date</span>
      </div>
    </div>

    <!-- Section 2: TODAY'S SESSIONS (Filtered / Displayed by selectedDay) -->
    <div class="space-y-2.5">
      <div class="flex items-center justify-between text-slate-400 mb-2">
        <div class="flex items-center gap-1.5">
          <Video class="w-3.5 h-3.5 text-koala-blue-700/70" />
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Sessions & Agenda
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
import { CalendarDays, Plus, Users, Video } from 'lucide-vue-next'

const selectedDay = ref(7)

const baseWeekDays = [
  { dayName: 'MIN', date: 6 },
  { dayName: 'SEN', date: 7 },
  { dayName: 'SEL', date: 8 },
  { dayName: 'RAB', date: 9 },
  { dayName: 'KAM', date: 10 },
  { dayName: 'JUM', date: 11 },
  { dayName: 'SAB', date: 12 },
]

// Master team leave dataset with active dates in September
const masterTeamLeaves = [
  {
    name: 'Gibral Anugrah',
    type: 'Cuti Tahunan',
    period: '7 Sep',
    dates: [7],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    name: 'Ahmad Mukafi Andrian',
    type: 'Special Leave',
    period: '6 Sep',
    dates: [6],
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
  },
  {
    name: 'Sayyid Taqi Al-Haidar',
    type: 'Annual Leave',
    period: '10 – 12 Sep',
    dates: [10, 11, 12],
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  },
  {
    name: 'Zulfahmi Kemal',
    type: 'Sick Leave',
    period: '10 Sep & 14 Sep',
    dates: [10, 14],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    name: 'Oscar Piastri',
    type: 'Remote Working',
    period: '11 – 12 Sep',
    dates: [11, 12, 18],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
  {
    name: 'Ayu Widianingsih',
    type: 'Work From Anywhere (WFA)',
    period: '12 Sep',
    dates: [12],
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  }
]

// Master sessions dataset
const masterSessions = [
  {
    title: 'Sprint Review & Retro Q3',
    time: '14:00 – 15:30 WIB',
    location: 'Meeting Room Alpha / Zoom',
    participants: '12 Participants',
    dates: [7, 10, 11]
  },
  {
    title: '1-on-1 Performance Sync with Gibral',
    time: '16:00 – 16:45 WIB',
    location: 'Focus Pod 3',
    participants: '2 Participants',
    dates: [7, 8, 12]
  },
  {
    title: 'Squad BSIM Architecture Alignment',
    time: '10:00 – 11:30 WIB',
    location: 'Meeting Room 2',
    participants: '6 Participants',
    dates: [6, 9, 10]
  }
]

// Compute orange event dots dynamically
const dynamicWeekDays = computed(() => {
  return baseWeekDays.map(day => {
    const hasLeave = masterTeamLeaves.some(leave => leave.dates.includes(day.date))
    const hasSession = masterSessions.some(session => session.dates.includes(day.date))
    return {
      ...day,
      hasEvent: hasLeave || hasSession
    }
  })
})

const selectedDayName = computed(() => {
  const found = baseWeekDays.find(d => d.date === selectedDay.value)
  return found ? found.dayName : ''
})

// Filtered Team Leaves strictly based on selectedDay
const filteredTeamLeaves = computed(() => {
  return masterTeamLeaves.filter(leave => leave.dates.includes(selectedDay.value))
})

// Filtered Sessions strictly based on selectedDay
const filteredSessions = computed(() => {
  return masterSessions.filter(session => session.dates.includes(selectedDay.value))
})

const openNewMeetingModal = () => {
  alert('Open New Meeting Form Dialog')
}
</script>
