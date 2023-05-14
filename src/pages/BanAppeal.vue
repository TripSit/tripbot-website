<!-- 
  TODO:
  - Add captcha (google recaptcha)
  - Add email confirmation (have them click the link in the email)
  - Remove dev placeholder stuff
  "it will be a minumum of 24 hours before it can be accepted"
  Make the toast stay up longer
  Have appeal status show on web page
-->

<template>
  <div id="ban-appeal">
    <breadcrumbs :name="$t('sidebar.banAppeal')" />
    <div class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <p class="text-xl mb-4">{{ $t("sidebar.banAppeal") }}</p>
      <label class="block text-sm" >
        <div>
          <span class="text-gray-700 dark:text-gray-400">{{
                $t("banAppeal.guild")
              }}</span>
          <select
            class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
            v-model="selectedOption"
          >
            <option v-for="(option, index) in dropdownOptions" :key="index" :value="option.value">
              {{ option.label }}
            </option>
            <option :value="null" disabled hidden>Select Guild</option>
          </select>
        </div>
      </label>
      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">{{
          $t("banAppeal.reason")
        }}</span>
        <textarea
          class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray"
          rows="3"
          :placeholder="$t('banAppeal.reasonPlaceholder')"
          v-model="reason"
          maxlength="1000"
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
          maxlength="1000"
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
          maxlength="1000"
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
          maxlength="1000"
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
import { mapState } from "vuex";
import config from "@/config";
import fetch from "@/utils/fetch";
// import queryString from "@/utils/queryString";

export default {
  name: "banAppeal",
  components: {
    Breadcrumbs,
  },
  computed: {
    ...mapState(["user"]),
    avatar() {
      return this.user
        ? `${this.cdn}/avatars/${this.user.id}/${this.user.avatar}.png`
        : "";
    },
  },
  data() {
    return {
      selectedOption: "960606557622657026",
      reason: "Reason",
      solution: `Solution`,
      future: "Future",
      extra: "Extra",
      email: "test@test.com",
      attempt: 0,
      cdn: config.discordCdn,
      // selectedOption: null,
      // reason: "",
      // solution: "",
      // future: "",
      // extra: "",
      // email: "",
      issues: `${config.githubHome}/issues`,
      dropdownOptions: [
        { label: 'TripSit', value: '960606557622657026' },
        { label: 'Bluelight.org', value: '867876356304666635' },
        { label: 'r/Drugs', value: '1009038673284714526' }
      ]
    };
  },
  methods: {
    async sendAppeal(appealData) {
      // console.log(appealData)
      // console.log(this.user.id)
      // This function handles sending the appeal, including errors
      // The only error that should happen is if the bot happens to be down for whatever reason
      // In this case, we want to keep retrying the request for 1 minute
      // If it fails after 1 minute, then the bot is down for good, and we should tell the user to try again later
      // This request should be retried 5 times before giving up
      // This request should be retried every 10 seconds
      fetch(
        "https://localhost:1887/appeal",
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            "Content-Type": 'application/json',
            'Authorization': `Basic ${Buffer.from(config.username + ":" + config.password).toString('base64')}`,
          },
          body: JSON.stringify(appealData),
        }
      )
        // .then(response => response.json())
        .then(response => {
          console.log(JSON.stringify(response, null, 2))

          if (response.status !== 200) {
            if (response.status === 500) {
              this.$toast.error(
                "The bot is down, please try again later."
              )
              return;
            }
            if (response.status === 418) {
              this.$toast.error(`Failed to send appeal, you are not banned from this guild!`)
              return;
            }
            this.$toast.error(`Failed to send appeal: ${response.status} ${response.statusText}`)
            return;
          }

          // console.log(this.options)

          // Look up this.selectedOption as a value in the dropdownOptions array
          // If it exists, return the label
          // If it doesn't exist, return the value
          const guildOption = this.dropdownOptions.find(option => option.value === this.selectedOption)

          this.$toast.success(`
          Thank you! We've submitted this appeal to ${guildOption.label}.<br>

          Each guild has different response times, please be patient while this is looked into.
          `)
          // this.selectedOption = null;
          // this.reason = "";
          // this.solution = "";
          // this.future = "";
          // this.extra = "";
          // this.email = "";
          // this.selectedOption = '960606557622657026';
          // this.reason = "Reason";
          // this.solution = "Solution";
          // this.future = "Future";
          // this.extra = "Extra";
          // this.email = "test@test.com";
        })
        .catch((e) => {
          this.attempt++;
          console.debug(`Failed attempt ${this.attempt} to send appeal: ${e}`);
          if (this.attempt >= 5) {
            this.$toast.error(
              "Failed to send ban appeal, the bot may be down, please try again later. If this persists, please contact us on discord!"
            )
            return;
          }
          this.$toast.warning(
            `Failed attempt ${this.attempt} to send ban appeal, retrying in 10 seconds!`
          )
          setTimeout(
            async () => {
              this.sendAppeal(appealData);
            },
            1000 * 10,
          );
        }
        );

    },
    async submitRequest() {
      // console.log(`${JSON.stringify(this.$data)}`);
      if (!this.selectedOption) return this.$toast.warning("Please select a guild")
      if (!this.reason) return this.$toast.warning("Please enter a reason for the ban. If you don't know why you were banned, say so.")
      if (!this.solution) return this.$toast.warning("Please enter a solution for the problem.")
      if (!this.future) return this.$toast.warning("Please enter a future plan to prevent this from happening again.")
      if (this.email) {
        // Verify that the email is in the correct format
        // https://stackoverflow.com/a/46181/1366033
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(this.email)) {
          return this.$toast.warning("Please enter a valid email")
        }
      }

      const appealData = {
        'guild': this.selectedOption,
        'userId': this.user.id,
        'username': this.user.username,
        'discriminator': this.user.discriminator,
        'avatar': this.avatar,
        'reason': this.reason,
        'solution': this.solution,
        'future': this.future,
        'extra': this.extra,
        'email': this.email,
      };

      // console.log(JSON.stringify(appealData))

      await this.sendAppeal(appealData);
    },
  },
};
</script>