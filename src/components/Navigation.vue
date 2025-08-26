<template>
  <nav 
    class="fixed top-0 left-0 w-full z-[1000] transition-all duration-300"
    :class="{'bg-[#f7f8f9] shadow-md': isScrolled, 'bg-transparent': !isScrolled}"
  >
    <div class="container px-4 mx-auto">
      <div class="flex items-center justify-between py-4">
        <router-link to="/" class="flex items-center">
          <img class="w-[150px]" :src="logo" alt="Logo" />
        </router-link>

        <button @click="toggleMobileMenu" class="text-2xl text-gray-800 md:hidden">
          <i class="fas fa-bars"></i>
        </button>

        <ul class="items-center hidden gap-6 md:flex">
          <li v-for="item in menuItems" :key="item.name" class="relative group">
            <router-link
              :to="item.link"
                class="font-bold transition"
  :class="{
    'text-[#ea9b08] hover:text-black': !isScrolled,
    'text-black hover:text-[#ea9b08]': isScrolled
  }"
            >
              {{ item.name }}
              <i v-if="item.submenu" class="ml-1 text-xs fa-solid fa-chevron-down"></i>
            </router-link>
            <ul
              v-if="item.submenu"
              class="absolute top-full left-0 hidden group-hover:block bg-white shadow z-50 py-2 min-w-[160px]"
            >
              <li v-for="sub in item.submenu" :key="sub.name">
                <router-link
                  :to="sub.link"
                  class="block px-4 py-2 text-sm text-gray-700 hover:text-[#ea9b08]"
                >
                  {{ sub.name }}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>

        <div class="items-center hidden gap-5 md:flex">
          <a href="tel:+966123456789" class="flex items-center gap-2 font-bold hover:text-[#ea9b08]"
             :class="{'text-gray-800': isScrolled, 'text-[#ea9b08]': !isScrolled}">
            <i class="fa-solid fa-phone text-[#ea9b08]"></i> +966 123 456 789
          </a>

          <div class="relative inline-block login-dropdown" ref="loginDropdownDesktop">
            <i
              @click="toggleLoginDropdown"
              class="cursor-pointer fa-regular fa-user text-[#ea9b08]"
            ></i>
            <div
              v-if="showLogin"
              class="absolute top-[30px] right-0 bg-black text-white p-5 w-[300px] h-[330px] rounded-[5px] z-[100]"
            >
              <h3 class="m-0 mb-[20px] text-[18px] flex justify-between">
                Sign in
                <span>
                  <router-link to="#" class="text-[#ea9b08] no-underline">Create an Account</router-link>
                </span>
              </h3>
              <form @submit.prevent="handleLogin">
                <label class="block mb-[10px] text-[13px]">Username or email *</label>
                <input
                  v-model="loginForm.username"
                  type="text"
                  placeholder="Username"
                  class="w-full p-[15px] mb-[10px] border-none text-[10px] rounded-[20px] rounded-tl-none"
                />
                <label class="block mb-[10px] text-[13px]">Password *</label>
                <input
                  v-model="loginForm.password"
                  type="password"
                  placeholder="Password"
                  class="w-full p-[15px] mb-[10px] border-none text-[10px] rounded-[20px] rounded-tl-none"
                />
                <button
                  type="submit"
                  class="w-full bg-[#ea9b08] text-white border-none rounded-[20px] rounded-tl-none p-[10px] mt-[20px] cursor-pointer"
                >
                  LOGIN
                </button>
                <router-link to="#" class="block text-white text-[12px] mt-[10px] no-underline">Lost your password?</router-link>
              </form>
            </div>
          </div>

          <button @click="toggleSearch" 
                  class="fa-solid fa-magnifying-glass text-xl hover:text-[#ea9b08]"
                  :class="{'text-gray-800': isScrolled, 'text-[#ea9b08]': !isScrolled}"></button>

          <router-link
            to="/donate"
            class="bg-[#ea9b08] text-white py-2 px-5 rounded-[20px] rounded-tl-none hover:bg-[#de9409] transition"
          >
            <i class="pr-2 fa-solid fa-circle-arrow-right"></i> DONATE NOW
          </router-link>
        </div>
      </div>
    </div>

    <div
      class="fixed top-0 left-0 h-full w-4/5 bg-white z-[2000] shadow transform transition-transform duration-300 ease-in-out"
      :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="p-5" ref="loginDropdownMobile">
        <div class="flex items-center justify-between mb-6">
          <router-link to="/" @click="closeMobileMenu">
            <img class="w-[120px]" :src="logo" alt="Logo" />
          </router-link>
          <button @click="toggleMobileMenu" class="text-2xl text-gray-800">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <ul class="space-y-4">
          <li v-for="item in menuItems" :key="item.name">
            <div>
              <a
                href="#"
                class="flex items-center justify-between px-2 py-1 font-bold text-gray-800"
                @click.prevent="toggleMobileSubmenu(item.name)"
              >
                {{ item.name }}
                <i v-if="item.submenu" class="text-xs fa-solid fa-chevron-down"></i>
              </a>
              <ul v-if="item.submenu && openMobileSubmenus.includes(item.name)" class="pl-4 mt-2 space-y-2">
                <li v-for="sub in item.submenu" :key="sub.name">
                  <router-link :to="sub.link" class="block text-gray-700 hover:text-[#ea9b08]" @click="closeMobileMenu">
                    {{ sub.name }}
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
        </ul>

        <div class="mt-8">
          <a href="tel:+966123456789" class="flex items-center gap-2 mb-4 font-bold text-gray-800">
            <i class="fa-solid fa-phone text-[#ea9b08]"></i> +966 123 456 789
          </a>

          <div>
            <h3 class="mb-2 text-lg">Sign in</h3>
            <label class="text-sm rounded-[20px] rounded-tl-none">Username or email *</label>
            <input v-model="loginForm.username" type="text" class="w-full p-2 my-2 text-sm text-black rounded-[20px] rounded-tl-none" placeholder="Username" />
            <label class="text-sm">Password *</label>
            <input v-model="loginForm.password" type="password" class="w-full p-2 my-2 text-sm rounded-[20px] rounded-tl-none" placeholder="Password" />
            <button @click="handleLogin" class="w-full p-2 mt-3 text-black bg-[#ea9b08] rounded-[20px] rounded-tl-none hover:bg-orange-400">LOGIN</button>
          </div>

          <router-link
            to="/donate"
            class="block bg-[#ea9b08] text-white text-center mt-6 py-3 px-6 rounded-[20px] rounded-tl-none font-normal text-[15px] hover:bg-[#de9409] transition"
            @click="closeMobileMenu"
          >
            <i class="pr-2 fa-solid fa-circle-arrow-right"></i> DONATE NOW
          </router-link>
        </div>
      </div>
    </div>

    <div
      class="fixed inset-0 bg-black bg-opacity-50 z-[1500] transition-opacity duration-300"
      :class="isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
      @click="closeMobileMenu"
    ></div>
  </nav>
