<script lang="ts">
import { useI18n } from 'vue-i18n'

export default {
  name: "DropdownComponent",
  setup() {
    const { t, locale } = useI18n({
      // inheritLocale: true,
      // useScope: 'local',
    })
    return { t, locale };
  },
  props: {
    options: {
      type: Array<{ label: string; value: string }>,
      required: true
    }
  },
  data() {
    return {
      selectedOption: null
    };
  },
};
</script>

<template>
  <div>
    <span class="text-gray-700 dark:text-gray-400">{{
          t("banAppeal.guild")
        }}</span>
    <select
      class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
      v-model="selectedOption"
    >
      <option v-for="(option, index) in options" :key="index" :value="option.value">
        {{ option.label }}
      </option>
      <option :value="null" disabled hidden>Select Guild</option>
    </select>
  </div>
</template>
