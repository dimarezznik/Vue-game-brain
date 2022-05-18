<template>
  <div class="main">
    <head-game></head-game>
    <game-calculation></game-calculation>
  </div>
</template>

<script>
import HeadGame from "@/components/Game/HeadGame";
import GameCalculation from "@/components/Game/GameCalculation";
export default {
  components: {
    HeadGame, GameCalculation
  },
}
</script>

<style scoped>


</style>