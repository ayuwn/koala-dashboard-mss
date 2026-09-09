<template>
  <div class="glossy-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
      <div>
        <h3 class="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-tight">
          Pending Activity
        </h3>
        <p class="text-[11px] text-slate-400 font-normal mt-0.5">
          Incoming submission requests from team members
        </p>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-[11px] text-slate-500 font-normal">
          Showing <span class="font-bold text-koala-blue-900">{{ filteredActivities.length }}</span> items
        </span>
      </div>
    </div>

    <!-- Activity Items List -->
    <div v-if="filteredActivities.length > 0" class="space-y-2.5 flex-1">
      <div 
        v-for="item in filteredActivities" 
        :key="item.id"
        class="p-3 rounded-xl glossy-item glossy-card-hover flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
      >
        <!-- Left details -->
        <div class="flex items-start gap-3 w-full md:w-auto">
          <img 
            :src="item.avatar" 
            :alt="item.employee" 
            class="w-9 h-9 rounded-xl object-cover ring-2 ring-white shadow-glossy-sm flex-shrink-0 mt-0.5"
          />
          <div class="flex-1">
            <div class="flex flex-wrap items-center gap-1.5">
              <span class="text-xs sm:text-[13px] font-bold text-slate-900 leading-tight">{{ item.employee }}</span>
              <span 
                :class="[
                  'text-[10px] font-semibold px-2 py-0.5 rounded-md border shadow-2xs',
                  getTypeBadge(item.type)
                ]"
              >
                {{ item.type }}
              </span>
              <span v-if="item.urgent" class="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                Urgent
              </span>
            </div>

            <p class="text-[11px] text-slate-600 mt-1">
              {{ item.category }} &bull; <span class="font-bold text-koala-blue-900">{{ item.period }}</span>
            </p>
            <p class="text-[10px] text-slate-400 mt-0.5 italic line-clamp-1">
              "{{ item.reason }}"
            </p>
          </div>
        </div>

        <!-- Right actions -->
        <div class="flex items-center gap-2 w-full md:w-auto justify-end pt-1 md:pt-0">
          <span class="text-[10px] text-slate-400 mr-1 hidden lg:inline-block">
            {{ item.submittedAt }}
          </span>
          <button 
            @click="rejectItem(item)"
            class="px-3 py-1.5 text-xs font-medium rounded-xl text-slate-600 hover:text-rose-600 bg-white/80 hover:bg-rose-50 border border-white/90 hover:border-rose-200 shadow-glossy-sm transition-all flex items-center gap-1"
          >
            <XCircle class="w-3.5 h-3.5" />
            <span>Reject</span>
          </button>
          <button 
            @click="approveItem(item)"
            class="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-b from-koala-blue-800 to-koala-blue-900 hover:from-koala-blue-700 hover:to-koala-blue-800 text-white shadow-glossy-btn border border-koala-blue-600/40 transition-all flex items-center gap-1 hover:scale-102"
          >
            <CheckCircle2 class="w-3.5 h-3.5" />
            <span>Approve</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State (e.g. for past months or settled items) -->
    <div v-else class="py-12 text-center flex flex-col items-center justify-center flex-1">
      <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mb-2 shadow-glossy-sm">
        <CheckCircle2 class="w-6 h-6" />
      </div>
      <h4 class="text-xs sm:text-sm font-bold text-slate-800">No Pending Approvals</h4>
      <p class="text-[11px] text-slate-400 mt-1 max-w-xs">
        All approval requests for this period have been completely processed and settled.
      </p>
    </div>
  </div>
</template>

<script setup>
import { CheckCircle2, XCircle } from 'lucide-vue-next'
import { useDashboardFilter } from '@/composables/useDashboardFilter'

const { filteredActivities } = useDashboardFilter()

const getTypeBadge = (type) => {
  switch (type) {
    case 'Leave Request':
      return 'bg-blue-50 text-koala-blue-800 border-blue-200/80'
    case 'Overtime':
      return 'bg-amber-50 text-koala-orange-600 border-amber-200/80'
    case 'Timesheet':
      return 'bg-cyan-50 text-cyan-800 border-cyan-200/80'
    case 'Reimbursement':
      return 'bg-emerald-50 text-emerald-800 border-emerald-200/80'
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200/80'
  }
}

const approveItem = (item) => {
  alert(`Approved request ${item.id} for ${item.employee}`)
}

const rejectItem = (item) => {
  alert(`Rejected request ${item.id} for ${item.employee}`)
}
</script>
