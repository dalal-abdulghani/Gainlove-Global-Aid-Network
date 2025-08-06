<template>
  <footer class="flex flex-col justify-between px-8 py-12 text-white bg-dark">
    <div class="grid grid-cols-1 mx-auto gap-y-8 gap-x-10 max-w-7xl md:grid-cols-6">
      
      <div class="flex items-start pl-5 pr-5">
        <img src="@/assets/images/logo_2.svg" alt="Logo" class="w-40 h-10" />
      </div>

      <div class="space-y-4 md:col-span-2">
        <div class="text-2xl">
          Do you have questions? <br />Call or visit us.
        </div>
        <div class="flex items-center space-x-2 text-secondary">
          <span class="text-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>
            </svg>
          </span>
          <span class="text-xl font-semibold">+[84] 1800 333 555</span>
        </div>
        <div class="text-sm leading-6 text-gray-400">
          5617 Glassford Street<br />
          New York, NY 10000, USA
        </div>
        <div class="text-sm text-gray-400 underline">contact@example.com</div>
      </div>

      <div class="md:col-span-2">
        <h2 class="mb-4 text-2xl">Newsletter</h2>
        <p class="mb-4 text-sm text-gray-400">Get latest news & update</p>
        <div class="mb-4 relative max-w-[300px] w-[120%]">
          <input 
            v-model="email"
            type="email" 
            placeholder="Your Email" 
            class="w-full p-4 pr-10 text-base text-black border-none outline-none h-14 rounded-tr-xl rounded-bl-xl"
            @keyup.enter="subscribeNewsletter"
          />
          <span class="absolute text-gray-500 transform -translate-y-1/2 right-4 top-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/>
              <rect x="2" y="4" width="20" height="16" rx="2"/>
            </svg>
          </span>
        </div>

        <button 
          @click="subscribeNewsletter"
          :disabled="isSubscribing"
          class="w-[120%] max-w-[300px] h-14 py-3 font-bold text-white bg-secondary rounded-tr-xl rounded-bl-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {{ isSubscribing ? 'SUBSCRIBING...' : 'SUBSCRIBE' }}
        </button>
      </div>

      <div class="md:col-span-1">
        <h2 class="mb-4 text-xl">Connect With Us</h2>
        <div class="flex space-x-3 text-xl text-white">
          <router-link to="#" class="transition-colors hover:text-secondary"></router-link>
          <router-link to="#" class="transition-colors hover:text-secondary"></router-link>
          <router-link to="#" class="transition-colors hover:text-secondary"></router-link>
          <router-link to="#" class="transition-colors hover:text-secondary"></router-link>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center justify-between pt-6 mt-10 text-sm text-gray-400 border-t border-gray-700 md:flex-row">
      <p>© 2025 - <span class="font-bold text-secondary">Gainlove</span>. All rights reserved.</p>
      <p>Carefully crafted by <span class="font-bold text-secondary">Dalal</span></p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  data() {
    return {
      email: '',
      isSubscribing: false
    }
  },
  methods: {
    async subscribeNewsletter() {
      if (!this.email) {
        alert('Please enter your email address')
        return
      }
      
      this.isSubscribing = true
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        alert('Thank you for subscribing to our newsletter!')
        
        this.email = ''
      } catch (error) {
        alert('Sorry, there was an error subscribing. Please try again.')
      } finally {
        this.isSubscribing = false
      }
    }
  }
}
</script> 