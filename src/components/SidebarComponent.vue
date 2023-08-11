<script lang="ts">
import { useI18n } from 'vue-i18n'
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/useUserStore'

import config from "@/config";

import { CollapseTransition } from 'vue3-sfc-transitions';

export default {
  name: "SidebarComponent",
  setup() {
    const { t, locale } = useI18n({
      // inheritLocale: true,
      // useScope: 'local',
    })
    return { t, locale };
  },
  components: {
    // Guilds,
    CollapseTransition,
  },
  computed: {
    ...mapState(useUserStore, [
      "sideBarOpen",
      "currentGuild",
      "currentGuildId",
      "guilds",
      "ifAuthenticated",
    ]),
    currentGuild() {
      return this.guilds.find(guild => guild.id === this.currentGuildId);
    },
    cdn() {
      return config.discordCdn;
    },
  },
};
</script>

<template>
  <!-- give the sidebar z-50 class so its higher than the navbar if you want to see the logo -->
  <!-- you will need to add a little "X" button next to the logo in order to close it though -->
  <collapse-transition>
    <div
      class="w-2/3 md:w-1/3 shadow-lg lg:w-64 fixed md:top-0 md:left-12 h-screen lg:block bg-gray-100 dark:bg-gray-800 z-30"
      :class="sideBarOpen ? '' : 'hidden'"
      id="main-nav"
    >
      <div class="flex">
        <!-- <Guilds /> -->
        <div>
          <div
            class="w-full h-16 px-6 bg-gray-100 dark:bg-gray-800 flex items-center mb-8 mx-auto"
          >
            <template v-if="currentGuild !== null && currentGuild !== undefined">
              <img
                alt="guild-icon"
                :src="`${cdn}/icons/${currentGuild.id}/${currentGuild.icon}.png`"
                class="w-12 h-12 bg-gray-300 dark:bg-gray-900 rounded-full shadow-lg"
              />
              <p class="font-semibold pl-4">{{ currentGuild.name }}</p>
            </template>
            <template v-else>
              <img
                alt="tripsit-logo"
                src="@/assets/flame.png"
                class="w-12 h-12 bg-gray-300 dark:bg-gray-900 rounded-full shadow-lg"
              />
              <div class="w-12 h-12 flex items-center"><div class="glowing-btn"><span class="glowing-txt">TR<span class="faulty-letter">I</span>PS<span class="faulty-letter">I</span>T</span></div></div>
            </template>
          </div>

          <div class="mb-4 px-4 text-sm font-semibold">
            <p class="pl-4 mb-1">{{ t("sidebar.main") }}</p>
            <router-link
              :to="{ path: '/dashboard/home' }"
              class="w-full flex items-center h-10 pl-4 hover:text-red-400 rounded-lg cursor-pointer"
            >
              <div>
                <svg class="h-6 w-6 fill-current mr-2" viewBox="0 0 20 20">
                  <path
                    d="M18.121,9.88l-7.832-7.836c-0.155-0.158-0.428-0.155-0.584,0L1.842,9.913c-0.262,0.263-0.073,0.705,0.292,0.705h2.069v7.042c0,0.227,0.187,0.414,0.414,0.414h3.725c0.228,0,0.414-0.188,0.414-0.414v-3.313h2.483v3.313c0,0.227,0.187,0.414,0.413,0.414h3.726c0.229,0,0.414-0.188,0.414-0.414v-7.042h2.068h0.004C18.331,10.617,18.389,10.146,18.121,9.88 M14.963,17.245h-2.896v-3.313c0-0.229-0.186-0.415-0.414-0.415H8.342c-0.228,0-0.414,0.187-0.414,0.415v3.313H5.032v-6.628h9.931V17.245z M3.133,9.79l6.864-6.868l6.867,6.868H3.133z"
                  ></path>
                </svg>
                <span>{{ t("sidebar.dashboard") }}</span>
              </div>
            </router-link>
          </div>
          <div class="mb-4 px-4 text-sm font-semibold">
            <p class="pl-4 text-sm font-semibold mb-1">
              {{ t("sidebar.misc") }}
            </p>
            <router-link
              :to="{ path: '/dashboard/appeals' }"
              class="w-full flex items-center h-10 pl-4 hover:text-red-400 rounded-lg cursor-pointer"
            >
              <div>
                <svg class="h-6 w-6 fill-current mr-2" viewBox="0 0 20 20">
                  <path
                    d="M18.303,4.742l-1.454-1.455c-0.171-0.171-0.475-0.171-0.646,0l-3.061,3.064H2.019c-0.251,0-0.457,0.205-0.457,0.456v9.578c0,0.251,0.206,0.456,0.457,0.456h13.683c0.252,0,0.457-0.205,0.457-0.456V7.533l2.144-2.146C18.481,5.208,18.483,4.917,18.303,4.742 M15.258,15.929H2.476V7.263h9.754L9.695,9.792c-0.057,0.057-0.101,0.13-0.119,0.212L9.18,11.36h-3.98c-0.251,0-0.457,0.205-0.457,0.456c0,0.253,0.205,0.456,0.457,0.456h4.336c0.023,0,0.899,0.02,1.498-0.127c0.312-0.077,0.55-0.137,0.55-0.137c0.08-0.018,0.155-0.059,0.212-0.118l3.463-3.443V15.929z M11.241,11.156l-1.078,0.267l0.267-1.076l6.097-6.091l0.808,0.808L11.241,11.156z"
                  ></path>
                </svg>
                <span>{{ t("sidebar.banAppeal") }}</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </collapse-transition>
</template>

<style scoped>
div.router-link-active,
div.router-link-exact-active {
  color: #f83f3f;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>

