

<template>
  <div id="help-wanted">
    <breadcrumbs :name="$t('sidebar.helpWanted')" />
    <div class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <p class="text-xl mb-4">{{ $t("sidebar.helpWanted") }}</p>
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
      <p>Interested? Hop into the discord, join the #dev-general channel and ping Moonbear.</p>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from "@/components/Breadcrumbs";
import config from "@/config";
// import fetch from "@/utils/fetch";
// import queryString from "@/utils/queryString";

export default {
  name: "helpWanted",
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
    submitRequest() {
      const obj = {
        "guild": this.guild,
        "reason": this.reason,
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
      this.reason = "";
      this.solution = "";
      this.future = "";
      this.extra = "";
      this.email = "";
    },
  },
};
</script>