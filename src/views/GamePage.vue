<template>
  <div class="main">
    <head-game></head-game>
    <calculation-game></calculation-game>
  </div>
</template>

<script>
import HeadGame from "@/components/Game/HeadGame";
import CalculationGame from "@/components/Game/CalculationGame";

export default {
  components: {
    HeadGame, CalculationGame
  },
}
</script>

<style scoped>


</style>