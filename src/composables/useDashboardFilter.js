import { ref, computed } from 'vue'
import { employeesList, pendingActivityData, teamLeavesData, calendarAgendasData, statisticBreakdown } from '@/data/mssData'

// Global Shared State
const sidebarOpen = ref(false)
const isSidebarCollapsed = ref(false)
const selectedEmployeeId = ref('ALL')
// Default date range: Current Month (1st day to last day of current month)
const now = new Date()
const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

const dateRange = ref([startOfMonth, endOfMonth])
const searchQuery = ref('')

export function useDashboardFilter() {
  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  const closeSidebar = () => {
    sidebarOpen.value = false
  }

  const toggleSidebarCollapse = () => {
    isSidebarCollapsed.value = !isSidebarCollapsed.value
  }

  const setEmployee = (id) => {
    selectedEmployeeId.value = id
  }

  const selectedEmployee = computed(() => {
    return employeesList.find(e => e.id === selectedEmployeeId.value) || employeesList[0]
  })

  const formattedDateRange = computed(() => {
    if (!dateRange.value || !dateRange.value[0]) return 'All Dates'
    const start = dateRange.value[0]
    const end = dateRange.value[1] || dateRange.value[0]
    
    const options = { month: 'short', day: 'numeric' }
    const startStr = start.toLocaleDateString('en-US', options)
    const endStr = end.toLocaleDateString('en-US', { ...options, year: 'numeric' })
    
    return `${startStr} - ${endStr}`
  })

  // Pending Activities: All items shown for Current Month, 0/empty for past months
  const filteredActivities = computed(() => {
    if (!dateRange.value || !dateRange.value[0]) {
      return pendingActivityData
    }
    const selectedStart = new Date(dateRange.value[0])
    const now = new Date()
    const diffMonths = (selectedStart.getFullYear() - now.getFullYear()) * 12 + (selectedStart.getMonth() - now.getMonth())
    
    // Past months have 0 pending approvals (all closed)
    if (diffMonths <= -1) {
      return []
    }
    return pendingActivityData
  })

  // Counts for Need To Approve Breakdown (always matching Pending Activities)
  const approvalCounts = computed(() => {
    const list = filteredActivities.value
    return {
      leave: list.filter(i => i.type === 'Leave Request').length,
      overtime: list.filter(i => i.type === 'Overtime').length,
      timesheet: list.filter(i => i.type === 'Timesheet').length,
      total: list.length
    }
  })

  // Notification count synced with pending approvals
  const selectedNotificationCount = computed(() => {
    return approvalCounts.value.total
  })

  return {
    sidebarOpen,
    isSidebarCollapsed,
    selectedEmployeeId,
    selectedEmployee,
    dateRange,
    formattedDateRange,
    searchQuery,
    selectedNotificationCount,
    employeesList,
    filteredActivities,
    approvalCounts,
    teamLeavesData,
    calendarAgendasData,
    statisticBreakdown,
    toggleSidebar,
    closeSidebar,
    toggleSidebarCollapse,
    setEmployee,
  }
}
