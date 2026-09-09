// Mock Data for KOALA - Manager Self Service (MSS) Dashboard
// PT KAHF TEKNOLOGI MANDIRI

export const employeesList = [
  {
    id: 'ALL',
    name: 'All Team Members',
    role: 'All Department',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    department: 'Engineering & Delivery',
  },
  {
    id: 'EMP-001',
    name: 'Ayu Widianingsih',
    role: 'Junior SAP ABAP/Fiori Developer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    department: 'SAP Technical',
    project: 'SMM',
    leaveQuota: { total: 12, used: 6, remaining: 6 },
    overtimeHours: 23.0,
    pendingApprovals: 3,
    reimbursementTotal: 1250000,
    timesheetStatus: 'Draft',
    site: 'WFO Client',
  },
  {
    id: 'EMP-002',
    name: 'Ahmad Mukafi',
    role: 'Junior SAP ABAP Developer',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    department: 'SAP Technical',
    project: 'Internal',
    leaveQuota: { total: 12, used: 2, remaining: 10 },
    overtimeHours: 22.0,
    pendingApprovals: 1,
    reimbursementTotal: 820000,
    timesheetStatus: 'Approved',
    site: 'WFO Client',
  },
  {
    id: 'EMP-003',
    name: 'Sikah Nurbayati',
    role: 'Junior SAP Fiori Developer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    department: 'SAP Functional',
    project: 'BSIM',
    leaveQuota: { total: 12, used: 4, remaining: 8 },
    overtimeHours: 23.0,
    pendingApprovals: 2,
    reimbursementTotal: 950000,
    timesheetStatus: 'Submitted',
    site: 'WFO Rempoa',
  },
  {
    id: 'EMP-004',
    name: 'Zulfami Kemal',
    role: 'Senior SAP ABAP Developer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    department: 'SAP Technical',
    project: 'BSIM',
    leaveQuota: { total: 12, used: 3, remaining: 9 },
    overtimeHours: 23.0,
    pendingApprovals: 0,
    reimbursementTotal: 180000,
    timesheetStatus: 'Approved',
    site: 'WFO Rempoa',
  },
  {
    id: 'EMP-005',
    name: 'Sayyid Taqi',
    role: 'Senior SAP ABAP Developer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    department: 'SAP Technical',
    project: 'SMM',
    leaveQuota: { total: 12, used: 1, remaining: 11 },
    overtimeHours: 21.0,
    pendingApprovals: 2,
    reimbursementTotal: 620000,
    timesheetStatus: 'Submitted',
    site: 'WFO Rempoa',
  }
]

// Short names for chart X-axis labels (matching chart.png exactly)
export const employeeShortNames = [
  'Ayu Widianingsih',
  'Ahmad Mukafi',
  'Sikah Nurbayati',
  'Zulfami Kemal',
  'Sayyid Altaqi'
]

// Specific employee stats:
// Leave: [Cuti Sakit, Cuti Tahunan, Izin Setengah Hari, WFH]
// Overtime: [Overtime Weekend/Holiday, Overtime Normal Day]
// Reimbursement: [Meal Allowance, Transport Overtime, Medical]
export const employeeSpecificStats = {
  ALL: {
    leaves: [5, 18, 3, 24],
    overtime: [38.5, 54.0],
    reimbursement: [2150, 1400, 4200],
    timesheetProjects: [120, 280, 160, 95],
    timesheetSites: [15, 20, 30, 20, 15]
  },
  'EMP-001': {
    leaves: [23, 4, 1, 3],
    overtime: [18.5, 4.5],
    reimbursement: [350, 400, 850],
    timesheetProjects: [0, 10, 140, 10],
    timesheetSites: [10, 0, 10, 70, 10]
  },
  'EMP-002': {
    leaves: [22, 2, 0, 8],
    overtime: [14.0, 8.0],
    reimbursement: [200, 150, 620],
    timesheetProjects: [130, 20, 10, 0],
    timesheetSites: [0, 20, 70, 0, 10]
  },
  'EMP-003': {
    leaves: [23, 3, 2, 4],
    overtime: [16.0, 7.0],
    reimbursement: [450, 200, 300],
    timesheetProjects: [10, 140, 10, 0],
    timesheetSites: [0, 10, 20, 10, 60]
  },
  'EMP-004': {
    leaves: [23, 4, 1, 2],
    overtime: [15.0, 8.0],
    reimbursement: [180, 200, 0],
    timesheetProjects: [20, 110, 0, 30],
    timesheetSites: [60, 10, 15, 10, 5]
  },
  'EMP-005': {
    leaves: [21, 2, 1, 5],
    overtime: [12.0, 9.0],
    reimbursement: [200, 120, 420],
    timesheetProjects: [10, 0, 120, 30],
    timesheetSites: [10, 50, 20, 10, 10]
  }
}

