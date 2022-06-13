<template>
  <div>
    <button @click="routeStorage" class="cancel">X ОТМЕНА</button>
    <div class="timer"><span class="s-timer">{{timeDisplay}}</span></div>
  </div>
</template>

<script>

import {loadStorage, loadStorageRange, setLocalStorage} from "@/storage";

export default {
  data() {
    return {
      minutes: parseInt(loadStorageRange('timeRange')),
      seconds: parseInt(loadStorageRange('timeRange')) * 60,
      count: 0,
      interval: null
    }
  },
  methods: {
    routeStorage() {
      if (
          !loadStorage("options").sum &&
          !loadStorage("options").diff &&
          !loadStorage("options").mult &&
          !loadStorage("options").degree &&
          !loadStorage("options").division
      ) return;
      this.$router.push('/')
      this.$store.commit('clearFields')
      setLocalStorage('config', [])
    },
    onFinish() {
      if (this.seconds === 1) {
        clearInterval(this.interval)
        this.$router.push('/')
      }
    },
    intervalTime() {
      this.minutes -= 1
      this.seconds -= 1
      this.interval = setInterval(() => {
        this.onFinish()
        this.count++
        if (this.count === 60) {
          this.count = 0
          this.minutes -= 1
        }
        this.seconds -= 1
      }, 1000)
    }
  },
  computed: {
    timeDisplay() {
      const minutes = this.minutes;
      const seconds = this.seconds % 60
      const paddedMinutes = ('0' + minutes).slice(-2);
      const paddedSeconds = ('0' + seconds).slice(-2);
      return `${paddedMinutes}:${paddedSeconds}`
    },
  },
  mounted() {
    this.intervalTime()
  }
}
</script>

<style scoped>

.cancel {
  background: white;
  position: absolute;
  left: 0;
  top: 0;
  padding: 10px;
  border: 0;
  box-shadow: 0 2px 3px #cdb069;
  color: #cdb069;
  cursor: pointer;
}

.timer {
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  width: 100px;
  border: 1px solid #93d2ec;
  background: #f1e7cb;
  text-align: center;
}

.s-timer {
  color: #cdb069;
}

</style>