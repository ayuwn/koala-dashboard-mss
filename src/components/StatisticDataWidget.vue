<template>
  <div class="glossy-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full">
    <!-- Header: Title, Category Tabs & Chart Type Selector -->
    <div class="flex flex-col gap-3 mb-4 pb-3 border-b border-slate-100/80">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div class="flex items-center gap-2">
            <h3 class="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-tight">
              Statistic Data Overview
            </h3>
            <!-- Active Employee Filter Badge -->
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-koala-blue-50 text-koala-blue-800 border border-koala-blue-100 shadow-2xs truncate max-w-[140px] sm:max-w-none">
              {{ selectedEmployee.name }}
            </span>
          </div>
          <p class="text-[11px] text-slate-400 font-normal mt-0.5">
            Leave &amp; overtime metrics &bull; <span class="text-koala-blue-800 font-medium">{{ formattedDateRange }}</span>
          </p>
        </div>

        <!-- Chart Type Switcher Dropdown -->
        <div class="flex items-center gap-1.5 self-start sm:self-auto">
          <div class="relative">
            <select
              v-model="selectedChartType"
              class="appearance-none bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-xl pl-2.5 pr-7 py-1 text-xs font-bold text-koala-blue-900 focus:outline-none focus:ring-2 focus:ring-koala-blue-500/20 cursor-pointer shadow-2xs hover:border-koala-blue-300 transition-all"
            >
              <option value="column">Column (Vertical)</option>
              <option value="bar">Bar (Horizontal)</option>
              <option value="line">Line Chart</option>
              <option value="area">Area (Filled)</option>
              <option value="pie">Pie Chart</option>
              <option value="doughnut">Doughnut</option>
              <option value="radar">Radar Chart</option>
              <option value="polarArea">Polar Area</option>
              <option value="combo">Combo (Bar + Line)</option>
            </select>
            <ChevronDown class="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      <!-- Process / Category Filter Tabs -->
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div class="flex flex-wrap items-center gap-1 bg-white/70 backdrop-blur-sm p-1 rounded-xl border border-white/90 shadow-glossy-sm">
          <button 
            @click="activeCategory = 'leave'"
            :class="[
              'px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all',
              activeCategory === 'leave' 
                ? 'bg-gradient-to-r from-koala-blue-900 to-koala-blue-800 text-white shadow-xs' 
                : 'text-slate-500 hover:text-slate-900'
            ]"
          >
            Leave Request
          </button>
          <button 
            @click="activeCategory = 'overtime'"
            :class="[
              'px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all',
              activeCategory === 'overtime' 
                ? 'bg-gradient-to-r from-koala-blue-900 to-koala-blue-800 text-white shadow-xs' 
                : 'text-slate-500 hover:text-slate-900'
            ]"
          >
            Overtime
          </button>
        </div>

        <!-- Subcategory Item Filters -->
        <div class="flex flex-wrap items-center gap-1 bg-slate-100/70 p-1 rounded-xl">
          <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider px-1">Sub:</span>
          <button
            v-for="sub in currentSubcategories"
            :key="sub"
            @click="toggleSubcategory(sub)"
            :class="[
              'px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-all border',
              activeSubcategories.includes(sub)
                ? 'bg-white text-koala-blue-900 border-koala-blue-200 shadow-2xs font-bold'
                : 'bg-transparent text-slate-400 border-transparent hover:text-slate-600 opacity-60'
            ]"
          >
            {{ sub }}
          </button>
        </div>
      </div>
    </div>

    <!-- Chart Canvas Container -->
    <div class="relative w-full h-64 sm:h-72 flex items-center justify-center pt-1">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, computed } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  Filler,
  BarController,
  LineController,
  PieController,
  DoughnutController,
  RadarController,
  PolarAreaController
} from 'chart.js'
import { employeeSpecificStats, allEmployeesGroupedData, employeeShortNames, getActiveDataByDateRange } from '@/data/mssData'
import { useDashboardFilter } from '@/composables/useDashboardFilter'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  Filler,
  BarController,
  LineController,
  PieController,
  DoughnutController,
  RadarController,
  PolarAreaController
)

const { selectedEmployeeId, selectedEmployee, formattedDateRange, dateRange } = useDashboardFilter()

