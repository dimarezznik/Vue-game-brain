<template>
  <article class="greeting">
    <h1>Привет!</h1>
    <p>Добро пожаловать на {{ isDay }} тренировочный день, Ваш последний результат - решено {{
        getStatistic.completeTasksSession || 0
      }} из {{ getStatistic.allTasksSession || 0 }}. <br>
      Общая точность - {{Math.floor(getStatistic.completeTasks / getStatistic.allTasks * 100) || 0}}%</p>
  </article>
</template>

<script>
import {loadStorage, loadStorageRange, loadStorageStatistic, setLocalStorage} from "@/storage";

export default {
  data: () => {
    return {
      date: loadStorage('date'),
      isDay: loadStorageRange('day')
    }
  },
  methods: {
    getDay() {
      if (new Date().toLocaleString().split('').slice(0, 10).join('') !== this.date) {
        this.isDay++
        setLocalStorage('day', this.isDay)
      }
    },
    getDate() {
      return setLocalStorage('date',  new Date().toLocaleString().split('').slice(0, 10).join(''))
    },
  },
  computed: {
    getStatistic() {
      return loadStorageStatistic('statistic')
    },

  },
  mounted() {
    this.getDay()
    this.getDate()
  }
}
</script>

<style scoped>
h1 {
  margin: 0 auto;
}

.greeting {
  display: flex;
  flex-direction: column;
  gap: 50px;
}
</style>