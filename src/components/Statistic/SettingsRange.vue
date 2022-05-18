<template>
  <article class="setting-range">
    <h2>Настройки</h2>
    <div>
      <div class="span-space">
        <span>{{ getDefaultRange.minRange }}</span> <span>{{ getDefaultRange.maxTimeRange }}</span>
      </div>
      <input type="range" :min="getDefaultRange.minRange" :max="getDefaultRange.maxTimeRange" :step="getDefaultRange.step" class="range"
             ref="timerInp" @change="changeTimerRange"
             v-model.number="getDefaultRange.timeRange">
      <p>Длительность {{ getDefaultRange.timeRange }} минут</p>
    </div>
    <div>
      <div class="span-space">
        <span>{{ getDefaultRange.minRange }}</span> <span>{{ getDefaultRange.maxComplexityRange }}</span>
      </div>
      <input type="range"
             :min="getDefaultRange.minRange"
             :max="getDefaultRange.maxComplexityRange"
             :step="getDefaultRange.step" class="range"
             v-model.number="getDefaultRange.complexityRange"
             ref="complexityRange"
             @change="changeComplexityRange">
      <p>Сложность {{ getDefaultRange.complexityRange }}</p>
    </div>
  </article>
</template>

<script>
import {setLocalStorage} from "@/storage";

export default {

  methods: {
    changeComplexityRange() {
      this.complexityRange = this.$refs.complexityRange.value
      setLocalStorage('complexityRange', this.complexityRange)
    },
    changeTimerRange() {
      this.timeRange = this.$refs.timerInp.value
      setLocalStorage('timeRange', this.timeRange)
    }
  },
  computed: {
    getDefaultRange() {
      return this.$store.getters.getDefaultRange
    }
  }
}
</script>

<style scoped>
.span-space {
  width: 200px;
  display: flex;
  justify-content: space-between;
}

.setting-range {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.range {
  width: 200px;
}
</style>