<template>
  <section class="-mt-[90px] md:mt-[150px]">
    <div 
      class="container px-4 mx-auto text-center"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <h1 class="text-3xl font-bold">Our Programs</h1>
      <p class="max-w-xl mx-auto mt-5 text-gray-500 text-[18px]">
        It's our mission to help people reduce their poverty by a huge number of
        helpful campaigns to make it essential.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-6 px-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
      <ProgramCard
        v-for="(program, index) in programs"
        :key="index"
        :program="program"
        :index="index"
        :data-aos="'zoom-in'"
        :data-aos-delay="index * 100"
        data-aos-duration="1000"
      />
    </div>
  </section>
</template>

<script>
import ProgramCard from "@/components/cards/ProgramCard.vue";
import img1 from "@/assets/images/Download African American mom hugging biracial baby in natural light for free.jpeg";
import img2 from "@/assets/images/Free Joyful Children Playing Image _ Download at StockCake.jpeg";
import img3 from "@/assets/images/Dizisnta Author Portfolio _ Freepik.jpeg";
import { programAPI } from "@/services/api";
export default {
  name: "ProgramsSection",
  components: {
    ProgramCard,
  },
  data() {
    return {
      programs: [],
      defaultPrograms: [
        {
          image: img1,
          title: "Fight Poverty<br />Programs & Services",
          description:
            "Provides nutritious food, wholesome food, funds, and vocational training to people suffering from lack of it.",
        },
        {
          image: img2,
          title: "Fight Poverty<br />Programs & Services",
          description:
            "Provides nutritious food, wholesome food, funds, and vocational training to people suffering from lack of it.",
        },
        {
          image: img3,
          title: "Fight Poverty<br />Programs & Services",
          description:
            "Provides nutritious food, wholesome food, funds, and vocational training to people suffering from lack of it.",
        },
      ],
    };
  },
  mounted() {
    this.loadPrograms();
    if (window.AOS) {
      window.AOS.refresh();
    }
  },
  methods: {
    async loadPrograms() {
      try {
        const response = await programAPI.getPrograms(); 
        

        if (response.data && response.data.length > 0) {
          this.programs = response.data.slice(0, 3); 
        } else {
          this.programs = this.defaultPrograms.slice(0, 3);
        }
      } catch (error) {
        console.error("Error fetching programs:", error);
        this.programs = this.defaultPrograms.slice(0, 3);
      }
    },
  },
};
</script>
