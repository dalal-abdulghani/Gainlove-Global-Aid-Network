<template>
  <section class="py-16 text-center bg-gray-50" data-aos="fade-up" data-aos-duration="1000">
    <p class="text-sm font-semibold text-orange-500 uppercase" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1200">Who we are.</p>
    <h2 class="mt-2 mb-4 text-3xl font-bold md:text-4xl" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1200">Make a Difference</h2>
    <p class="max-w-2xl mx-auto mb-12 text-gray-600" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1200">
      Figure out what Gainlove are most deserving of your dollars, what proactive missions are.
    </p>

    <div class="grid max-w-6xl grid-cols-1 gap-6 px-4 mx-auto md:grid-cols-4">
      <div
        v-for="(item, index) in cards"
        :key="index"
        class="p-6 duration-700 bg-white shadow-sm rounded-bl-3xl rounded-tr-3xl hover:shadow-2xl"
        :data-aos="'zoom-in'"
        :data-aos-delay="index * 150 + 400"
        data-aos-duration="1000"
      >
        <img :src="item.icon" :alt="item.title" class="w-20 mx-auto mb-4" />
        <h3 class="mb-3 text-lg font-semibold hover:text-[#ff9f0d]">
          {{ item.title }}
        </h3>
        <p class="text-sm text-gray-500">
          {{ item.description }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import iconFreeAccess from '@/assets/images/free-access.svg'
import iconLocals from '@/assets/images/locals-for-locals.svg'
import iconImpact from '@/assets/images/real-impact.svg'
import iconSafety from '@/assets/images/safety-net.svg'

const cards = [
  {
    icon: iconFreeAccess,
    title: 'Free Access',
    description: 'It\'s free of charge to provide service and raise funds. Easily get access to campaigns or projects.',
  },
  {
    icon: iconLocals,
    title: 'Locals For Locals',
    description: 'A group of donors cover our operating costs so 100% of your money can fund water projects.',
  },
  {
    icon: iconImpact,
    title: 'Real Impact',
    description: 'Gainlove gives real impact that operating costs so 100% of your money can fund water projects.',
  },
  {
    icon: iconSafety,
    title: 'Safety Net',
    description: 'A safety network lets your donations and funds guarantee a safe way network and public.',
  },
]
</script>
