<!-- 
  TODO:
  - Add captcha (google recaptcha)
  - Add email validation (must be @ something)
  - Add email confirmation (have them click the link in the email)
-->

<template>
  <div id="ban-appeal">
    <breadcrumbs :name="$t('sidebar.banAppeal')" />
    <div class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <p class="text-xl mb-4">{{ $t("sidebar.banAppeal") }}</p>
      <label class="block text-sm">
        <dropdown :options="dropdownOptions" />
      </label>
      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">{{
          $t("banAppeal.why")
        }}</span>
        <textarea
          class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray"
          rows="3"
          :placeholder="$t('banAppeal.whyPlaceholder')"
          v-model="why"
        ></textarea>
      </label>
      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">{{
          $t("banAppeal.solution")
        }}</span>
        <textarea
          class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray"
          rows="3"
          :placeholder="$t('banAppeal.solutionPlaceholder')"
          v-model="solution"
        ></textarea>
      </label>
      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">{{
          $t("banAppeal.future")
        }}</span>
        <textarea
          class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray"
          rows="3"
          :placeholder="$t('banAppeal.futurePlaceholder')"
          v-model="future"
        ></textarea>
      </label>
      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">{{
          $t("banAppeal.extra")
        }}</span>
        <textarea
          class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray"
          rows="3"
          :placeholder="$t('banAppeal.extraPlaceholder')"
          v-model="extra"
        ></textarea>
      </label>
      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">{{
          $t("banAppeal.email")
        }}</span>
        <textarea
          class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray"
          rows="3"
          :placeholder="$t('banAppeal.emailPlaceholder')"
          v-model="email"
        ></textarea>
      </label>
      <button
        name="submit"
        @click="submitRequest"
        type="button"
        class="mt-4 bg-red-500 hover:bg-red-600 focus:outline-none rounded-lg px-6 py-2 text-white font-semibold shadow"
      >
        {{ $t("banAppeal.submit") }}
      </button>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from "@/components/Breadcrumbs";
import Dropdown from "@/components/Dropdown";
import config from "@/config";
// import fetch from "@/utils/fetch";
// import queryString from "@/utils/queryString";

export default {
  name: "banAppeal",
  components: {
    Breadcrumbs,
    Dropdown,
  },
  data() {
    return {
      guild: "",
      why: "",
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
    submitRequest() {
      const obj = {
        "guild": this.guild,
        "why": this.why,
        "solution": this.solution,
        "future": this.future,
        "extra": this.extra,
        "email": this.email,
      };

      console.log(`Request: ${JSON.stringify(obj, null, 2)}`)

      // fetch(
      //   "https://docs.google.com/forms/d/e/" +
      //     "1FAIpQLSewYQ-mTzq3lr9Cw6cxCARUvnu_24QCvpWkfWKOdP79FhjKpQ/formResponse" +
      //     queryString(obj),
      //   {
      //     mode: "no-cors",
      //     headers: {
      //       "Content-Type": "application/x-www-form-urlencoded",
      //     },
      //   }
      // )
      //   .then(() => this.$toast.success("Feature request recorded"))
      //   .catch(() =>
      //     this.$toast.warning(
      //       "Failed to send feature request. Are you offline?"
      //     )
      //   );

      this.$toast.warning(`
      Thank you! We've submitted this appeal to ${this.guild}.

      Each guild has different response times, please be patient while this is looked into.
      `)
      this.guild = "";
      this.why = "";
      this.solution = "";
      this.future = "";
      this.extra = "";
      this.email = "";
    },
  },
};
</script>