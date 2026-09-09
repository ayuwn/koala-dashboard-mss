<template>
  <div class="glossy-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full">
    <!-- Header: Title + Subtitle + Navigation Arrows -->
    <div class="flex items-center justify-between pb-3 border-b border-slate-100/80 mb-4">
      <div class="flex items-center gap-2.5">
        <div class="p-1.5 rounded-xl bg-[#D6EBFF] text-koala-blue-800 flex items-center justify-center shadow-2xs">
          <Megaphone class="w-4 h-4 text-koala-blue-800" />
        </div>
        <div>
          <h3 class="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-tight">
            Organizational Updates
          </h3>
          <p class="text-[11px] text-slate-400 font-normal mt-0.5">
            Internal company news & announcements
          </p>
        </div>
      </div>

      <!-- Navigation Arrow Buttons -->
      <div class="flex items-center gap-1.5">
        <button 
          @click="prevSlide"
          class="p-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-600 hover:text-koala-blue-900 border border-slate-200/80 hover:border-koala-blue-200 shadow-2xs transition-all active:scale-95"
          aria-label="Previous Slide"
        >
          <ChevronLeft class="w-4 h-4" />
        </button>
        <button 
          @click="nextSlide"
          class="p-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-600 hover:text-koala-blue-900 border border-slate-200/80 hover:border-koala-blue-200 shadow-2xs transition-all active:scale-95"
          aria-label="Next Slide"
        >
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Carousel Container -->
    <div 
      class="relative w-full h-52 sm:h-56 rounded-xl overflow-hidden shadow-2xs group cursor-pointer bg-slate-900 select-none flex-1"
      @mouseenter="pauseAutoplay"
      @mouseleave="startAutoplay"
    >
      <TransitionGroup name="carousel-slide">
        <div 
          v-for="(item, index) in orgUpdatesData" 
          :key="item.id"
          v-show="currentIndex === index"
          class="absolute inset-0 w-full h-full"
        >
          <!-- Background Image with Dark Gradient Filter -->
          <img 
            :src="item.image" 
            :alt="item.title" 
            class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent"></div>

          <!-- Content Overlay (Bottom) -->
          <div class="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex flex-col justify-end text-white">
            <!-- Tag & Date -->
            <div class="flex items-center gap-2 mb-2">
              <span class="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-koala-orange-600 text-white shadow-sm border border-white/20">
                {{ item.tag }}
              </span>
              <span class="text-[11px] text-slate-200 font-medium flex items-center gap-1 bg-white/15 backdrop-blur-xs px-2 py-0.5 rounded-md border border-white/20">
                <Calendar class="w-3 h-3 text-koala-blue-200" />
                {{ item.date }}
              </span>
            </div>

            <!-- Title -->
            <h4 class="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2 group-hover:text-koala-blue-200 transition-colors">
              {{ item.title }}
            </h4>

            <!-- Summary -->
            <p class="text-[11px] text-slate-200/90 mt-1 line-clamp-2 hidden sm:block font-normal leading-relaxed">
              {{ item.summary }}
            </p>
          </div>
        </div>
      </TransitionGroup>
    </div>

    <!-- Pagination Dots & Counter Bar -->
    <div class="flex items-center justify-between pt-3 mt-auto">
      <!-- Dots -->
      <div class="flex items-center gap-1.5">
        <button 
          v-for="(_, idx) in orgUpdatesData" 
          :key="idx"
          @click="goToSlide(idx)"
          :class="[
            'h-1.5 rounded-full transition-all duration-300',
            currentIndex === idx ? 'w-6 bg-koala-blue-800' : 'w-2 bg-slate-200 hover:bg-slate-300'
          ]"
          :aria-label="`Slide ${idx + 1}`"
        ></button>
      </div>

      <!-- Slide Index Indicator (e.g. 1 / 3) -->
      <span class="text-[10px] font-semibold text-slate-400">
        {{ currentIndex + 1 }} / {{ orgUpdatesData.length }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Megaphone, ChevronLeft, ChevronRight, Calendar } from 'lucide-vue-next'
import { orgUpdatesData } from '@/data/mssData'

const currentIndex = ref(0)
let timer = null

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % orgUpdatesData.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + orgUpdatesData.length) % orgUpdatesData.length
}

const goToSlide = (idx) => {
  currentIndex.value = idx
}

const startAutoplay = () => {
  clearInterval(timer)
  timer = setInterval(() => {
    nextSlide()
  }, 5000)
}

const pauseAutoplay = () => {
  clearInterval(timer)
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.carousel-slide-enter-active,
.carousel-slide-leave-active {
  transition: all 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-slide-enter-from {
  opacity: 0;
  transform: scale(0.98);
}

.carousel-slide-leave-to {
  opacity: 0;
  transform: scale(1.02);
}
</style>
