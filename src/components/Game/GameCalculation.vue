<template>
  <div class="calculation">
      <span>
        <template v-for="(elem, i) in getExpression">
        <input :ref="'inp' + i" v-if="!isNaN(Number(elem))" class="enter"/>
          <span :ref="'span' + i" v-if="isNaN(Number(elem))">
            {{ elem }}
          </span>
          </template>
        = {{ getConfig[1] }}?</span>
  </div>
  <section class="panel">
    <div
        v-for="el in getPanel"
        :style="el.element === '' && 'visibility: hidden'"
        class="panel-el" :key="el.id">
      <button
          @click="tapPanel(el.element)"
          :style="typeof el.element === 'string' && 'background: gray; border: 0'"
          class="el"
      >{{ el.element }}
      </button>
    </div>
    <my-modal v-if="showHint" v-model:show="showHint">
      <h1>{{ getConfig[0] }}={{getConfig[1]}}</h1>
    </my-modal>
    <my-modal v-if="showModalComplete" v-model:show="showModalComplete">
      <h1>Правильно!</h1>
    </my-modal>
    <my-modal v-if="showModalError" v-model:show="showModalError">
      <h1>Ошибка!</h1>
    </my-modal>
  </section>
</template>

<script>
import MyModal from "@/components/UI/MyModal";
import {setLocalStorage} from "@/storage";

export default {
  components: {
    MyModal
  },
  data() {
    return {
      showHint: false,
      count: 0,
      showModalComplete: false,
      showModalError: false
    }
  },
  methods: {
    tapPanel(el) {
      if (el === '?') {
        this.showHint = !this.showHint
        return this.Hint
      }
      if (el === '>') {
        if (this.count + 1 >= this.getExpression.length) return this.$refs['inp' + this.count][0].focus()
        return this.getExpression.find(() => {
          this.count += 2
          return this.$nextTick(() => this.$refs['inp' + this.count][0].focus());
        })
      }
      if (el === '<') {
        if (this.count <= 0) return this.$refs['inp' + this.count][0].focus()
        return this.getExpression.find(() => {
          this.count -= 2
          return this.$nextTick(() => this.$refs['inp' + this.count][0].focus());
        })
      }
      if (typeof el == 'number') {
        this.$refs['inp' + this.count][0].value += el
      }
      if (el === '=') {
        this.getStatistic.allTasksSession++
        this.getStatistic.allTasks++
        setLocalStorage('statistic', this.getStatistic)
        let str = ''
        for (let i = 0; i <= this.getExpression.length - 1; i++) {
          if (i % 2 === 0) {
            str += this.$refs['inp' + i][0].value
          }
          if (i % 2 !== 0) {
            str += this.$refs['span' + i][0].innerText
          }
        }
        for (let i = 0; i <= this.getExpression.length - 1; i += 2) {
          if (!this.$refs['inp' + i][0].value) {
            this.loadConfig();
            return this.showModalError = true
          }

        }
        if (eval(str) === this.getConfig[1]) {
          for (let i = 0; i <= this.getExpression.length - 1; i += 2) {
            this.$refs['inp' + i][0].value = ''
          }
          this.getStatistic.completeTasksSession++
          this.getStatistic.completeTasks++
          setLocalStorage('statistic', this.getStatistic)
          this.showModalComplete = true
          this.loadConfig();
        } else {
          for (let i = 0; i <= this.getExpression.length - 1; i += 2) {
            this.$refs['inp' + i][0].value = ''
          }
          this.showModalError = true
          this.loadConfig();
        }
      }
    },
    loadConfig() {
      this.$store.dispatch('loadConfig')
    },
    focusInput() {
      this.$refs['inp' + 0][0].focus()
    },
  },

  computed: {
    getStatistic() {
      return this.$store.getters.getStatistic
    },
    getPanel() {
      return this.$store.getters.getPanel
    },
    getConfig() {
      return this.$store.getters.getConfig
    },
    getExpression() {
      return this.$store.getters.getExpression
    },
  },
  mounted() {
    this.focusInput()
  }
}
</script>

<style scoped>
.enter {
  border: 0;
  border-bottom: 1px solid black;
  outline: black;
  width: 55px;
  font-size: 20px;
}


.calculation {
  margin: 30px auto;
  font-size: 20px;
}

.panel {
  display: flex;
  flex-wrap: wrap;
  gap: 65px;
  justify-content: center;
}

.el {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f35922;
  padding: 20px;
  border: 1px solid #f35922;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  font-weight: 800;
  box-shadow: 0 2px 2px;
  width: 50px;
  height: 50px;
}

</style>