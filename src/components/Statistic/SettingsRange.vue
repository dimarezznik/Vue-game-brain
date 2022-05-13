<template>
  <article class="setting-range">
    <h2>Настройки</h2>
    <div>
      <div class="span-space">
        <span>{{ ranges.minRange }}</span> <span>{{ ranges.maxTimeRange }}</span>
      </div>
      <input type="range" :min="ranges.minRange" :max="ranges.maxTimeRange" :step="ranges.step" class="range"
             ref="timerInp" @change="changeTimerRange"
             v-model.number="timeRange">
      <p>Длительность {{ timeRange }} минут</p>
    </div>
    <div>
      <div class="span-space">
        <span>{{ ranges.minRange }}</span> <span>{{ ranges.maxComplexityRange }}</span>
      </div>
      <input type="range"
             :min="ranges.minRange"
             :max="ranges.maxComplexityRange"
             :step="ranges.step" class="range"
             v-model.number="complexityRange"
             ref="complexityRange"
             @change="changeComplexityRange">
      <p>Сложность {{ complexityRange }}</p>
    </div>
  </article>
</template>

<script>
import {setLocalStorage, loadStorageNumber, defaultRange} from "@/storage";

export default {
  data() {
    return {
      ranges: defaultRange,
      timeRange: loadStorageNumber('timeRange') || 1,
      complexityRange: loadStorageNumber('complexityRange') || 1,
    }
  },
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
  computed: {},


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