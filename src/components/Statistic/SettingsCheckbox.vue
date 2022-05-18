<template>
  <article class="setting-checkbox">
    <my-checkbox v-model="sum" @change="handleSum">Суммирование</my-checkbox>
    <my-checkbox v-model="diff" @change="handleDiff">Разность</my-checkbox>
    <my-checkbox v-model="mult" @change="handleMult">Умножение</my-checkbox>
    <my-checkbox v-model="division" @change="handleDivision">Деление</my-checkbox>
    <my-checkbox v-model="degree" @change="handleDegree">Возведение в степень</my-checkbox>
  </article>
</template>

<script>
import MyCheckbox from "@/components/UI/MyCheckbox";
import {loadStorage, setLocalStorage} from "@/storage";
export default {
  components: {
    MyCheckbox
  },
  data() {
    return {
      sum: loadStorage('options').sum || false,
      diff: loadStorage('options').diff || false,
      mult: loadStorage('options').mult || false,
      division: loadStorage('options').division || false,
      degree: loadStorage('options').degree || false,
    }
  },
  methods: {
    handleSum() {
      this.sum = !this.sum;
      this.getOptions.sum = this.sum
      setLocalStorage('options', this.getOptions)
    },
    handleDiff() {
      this.diff = !this.diff
      this.getOptions.diff = this.diff
      setLocalStorage('options', this.getOptions)
    },
    handleMult() {
      this.mult = !this.mult
      this.getOptions.mult = this.mult
      setLocalStorage('options', this.getOptions)
    },
    handleDivision() {
      this.division = !this.division
      this.getOptions.division = this.division
      setLocalStorage('options', this.getOptions)
    },
    handleDegree() {
      this.degree = !this.degree
      this.getOptions.degree = this.degree
      setLocalStorage('options', this.getOptions)
    },
  },
  computed: {
    getOptions(){
      return this.$store.getters.getOptions
    }
  }

}
</script>

<style scoped>
.setting-checkbox {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

</style>