// Grouped data per category matching chart.png visual numbers
// X-Axis = [Ayu Widianingsih, Ahmad Mukafi, Sikah Nurbayati, Zulfami Kemal, Sayyid Altaqi]
export const allEmployeesGroupedData = {
  // Leave request: Cuti Sakit, Cuti Tahunan, Izin Setengah Hari, WFH
  // In chart.png: 
  // Ayu: ~23 (blue), ~4 (orange), ~1 (grey)
  // Ahmad Mukafi: ~22 (blue), ~2 (orange), 0 (grey)
  // Sikah Nurbayati: ~23 (blue), ~3 (orange), ~2 (grey)
  // Zulfami Kemal: ~23 (blue), ~4 (orange), ~1 (grey)
  // Sayyid Altaqi: ~21 (blue), ~2 (orange), ~1 (grey)
  leave: {
    'Cuti Sakit': [23, 22, 23, 23, 21],
    'Cuti Tahunan': [4, 2, 3, 4, 2],
    'Izin Setengah Hari': [1, 0, 2, 1, 1],
    'WFH': [3, 8, 4, 2, 5],
  },
  // Overtime: Overtime Weekend/Holiday, Overtime Normal Day
  overtime: {
    'Overtime Weekend/Holiday': [18.5, 14.0, 16.0, 15.0, 12.0],
    'Overtime Normal Day': [4.5, 8.0, 7.0, 8.0, 9.0],
  },
  // Reimbursement: Meal Allowance, Transport Overtime, Medical (in K IDR)
  reimbursement: {
    'Meal Allowance': [350, 200, 450, 180, 200],
    'Transport Overtime': [400, 150, 200, 200, 120],
    'Medical': [850, 620, 300, 0, 420],
  },
  // Timesheet Projects (Hours Logged)
  timesheetProjects: {
    'Project Internal': [10, 130, 10, 20, 10],
    'Project BSIM': [10, 20, 140, 110, 0],
    'Project SMM': [140, 10, 10, 0, 120],
    'Core Platform': [10, 0, 0, 30, 30],
  },
  // Timesheet Sites (% Distribution)
  timesheetSites: {
    'WAO': [10, 0, 0, 60, 10],
    'WFA': [0, 20, 10, 10, 50],
    'WFH': [10, 70, 20, 15, 20],
    'WFO Client': [70, 0, 10, 10, 10],
    'WFO Rempoa': [10, 10, 60, 5, 10],
  }
}

// Previous Month Data (1 bulan sebelumnya)
export const previousMonthGroupedData = {
  leave: {
    'Cuti Sakit': [18, 20, 19, 21, 19],
    'Cuti Tahunan': [2, 5, 1, 2, 3],
    'Izin Setengah Hari': [2, 1, 1, 0, 2],
    'WFH': [5, 10, 6, 4, 7],
  },
  overtime: {
    'Overtime Weekend/Holiday': [12.0, 10.5, 14.0, 11.0, 8.5],
    'Overtime Normal Day': [6.0, 5.5, 8.0, 6.5, 7.0],
  },
  reimbursement: {
    'Meal Allowance': [280, 150, 320, 120, 180],
    'Transport Overtime': [310, 120, 180, 150, 90],
    'Medical': [500, 450, 200, 100, 350],
  },
  timesheetProjects: {
    'Project Internal': [20, 110, 20, 30, 15],
    'Project BSIM': [20, 30, 120, 100, 10],
    'Project SMM': [120, 15, 20, 10, 110],
    'Core Platform': [15, 5, 10, 20, 25],
  },
  timesheetSites: {
    'WAO': [15, 5, 5, 50, 15],
    'WFA': [5, 15, 15, 15, 45],
    'WFH': [15, 65, 25, 20, 25],
    'WFO Client': [60, 5, 15, 10, 5],
    'WFO Rempoa': [5, 10, 40, 5, 10],
  }
}

