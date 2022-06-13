<template>
  <div class="btn-con">
    <button @click="loadConfig" class="btn">Play!</button>
  </div>
</template>

<script>

import {loadStorage} from "@/storage";

export default {
  methods: {
    loadConfig() {
      for (let key in loadStorage('options')) {
        if (loadStorage('options')[key]) {
          this.$store.dispatch('loadConfig')
          this.$store.commit('clearStatistic')
          this.$router.push('/game')
        }
      }
    }
  },
}
</script>

<style scoped>
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