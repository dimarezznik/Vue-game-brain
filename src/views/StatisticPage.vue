<template>
  <div class="main">
    <greeting />
    <settings-range></settings-range>
    <settings-checkbox></settings-checkbox>
    <div class="btn-con">
      <button @click="$router.push('/game')" class="btn">Play!</button>
    </div>
  </div>
</template>

<script lang="ts">
import MyCheckbox from '@/components/UI/MyCheckbox.vue'
import Greeting from "@/components/Statistic/Greeting.vue";
import SettingsRange from '@/components/Statistic/SettingsRange.vue'
import SettingsCheckbox from "@/components/Statistic/SettingsCheckbox.vue";
import {loadStorageBoolean} from "@/storage";

export default {
  components: {
    SettingsCheckbox,
    Greeting,
    MyCheckbox,
    SettingsRange
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
.btn-con {
  position: absolute;
  bottom: 0;
  right: 0;
}

.btn {
  position: absolute;
  padding: 7px;
  background: white;
  outline: white;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: -1px 2px 3px;
  cursor: pointer;
}

.btn-con:active {
  bottom: -1px;
  right: 1px;
}

</style>