export const previousMonthEmployeeStats = {
  ALL: {
    leaves: [19, 13, 6, 32],
    overtime: [56.0, 33.0],
    reimbursement: [1050, 850, 1600],
    timesheetProjects: [195, 280, 275, 75],
    timesheetSites: [17, 19, 30, 18, 16]
  },
  'EMP-001': {
    leaves: [18, 2, 2, 5],
    overtime: [12.0, 6.0],
    reimbursement: [280, 310, 500],
    timesheetProjects: [20, 20, 120, 15],
    timesheetSites: [15, 5, 15, 60, 5]
  },
  'EMP-002': {
    leaves: [20, 5, 1, 10],
    overtime: [10.5, 5.5],
    reimbursement: [150, 120, 450],
    timesheetProjects: [110, 30, 15, 5],
    timesheetSites: [5, 15, 65, 5, 10]
  },
  'EMP-003': {
    leaves: [19, 1, 1, 6],
    overtime: [14.0, 8.0],
    reimbursement: [320, 180, 200],
    timesheetProjects: [20, 120, 20, 10],
    timesheetSites: [5, 15, 25, 15, 40]
  },
  'EMP-004': {
    leaves: [21, 2, 0, 4],
    overtime: [11.0, 6.5],
    reimbursement: [120, 150, 100],
    timesheetProjects: [30, 100, 10, 20],
    timesheetSites: [50, 15, 20, 10, 5]
  },
  'EMP-005': {
    leaves: [19, 3, 2, 7],
    overtime: [8.5, 7.0],
    reimbursement: [180, 90, 350],
    timesheetProjects: [15, 10, 110, 25],
    timesheetSites: [15, 45, 25, 5, 10]
  }
}

// Helper to determine whether dateRange is previous month vs current month
export function getActiveDataByDateRange(dateRange) {
  if (!dateRange || !dateRange[0]) {
    return {
      grouped: allEmployeesGroupedData,
      employeeStats: employeeSpecificStats
    }
  }

  const selectedStart = new Date(dateRange[0])
  const now = new Date()

  // Calculate difference in months between selected date and current month
  const diffMonths = (selectedStart.getFullYear() - now.getFullYear()) * 12 + (selectedStart.getMonth() - now.getMonth())

  if (diffMonths <= -1) {
    return {
      grouped: previousMonthGroupedData,
      employeeStats: previousMonthEmployeeStats
    }
  }

  return {
    grouped: allEmployeesGroupedData,
    employeeStats: employeeSpecificStats
  }
}

export const orgUpdatesData = [
  {
    id: 1,
    title: 'KAHF Tech Talk: Building Scalable Microservices with Event-Driven Architecture',
    date: '28 Mar 2026',
    category: 'Engineering & Tech',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
    summary: 'Join our bi-weekly internal tech sharing session hosted by the Cloud Architecture team this Friday at 15:00 WIB.',
    tag: 'Event',
  },
  {
    id: 2,
    title: 'Update Kebijakan Flexi-Work & Klaim Medical Reimbursement Q2 2026',
    date: '26 Mar 2026',
    category: 'People & Culture',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
    summary: 'Pemberitahuan perubahan alur persetujuan reimbursement kesehatan serta pedoman Work From Anywhere (WFA).',
    tag: 'Policy',
  },
  {
    id: 3,
    title: 'Kick-off Project Banking BSIM Modernization Phase 2',
    date: '24 Mar 2026',
    category: 'Project Announcement',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
    summary: 'Selamat kepada tim BSIM atas keberhasilan go-live fase 1 dan persiapan kick-off sprint fase 2.',
    tag: 'Milestone',
  }
]

export const pendingActivityData = [
  {
    id: 'REQ-LV-089',
    type: 'Leave Request',
    category: 'Cuti Tahunan',
    employee: 'Sayyid Taqi',
    employeeId: 'EMP-005',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    period: '27 Mar 2026 - 28 Mar 2026 (2 Hari)',
    reason: 'Acara keluarga di luar kota',
    submittedAt: '2 jam yang lalu',
    status: 'Pending Approval',
    urgent: true
  },
  {
    id: 'REQ-OT-112',
    type: 'Overtime',
    category: 'Weekend Deployment',
    employee: 'Ayu Widianingsih',
    employeeId: 'EMP-001',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    period: '22 Mar 2026 (6.5 Jam)',
    reason: 'Critical Hotfix & Database Migration SMM Core',
    submittedAt: '4 jam yang lalu',
    status: 'Pending Approval',
    urgent: false
  },
  {
    id: 'REQ-RM-045',
    type: 'Reimbursement',
    category: 'Transport & Parking Client',
    employee: 'Zulfami Kemal',
    employeeId: 'EMP-004',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    period: 'Rp 385.000',
    reason: 'Transport kunjungan audit QA On-site Client BSIM',
    submittedAt: '1 hari yang lalu',
    status: 'Pending Approval',
    urgent: false
  },
  {
    id: 'REQ-TS-203',
    type: 'Timesheet',
    category: 'Sprint 24 Submission',
    employee: 'Ahmad Mukafi',
    employeeId: 'EMP-002',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    period: 'Week 4 (40 Jam Logged)',
    reason: 'Timesheet mingguan perancangan UI/UX Koala MSS',
    submittedAt: '1 hari yang lalu',
    status: 'Pending Approval',
    urgent: false
  }
]

