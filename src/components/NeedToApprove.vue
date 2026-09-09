<template>
  <div class="glossy-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between h-full">
    <!-- Card Header: Title & "See All >" Link -->
    <div class="flex items-center justify-between pb-2.5 border-b border-slate-100/80 mb-3">
      <div>
        <h3 class="text-xs sm:text-sm font-bold text-slate-900 tracking-tight leading-tight">
          Need To Approve
        </h3>
        <p class="text-[10px] text-slate-400 font-normal mt-0.2">
          Pending managerial approvals
        </p>
      </div>
      <a 
        href="#" 
        @click.prevent="viewAllApprovals"
        class="text-[11px] font-semibold text-koala-blue-900 hover:text-koala-blue-600 flex items-center gap-0.5 transition-colors"
      >
        <span>See All</span>
        <ChevronRight class="w-3 h-3 stroke-[2.5]" />
      </a>
    </div>

    <!-- Main Content Grid: Left Stat + Right Breakdown Box -->
    <div class="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center flex-1">
      <!-- Left Column: Mail Icon + Big Total Number + Label (Horizontal on mobile, Stacked on desktop) -->
      <div class="sm:col-span-4 flex items-center sm:items-start sm:flex-col gap-3 sm:gap-0 justify-start">
        <!-- Vivid Koala Blue Mail Icon Box -->
        <div class="w-10 h-10 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-koala-blue-800 to-koala-blue-600 flex items-center justify-center text-white shadow-sm shadow-koala-blue-700/20 sm:mb-1.5 border border-white/30 flex-shrink-0">
          <Mail class="w-4 h-4 stroke-[2]" />
        </div>

        <!-- Big Total Number & Subtitle Container -->
        <div class="flex flex-col">
          <div class="text-2xl sm:text-3xl font-extrabold text-koala-blue-950 tracking-tight leading-none">
            {{ approvalCounts.total }}
          </div>
          <p class="text-[11px] font-semibold text-slate-600 mt-0.5 sm:mt-1 leading-tight">
            Total Approval Pending
          </p>
        </div>
      </div>

      <!-- Right Column: Bordered Container with Categories matching Pending Activity -->
      <div class="sm:col-span-8 rounded-xl border border-slate-200/80 bg-white/80 backdrop-blur-xs p-1 sm:p-1.5 shadow-2xs">
        <!-- Row 1: Timesheet -->
        <a 
          href="#" 
          @click.prevent="openCategory('Timesheet')"
          class="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50/90 transition-colors group"
        >
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-md bg-koala-blue-600 flex items-center justify-center text-white shadow-xs flex-shrink-0">
              <ClipboardCheck class="w-3 h-3 stroke-[2.2]" />
            </div>
            <span class="text-xs font-bold text-slate-800 group-hover:text-koala-blue-800 transition-colors">
              Timesheet
            </span>
          </div>
          <div class="flex items-center gap-1">
            <span :class="[
              'text-[11px] font-bold px-1.5 py-0.2 rounded-md border',
              approvalCounts.timesheet > 0
                ? 'bg-koala-blue-50 text-koala-blue-900 border-koala-blue-200 shadow-2xs'
                : 'bg-slate-50 text-slate-400 border-slate-200/60'
            ]">
              {{ approvalCounts.timesheet }}
            </span>
            <ChevronRight class="w-3 h-3 text-slate-400 stroke-[2.5]" />
          </div>
        </a>

        <div class="h-px bg-slate-100 my-0.2"></div>

        <!-- Row 2: Leave Request -->
        <a 
          href="#" 
          @click.prevent="openCategory('Leave Request')"
          class="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50/90 transition-colors group"
        >
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-md bg-koala-blue-600 flex items-center justify-center text-white shadow-xs flex-shrink-0">
              <Calendar class="w-3 h-3 stroke-[2.2]" />
            </div>
            <span class="text-xs font-bold text-slate-800 group-hover:text-koala-blue-800 transition-colors">
              Leave Request
            </span>
          </div>
          <div class="flex items-center gap-1">
            <span :class="[
              'text-[11px] font-bold px-1.5 py-0.2 rounded-md border',
              approvalCounts.leave > 0
                ? 'bg-koala-blue-50 text-koala-blue-900 border-koala-blue-200 shadow-2xs'
                : 'bg-slate-50 text-slate-400 border-slate-200/60'
            ]">
              {{ approvalCounts.leave }}
            </span>
            <ChevronRight class="w-3 h-3 text-slate-400 stroke-[2.5]" />
          </div>
        </a>

        <div class="h-px bg-slate-100 my-0.2"></div>

        <!-- Row 3: Overtime -->
        <a 
          href="#" 
          @click.prevent="openCategory('Overtime')"
          class="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50/90 transition-colors group"
        >
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-md bg-koala-blue-600 flex items-center justify-center text-white shadow-xs flex-shrink-0">
              <Clock class="w-3 h-3 stroke-[2.2]" />
            </div>
            <span class="text-xs font-bold text-slate-800 group-hover:text-koala-blue-800 transition-colors">
              Overtime
            </span>
          </div>
          <div class="flex items-center gap-1">
            <span :class="[
              'text-[11px] font-bold px-1.5 py-0.2 rounded-md border',
              approvalCounts.overtime > 0
                ? 'bg-koala-blue-50 text-koala-blue-900 border-koala-blue-200 shadow-2xs'
                : 'bg-slate-50 text-slate-400 border-slate-200/60'
            ]">
              {{ approvalCounts.overtime }}
            </span>
            <ChevronRight class="w-3 h-3 text-slate-400 stroke-[2.5]" />
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Mail, ClipboardCheck, Calendar, Clock, ChevronRight } from 'lucide-vue-next'
import { useDashboardFilter } from '@/composables/useDashboardFilter'

const { approvalCounts } = useDashboardFilter()

const viewAllApprovals = () => {
  alert('Navigating to full pending approval list...')
}

const openCategory = (category) => {
  alert(`Filtering pending approvals by: ${category}`)
}
</script>
