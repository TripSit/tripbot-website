<script lang="ts">
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/useUserStore'

import Sidebar from "@/components/SidebarComponent.vue";
import Navbar from "@/components/NavbarComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
// import DashboardHome from '@/views/DashboardHome.vue';

// import { FadeTransition } from 'vue3-sfc-transitions';

export default {
  name: "DashboardLayout",
  computed: {
    ...mapState(useUserStore, [
      "sideBarOpen",
    ]),
  },
  components: {
    Sidebar,
    Navbar,
    FooterComponent,
  },
};
</script>

<template>
  <div class="leading-normal tracking-normal" id="main-body">
    <div class="flex flex-wrap text-gray-500 dark:text-gray-400">
      <Sidebar />

      <div
        class="w-full bg-gray-200 dark:bg-gray-900 pl-0 lg:pl-64 min-h-screen"
        :class="sideBarOpen ? 'overlay' : ''"
        id="main-content"
      >
        <Navbar />

        <div class="min-h p-6 bg-gray-200 dark:bg-gray-900">
          <router-view />
        </div>

        <FooterComponent />
      </div>
    </div>
  </div>
</template>

<style scoped>
.min-h {
  min-height: calc(100% - 8rem);
}
</style>


