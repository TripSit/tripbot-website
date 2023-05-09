<template>
  <div id="home">
    <breadcrumbs :name="$t('sidebar.dashboard')" />

    <div class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <p class="text-2xl font-semibold mb-2 lg:mb-0">
        {{ $t("dashboard.welcome") }}, {{ username }}!
      </p>
      <p>TripBot is a bot develped by Moonbear of TripSit with the goal of providing harm reduction tools to the greater discord universe.</p>
      <p>The bot is prepetually in BETA mode, and is subject to change at any time, but we do our best to not cause problems.</p>
      <p>This page is brand-new (May 9th 2023) and there are not a lot of web-developers on the team, so it's super basic.</p>
      <p>Think you can make a better page? Please do! Check out the Help Wanted section in the sidebar.</p>
    </div>
  </div>
</template>

<style scoped>
.chart-area {
  height: 250px;
}
</style>

<script>
import { mapState, mapGetters } from "vuex";

import Breadcrumbs from "@/components/Breadcrumbs";

export default {
  name: "DashboardHome",
  components: {
    Breadcrumbs,
  },
  computed: {
    ...mapState([
      "user",
      "currentGuildId",
    ]),
    ...mapGetters({ auth: "ifAuthenticated" }),
    username() {
      return this.user ? this.user.username : "Anonymous";
    },
    rewardsDisplay() {
      return (
        parseFloat(this.rewards[this.currentRewards]).toFixed(2).toString() ||
        ""
      );
    },

  },
  data() {
    return {
      modalVisible: false,
    };
  },
  methods: {
  },
  mounted() {
  },
  watch: {
  },
};
</script>