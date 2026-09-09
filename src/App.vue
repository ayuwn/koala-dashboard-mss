<template>
  <div class="relative min-h-screen bg-[#F6F9FD] flex flex-col font-sans text-slate-800 antialiased selection:bg-koala-blue-600 selection:text-white overflow-hidden">
    <!-- Subtle Ambient Glossy Mesh Lighting in Background -->
    <div class="fixed top-0 left-1/4 w-96 h-96 bg-koala-blue-200/25 rounded-full blur-3xl pointer-events-none -z-10"></div>
    <div class="fixed top-1/3 right-10 w-[30rem] h-[30rem] bg-koala-blue-100/35 rounded-full blur-3xl pointer-events-none -z-10"></div>
    <div class="fixed bottom-10 left-1/3 w-80 h-80 bg-koala-orange-200/15 rounded-full blur-3xl pointer-events-none -z-10"></div>

    <!-- Sidebar Component -->
    <Sidebar />

    <!-- Main Content Area -->
    <div 
      :class="[
        'flex-1 flex flex-col transition-all duration-250 ease-in-out min-h-screen',
        isSidebarCollapsed ? 'md:pl-16' : 'md:pl-64'
      ]"
    >
      <!-- Top Sticky Navbar with Date Range Filter -->
      <Navbar />

      <!-- Main Scrollable Dashboard Content -->
      <main class="flex-1 p-4 sm:p-5 lg:p-6 space-y-4 sm:space-y-5 max-w-[1360px] w-full mx-auto">
        <!-- 1. Approval Pending Alert Banner -->
        <ApprovalBanner />

        <!-- 2. Row: Organizational Updates Carousel & Need To Approve Breakdown -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          <!-- Organizational Updates (Carousel) -->
          <div class="lg:col-span-7">
            <OrgUpdatesCarousel />
          </div>

          <!-- Need To Approve Breakdown -->
          <div class="lg:col-span-5">
            <NeedToApprove />
          </div>
        </div>

        <!-- 3. Row: Pending Activity & Work Calendar Widget (MOVED UP) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          <!-- Pending Activities List -->
          <div class="lg:col-span-7">
            <PendingActivity />
          </div>

          <!-- Work Calendar Widget (Team Leave & Meeting Agenda) -->
          <div class="lg:col-span-5">
            <WorkCalendarWidget />
          </div>
        </div>

        <!-- 4. Row: Employee Summary Card (MOVED DOWN BELOW PENDING ACTIVITY & WORK CALENDAR) -->
        <EmployeeSummaryCard />

        <!-- 5. Row: Statistics Charts (Leave/OT/Reimbursement & Timesheet/Site) -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          <StatisticDataWidget />
          <StatisticTimesheetWidget />
        </div>

        <!-- Footer -->
        <footer class="pt-4 pb-3 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <div class="flex items-center gap-1.5">
            <img src="/src/assets/images/kahf-icon.png" alt="KAHF" class="w-3.5 h-3.5 object-contain" />
            <p>&copy; 2026 PT KAHF TEKNOLOGI MANDIRI. All rights reserved.</p>
          </div>
          <div class="flex items-center gap-3">
            <a href="#" class="hover:text-slate-700 transition-colors">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#" class="hover:text-slate-700 transition-colors">Terms of Service</a>
            <span>&bull;</span>
            <span class="font-medium text-slate-500">v1.2.4-mss</span>
          </div>
        </footer>
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '@/components/Navbar.vue'
import ApprovalBanner from '@/components/ApprovalBanner.vue'
import OrgUpdatesCarousel from '@/components/OrgUpdatesCarousel.vue'
import NeedToApprove from '@/components/NeedToApprove.vue'
import EmployeeSummaryCard from '@/components/EmployeeSummaryCard.vue'
import PendingActivity from '@/components/PendingActivity.vue'
import WorkCalendarWidget from '@/components/WorkCalendarWidget.vue'
import StatisticDataWidget from '@/components/StatisticDataWidget.vue'
import StatisticTimesheetWidget from '@/components/StatisticTimesheetWidget.vue'
import { useDashboardFilter } from '@/composables/useDashboardFilter'

const { isSidebarCollapsed } = useDashboardFilter()
</script>
