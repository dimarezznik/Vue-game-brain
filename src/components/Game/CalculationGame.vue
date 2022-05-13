<template>
  <div class="calculation">
      <span>
        <template v-for="el in getFields" :key="el">
        <input :ref="'inp' + el" class="enter"/>
          <span :ref="'opers' + el" v-if="el !== getFields.length - 1"
          >
            {{ randomOperators() }}
          </span>
          </template>
        = {{ resultNumber }}?</span>
  </div>
  <section class="panel">
    <template v-for="(panelEl) in getPanel" :key="panelEl.id">
      <div :style="panelEl.element === '' && 'visibility: hidden'" class="panel-el">
        <button :style="typeof panelEl.element === 'string' && 'background: gray; border: 0'"
                class="el" @click="moveInput(panelEl, getFields), tapNumber(panelEl)"
        >{{ panelEl.element }}
        </button>
      </div>
    </template>
    <my-modal v-if="showModalComplete" v-model:show="showModalComplete">
      <h1>Правильно!</h1>
    </my-modal>
    <my-modal v-if="showModalError" v-model:show="showModalError">
      <h1>Ошибка!</h1>
    </my-modal>
  </section>
</template>

<script>
import {loadStorageBoolean, loadStorageNumber} from "@/storage";
import MyModal from "@/components/UI/MyModal";

export default {
  components: {
    MyModal
  },
  data() {
    return {
      fields: [],
      operators: [],
      expression: [],
      count: 0,
      showModalComplete: false,
      showModalError: false
    }
  },
  methods: {
    randomOperators() {
      return this.getOperators[Math.floor(Math.random() * this.getOperators.length)]
    },
    moveInput(panelEl, getFields) {
      if (panelEl.element === '>') {
        if (this.count + 1 >= getFields.length) return this.$refs['inp' + this.count][0].focus()
        return getFields.find(() => {
          this.count++
          return this.$nextTick(() => this.$refs['inp' + this.count][0].focus());
        })
      }
      if (panelEl.element === '<') {
        if (this.count <= 0) return this.$refs['inp' + this.count][0].focus()
        return getFields.find(() => {
          this.count--
          return this.$nextTick(() => this.$refs['inp' + this.count][0].focus());
        })
      }
      if (panelEl.element === '=') {
        let str = ''
        for (this.count = 0; this.count <= getFields.length - 1; this.count++) {
          if (this.count === getFields.length - 1) {
            str += this.$refs['inp' + this.count][0].value
          }
          if (this.count < getFields.length - 1) {
            str += this.$refs['inp' + this.count][0].value + this.$refs['opers' + this.count][0].innerText
          }

        }

        if (typeof eval(str) !== 'number') return;
        console.log(eval(str), str)
        return eval(str) === this.resultNumber ? this.showModalComplete = true : this.showModalError = true
      }
      if (panelEl.element === '?') {
        let res = '';
        for (let i = 0; i <= this.generationExpression.length; i++) {
          if (i === 0) {
            if (this.generationExpression[i] === '**'
                || this.generationExpression[i] === '*'
                || this.generationExpression[i] === '/') {
              if (this.generationExpression[i] === '**' && Math.sqrt(this.resultNumber) % 2 === 0) {
                res += Math.sqrt(this.resultNumber)
                this.generationExpression.splice(i, 1)
              } else if (this.generationExpression[i] === '**') {
                res += 1 + '**'
                this.generationExpression.splice(i, 1)
              } else if (this.generationExpression[i] === '*' && this.resultNumber % 2 === 0) {
                res += this.resultNumber / 2 + '*'
                this.generationExpression.splice(i, 1)
              } else if (this.generationExpression[i] === '*' && this.resultNumber % 2 !== 0) {
                res += this.resultNumber + "*"
                this.generationExpression.splice(i, 1)
              } else if (this.generationExpression[i] === '/') {
                res += this.resultNumber * 2 + '/'
                this.generationExpression.splice(i, 1)
              }
            } else if (this.generationExpression[i] === '+'
                || this.generationExpression[i] === '-') {
              if (this.generationExpression[i] === '+' && this.resultNumber % 2 === 0) {
                res += this.resultNumber / 2 + '+'
                this.generationExpression.splice(i, 1)
              } else if (this.generationExpression[i] === '+' && this.resultNumber % 2 !== 0) {
                res += 0 + '+'
                this.generationExpression.splice(i, 1)
              } else if (this.generationExpression[i] === '-') {
                res += this.resultNumber + this.resultNumber + '-'
                this.generationExpression.splice(i, 1)
              }
            }
          } else {

          }
        }
        console.log(res)

        // this.generationExpression.forEach((operator, i) => {
        //   console.log(this.generationExpression)
        //   if (operator === '**' || operator === '*' || operator === '/') {
        //     if (operator === '**' && Math.sqrt(this.resultNumber) % 2 === 0) {
        //       res += Math.sqrt(this.resultNumber)
        //       this.generationExpression.splice(i, 1)
        //     } else if (operator === '**') {
        //       res += 1 + '**'
        //       this.generationExpression.splice(i, 1)
        //     }
        //     if (operator === '*' && this.resultNumber % 2 === 0) {
        //       res += this.resultNumber / 2 + '*'
        //       this.generationExpression.splice(i, 1)
        //     } else {
        //       res += this.resultNumber + "*"
        //       this.generationExpression.splice(i, 1)
        //     }
        //     if (operator === '/') {
        //       res += this.resultNumber * 2 + '/'
        //       this.generationExpression.splice(i, 1)
        //     }
        //   }
        // })
        // console.log(res)
      }
    },
    tapNumber(panelEl) {
      if (typeof panelEl.element !== 'number') return
      this.focusInput()
      this.$refs['inp' + this.count][0].value += panelEl.element
    },
    focusInput() {
      this.$refs['inp' + this.count][0].focus()
    },

  },
  computed: {
    generationExpression() {
      for (this.count = 0; this.count <= this.getFields.length - 2; this.count++) {
        this.expression.push(this.$refs['opers' + this.count][0].innerText)
      }
      return this.expression
    },
    getComplexityRange() {
      return loadStorageNumber('complexityRange')
    },
    getFields() {
      for (let i = 0; i <= this.getComplexityRange; i++) {
        this.fields.push(i)
      }
      return this.fields
    },
    getOptions() {
      return loadStorageBoolean("options")
    },
    getOperators() {
      if (this.getOptions.sum === true) {
        this.operators.push('+')
      }
      if (this.getOptions.diff === true) {
        this.operators.push('-')
      }
      if (this.getOptions.mult === true) {
        this.operators.push('*')
      }
      if (this.getOptions.division === true) {
        this.operators.push('/')
      }
      if (this.getOptions.degree === true) {
        this.operators.push('**')
      }
      return this.operators
    },
    getPanel() {
      return this.$store.getters.getPanel
    },
    resultNumber() {
      return Math.floor(Math.random() * 10000)
    },


  },
  mounted() {
    this.focusInput();
  },
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