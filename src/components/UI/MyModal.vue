<template>
  <div class="modal" v-if="show" @click="closeModal">
    <div @click.stop class="modal-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    show: {
      type: Boolean,
    },
  },
  methods: {
    closeModal() {
      this.$emit("update:show", false);
    },
  },
});
</script>

<style scoped>
.modal {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  position: fixed;
}

.modal-content {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 100px auto;
  background: white;
  height: 200px;
  width: 400px;
}

</style>