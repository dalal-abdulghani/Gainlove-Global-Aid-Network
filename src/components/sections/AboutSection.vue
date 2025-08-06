<template>
  <section 
    class="px-6 py-20 mt-6 overflow-x-hidden bg-right bg-no-repeat bg-contain bg-gray-custom"
    :style="{ backgroundImage: `url(${bgImage})` }"
    data-aos="fade-down"
    data-aos-duration="1000"
  >
    <div class="max-w-4xl mx-auto mb-20 text-center" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1200">
      <h3 class="mb-4 text-sm font-semibold tracking-widest text-orange-500 uppercase">
        About Us
      </h3>

      <h1 class="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
        Welcome to the Gainlove<br class="hidden md:block" />
        Global aid network
      </h1>

      <p class="mx-auto mb-10 text-base leading-relaxed text-gray-500 md:text-lg">
        The Gainlove Global aid network envisions a thriving and connected community, one in which all of its
        members have dependable access to resources that enrich and empower lives. A community where all of its
        members feel they can belong, one in which everyone has a chance to both contribute and receive. A
        community where everyone can feel fulfilled by their involvement.
      </p>

      <div class="flex flex-wrap justify-center gap-4" data-aos="zoom-in-up" data-aos-delay="300" data-aos-duration="1200">
        <router-link 
          to="/volunteer"
          class="inline-flex items-center gap-2 px-8 py-4 text-sm text-white transition duration-700 ease-in-out transform rounded-tl-none rounded-tr-full rounded-bl-full rounded-br-full bg-[#0e926b] font-semibold hover:bg-green-800"
        >
          <i class="fa-solid fa-circle-arrow-right pr-[10px] hover:translate-x-[-5px] transition-all duration-300 ease-in-out"></i>
          GET INVOLVED
        </router-link>

        <router-link 
          to="/donate"
          class="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white transition duration-700 ease-in-out transform bg-black rounded-tl-none rounded-tr-full rounded-bl-full rounded-br-full hover:bg-primary"
        >
          <i class="fa-solid fa-circle-arrow-right pr-[10px] hover:translate-x-[-5px] transition-all duration-300 ease-in-out"></i>
          DONATE NOW
        </router-link>
      </div>
    </div>

    <div class="flex flex-col items-center gap-10 mx-auto max-w-7xl md:flex-row">
      <div class="flex justify-center w-full h-full md:w-1/2" data-aos="fade-right" data-aos-delay="400" data-aos-duration="1200">
        <img src="@/assets/images/h1-banner05.png" alt="fundraiser visuals" class="h-auto max-w-full ml-20">
      </div>

      <div class="w-full md:w-1/2" data-aos="fade-left" data-aos-delay="500" data-aos-duration="1200">
        <h2 class="mb-4 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
          2021 fundraiser<br>
          champions for social justice
        </h2>

        <p class="mb-3 font-semibold text-gray-600">
          Help raise $30,000 for the community of Stanwood Camano.
        </p>

        <p class="mb-6 mr-20 text-lg leading-relaxed text-justify text-gray-600">
          The Gainlove Global aid network is hosting an event to educate our community about the services we
          provide and our foundational Family Support Principles. We will highlight voices and stories from
          community members impacted by The Gainlove Global aid network. We will also have a keynote speaker
          discussing social and racial equity and its impact on individuals and community outcomes. Our
          keynote speaker will be providing a deeper dive on the discussion of racial equity with a series
          that will follow our event in the winter of 2020.
        </p>

        <router-link 
          to="/fundraiser-2021"
          class="font-semibold text-orange-500 underline transition hover:text-orange-700"
>
          Learn More And To The Fundraiser 2021
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import myImage from '@/assets/images/photo_2025-07-27_07-34-15-removebg-preview.png'

export default {
  name: 'AboutSection',
  data() {
    return {
      bgImage: myImage
    }
  },
  mounted() {
    if (window.AOS) {
      window.AOS.refresh()
    }
  }
}
</script>
