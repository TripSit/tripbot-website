<script lang="ts">
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/useUserStore'
import fetch from "@/utils/fetch";
import config from "@/config";
import type { APIUser } from 'discord.js';

export default {
  name: "app",
  setup: () => {
    return {
      userStore: useUserStore(),
    }
  },
  computed: {
    ...mapState(useUserStore, [
      "dark",
    ]),
  },
  beforeMount() {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    // console.log(fragment)

    if (fragment.has("access_token")) {
      const accessToken = fragment.get("access_token");
      const tokenType = fragment.get("token_type");
      const urlState = fragment.get("state");
      const stateParam = localStorage.getItem("stateParam");
      if (stateParam !== urlState) {
        this.$toast.error("You may be under a CRSF attack please login again");
        return console.log("CRSF attack!!!");
      }

      fetch(`${config.discordApi}/users/@me`, {
        headers: {
          authorization: `${tokenType} ${accessToken}`,
        },
      })
        .then((res:any) => res.json())
        .then((response:APIUser) => {
          // console.log(response)
          const user = response;
          this.userStore.login(
            `${tokenType} ${accessToken}`,
            user.id,
            user,
          );
          window.location.hash = "";
        })
        .catch(() =>
          this.$toast.error(
            "Failed to login. Please check connection and try again!"
          )
        );
    } else {
      this.userStore.autoLogin();
    }
    // this.$store.dispatch("setPreferedTheme");
  },
  mounted() {
    this.userStore.setState();
    this.$toast.info("State has been reset");
  },
};
</script>

<template>
  <div id="app" :class="dark ? 'theme-dark' : ''">
    <RouterView />
  </div>
</template>

