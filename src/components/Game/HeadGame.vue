<template>
    <div>
      <button @click="$router.push('/')" class="cancel">X ОТМЕНА</button>
      <div class="timer"><span class="s-timer">7:00</span></div>
    </div>
</template>

<script>

export default {

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