const activeCategory = ref('leave')
const selectedChartType = ref('column')
const canvasRef = ref(null)
let chartInstance = null

// Process Subcategories matching chart.png styling
const subcategoryConfig = {
  leave: {
    labels: ['Cuti Sakit', 'Cuti Tahunan', 'Izin Setengah Hari', 'WFH'],
    colors: ['#3A70C2', '#ED7D31', '#A5A5A5', '#70AD47'],
    unit: 'Days'
  },
  overtime: {
    labels: ['Overtime Weekend/Holiday', 'Overtime Normal Day'],
    colors: ['#3A70C2', '#ED7D31'],
    unit: 'Hours'
  }
}

const currentSubcategories = computed(() => subcategoryConfig[activeCategory.value].labels)
const activeSubcategories = ref([...subcategoryConfig['leave'].labels])

// Reset active subcategories when category tab changes
watch(activeCategory, (newCat) => {
  activeSubcategories.value = [...subcategoryConfig[newCat].labels]
})

const toggleSubcategory = (sub) => {
  const idx = activeSubcategories.value.indexOf(sub)
  if (idx >= 0) {
    if (activeSubcategories.value.length > 1) {
      activeSubcategories.value.splice(idx, 1)
    }
  } else {
    activeSubcategories.value.push(sub)
  }
  nextTick(() => renderChart())
}

// Factor data based on date range selected in Navbar
const getDateSeedFactor = () => {
  if (!dateRange.value || !dateRange.value[0]) return 1.0
  const start = new Date(dateRange.value[0]).getTime()
  const end = new Date(dateRange.value[1] || dateRange.value[0]).getTime()
  const diffDays = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1)
  // Default range 24-29 Mar = 6 days => factor 1.0
  return Math.max(0.4, Math.min(2.5, diffDays / 6))
}

