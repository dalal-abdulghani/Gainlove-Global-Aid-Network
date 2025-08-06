<template>
  <div id="app" class="bg-gray-custom">
    <Navigation v-if="$route.meta.showNavigation !== false" />
    
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'App',
  components: {
    Navigation
  }
}
</script>

<style>
#app {
  font-family: 'Work Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background-color: #ea9b08;
  color: white;
  text-shadow: none;
}

::-moz-selection {
  background-color: #ea9b08;
  color: white;
  text-shadow: none;
}

@media (pointer: coarse) {
  ::selection {
    background-color: #ff9900;
  }
}
</style> 