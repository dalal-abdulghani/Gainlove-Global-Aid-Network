<template>
  <div class="font-sans">
    <Navigation whiteText />

    <HeroBanner
      title="Who We Are"
      :backgroundImage="bgDonation"
    />

    <AboutSection />

    <section class="bg-[#f3f4f6] text-center py-20 px-6">
      <h2 class="mb-6 text-4xl font-bold">What makes gainlove different?</h2>
      <p class="max-w-3xl mx-auto mb-16 text-gray-600">
        We’re a top-rated humanitarian organization focused on ending generational poverty through a proven approach...
      </p>

      <div class="grid gap-8 md:grid-cols-3">
        <FeatureCard
          v-for="feature in features"
          :key="feature.title"
          :title="feature.title"
          :description="feature.description"
          :image="feature.image"
        />
      </div>
    </section>

    <section
      class="bg-[#f3f4f6] py-20 px-6 bg-no-repeat bg-right-top min-h-[400px] overflow-x-hidden"
      :style="{ backgroundImage: `url(${bgH3})` }"
    >
      <div class="relative flex flex-col items-center max-w-6xl gap-8 mx-auto lg:flex-row">
        <div
          class="relative w-full lg:w-3/5"
          data-aos="fade-right"
          data-aos-duration="1200"
          data-aos-easing="ease-in-out"
        >
          <img
            :src="testimonialImage"
            alt="Testimonial"
            class="w-full h-[500px] object-cover rounded-tr-[40px] rounded-bl-[40px]"
          />
        </div>

        <div
          class="-mt-30 lg:-ml-16 z-10 bg-white p-10 rounded-tl-[30px] rounded-br-[30px] shadow-xl lg:w-[50%] w-full max-w-[650px] min-h-[450px] hover:shadow-2xl transition-all duration-300 flex flex-col justify-center"
          data-aos="fade-left"
          data-aos-duration="1400"
          data-aos-delay="200"
          data-aos-easing="ease-in-out"
        >
          <p class="mt-4 mb-6 text-3xl leading-relaxed">
            “I realize that school can <br />
            help me achieve my goals and improve my life.”
          </p>
          <p class="mt-4 text-lg text-gray-500">
            Samuel Phelp, Program Alumna, Tanzania
          </p>
          <div class="mt-auto">
            <a
              href="#"
              class="bg-[#ea9b08] text-white no-underline py-[15px] px-[30px] rounded-[20px] tracking-[-0.1px] rounded-tl-[1px] font-normal text-[15px] hover:bg-[#de9409] transition-all duration-300 inline-block"
            >
              <i class="fa-solid fa-circle-arrow-right pr-[10px] hover:translate-x-[-5px] transition-all duration-300 ease-in-out"></i>
              READ MORE STORIES
            </a>
          </div>
        </div>
      </div>
    </section>

    <section
      class="bg-[#f3f4f6] py-20 px-6 bg-no-repeat bg-right-top min-h-[400px] text-center"
      :style="{ backgroundImage: `url(${bgMap1})` }"
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
    >
      <h2
        class="mb-10 text-3xl font-bold"
        data-aos="fade-down"
        data-aos-duration="1200"
        data-aos-delay="200"
      >
        Volunteer Positions Available
      </h2>

      <div
        class="grid max-w-6xl grid-cols-1 gap-6 mx-auto text-left md:grid-cols-4"
      >
        <StatCard
          v-for="(stat, index) in stats"
          :key="stat.value + stat.description"
          :icon="stat.icon"
          :value="stat.value"
          :description="stat.description"
          :data-aos="'zoom-in'"
          :data-aos-delay="index * 150"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
        />
      </div>
    </section>

    <TransparencySection />

    <AppFooter />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import TransparencySection from '@/components/sections/TransparencySection.vue'
import AppFooter from '@/components/AppFooter.vue'
import HeroBanner from '@/components/sections/HeroBanner.vue'
import FeatureCard from '@/components/sections/FeatureCard.vue'
import StatCard from '@/components/sections/StatCard.vue'

import bgDonation from '@/assets/images/bg-donation.jpg'
import bgH3 from '@/assets/images/h3-bg04.png'
import bgMap from '@/assets/images/h1-map1.png'
import testimonialImage from '@/assets/images/h4-banner05.jpg'
import featureImage from '@/assets/images/blog06.jpg'

export default {
  name: 'About',
  components: {
    Navigation,
    AboutSection,
    TransparencySection,
    AppFooter,
    HeroBanner,
    FeatureCard,
    StatCard
  },
  data() {
    return {
      bgDonation,
      bgH3,
      bgMap,
      testimonialImage,
      features: [
        {
          title: 'Safe havens for support',
          description:
            'Children in poverty are more likely to be exposed to the stress of violence, gangs and drugs Children in poverty are more likely to be exposed to the stress of violence',
          image: featureImage
        },
        {
          title: 'Good that grows',
          description:
            'When you sponsor a child, you create a powerful multiplier effect that helps them break the cycle Children in poverty are more likely to be exposed to the stress of violence',
          image: featureImage
        },
        {
          title: 'Customized programs',
          description:
            'Sponsorship programs are designed to address the toughest challenges facing children in poverty Children in poverty are more likely to be exposed to the stress of violence',
          image: featureImage
        }
      ],
      stats: [
        {
          icon: 'users',
          value: '4.89M',
          description: 'Staff and volunteers across 16 countries'
        },
        {
          icon: 'globe',
          value: '68K',
          description: 'Our staff in these countries are local'
        },
        {
          icon: 'activity',
          value: '82%',
          description: 'Invested in all our programs last year 2019'
        },
        {
          icon: 'bar-chart',
          value: '136M',
          description: 'Invested in all our programs last year 2019'
        }
      ]
    }
  }
}
</script>
