<template>
  <div class="glossy-card rounded-2xl p-5 sm:p-6">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-tight">
          Employee Summary
        </h3>
        <p class="text-[11px] text-slate-400 font-normal mt-0.5">
          Filter team members to drill down metrics
        </p>
      </div>

      <!-- Employee Select Dropdown -->
      <div class="relative">
        <select 
          v-model="selectedEmployeeId"
          class="appearance-none bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-xl pl-3 pr-7 py-1.5 text-xs font-semibold text-koala-blue-900 focus:outline-none focus:ring-2 focus:ring-koala-blue-500/20 cursor-pointer shadow-glossy-sm hover:bg-white hover:shadow-glossy transition-all"
        >
          <option v-for="emp in employeesList" :key="emp.id" :value="emp.id">
            {{ emp.name }}
          </option>
        </select>
        <ChevronDown class="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>

    <!-- All Members Overview Mode -->
    <div v-if="selectedEmployeeId === 'ALL'" class="p-4 rounded-xl bg-gradient-to-r from-koala-blue-900 to-koala-blue-800 text-white shadow-glossy-btn border border-white/20">
      <div class="flex items-center gap-3">
        <div class="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-inner">
          <Users class="w-5 h-5 text-koala-orange-400" />
        </div>
        <div>
          <h4 class="text-xs sm:text-[13px] font-bold leading-tight">SAP Technical</h4>
          <p class="text-[11px] text-koala-blue-200 mt-0.5">5 Active Members &bull; 2 Projects (BSIM, SMM)</p>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/15 text-center">
        <div>
          <span class="text-[10px] text-koala-blue-200 uppercase font-semibold tracking-wider">Total Leave</span>
          <p class="text-xs sm:text-[13px] font-bold text-white mt-0.5">20 Days</p>
        </div>
        <div>
          <span class="text-[10px] text-koala-blue-200 uppercase font-semibold tracking-wider">Total Overtime</span>
          <p class="text-xs sm:text-[13px] font-bold text-koala-orange-400 mt-0.5">62.0 Hours</p>
        </div>
        <div>
          <span class="text-[10px] text-koala-blue-200 uppercase font-semibold tracking-wider">Pending</span>
          <p class="text-xs sm:text-[13px] font-bold text-emerald-400 mt-0.5">4 Requests</p>
        </div>
      </div>
    </div>

    <!-- Specific Employee Detail Mode -->
    <div v-else class="space-y-3.5">
      <div class="flex items-center gap-3 p-3 rounded-xl glossy-item">
        <img 
          :src="selectedEmployee.avatar" 
          :alt="selectedEmployee.name" 
          class="w-10 h-10 rounded-xl object-cover ring-2 ring-white shadow-glossy-sm"
        />
        <div class="flex-1 overflow-hidden">
          <div class="flex items-center gap-2">
            <h4 class="text-xs sm:text-[13px] font-bold text-slate-900 truncate leading-tight">{{ selectedEmployee.name }}</h4>
            <span class="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-white/90 text-koala-blue-800 border border-koala-blue-100/80 shadow-2xs">
              {{ selectedEmployee.id }}
            </span>
          </div>
          <p class="text-[11px] text-slate-500 truncate mt-0.5">{{ selectedEmployee.role }}</p>
          <div class="flex items-center gap-1.5 mt-0.5 text-[10px] text-slate-400">
            <span>{{ selectedEmployee.department }}</span>
            <span>&bull;</span>
            <span class="font-semibold text-koala-blue-900">{{ selectedEmployee.site }}</span>
          </div>
        </div>
      </div>

      <!-- Quick Metrics Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div class="p-2.5 rounded-xl glossy-item text-center">
          <span class="text-[10px] text-slate-400 font-medium">Leave Remaining</span>
          <p class="text-xs sm:text-[13px] font-bold text-koala-blue-900 mt-0.5">
            {{ selectedEmployee.leaveQuota?.remaining }} / {{ selectedEmployee.leaveQuota?.total }} Days
          </p>
        </div>

        <div class="p-2.5 rounded-xl glossy-item text-center">
          <span class="text-[10px] text-slate-400 font-medium">Overtime Hours</span>
          <p class="text-xs sm:text-[13px] font-bold text-koala-orange-600 mt-0.5">
            {{ selectedEmployee.overtimeHours }} Hours
          </p>
        </div>

        <div class="p-2.5 rounded-xl glossy-item text-center">
          <span class="text-[10px] text-slate-400 font-medium">Reimbursement</span>
          <p class="text-xs sm:text-[13px] font-bold text-slate-800 mt-0.5">
            Rp {{ (selectedEmployee.reimbursementTotal).toLocaleString() }}
          </p>
        </div>

        <div class="p-2.5 rounded-xl glossy-item text-center">
          <span class="text-[10px] text-slate-400 font-medium">Timesheet</span>
          <p class="text-xs sm:text-[13px] font-bold text-emerald-600 mt-0.5">
            {{ selectedEmployee.timesheetStatus }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronDown, Users } from 'lucide-vue-next'
import { useDashboardFilter } from '@/composables/useDashboardFilter'

const { 
  selectedEmployeeId, 
  selectedEmployee, 
  employeesList 
} = useDashboardFilter()
</script>
