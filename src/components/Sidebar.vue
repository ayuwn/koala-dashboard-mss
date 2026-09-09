<template>
  <!-- Mobile Backdrop Overlay -->
  <div 
    v-if="sidebarOpen" 
    @click="closeSidebar"
    class="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity duration-200"
  ></div>

  <!-- Sidebar Container -->
  <aside 
    :class="[
      'glossy-sidebar fixed top-0 bottom-0 left-0 z-50 flex flex-col transition-all duration-250 ease-in-out flex-shrink-0',
      isSidebarCollapsed ? 'w-16' : 'w-64',
      sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
    ]"
  >
    <!-- Header: Brand + Collapse Toggle -->
    <div class="flex items-center justify-between px-3 py-4 border-b border-white/10 flex-shrink-0">
      <div v-if="!isSidebarCollapsed" class="flex items-center gap-2.5 overflow-hidden">
        <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0">
          <img src="/src/assets/images/kahf-white.png" alt="KAHF" class="w-8 h-8 object-contain" />
        </div>
        <div class="flex flex-col overflow-hidden">
          <span class="text-sm font-bold text-white leading-tight truncate">KOALA MSS</span>
          <span class="text-[10px] text-koala-blue-300 font-medium truncate flex items-center gap-1">
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-koala-orange-400"></span>
            PT KAHF Teknologi Mandiri
          </span>
        </div>
      </div>
      <div v-else class="mx-auto">
        <div class="w-8 h-8 rounded-xl flex items-center justify-center">
          <img src="/src/assets/images/kahf-white.png" alt="KAHF" class="w-7 h-7 object-contain" />
        </div>
      </div>
      <!-- Collapse Toggle (Desktop only) -->
      <button 
        @click="toggleSidebarCollapse"
        class="hidden lg:flex items-center justify-center w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-all flex-shrink-0"
        :class="isSidebarCollapsed ? 'mx-auto mt-0' : ''"
        :title="isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'"
      >
        <ChevronLeft v-if="!isSidebarCollapsed" class="w-3.5 h-3.5" />
        <ChevronRight v-else class="w-3.5 h-3.5" />
      </button>
    </div>

    <!-- Navigation -->
    <div class="flex-1 overflow-y-auto py-3 space-y-1 custom-scrollbar px-2">
      <!-- MAIN Section Label -->
      <div v-if="!isSidebarCollapsed" class="px-2 pb-1 pt-2">
        <span class="text-[10px] font-bold uppercase tracking-wider text-white">Main</span>
      </div>
      <div v-else class="pb-2 pt-2">
        <div class="w-4 h-px bg-white/15 mx-auto"></div>
      </div>

      <ul class="space-y-0.5">
        <!-- Active: Compile Report / Dashboard -->
        <li>
          <a 
            href="#" 
            :class="[
              'flex items-center gap-3 rounded-xl font-semibold text-xs transition-all',
              isSidebarCollapsed ? 'justify-center p-2.5' : 'px-3 py-2.5',
              'bg-gradient-to-r from-koala-blue-900 to-koala-blue-800 text-white shadow-md shadow-koala-blue-900/60'
            ]"
            :title="isSidebarCollapsed ? 'Dashboard' : ''"
          >
            <LayoutDashboard class="w-4 h-4 flex-shrink-0" />
            <span v-if="!isSidebarCollapsed" class="truncate">Dashboard</span>
          </a>
        </li>
        <li v-for="item in mainMenuItems" :key="item.name">
          <a 
            href="#" 
            :class="[
              'flex items-center gap-3 rounded-xl font-medium text-xs text-koala-blue-200 hover:text-white hover:bg-white/10 transition-all group',
              isSidebarCollapsed ? 'justify-center p-2.5' : 'px-3 py-2'
            ]"
            :title="isSidebarCollapsed ? item.name : ''"
          >
            <component :is="item.icon" class="w-4 h-4 flex-shrink-0 text-koala-blue-300 group-hover:text-white transition-colors" />
            <span v-if="!isSidebarCollapsed" class="truncate">{{ item.name }}</span>
          </a>
        </li>
      </ul>

      <!-- OTHERS Section -->
      <div v-if="!isSidebarCollapsed" class="px-2 pb-1 pt-4">
        <span class="text-[10px] font-bold uppercase tracking-wider text-white">Others</span>
      </div>
      <div v-else class="py-3">
        <div class="w-4 h-px bg-white/15 mx-auto"></div>
      </div>

      <ul class="space-y-0.5">
        <li v-for="item in othersMenuItems" :key="item.name">
          <a 
            href="#" 
            :class="[
              'flex items-center gap-3 rounded-xl font-medium text-xs text-koala-blue-200 hover:text-white hover:bg-white/10 transition-all group',
              isSidebarCollapsed ? 'justify-center p-2.5' : 'px-3 py-2'
            ]"
            :title="isSidebarCollapsed ? item.name : ''"
          >
            <component :is="item.icon" class="w-4 h-4 flex-shrink-0 text-koala-blue-300 group-hover:text-white transition-colors" />
            <span v-if="!isSidebarCollapsed" class="truncate">{{ item.name }}</span>
          </a>
        </li>
      </ul>
    </div>

    <!-- User Profile Footer -->
    <div class="border-t border-white/10 p-2 flex-shrink-0">
      <div 
        :class="[
          'flex items-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer',
          isSidebarCollapsed ? 'justify-center p-2' : 'gap-2.5 p-2'
        ]"
      >
        <img 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
          alt="Fasti" 
          class="w-8 h-8 rounded-xl object-cover ring-2 ring-koala-orange-400/50 flex-shrink-0"
        />
        <div v-if="!isSidebarCollapsed" class="flex-1 overflow-hidden">
          <div class="text-xs font-bold text-white leading-tight truncate">Fasti Listia Ningrum</div>
          <div class="text-[10px] text-koala-blue-300 font-medium truncate">Senior SAP ABAP Developer</div>
        </div>
        <button 
          v-if="!isSidebarCollapsed"
          class="p-1 rounded-lg text-koala-blue-300 hover:text-white hover:bg-white/10 transition-all flex-shrink-0"
          title="Logout"
        >
          <LogOut class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { 
  ChevronLeft, ChevronRight, LogOut, LayoutDashboard,
  FileSpreadsheet, Clock, Calendar, Users, FolderKanban, 
  Hourglass, Receipt, ClipboardCheck, Megaphone, 
  Settings, UserCheck, HelpCircle 
} from 'lucide-vue-next'
import { useDashboardFilter } from '@/composables/useDashboardFilter'

const { sidebarOpen, closeSidebar, isSidebarCollapsed, toggleSidebarCollapse } = useDashboardFilter()

// const mainMenuItems = [
//   { name: 'Staff Attendance', icon: Clock },
//   { name: 'Schedule', icon: Calendar },
//   { name: 'Team Directory', icon: Users },
//   { name: 'Section', icon: FolderKanban },
//   { name: 'Absence Management', icon: Hourglass },
//   { name: 'Pay Management', icon: CreditCard },
//   { name: 'Assessments', icon: ClipboardCheck },
//   { name: 'Announcement', icon: Megaphone },
// ]

const mainMenuItems = [
  { name: 'Company Document', icon: FolderKanban },
  { name: 'Leave Request', icon: Calendar },
  { name: 'On Behalf', icon: Users },
  { name: 'Overtime Request', icon: Clock },
  // { name: 'Reimbursement Request', icon: Receipt },
  { name: 'Timesheet', icon: ClipboardCheck },
]

const othersMenuItems = [
  { name: 'Admin Console', icon: UserCheck },
  { name: 'Settings', icon: Settings },
  { name: 'Support Center', icon: HelpCircle },
]
</script>
