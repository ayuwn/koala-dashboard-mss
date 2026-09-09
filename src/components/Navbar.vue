<template>
  <header class="glossy-nav sticky top-0 z-30 flex items-center justify-between gap-4 px-4 sm:px-5 lg:px-6 py-3">
    <!-- Left: Mobile Hamburger + Greeting -->
    <div class="flex items-center gap-3 min-w-0">
      <!-- Mobile Drawer Toggle -->
      <button 
        @click="toggleSidebar"
        class="lg:hidden p-2 rounded-xl bg-white/60 border border-white/80 text-slate-700 shadow-sm hover:bg-white transition-colors flex-shrink-0"
        aria-label="Toggle Sidebar"
      >
        <Menu class="w-4 h-4" />
      </button>

      <!-- Greeting -->
      <div class="min-w-0">
        <h1 class="text-base sm:text-lg font-bold leading-tight truncate">
          Good Afternoon, 
          <span class="bg-gradient-to-r from-koala-blue-700 to-koala-blue-500 bg-clip-text text-transparent">Fasti!</span>
          <!-- 👋 -->
        </h1>
        <p class="text-[11px] text-slate-400 font-normal mt-0.5 hidden sm:block truncate">
          A concise report on critical HR metrics and key insights into employee activity.
        </p>
      </div>
    </div>

    <!-- Right: Search + Date Range + Bell + Avatar -->
    <div class="flex items-center gap-2 flex-shrink-0">
      <!-- Search Input (hidden on mobile) -->
      <div class="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/70 border border-white/90 shadow-sm text-xs text-slate-500">
        <Search class="w-3.5 h-3.5 text-slate-400" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search..." 
          class="bg-transparent outline-none w-28 placeholder-slate-400 text-slate-700 text-xs"
        />
        <kbd class="text-[10px] font-semibold text-slate-300 bg-slate-100 px-1 py-0.5 rounded border border-slate-200">⌘K</kbd>
      </div>

      <!-- Date Range Picker Pill -->
      <div class="glossy-pill flex items-center gap-1 px-2.5 py-1.5 cursor-pointer">
        <Calendar class="w-3.5 h-3.5 text-koala-blue-500 flex-shrink-0" />
        <VueDatePicker
          v-model="dateRange"
          range
          :enable-time-picker="false"
          auto-apply
          :format="customDateFormat"
          placeholder="Select Date Range"
          :teleport="true"
          :hide-navigation="['time']"
          class="text-xs"
        >
          <template #trigger>
            <span class="cursor-pointer select-none text-xs font-semibold text-slate-700 whitespace-nowrap">
              {{ formattedDateRange }}
            </span>
          </template>
        </VueDatePicker>
      </div>

      <!-- Notification Bell -->
      <button 
        class="relative p-2 rounded-xl bg-white/60 border border-white/80 text-slate-600 hover:text-slate-900 hover:bg-white shadow-sm transition-all"
        aria-label="Notifications"
      >
        <Bell class="w-4 h-4" />
        <span 
          v-if="selectedNotificationCount > 0"
          class="absolute -top-1 -right-1 min-w-[16px] h-4 px-0.5 flex items-center justify-center text-[9px] font-bold bg-koala-orange-500 text-white rounded-full ring-2 ring-white"
        >
          {{ selectedNotificationCount }}
        </span>
      </button>

      <!-- User Avatar Pill -->
      <div class="flex items-center gap-2 px-2 py-1 rounded-xl bg-white/60 border border-white/80 shadow-sm cursor-pointer hover:bg-white transition-all">
        <img 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
          alt="Fasti" 
          class="w-6 h-6 rounded-lg object-cover ring-1 ring-koala-orange-400/50"
        />
        <span class="text-xs font-semibold text-slate-700 hidden sm:inline">Fasti</span>
      </div>
    </div>
  </header>
</template>

<script setup>
import { Menu, Search, Calendar, Bell } from 'lucide-vue-next'
import VueDatePicker from '@vuepic/vue-datepicker'
import { useDashboardFilter } from '@/composables/useDashboardFilter'

const { 
  toggleSidebar, 
  dateRange, 
  formattedDateRange,
  searchQuery,
  selectedNotificationCount
} = useDashboardFilter()

const customDateFormat = (dates) => {
  if (!dates || !dates[0]) return ''
  const start = dates[0]
  const end = dates[1] || dates[0]
  const opt = { month: 'short', day: 'numeric' }
  return `${start.toLocaleDateString('en-US', opt)} - ${end.toLocaleDateString('en-US', { ...opt, year: 'numeric' })}`
}
</script>

<style scoped>
:deep(.dp__input) {
  border: none !important;
  padding: 0 !important;
  font-size: 0.75rem !important;
  background: transparent !important;
  color: #334155 !important;
  font-family: 'Geist', sans-serif !important;
  box-shadow: none !important;
}
:deep(.dp__input_wrap) {
  display: inline-flex;
}
</style>
