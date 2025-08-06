<template>
  <div
    class="relative flex items-center justify-center bg-no-repeat h-screen px-[25px]"
    :style="{
      backgroundImage: `url(${bgImage})`,
      backgroundPosition: '-200px'
    }"
  >
  
    <div
      class="absolute z-50 w-4 h-4 bg-red-500 rounded-full top-[100px] left-[11%] animate-slow-float"
    ></div>
    <div
      class="absolute z-50 w-4 h-4 bg-green-500 rounded-full top-[80px] left-[66%] animate-slow-float"
    ></div>
    <div
      class="absolute z-50 w-4 h-4 bg-blue-500 rounded-full bottom-[40px] right-[40px] animate-slow-float"
    ></div>

  <div
  v-for="(slide, index) in slides"
  :key="index"
  class="slide absolute w-full h-full opacity-0 transition-opacity duration-1000 flex justify-between items-center box-border px-[50px]
         top-[15px] md:top-[40px]"
  :class="{ active: currentSlide === index }"
>
      <div class="slide-content w-full md:max-w-[700px] text-center md:text-left mt-[30px] md:mt-[50px]">
        <h1
          class="text-[40px] md:text-[80px] leading-[50px] md:leading-[80px] mb-[30px] font-bold mt-[50px] md:mt-0"
          v-html="slide.title"
        ></h1>
        <p class="text-[#727272] mb-[40px] text-[16px] md:text-[18px]" v-html="slide.description">
        
        </p>
        <a
          href="#"
          class="bg-black text-white no-underline py-[10px] px-[30px] rounded-[20px] rounded-tl-[1px] font-normal text-[15px] hover:bg-[#ea9b08] transition-all duration-300 inline-flex items-center"
        >
          <i
            class="fa-solid fa-circle-arrow-right p-[10px] hover:translate-x-[-5px] transition-all duration-300"
          ></i>
          Donate Now
        </a>
      </div>
      <img
        v-if="slide.image"
        :src="slide.image"
        alt=""
        class="hidden md:block w-[600px] h-auto max-h-[80vh] object-contain mt-10 md:mt-20 slide-image"
      />
    </div>
  </div>
</template>

<script>
import h1Slider02 from '@/assets/images/h1-slider02.png';
import h2Slider02 from '@/assets/images/h2-slider02.png';
import bgImagePath from '@/assets/images/h1-bg01.png';

export default {
  name: 'HeroSection',
  data() {
    return {
      currentSlide: 0,
      slides: [
        {
          title: `Justice<br>begins<br>where<br>inequality<br>ends`,
          description:
            "We're building a world where everyone has the <br> power to shape their lives.",
          image: h1Slider02,
        },
        {
          title: `Justice<br>begins<br>where<br>inequality<br>ends`,
          description:
            "We're building a world where everyone has the <br> power to shape their lives.",
          image: h2Slider02,
        },
      ],
      bgImage: bgImagePath,
      slideInterval: null,
    };
  },
  mounted() {
    this.startSlideShow();
  },
  beforeUnmount() {
    clearInterval(this.slideInterval);
  },
  methods: {
    startSlideShow() {
      this.slideInterval = setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      }, 10000);
    },
  },
};
</script>

<style scoped>
.slide {
  top: -70px;
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  box-sizing: border-box;
}

@media (min-width: 768px) {
  .slide {
    top: 40px;
    padding: 50px;
  }
}

.slide.active {
  opacity: 1;
  z-index: 1;
}
.slide-content {
  transform: translateY(100px);
  opacity: 0;
  transition: all 1s ease-in-out;
}
.slide.active .slide-content {
  transform: translateY(0);
  opacity: 1;
}
.slide-image {
  transform: translateY(100px);
  opacity: 0;
  transition: all 1s ease-in-out 0.7s;
}
.slide.active .slide-image {
  transform: translateY(0);
  opacity: 1;
}
@keyframes slowFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-slow-float {
  animation: slowFloat 6s ease-in-out infinite;
}
</style>