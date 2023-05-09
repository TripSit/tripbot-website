<template>
  <div>
    <span class="text-gray-700 dark:text-gray-400">{{
          $t("banAppeal.guild")
        }}</span>
    <select
    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
    :placeholder="$t('banAppeal.guildPlaceholder')"
    v-model="selectedOption"
    >
      <option v-for="(option, index) in options" :key="index" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedOption: null
    };
  }
};
</script>
