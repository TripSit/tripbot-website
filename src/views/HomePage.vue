<script lang="ts">
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/useUserStore'
import { useI18n } from 'vue-i18n'

import Breadcrumbs from "@/components/BreadcrumbComponent.vue";

export default {
  name: "HomePage",
  setup() {
    const { t } = useI18n()
    const userStore = useUserStore()
    return {t, userStore};
  },
  components: {
    Breadcrumbs,
  },
  computed: {
    ...mapState(useUserStore, [
      "user",
      "currentGuildId",
      "ifAuthenticated",
    ]),
    username() {
      return this.user ? this.user.username : "Anonymous";
    },
  },
};
</script>

<template>
  <div id="home">
    <breadcrumbs :name="t('sidebar.dashboard')" />
    <div class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <p class="text-2xl font-semibold mb-2 lg:mb-0">
        {{ t("dashboard.welcome") }}, {{ username }}!
      </p>
      <p>{{ t("dashboard.intro") }}</p>
    </div>
  </div>
</template>

<style scoped>
</style>