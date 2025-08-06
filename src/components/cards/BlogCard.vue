<template>
  <div class="overflow-hidden duration-700 shadow rounded-bl-3xl rounded-tr-3xl hover:shadow-2xl">
    <div class="relative overflow-hidden rounded-bl-3xl rounded-tr-3xl">
      <img
        :src="img"
        alt="News image"
        class="object-cover w-full h-48 transition-transform duration-700 hover:scale-105 rounded-bl-3xl rounded-tr-3xl"
      />
    </div>
    <div class="p-4 max-w-[90%] mx-auto text-left">
      <p class="mb-1 text-sm text-gray-500">{{ date }}</p>
      <h3 class="mb-2 hover:text-[#ff9f0d] cursor-pointer">{{ title }}</h3>
      <hr class="my-4 border-gray-300" />
      <div class="flex justify-between text-xs text-gray-500">
        <div class="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none"
               viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <span>{{ author }}</span>
        </div>
        <div class="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none"
               viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-1.9 5.4 8.5 8.5 0 0 1-6.6 3.1 8.38 8.38 0 0 1-5.4-1.9L3 21l1.9-4.1A8.38 8.38 0 0 1 3.5 11.5a8.5 8.5 0 0 1 3.1-6.6A8.38 8.38 0 0 1 12 3.5a8.5 8.5 0 0 1 6.6 3.1 8.38 8.38 0 0 1 1.9 5.4Z"/>
          </svg>
          <span>{{ comments }} Comments</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  img: String,
  date: String,
  title: String,
  author: String,
  comments: Number,
})
</script>
