<template>
  <div class="font-sans">
    <Navigation whiteText :logo="logo" />

    <HeroBanner
      title="Gallery"
      :backgroundImage="heroBg"
    />

    <section class="px-4 py-10 sm:px-8 mt-[20px]">
      <div class="relative flex flex-wrap justify-center gap-10 mb-10">
        <GalleryFilterTab
          label="ALL"
          category="all"
          :count="imageData.all.length"
          :active="selected === 'all'"
          @select="selectCategory"
        />
        <GalleryFilterTab
          label="ACTIVITIES"
          category="activities"
          :count="imageData.activities.length"
          :active="selected === 'activities'"
          @select="selectCategory"
        />
        <GalleryFilterTab
          label="RESEARCH"
          category="research"
          :count="imageData.research.length"
          :active="selected === 'research'"
          @select="selectCategory"
        />
        <GalleryFilterTab
          label="SOCIALS"
          category="socials"
          :count="imageData.socials.length"
          :active="selected === 'socials'"
          @select="selectCategory"
        />
      </div>

      <GalleryGrid :images="currentImages" />
    </section>

    <AppFooter />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import HeroBanner from '@/components/sections/HeroBanner.vue'
import GalleryFilterTab from '@/components/sections/GalleryFilterTab.vue'
import GalleryGrid from '@/components/sections/GalleryGrid.vue'
import TransparencySection from '@/components/sections/TransparencySection.vue'
import AppFooter from '@/components/AppFooter.vue'

import heroBg from '@/assets/images/bg-breadcrumb2.jpg'
import logo from '@/assets/images/logo_2.svg'

export default {
  name: 'GalleryView',
  components: {
    Navigation,
    HeroBanner,
    GalleryFilterTab,
    GalleryGrid,
    TransparencySection,
    AppFooter
  },
  data() {
    return {
      selected: 'all',
      imageData: {
        all: [
          '@/assets/images/campaing-1.jpg',
          '@/assets/images/campaing-2.jpg',
          '@/assets/images/campaing-3.jpg',
          '@/assets/images/campaing-1.jpg',
          '@/assets/images/campaing-2.jpg',
          '@/assets/images/campaing-3.jpg',
          '@/assets/images/campaing-3.jpg',
          '@/assets/images/campaing-3.jpg',
          '@/assets/images/campaing-3.jpg',
          '@/assets/images/campaing-3.jpg',
          '@/assets/images/campaing-3.jpg',
          '@/assets/images/campaing-3.jpg',
          '@/assets/images/campaing-3.jpg',
          '@/assets/images/campaing-3.jpg',
          '@/assets/images/campaing-3.jpg'
        ],
        activities: [
          '@/assets/images/campaing-1.jpg',
          '@/assets/images/campaing-2.jpg',
          '@/assets/images/campaing-2.jpg',
          '@/assets/images/campaing-2.jpg',
          '@/assets/images/campaing-2.jpg',
          '@/assets/images/campaing-2.jpg'
        ],
        research: [
          '@/assets/images/campaing-2.jpg',
          '@/assets/images/campaing-3.jpg',
          '@/assets/images/campaing-3.jpg',
          '@/assets/images/campaing-3.jpg',
          '@/assets/images/campaing-3.jpg',
          '@/assets/images/campaing-3.jpg'
        ],
        socials: [
          '@/assets/images/campaing-3.jpg',
          '@/assets/images/campaing-1.jpg',
          '@/assets/images/campaing-1.jpg',
          '@/assets/images/campaing-1.jpg',
          '@/assets/images/campaing-1.jpg',
          '@/assets/images/campaing-1.jpg'
        ]
      },
      heroBg,
      logo
    }
  },
  computed: {
    currentImages() {
      return this.imageData[this.selected] || []
    }
  },
  methods: {
    selectCategory(cat) {
      this.selected = cat
    }
  },
  mounted() {
    if (window.AOS) {
      window.AOS.init({ duration: 800, once: true })
    }
    
    
  },
  mounted() {
  console.log('HeroBg path:', this.heroBg);
}
}
</script>
