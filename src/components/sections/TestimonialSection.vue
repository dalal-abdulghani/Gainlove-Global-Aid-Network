<template>
  <section
    class="px-6 py-20 m-8 bg-center bg-no-repeat bg-cover lg:px-24 lg:py-32 rounded-tr-3xl rounded-bl-3xl"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <div class="flex justify-end">
      <div 
        class="max-w-xl p-10 text-right text-white rounded-xl"
        data-aos="fade-left"
        data-aos-duration="1000"
      >
        <blockquote class="w-full mb-6 text-xl font-semibold leading-snug lg:text-4xl">
          "I realize that school can<br>
          help me achieve my<br>
          goals and improve<br>
          my life."
        </blockquote>
        <p class="w-full mb-8 text-sm text-white">
          Samuel Phelp, Program Alumna, Tanzania
        </p>

        <a
          href="#"
          class="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#ff9f0d] rounded-tr-xl rounded-bl-xl hover:bg-orange-400 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16l4-4-4-4M8 12h8" />
          </svg>
          Read More Stories
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import bgImage from '@/assets/images/h1-banner07.jpg'
</script>