</template>

<script>
import logo from '@/assets/images/logo.svg'
import { authAPI } from '@/services/api' 

export default {
  name: 'Navigation',
  data() {
    return {
      logo,
      isScrolled: false,
      isMobileMenuOpen: false,
      openMobileSubmenus: [],
      showLogin: false,
      loginForm: {
        username: '',
        password: ''
      },
      menuItems: [
        {
          name: 'Home',
          link: '/',
          submenu: [
            { name: 'Home 1', link: '/' },
            { name: 'Home 2', link: '/home-2' },
            { name: 'Home 3', link: '/home-3' }
          ]
        },
        {
          name: 'About',
          link: '/about',
          submenu: [
            { name: 'Who We Are', link: '/about' },
            { name: 'Our Team', link: '/about/team' }
          ]
        },
        {
          name: 'Campaigns',
          link: '/campaigns',
          submenu: [
            { name: 'NotFound', link: '/notfound' },
            { name: 'Campaign List', link: '/campaigns/list' }
          ]
        },
        { name: 'Gallery', link: '/gallery' },
        { name: 'Contact', link: '/contact' }
      ]
    }
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 10;
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
      document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : ''
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false
      document.body.style.overflow = ''
    },
    toggleMobileSubmenu(menuName) {
      const index = this.openMobileSubmenus.indexOf(menuName)
      if (index > -1) {
        this.openMobileSubmenus.splice(index, 1)
      } else {
        this.openMobileSubmenus.push(menuName)
      }
    },
    toggleSearch() {
      console.log('Search toggled')
    },
    toggleLoginDropdown() {
      this.showLogin = !this.showLogin
    },
    handleClickOutside(event) {
      const desktop = this.$refs.loginDropdownDesktop
      const mobile = this.$refs.loginDropdownMobile
      if (
        this.showLogin &&
        desktop &&
        !desktop.contains(event.target) &&
        (!mobile || !mobile.contains(event.target))
      ) {
        this.showLogin = false
      }
    },

   
    async handleLogin() {
      try {
        const response = await authAPI.login({
          username: this.loginForm.username,
          password: this.loginForm.password
        });
        if (response.data.message === 'Login successful') {
         
          localStorage.setItem('auth', true);
          console.log('Login successful:', response.data);
         
          this.loginForm = { username: '', password: '' }
          this.showLogin = false
          this.closeMobileMenu()

         
          this.$router.push({ path: '/dashboard' });
        } else {
          this.$router.push({ path: '/404' });
        }
      } catch (error) {
        console.error('Login error:', error);
        this.$router.push({ path: '/404' });
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    document.addEventListener('click', this.handleClickOutside)
    this.handleScroll()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>


<style scoped>
html,
body {
  overflow-x: hidden;
  width: 100%;
}

nav {
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}
</style>