const renderChart = () => {
  if (!canvasRef.value) return
  if (chartInstance) {
    chartInstance.destroy()
  }

  const isAll = selectedEmployeeId.value === 'ALL'
  const ctx = canvasRef.value.getContext('2d')
  const chartType = selectedChartType.value
  const isCircular = ['pie', 'doughnut', 'polarArea', 'radar'].includes(chartType)
  const factor = getDateSeedFactor()

  const config = subcategoryConfig[activeCategory.value]
  let configType = 'bar'
  let indexAxis = 'x'
  let datasets = []
  let labels = []

  const activeData = getActiveDataByDateRange(dateRange.value)

  if (isAll) {
    // Mode All Employee: X-Axis = Employee Names, Datasets = Subcategories (like chart.png)
    labels = employeeShortNames
    const groupedData = activeData.grouped[activeCategory.value]

    const filteredLabels = config.labels.filter(label => activeSubcategories.value.includes(label))
    datasets = filteredLabels.map(label => {
      const colorIndex = config.labels.indexOf(label)
      const rawData = groupedData[label] || []
      const scaledData = rawData.map(val => Math.round(val * factor * 10) / 10)

      return {
        label: label,
        data: scaledData,
        backgroundColor: config.colors[colorIndex],
        borderColor: config.colors[colorIndex],
        borderRadius: 4,
        borderSkipped: false,
        barPercentage: 0.8,
        categoryPercentage: 0.7,
      }
    })

    if (chartType === 'column' || chartType === 'combo') {
      configType = 'bar'
      indexAxis = 'x'
      if (chartType === 'combo') {
        const avgPerEmp = employeeShortNames.map((_, empIdx) => {
          const sum = datasets.reduce((acc, ds) => acc + (ds.data[empIdx] || 0), 0)
          return Math.round((sum / (datasets.length || 1)) * 10) / 10
        })
        datasets = [
          ...datasets.map(ds => ({ ...ds, type: 'bar', order: 2 })),
          {
            type: 'line',
            label: 'Average',
            data: avgPerEmp,
            borderColor: '#BA0404',
            backgroundColor: '#BA0404',
            borderWidth: 2,
            pointRadius: 4,
            tension: 0.3,
            fill: false,
            order: 1
          }
        ]
      }
    } else if (chartType === 'bar') {
      configType = 'bar'
      indexAxis = 'y'
    } else if (chartType === 'line') {
      configType = 'line'
      datasets = datasets.map(ds => ({
        ...ds,
        fill: false,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2.5
      }))
    } else if (chartType === 'area') {
      configType = 'line'
      datasets = datasets.map(ds => ({
        ...ds,
        fill: true,
        backgroundColor: ds.backgroundColor + '33',
        tension: 0.35,
        pointRadius: 3.5
      }))
    } else if (isCircular) {
      // Aggregate data per subcategory for circular charts
      const aggData = datasets.map(ds => ds.data.reduce((a, b) => a + b, 0))
      labels = datasets.map(ds => ds.label)
      const aggColors = datasets.map(ds => ds.backgroundColor)

      if (chartType === 'pie') {
        configType = 'pie'
        datasets = [{ data: aggData, backgroundColor: aggColors, borderWidth: 2, borderColor: '#ffffff' }]
      } else if (chartType === 'doughnut') {
        configType = 'doughnut'
        datasets = [{ data: aggData, backgroundColor: aggColors, borderWidth: 2, borderColor: '#ffffff', cutout: '65%' }]
      } else if (chartType === 'polarArea') {
        configType = 'polarArea'
        datasets = [{ data: aggData, backgroundColor: aggColors.map(c => c + 'CC'), borderWidth: 1.5, borderColor: '#ffffff' }]
      } else if (chartType === 'radar') {
        configType = 'radar'
        datasets = [{
          label: 'Total Distribution',
          data: aggData,
          borderColor: '#3A70C2',
          backgroundColor: 'rgba(58, 112, 194, 0.25)',
          pointBackgroundColor: '#ED7D31',
          pointBorderColor: '#ffffff',
          pointRadius: 4.5
        }]
      }
    }
  } else {
    // Mode Single Selected Employee
    const empStats = activeData.employeeStats[selectedEmployeeId.value] || activeData.employeeStats.ALL
    const dataKey = activeCategory.value === 'leave' ? 'leaves' : activeCategory.value === 'overtime' ? 'overtime' : 'reimbursement'
    const rawData = (empStats[dataKey] || []).map(v => Math.round(v * factor * 10) / 10)

    const filteredIndices = config.labels
      .map((lbl, idx) => activeSubcategories.value.includes(lbl) ? idx : -1)
      .filter(idx => idx !== -1)

    labels = filteredIndices.map(idx => config.labels[idx])
    const filteredData = filteredIndices.map(idx => rawData[idx] || 0)
    const filteredColors = filteredIndices.map(idx => config.colors[idx])

    if (chartType === 'column') {
      configType = 'bar'
      indexAxis = 'x'
      datasets = [{
        label: config.unit,
        data: filteredData,
        backgroundColor: filteredColors,
        borderRadius: 6,
        borderSkipped: false,
        maxBarThickness: 38,
        barPercentage: 0.5,
        categoryPercentage: 0.6
      }]
    } else if (chartType === 'bar') {
      configType = 'bar'
      indexAxis = 'y'
      datasets = [{
        label: config.unit,
        data: filteredData,
        backgroundColor: filteredColors,
        borderRadius: 6,
        borderSkipped: false,
        maxBarThickness: 24,
        barPercentage: 0.5,
        categoryPercentage: 0.6
      }]
    } else if (chartType === 'line') {
      configType = 'line'
      datasets = [{
        label: config.unit,
        data: filteredData,
        borderColor: '#3A70C2',
        backgroundColor: '#3A70C2',
        pointBackgroundColor: '#ED7D31',
        pointBorderColor: '#ffffff',
        pointRadius: 5,
        tension: 0.35,
        fill: false
      }]
    } else if (chartType === 'area') {
      configType = 'line'
      datasets = [{
        label: config.unit,
        data: filteredData,
        borderColor: '#3A70C2',
        backgroundColor: 'rgba(58, 112, 194, 0.2)',
        pointBackgroundColor: '#3A70C2',
        pointBorderColor: '#ffffff',
        pointRadius: 4.5,
        tension: 0.4,
        fill: true
      }]
    } else if (chartType === 'pie') {
      configType = 'pie'
      datasets = [{ data: filteredData, backgroundColor: filteredColors, borderWidth: 2, borderColor: '#ffffff' }]
    } else if (chartType === 'doughnut') {
      configType = 'doughnut'
      datasets = [{ data: filteredData, backgroundColor: filteredColors, borderWidth: 2, borderColor: '#ffffff', cutout: '65%' }]
    } else if (chartType === 'polarArea') {
      configType = 'polarArea'
      datasets = [{ data: filteredData, backgroundColor: filteredColors.map(c => c + 'CC'), borderWidth: 1.5, borderColor: '#ffffff' }]
    } else if (chartType === 'radar') {
      configType = 'radar'
      datasets = [{
        label: config.unit,
        data: filteredData,
        borderColor: '#3A70C2',
        backgroundColor: 'rgba(58, 112, 194, 0.25)',
        pointBackgroundColor: '#ED7D31',
        pointBorderColor: '#ffffff',
        pointRadius: 4.5
      }]
    } else if (chartType === 'combo') {
      configType = 'bar'
      const avg = filteredData.reduce((a, b) => a + b, 0) / (filteredData.length || 1)
      datasets = [
        {
          type: 'bar',
          label: config.unit,
          data: filteredData,
          backgroundColor: filteredColors,
          borderRadius: 6,
          maxBarThickness: 38,
          barPercentage: 0.5,
          categoryPercentage: 0.6,
          order: 2
        },
        { type: 'line', label: 'Average', data: filteredData.map(() => Math.round(avg * 10) / 10), borderColor: '#ED7D31', backgroundColor: '#ED7D31', borderWidth: 2, pointRadius: 4, fill: false, order: 1 }
      ]
    }
  }

  const showLegend = isAll || isCircular || chartType === 'combo'

  const scales = isCircular ? (chartType === 'radar' || chartType === 'polarArea' ? {
    r: {
      grid: { color: 'rgba(213, 233, 253, 0.5)' },
      ticks: { font: { family: 'Geist, sans-serif', size: 9 }, color: '#64748b' },
      pointLabels: { font: { family: 'Geist, sans-serif', size: 10, weight: 'bold' }, color: '#334155' }
    }
  } : {}) : {
    x: {
      grid: { display: false },
      ticks: { font: { family: 'Geist, sans-serif', size: 10 }, color: '#475569' }
    },
    y: {
      beginAtZero: true,
      grid: { color: '#e2e8f0' },
      ticks: { font: { family: 'Geist, sans-serif', size: 10 }, color: '#64748b' }
    }
  }

  chartInstance = new ChartJS(ctx, {
    type: configType,
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: indexAxis,
      animation: { duration: 400, easing: 'easeOutQuart' },
      plugins: {
        legend: {
          display: showLegend,
          position: 'bottom',
          labels: {
            font: { family: 'Geist, sans-serif', size: 10 },
            usePointStyle: true,
            pointStyle: 'rectRounded',
            padding: 12,
            boxWidth: 10,
            boxHeight: 10
          }
        },
        // tooltip: {
        //   backgroundColor: 'rgba(2, 73, 129, 0.95)',
        //   titleFont: { family: 'Geist, sans-serif', size: 11, weight: 'bold' },
        //   bodyFont: { family: 'Geist, sans-serif', size: 11 },
        //   padding: 10,
        //   cornerRadius: 8,
        //   boxPadding: 4
        // }
        tooltip: {
          backgroundColor: 'rgba(2, 73, 129, 0.95)',
          titleFont: {
            family: 'Geist, sans-serif',
            size: 11,
            weight: 'bold'
          },
          bodyFont: {
            family: 'Geist, sans-serif',
            size: 11
          },
          padding: 10,
          cornerRadius: 8,
          boxPadding: 4,
          callbacks: {
            label: (context) => {
              const value = context.parsed.y ?? context.parsed

              if (isAll) {
                return `${context.dataset.label}: ${value} ${config.unit}`
              }

              return `${value} ${config.unit}`
            }
          }
        }
      },
      scales: scales
    }
  })
}

// Reactively watch filters and dateRange
watch([activeCategory, selectedChartType, selectedEmployeeId, dateRange], () => {
  nextTick(() => renderChart())
}, { deep: true })

onMounted(() => {
  nextTick(() => renderChart())
})
</script>
