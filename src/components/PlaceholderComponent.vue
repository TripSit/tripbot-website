<script lang="ts">
import { useI18n } from 'vue-i18n'
export default {
  name: "PlaceholderComponent",
  setup() {
    const { t, locale } = useI18n({
      // inheritLocale: true,
      // useScope: 'local',
    })
    return { t, locale };
  },
};
</script>

<template>
  <div class="flex flex-wrap -mx-3">
    <div class="w-full mt-8 px-3">
      <div
        class="w-full bg-white rounded-lg shadow-md dark:bg-gray-800 p-4 mb-8 xl:mb-0"
      >
        <img
          alt="placeholder"
          src="@/assets/blank_canvas.svg"
          class="placeholder"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.placeholder {
  height: calc(100vh - 250px);
  margin: auto;
}
</style>

