<template>
  <div class="main">
    <greeting/>
    <settings-range></settings-range>
    <settings-checkbox></settings-checkbox>
    <setting-play></setting-play>
  </div>
</template>

<script lang="ts">
import MyCheckbox from '@/components/UI/MyCheckbox.vue'
import Greeting from "@/components/Statistic/Greeting.vue";
import SettingsRange from '@/components/Statistic/SettingsRange.vue'
import SettingsCheckbox from "@/components/Statistic/SettingsCheckbox.vue";
import SettingPlay from "@/components/Statistic/SettingPlay.vue"

export default {
  components: {
    SettingsCheckbox,
    Greeting,
    MyCheckbox,
    SettingsRange,
    SettingPlay
  },


}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


.main {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 70px;
  width: 500px;
  margin: 50px auto;
}



</style>
