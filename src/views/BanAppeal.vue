<!-- 
  TODO:
  - Add captcha (google recaptcha)
  - Add email confirmation (have them click the link in the email)
  - Remove dev placeholder stuff
  - Make the toast stay up longer
  - Have appeal status show on web page
  - Auto pull appeal status on web page load (automation in general)
-->

<script lang="ts">
// import { mapState } from "vuex";
import { mapState } from 'pinia'
import config from "@/config";
import fetch from "@/utils/fetch";
import { useUserStore } from '@/stores/useUserStore'
import { useI18n } from 'vue-i18n'
import { type Users, type Appeals } from '../types/database.d'

import Breadcrumbs from "@/components/BreadcrumbComponent.vue";

type Appeal = {
      guild: string;
      userId: string;
      username: string;
      discriminator: string;
      avatar: string;
      reason: string;
      solution: string;
      future: string;
      extra: string;
      email: string;
    }

export default {
  name: "banAppeal",
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
      selectedOption: "960606557622657026",
      reason: undefined as string | undefined,
      solution: undefined as string | undefined,
      future: undefined as string | undefined,
      extra: undefined as string | undefined,
      email: undefined as string | undefined,
      attempt: 0,
      cdn: config.discordCdn,
      isBanned: false as boolean,
      hasAppealed: false as boolean,
      hasActiveAppeal: false as boolean,
      // selectedOption: null,
      // reason: "",
      // solution: "",
      // future: "",
      // extra: "",
      // email: "",
      issues: `${config.githubHome}/issues`,
      // dropdownOptions: [
      //   { label: 'TripSit', value: '960606557622657026' },
      //   { label: 'Bluelight.org', value: '867876356304666635' },
      //   { label: 'r/Drugs', value: '1009038673284714526' }
      // ]
    };
  },
  async created() {
    // await this.userData; // Resolve the Promise and store the result
    await this.appealData; // Resolve the Promise and store the result
    await this.discordBan; // Resolve the Promise and store the result
  },
  computed: {
    ...mapState(useUserStore, [
      "user",
      "ifAuthenticated",
    ]),
    avatar() {
      return this.user
        ? `${this.cdn}/avatars/${this.user.id}/${this.user.avatar}.png`
        : "";
    },
  },
  methods: {
    async sendAppeal() {
      // console.log(`${JSON.stringify(this.$data)}`);
      if (!this.selectedOption) return this.$toast.warning("Please select a guild")
      if (!this.reason) return this.$toast.warning("Please enter a reason for the ban. If you don't know why you were banned, say so.")
      if (!this.solution) return this.$toast.warning("Please enter a solution for the problem.")
      if (!this.future) return this.$toast.warning("Please enter a future plan to prevent this from happening again.")
      if (!this.user) return this.$toast.warning("Please login to submit an appeal.")
      if (this.email) {
        // Verify that the email is in the correct format
        // https://stackoverflow.com/a/46181/1366033
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(this.email)) {
          return this.$toast.warning("Please enter a valid email")
        }
      }

      const newAppealData = {
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
      } as Appeal;

      // console.log(JSON.stringify(appealData))

      try {
        // console.log(`newAppealData: ${JSON.stringify(newAppealData, null, 2)}`)
        // This function handles sending the appeal, including errors
        // It will query the database and then send a payload to tripbot to either create or update the appeal
        // The database queries look like:
        // + Get the user info
        // - If the user doesn't exist, end
        // - If the user does exist, continue
        // + Get if the user has an appeal in the database
        // - If no, continue
        // - If yes, check when the appeal was submitted, the status of the appeal, and the number of appeals
        // -- If the status of the appeal is "OPEN"
        // --- If this appeal was submitted less than 48 hours ago, return that they need to wait.
        // --- If this appeal was submitted more than 48 hours ago, send a reminder to the appeal thread.
        // -- If the status of the appeal is "RECEIVED"
        // --- If this appeal was submitted less than 7 days ago, return that they need to wait.
        // --- If this appeal was submitted more than 7 days ago, send a reminder to the appeal thread. 
        // -- If the status of the appeal is "ACCEPTED", let the user know that they have been unbanned!
        // -- If the status of the appeal is "DENIED"
        // --- If this is appeal X, let them know they can appeal again in X months.
        // = Send the appeal to tripbot

        const appealData = await this.appealData;

        const banData = await this.discordBan;

        const appealPayload = {
          newAppealData,
          userData: await this.userData,
          appealData,
          banData,
        }

        await fetch(
          "http://localhost:1337/api/v1/appeals/",
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              "Content-Type": 'application/json',
              'Authorization': `Basic ${btoa(`${config.tbApiUsername}:${config.tbApiPassword}`)}`,
            },
            body: JSON.stringify(appealPayload),
          }
        )
        // const tripbotData = await tripbotApiResponse.json();
        // console.log(`tripbotData: ${JSON.stringify(tripbotData, null, 2)}`);

        // Look up this.selectedOption as a value in the dropdownOptions array
        // If it exists, return the label
        // If it doesn't exist, return the value 
        // const guildOption = this.dropdownOptions.find(option => option.value === this.selectedOption) as {
        //     label: string;
        //     value: string;
        // }

        this.$toast.success(`
        Thank you! We've submitted this appeal to TripSit.<br>

        Please be patient while this is looked into.
        `)


        // Reload the page
        window.location.reload();
        
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
      } catch (e) {
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
        // setTimeout(
        //   async () => {
        //     this.sendAppeal(newAppealData);
        //   },
        //   1000 * 10,
        // );
      } 
    },
    
    async userData() {
      const userApiResponse = await fetch(
          "http://localhost:5000/v2/users/" + this.user?.id,
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              "Content-Type": 'application/json',
              'Authorization': `Basic ${btoa(`${config.dbApiUsername}:${config.dbApiPassword}`)}`,
            },
            // body: JSON.stringify(appealData),
          }
        );
        const userData = await userApiResponse.json() as Users;
        // console.log(`userData: ${JSON.stringify(userData, null, 2)}`);
        return userData;
    },
    async appealData() {
      const userData = await this.userData();
      const appealApiResponse = await fetch(
          "http://localhost:5000/v2/appeals/" + userData.id,
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              "Content-Type": 'application/json',
              'Authorization': `Basic ${btoa(`${config.dbApiUsername}:${config.dbApiPassword}`)}`,
            },
            // body: JSON.stringify(appealData),
          }
        )
        const appealData = await appealApiResponse.json() as Appeals[];
        if (appealData.length > 0) {
          this.hasAppealed = true
          console.log(`User has appealed: ${this.hasAppealed}`)  
          const activeAppeal = appealData.find(appeal => appeal.status === 'OPEN' || appeal.status === 'RECEIVED');
          if (activeAppeal) {
            this.hasActiveAppeal = true
            this.reason = activeAppeal.reason;
            this.solution = activeAppeal.solution;
            this.future = activeAppeal.future;
            this.extra = activeAppeal.extra === null ? undefined : appealData[0].extra as string;
          }
          // console.log(`appealData: ${JSON.stringify(appealData, null, 2)}`);
        }

        return appealData;
    },
    async discordBan() {
      const discordApiResponse = await fetch(
          "http://localhost:5000/v2/discord/bans/" + this.user?.id,
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              "Content-Type": 'application/json',
              'Authorization': `Basic ${btoa(`${config.dbApiUsername}:${config.dbApiPassword}`)}`,
            },
            // body: JSON.stringify(appealData),
          }
        )
        const banData = await discordApiResponse.json();
        // console.log(`banData: ${JSON.stringify(banData, null, 2)}`);
        this.isBanned = banData.message !== 'Unknown Ban';
        return banData;
    },
    async submitAppeal() {
      
    },
  },
};
</script>

