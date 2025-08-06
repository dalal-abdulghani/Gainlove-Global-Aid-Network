<template>
  <div
    class="overflow-hidden transition duration-1000 ease-in-out transform bg-white cursor-pointer shadow-no-bottom group rounded-tr-3xl hover:shadow-lg hover:scale-100 rounded-bl-3xl"
  >
    <div class="overflow-hidden rounded-tr-3xl rounded-bl-3xl">
      <img
        :src="program.image"
        :alt="`program-${index}`"
        class="object-cover w-full h-56 transition duration-700 ease-in-out group-hover:scale-105"
      />
    </div>

    <div class="px-6 py-6 text-center">
      <h2 class="mb-3 text-xl font-bold" v-html="program.title"></h2>
      <p class="pt-4 mb-6 text-sm text-gray-500 pr-7 pl-7" v-html="program.description"></p>
      <button
        class="px-5 py-2 mb-4 text-white transition duration-700 ease-in-out bg-black rounded-tl-none rounded-tr-full rounded-bl-full rounded-br-full hover:bg-orange-400"
      >
        LEARN MORE
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgramCard',
  props: {
    program: Object,
    index: Number,
  },
};
</script>
