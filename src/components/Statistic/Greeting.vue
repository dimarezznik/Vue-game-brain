<template>
  <article class="greeting">
    <h1 @click="storage">Привет!</h1>
    <p>Добро пожаловать на 24 тренировочный день, Ваш последний результат - решено 10 из 25. <br>
      Общая точность - 80%</p>
  </article>
</template>

<script>
export default {
  methods: {
    storage() {
      console.log(localStorage.getItem('sum'))
    }
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