<template>
  <div id="commands">
    <div class="flex justify-between">
      <breadcrumbs :name="$t('sidebar.commands')" />
    </div>

    <button
      name="refresh"
      @click="refresh"
      class="bg-red-500 hover:bg-red-600 focus:outline-none rounded-lg px-6 py-2 text-white font-semibold shadow"
    >
      {{ $t("logs.refresh") }}
    </button>

    <template v-if="commands.length">
      <Command
        v-for="(command, idx) in commands"
        :key="idx"
        :id="idx.toString()"
        :command="command.name"
        :description="command.description"
        :checked="true"
      />
    </template>
    <template v-else><div class="w-full mt-8 px-3">Loading...</div></template>
  </div>
</template>

<style scoped>
.toggle-checkbox:checked {
  right: 0;
  border-color: #969696;
}
.toggle-checkbox:checked + .toggle-label {
  background-color: #969696;
}
</style>

<script>
import { mapGetters } from "vuex";

import Breadcrumbs from "@/components/Breadcrumbs";
import Command from "@/components/Command";

import config from "@/config";
import fetch from "@/utils/fetch";

export default {
  name: "Commands",
  components: {
    Breadcrumbs,
    Command,
  },
  computed: {
    ...mapGetters({ auth: "ifAuthenticated" }),
  },
  data() {
    return {
      commands: [],
    };
  },
  methods: {
    refresh() {
      this.$toast.info("Loading commands");
      fetch(`${config.discordApi}/applications/${config.clientId}/commands`)
        .then((res) => {
          console.log(res)
          this.$toast.info(res);
          res.json()
        })
        .then((response) => {
          if (!response.length) return;
          this.commands = response[0].name ? response : [];
        })
        .catch(() =>
          this.$toast.console.warning(
            "Failed to get commands list. Are you offline?"
          )
        );
    },
  },
  mounted() {
    this.refresh();
  },
};
</script>