<template>
  <div class="box">
    <input type="checkbox" v-model="modelValue"/>
    <span>
      <slot></slot>
  </span>
  </div>

</template>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean
    }
  }
}
</script>

<style scoped>
.box {
  display: flex;
  align-items: center;
}

span {
  margin-left: 10px;
}
</style>