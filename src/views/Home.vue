<template>
  <div class="overflow-x-hidden home">
    <HeroSection />
    
    <ProgramsSection />
    
    <AboutSection />
    
    <HowWeHelpSection />
    
    <FeaturedCampaignsSection />
    
    <TestimonialSection />
    
    <WhoWeAreSection />
    
    <ContactFormSection />
    
    <LatestNewsSection />
    
    <TransparencySection />
    
    <AppFooter />
  </div>
</template>

<script>
import HeroSection from '@/components/sections/HeroSection.vue'
import ProgramsSection from '@/components/sections/ProgramsSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import HowWeHelpSection from '@/components/sections/HowWeHelpSection.vue'
import FeaturedCampaignsSection from '@/components/sections/FeaturedCampaignsSection.vue'
import TestimonialSection from '@/components/sections/TestimonialSection.vue'
import WhoWeAreSection from '@/components/sections/WhoWeAreSection.vue'
import ContactFormSection from '@/components/sections/ContactFormSection.vue'
import LatestNewsSection from '@/components/sections/LatestNewsSection.vue'
import TransparencySection from '@/components/sections/TransparencySection.vue'
import AppFooter from '@/components/AppFooter.vue'

export default {
  name: 'Home',
  components: {
    HeroSection,
    ProgramsSection,
    AboutSection,
    HowWeHelpSection,
    FeaturedCampaignsSection,
    TestimonialSection,
    WhoWeAreSection,
    ContactFormSection,
    LatestNewsSection,
    TransparencySection,
    AppFooter
  }
}
</script> 