<template>
  <div id="ban-appeal">
    <breadcrumbs :name="t('sidebar.banAppeal')" />
    <div class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <p class="text-xl mb-4">{{ t("sidebar.banAppeal") }}</p>
      <div v-if="ifAuthenticated">
        <div v-if="isBanned">
          <div v-if="!hasAppealed || (hasAppealed && !hasActiveAppeal)">
            <label class="block mt-4 text-sm">
              <span class="text-gray-700 dark:text-gray-400" v-for="(item, index) in t('banAppeal.instructions').split('\n')" :key="index">
                {{ item }}<br/>
              </span>
            </label>
          </div>
          <div v-if="hasAppealed">
            <div v-if="hasActiveAppeal">
              <label class="block mt-4 text-sm">
                <span class="text-gray-700 dark:text-gray-400">{{
                  t("banAppeal.hasActiveAppealed")
                }}</span>
              </label>
            </div>
          </div>
  
          <!-- <label class="block text-sm" >
            <div>
              <span class="text-gray-700 dark:text-gray-400">{{
                    t("banAppeal.guild")
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
          </label> -->
          <label class="block mt-4 text-sm">
            <span class="text-gray-700 dark:text-gray-400">{{
              t("banAppeal.reason")
            }}</span>
            <textarea
              class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray"
              rows="3"
              :placeholder="t('banAppeal.reasonPlaceholder')"
              v-model="reason"
              maxlength="1000"
            ></textarea>
          </label>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700 dark:text-gray-400">{{
              t("banAppeal.solution")
            }}</span>
            <textarea
              class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray"
              rows="3"
              :placeholder="t('banAppeal.solutionPlaceholder')"
              v-model="solution"
              maxlength="1000"
            ></textarea>
          </label>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700 dark:text-gray-400">{{
              t("banAppeal.future")
            }}</span>
            <textarea
              class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray"
              rows="3"
              :placeholder="t('banAppeal.futurePlaceholder')"
              v-model="future"
              maxlength="1000"
            ></textarea>
          </label>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700 dark:text-gray-400">{{
              t("banAppeal.extra")
            }}</span>
            <textarea
              class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray"
              rows="3"
              :placeholder="t('banAppeal.extraPlaceholder')"
              v-model="extra"
              maxlength="1000"
            ></textarea>
          </label>
          <!-- <label class="block mt-4 text-sm">
            <span class="text-gray-700 dark:text-gray-400">{{
              t("banAppeal.email")
            }}</span>
            <textarea
              class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray"
              rows="3"
              :placeholder="t('banAppeal.emailPlaceholder')"
              v-model="email"
            ></textarea>
          </label> -->
          
          <div v-if="!hasAppealed || (hasAppealed && !hasActiveAppeal)">
            <button
              name="submit"
              @click="sendAppeal"
              type="button"
              class="mt-4 bg-red-500 hover:bg-red-600 focus:outline-none rounded-lg px-6 py-2 text-white font-semibold shadow"
            >
              {{ t("banAppeal.submit") }}
            </button>
          </div>
        </div>
        <div v-else>
          <label class="block mt-4 text-sm">
            <span class="text-gray-700 dark:text-gray-400">{{
              t("banAppeal.notBanned")
            }}</span>
          </label>
        </div>
      </div>
      <div v-else>
        <label class="block mt-4 text-sm">
          <span class="text-gray-700 dark:text-gray-400" v-for="(item, index) in t('banAppeal.notLoggedIn').split('\n')" :key="index">
            {{ item }}<br/>
          </span>
        </label>
      </div>
    </div>
  </div>
</template>