export const teamLeavesData = [
  {
    id: 'TL-1',
    name: 'Sayyid Taqi',
    type: 'Cuti Tahunan',
    date: '27 Mar - 28 Mar 2026',
    days: '2 hari',
    statusColor: 'bg-amber-100 text-amber-800 border-amber-200',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'TL-2',
    name: 'Ayu Widianingsih',
    type: 'WFH',
    date: '25 Mar 2026',
    days: '1 hari',
    statusColor: 'bg-blue-100 text-blue-800 border-blue-200',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'TL-3',
    name: 'Zulfami Kemal',
    type: 'Sakit (Dokter)',
    date: '26 Mar 2026',
    days: '1 hari',
    statusColor: 'bg-rose-100 text-rose-800 border-rose-200',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  }
]

export const calendarAgendasData = [
  {
    id: 'AG-1',
    time: '09:00 - 09:30',
    title: 'Daily Standup Engineering Squad BSIM',
    type: 'Meeting',
    location: 'Google Meet',
    attendeesCount: 8,
    active: true
  },
  {
    id: 'AG-2',
    time: '11:00 - 12:00',
    title: 'Sprint Review & Demo Koala MSS v1.0',
    type: 'Review',
    location: 'Meeting Room Rempoa 2 & Online',
    attendeesCount: 14,
    active: false
  },
  {
    id: 'AG-3',
    time: '14:00 - 15:30',
    title: '1-on-1 Performance Discussion (Q1 Reflection)',
    type: 'One-on-One',
    location: 'Focus Room 1',
    attendeesCount: 2,
    active: false
  },
  {
    id: 'AG-4',
    time: '16:00 - 17:00',
    title: 'Tech Architecture Sync with Client BSIM',
    type: 'External',
    location: 'Zoom Conference',
    attendeesCount: 6,
    active: false
  }
]

export const statisticBreakdown = {
  leaves: {
    labels: ['Cuti Sakit', 'Cuti Tahunan', 'Izin Setengah Hari', 'WFH'],
    datasets: [
      {
        label: 'Approved Days',
        backgroundColor: ['#3b82f6', '#f97316', '#9ca3af', '#10b981'],
        data: [23, 4, 1, 3],
        borderRadius: 6,
      }
    ]
  },
  overtime: {
    labels: ['Overtime Weekend/Holiday', 'Overtime Normal Day'],
    datasets: [
      {
        label: 'Overtime Hours',
        backgroundColor: ['#3b82f6', '#f97316'],
        data: [18.5, 4.5],
        borderRadius: 6,
      }
    ]
  },
  reimbursement: {
    labels: ['Meal Allowance', 'Transport Overtime', 'Medical'],
    datasets: [
      {
        label: 'Claim Amount (x Rp 1.000)',
        backgroundColor: ['#3b82f6', '#f97316', '#9ca3af'],
        data: [350, 400, 850],
        borderRadius: 6,
      }
    ]
  },
  timesheetProjects: {
    labels: ['Project Internal', 'Project BSIM', 'Project SMM', 'Core Platform'],
    datasets: [
      {
        label: 'Logged Hours',
        backgroundColor: ['#0069A7', '#58ACFF', '#FFA86A', '#539D5A'],
        data: [120, 280, 160, 95],
        borderRadius: 8,
      }
    ]
  },
  timesheetSites: {
    labels: ['WAO', 'WFA', 'WFH', 'WFO Client', 'WFO Rempoa'],
    datasets: [
      {
        label: 'Distribution (%)',
        backgroundColor: ['#024981', '#4088C2', '#58ACFF', '#FFA86A', '#539D5A'],
        data: [15, 20, 30, 20, 15],
      }
    ]
  }
}
