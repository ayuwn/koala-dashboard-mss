<template>
  <div 
    v-if="approvalCounts.total > 0"
    class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-koala-blue-900 via-koala-blue-800 to-koala-blue-700 text-white p-3.5 sm:p-4 border border-white/20 shadow-glossy"
  >
    <!-- Specular ambient glow inside banner -->
    <div class="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
    <div class="absolute right-32 -bottom-8 w-32 h-32 bg-koala-orange-500/20 rounded-full blur-2xl pointer-events-none"></div>

    <div class="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <div class="p-2 rounded-xl bg-gradient-to-br from-koala-orange-500 to-koala-orange-600 text-white shadow-glossy-btn-orange border border-white/30 flex-shrink-0">
          <AlertCircle class="w-4 h-4" />
        </div>
        <div>
          <div class="flex items-center gap-2">
            <!-- <h3 class="text-xs sm:text-sm font-semibold tracking-tight text-white">
              Action Required: {{ approvalCounts.total }} Pending Approvals
            </h3> -->
            <h3 class="text-xs sm:text-sm font-semibold tracking-tight text-white">
              Approval Pending
            </h3>
            <!-- <span class="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-white/20 text-white backdrop-blur-xs border border-white/30">
              Attention
            </span> -->
          </div>
          <!-- <p class="text-[11px] text-koala-blue-100/90 mt-0.5">
            {{ approvalCounts.leave }} leave requests, {{ approvalCounts.overtime }} overtime claims, and {{ approvalCounts.reimbursement }} reimbursements awaiting approval.
          </p> -->
          <p class="text-[11px] text-koala-blue-100/90 mt-0.5">
            You have {{  approvalCounts.total }} approvals that require your attention in 1 day.
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2 w-full sm:w-auto self-end sm:self-center">
        <button 
          @click="approveAll"
          class="w-full sm:w-auto px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-b from-koala-orange-500 to-koala-orange-600 hover:from-koala-orange-400 hover:to-koala-orange-500 text-white transition-all shadow-glossy-btn-orange border border-white/30 flex items-center justify-center gap-1.5 hover:scale-102 active:scale-98"
        >
          <CheckCheck class="w-3.5 h-3.5" />
          Review Pending Queue
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { AlertCircle, CheckCheck } from 'lucide-vue-next'
import { useDashboardFilter } from '@/composables/useDashboardFilter'

const { approvalCounts } = useDashboardFilter()

const approveAll = () => {
  alert('Redirecting to approval queue...')
}
</script>
