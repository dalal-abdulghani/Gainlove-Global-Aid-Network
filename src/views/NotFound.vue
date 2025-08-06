<template>
  <div class="font-sans">
    <Navigation whiteText :logo="logo" />
    
    <HeroBanner :backgroundImage="heroBg" height="600px">
      <div class="px-4">
        <h1 class="mb-4 text-5xl font-bold text-white drop-shadow-lg">404</h1>
        <h2 class="mb-4 text-5xl text-white drop-shadow-lg">Oops! Page not found.</h2>
        
        <p class="max-w-xl mx-auto mb-8 text-white text-md drop-shadow-lg">
          It looks like nothing was found at this location.
        </p>
        
        <div class="flex flex-wrap justify-center gap-4 mt-8">
    <a href="#"
      class="inline-flex items-center gap-2 px-8 py-4 text-sm text-white transition duration-700 ease-in-out transform rounded-tl-none rounded-tr-full rounded-bl-full rounded-br-full bg-[#5cb85c] font-semibold hover:bg-green-800">
      <i class="fa-solid fa-circle-arrow-right pr-[10px] hover:translate-x-[-5px] transition-all duration-300 ease-in-out"></i>
      GET Back
    </a>

    <a href="#"
      class="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white transition duration-700 ease-in-out transform bg-[#ff9f0d] rounded-tl-none rounded-tr-full rounded-bl-full rounded-br-full hover:bg-orange-400">
      <i class="fa-solid fa-circle-arrow-right pr-[10px] hover:translate-x-[-5px] transition-all duration-300 ease-in-out"></i>
      HOMEPAGE 
    </a>
  </div>
      </div>
    </HeroBanner>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import HeroBanner from '@/components/sections/HeroBanner.vue'
import heroBg from '@/assets/images/bg-404.jpg'
import logo from '@/assets/images/logo_2.svg'

export default {
  name: 'NotFound',
  components: {
    Navigation,
    HeroBanner
  },
  data() {
    return {
      heroBg,
      logo
    }
  }
}
</script>