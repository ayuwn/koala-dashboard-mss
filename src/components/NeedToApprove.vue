<template>
  <div class="glossy-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full">
    <!-- Card Header: Title & "See All >" Link -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-tight">
          Need To Approve
        </h3>
        <p class="text-[11px] text-slate-400 font-normal mt-0.5">
          Pending managerial approvals for selected period
        </p>
      </div>
      <a 
        href="#" 
        @click.prevent="viewAllApprovals"
        class="text-xs font-semibold text-koala-blue-900 hover:text-koala-blue-600 flex items-center gap-0.5 transition-colors"
      >
        <span>See All</span>
        <ChevronRight class="w-3.5 h-3.5 stroke-[2.5]" />
      </a>
    </div>

    <!-- Main Content Grid: Left Stat + Right Breakdown Box -->
    <div class="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-center flex-1">
      <!-- Left Column: Mail Icon + Big Total Number + Label -->
      <div class="sm:col-span-4 flex flex-col items-start justify-center">
        <!-- Vivid Koala Blue Mail Icon Box -->
        <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-koala-blue-800 to-koala-blue-600 flex items-center justify-center text-white shadow-md shadow-koala-blue-700/20 mb-2.5 border border-white/30">
          <Mail class="w-5 h-5 stroke-[2]" />
        </div>

        <!-- Big Total Number -->
        <div class="text-3xl sm:text-4xl font-extrabold text-koala-blue-950 tracking-tight leading-none">
          {{ approvalCounts.total }}
        </div>

        <!-- Subtitle Label -->
        <p class="text-xs font-semibold text-slate-600 mt-1.5 leading-tight">
          Total Approval Pending
        </p>
      </div>

      <!-- Right Column: Bordered Container with Categories matching Pending Activity -->
      <div class="sm:col-span-8 rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-xs p-1.5 sm:p-2 shadow-2xs">
        <!-- Row 1: Timesheet -->
        <a 
          href="#" 
          @click.prevent="openCategory('Timesheet')"
          class="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50/90 transition-colors group"
        >
          <div class="flex items-center gap-2.5">
            <div class="w-7 h-7 rounded-lg bg-koala-blue-600 flex items-center justify-center text-white shadow-xs flex-shrink-0">
              <ClipboardCheck class="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <span class="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-koala-blue-800 transition-colors">
              Timesheet
            </span>
          </div>
          <div class="flex items-center gap-1.5">
            <span :class="[
              'text-xs font-bold px-2 py-0.5 rounded-md border',
              approvalCounts.timesheet > 0
                ? 'bg-koala-blue-50 text-koala-blue-900 border-koala-blue-200 shadow-2xs'
                : 'bg-slate-50 text-slate-400 border-slate-200/60'
            ]">
              {{ approvalCounts.timesheet }}
            </span>
            <ChevronRight class="w-3.5 h-3.5 text-slate-400 stroke-[2.5]" />
          </div>
        </a>

        <div class="h-px bg-slate-100 my-0.5"></div>

        <!-- Row 2: Leave Request -->
        <a 
          href="#" 
          @click.prevent="openCategory('Leave Request')"
          class="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50/90 transition-colors group"
        >
          <div class="flex items-center gap-2.5">
            <div class="w-7 h-7 rounded-lg bg-koala-blue-600 flex items-center justify-center text-white shadow-xs flex-shrink-0">
              <Calendar class="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <span class="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-koala-blue-800 transition-colors">
              Leave Request
            </span>
          </div>
          <div class="flex items-center gap-1.5">
            <span :class="[
              'text-xs font-bold px-2 py-0.5 rounded-md border',
              approvalCounts.leave > 0
                ? 'bg-koala-blue-50 text-koala-blue-900 border-koala-blue-200 shadow-2xs'
                : 'bg-slate-50 text-slate-400 border-slate-200/60'
            ]">
              {{ approvalCounts.leave }}
            </span>
            <ChevronRight class="w-3.5 h-3.5 text-slate-400 stroke-[2.5]" />
          </div>
        </a>

        <div class="h-px bg-slate-100 my-0.5"></div>

        <!-- Row 3: Overtime -->
        <a 
          href="#" 
          @click.prevent="openCategory('Overtime')"
          class="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50/90 transition-colors group"
        >
          <div class="flex items-center gap-2.5">
            <div class="w-7 h-7 rounded-lg bg-koala-blue-600 flex items-center justify-center text-white shadow-xs flex-shrink-0">
              <Clock class="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <span class="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-koala-blue-800 transition-colors">
              Overtime
            </span>
          </div>
          <div class="flex items-center gap-1.5">
            <span :class="[
              'text-xs font-bold px-2 py-0.5 rounded-md border',
              approvalCounts.overtime > 0
                ? 'bg-koala-blue-50 text-koala-blue-900 border-koala-blue-200 shadow-2xs'
                : 'bg-slate-50 text-slate-400 border-slate-200/60'
            ]">
              {{ approvalCounts.overtime }}
            </span>
            <ChevronRight class="w-3.5 h-3.5 text-slate-400 stroke-[2.5]" />
          </div>
        </a>

        <div class="h-px bg-slate-100 my-0.5"></div>

        <!-- Row 4: Reimbursement -->
        <a 
          href="#" 
          @click.prevent="openCategory('Reimbursement')"
          class="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50/90 transition-colors group"
        >
          <div class="flex items-center gap-2.5">
            <div class="w-7 h-7 rounded-lg bg-koala-blue-600 flex items-center justify-center text-white shadow-xs flex-shrink-0">
              <Receipt class="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <span class="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-koala-blue-800 transition-colors">
              Reimbursement
            </span>
          </div>
          <div class="flex items-center gap-1.5">
            <span :class="[
              'text-xs font-bold px-2 py-0.5 rounded-md border',
              approvalCounts.reimbursement > 0
                ? 'bg-koala-blue-50 text-koala-blue-900 border-koala-blue-200 shadow-2xs'
                : 'bg-slate-50 text-slate-400 border-slate-200/60'
            ]">
              {{ approvalCounts.reimbursement }}
            </span>
            <ChevronRight class="w-3.5 h-3.5 text-slate-400 stroke-[2.5]" />
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Mail, ClipboardCheck, Calendar, Clock, Receipt, ChevronRight } from 'lucide-vue-next'
import { useDashboardFilter } from '@/composables/useDashboardFilter'

const { approvalCounts } = useDashboardFilter()

const viewAllApprovals = () => {
  alert('Navigating to full pending approval list...')
}

const openCategory = (category) => {
  alert(`Filtering pending approvals by: ${category}`)
}
</script>
