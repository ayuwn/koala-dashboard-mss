<template>
  <div class="glossy-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between h-full">
    <!-- Header: Title + Subtitle + Navigation Arrows -->
    <div class="flex items-center justify-between pb-2.5 border-b border-slate-100/80 mb-3">
      <div class="flex items-center gap-2">
        <div class="p-1 rounded-lg bg-[#D6EBFF] text-koala-blue-800 flex items-center justify-center shadow-2xs">
          <Megaphone class="w-3.5 h-3.5 text-koala-blue-800" />
        </div>
        <div>
          <h3 class="text-xs sm:text-sm font-bold text-slate-900 tracking-tight leading-tight">
            Organizational Updates
          </h3>
          <p class="text-[10px] text-slate-400 font-normal mt-0.2">
            Internal company news &amp; announcements
          </p>
        </div>
      </div>

      <!-- Navigation Arrow Buttons -->
      <div class="flex items-center gap-1">
        <button 
          @click="prevSlide"
          class="p-1 rounded-lg bg-white/90 hover:bg-white text-slate-600 hover:text-koala-blue-900 border border-slate-200/80 hover:border-koala-blue-200 shadow-2xs transition-all active:scale-95"
          aria-label="Previous Slide"
        >
          <ChevronLeft class="w-3.5 h-3.5" />
        </button>
        <button 
          @click="nextSlide"
          class="p-1 rounded-lg bg-white/90 hover:bg-white text-slate-600 hover:text-koala-blue-900 border border-slate-200/80 hover:border-koala-blue-200 shadow-2xs transition-all active:scale-95"
          aria-label="Next Slide"
        >
          <ChevronRight class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>

    <!-- Carousel Container (with Touch Swipe for Mobile) -->
    <div 
      class="relative w-full min-h-[160px] h-40 sm:h-44 rounded-xl overflow-hidden shadow-2xs group cursor-pointer bg-slate-900 select-none flex-1"
      @mouseenter="pauseAutoplay"
      @mouseleave="startAutoplay"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >
      <div 
        v-for="(item, index) in orgUpdatesData" 
        :key="item.id"
        v-show="currentIndex === index"
        class="absolute inset-0 w-full h-full transition-opacity duration-500 bg-[#07192C]"
      >
        <!-- Background Image with cross-origin & fallback handling -->
        <img 
          :src="item.image" 
          :alt="item.title"
          loading="eager"
          referrerpolicy="no-referrer"
          @error="onImageError($event, index)"
          class="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 block"
        />

        <!-- Subtle Top-to-Bottom Gradient (Preserves image clarity on mobile) -->
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 via-55% to-transparent pointer-events-none"></div>

        <!-- Content Overlay (Bottom) -->
        <div class="absolute bottom-0 left-0 right-0 p-3 sm:p-3.5 flex flex-col justify-end text-white z-10">
          <!-- Tag & Date -->
          <div class="flex items-center gap-1.5 mb-1.5">
            <span class="text-[8.5px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-md bg-koala-orange-600 text-white shadow-sm border border-white/20">
              {{ item.tag }}
            </span>
            <span class="text-[10px] text-slate-200 font-medium flex items-center gap-1 bg-white/20 backdrop-blur-xs px-1.5 py-0.2 rounded-md border border-white/20">
              <Calendar class="w-2.5 h-2.5 text-koala-blue-200" />
              {{ item.date }}
            </span>
          </div>

          <!-- Title -->
          <h4 class="text-xs sm:text-[13px] font-bold text-white leading-snug line-clamp-1 group-hover:text-koala-blue-200 transition-colors drop-shadow-sm">
            {{ item.title }}
          </h4>

          <!-- Summary -->
          <p class="text-[10px] text-slate-200/90 mt-0.5 line-clamp-1 hidden sm:block font-normal leading-relaxed">
            {{ item.summary }}
          </p>
        </div>
      </div>
    </div>

    <!-- Pagination Dots & Counter Bar -->
    <div class="flex items-center justify-between pt-2 mt-auto">
      <!-- Dots -->
      <div class="flex items-center gap-1">
        <button 
          v-for="(_, idx) in orgUpdatesData" 
          :key="idx"
          @click="goToSlide(idx)"
          :class="[
            'h-1 rounded-full transition-all duration-300',
            currentIndex === idx ? 'w-5 bg-koala-blue-800' : 'w-1.5 bg-slate-200 hover:bg-slate-300'
          ]"
          :aria-label="`Slide ${idx + 1}`"
        ></button>
      </div>

      <!-- Slide Index Indicator (e.g. 1 / 3) -->
      <span class="text-[9.5px] font-semibold text-slate-400">
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

// Fallback high quality images in case mobile network blocks specific URLs
const fallbackImages = [
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80'
]

const onImageError = (event, index) => {
  if (event?.target && fallbackImages[index]) {
    event.target.src = fallbackImages[index]
  }
}

// Touch swipe gesture handling for mobile
let touchStartX = 0
let touchEndX = 0

const handleTouchStart = (e) => {
  pauseAutoplay()
  if (e.changedTouches && e.changedTouches[0]) {
    touchStartX = e.changedTouches[0].screenX
  }
}

const handleTouchEnd = (e) => {
  startAutoplay()
  if (e.changedTouches && e.changedTouches[0]) {
    touchEndX = e.changedTouches[0].screenX
    handleSwipe()
  }
}

const handleSwipe = () => {
  const swipeThreshold = 40
  if (touchEndX < touchStartX - swipeThreshold) {
    nextSlide()
  } else if (touchEndX > touchStartX + swipeThreshold) {
    prevSlide()
  }
}

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
