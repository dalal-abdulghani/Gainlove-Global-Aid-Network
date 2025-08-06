<template>
  <section class="px-6 py-8 bg-[#f7f8f9] lg:px-24" data-aos="fade-up" data-aos-duration="1000">
    <div class="mb-6 text-center" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1200">
      <p class="text-sm font-semibold uppercase text-[#ff9f0d] mb-7">
        We need your help
      </p>
      <h2 class="mb-4 text-4xl font-bold text-gray-900">Featured Campaigns</h2>
      <p class="max-w-xl mx-auto text-gray-500">
        It's through mistakes that you actually can grow you get rid of everything
        that is not essential to makihave to get bad.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-8 mb-20 md:grid-cols-3">
      <CampaignCard
        v-for="(campaign, index) in campaigns"
        :key="index"
        :campaign="campaign"
        :data-aos="'zoom-in'"
        :data-aos-delay="index * 150 + 200"
        data-aos-duration="1000"
      />
    </div>
  </section>
</template>

<script setup>
import CampaignCard from '@/components/cards/CampaignCard.vue';

import img1 from '@/assets/images/campaing-5.jpg';
import img2 from '@/assets/images/campaing-1.jpg';
import img3 from '@/assets/images/campaing-3.jpg';

const campaigns = [
  {
    image: img1,
    status: 'UNSUCCESSFUL',
    current: '$675',
    target: '$6,800',
    percentage: '10%',
    title: "Krista's Moutain Climb Funding For A Learning Cause",
    description: 'Help me raise money for the underprivileged children of Nepal...',
  },
  {
    image: img2,
    status: 'UNSUCCESSFUL',
    current: '$675',
    target: '$4,500',
    percentage: '15%',
    title: 'New American Riders: Bicycles for refugees in Western Mass',
    description: 'With our partners at the Jewish Family Service...',
  },
  {
    image: img3,
    status: 'UNSUCCESSFUL',
    current: '$725',
    target: '$4,000',
    percentage: '18%',
    title: 'Youth In Action Against Poverty',
    description: 'We the People nurtures the leaders of tomorrow...',
  },
];
</script>
