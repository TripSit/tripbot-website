<script lang="ts">
import config from "@/config";
// import fetch from "@/utils/fetch";
import { useI18n } from 'vue-i18n'

import Breadcrumbs from "@/components/BreadcrumbComponent.vue";

export default {
  name: "helpWanted",
  setup() {
    const { t, locale } = useI18n({
      // inheritLocale: true,
      // useScope: 'local',
    })
    return { t, locale };
  },
  components: {
    Breadcrumbs,
  },
  data() {
    return {
      guild: "",
      reason: "",
      solution: "",
      future: "",
      extra: "",
      email: "",
      issues: `${config.githubHome}/issues`,
      dropdownOptions: [
        { label: 'TripSit', value: 'tripsit' },
        { label: 'Bluelight.org', value: 'bluelight' },
        { label: 'r/Drugs', value: 'rdrugs' }
      ]
    };
  },
  methods: {
  },
};
</script>

<template>
  <div id="help-wanted">
    <breadcrumbs :name="t('sidebar.helpWanted')" />
    <div class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <p class="text-xl mb-4">{{ t("sidebar.helpWanted") }}</p>
      <p>TripSit is a very small org run by volunteers, we're always looking for new people to help out with the project.</p>
      <br>
      <p>We could use help with..</p>
      <ul>
      <li>* Web-development (Vue.js, or similar) to help make our sites look better.</li>
      <li>* Cloud networking and architecture (Cloudflare) to help stabalize our infastructure for the future.</li>
      <li>* Systems administrator to help organize all our systems.</li>
      </ul>
      <br>
      <p>Please keep in mind that TripSit is over a decade old with legacy systems and a patchwork of documentation and code.</p>
      <p>It may not be super easy to jump into the stuff we need doing, but if you have patience and are willing to learn, anything is possible.</p>
      <br>
      <p>Interested? <a href='https://discord.gg/tripsit'><u>Join the discord</u></a>, say hi in the #dev-general channel and/or ping Moonbear.</p>
    </div>
  </div>
</template>

