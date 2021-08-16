<template>
  <div class="calendar-wrapper">
    <header>
      <div @click="() => setMonth('-')" class="arrow">&lt;</div>
      <div>{{ months[openMonthDate.getMonth()] }} {{ openMonthDate.getFullYear() }}</div>
      <div @click="() => setMonth('+')" class="arrow">&gt;</div>
    </header>
    <div class="calendar">
      <div class="cell" v-for="n in startDate"></div>
      <div
          @click="$emit('input', date)"
          v-for="date in daysInMonth"
          class="cell"
          :class="{selected: date.getTime() === value?.getTime()}"
      >
        <div>{{ date.getDate() }}</div>
      </div>
      <div class="cell" v-for="n in (numberOfCells - amountOfDaysInMonth - startDate)"></div>
    </div>
  </div>
</template>

<script>

import {ref, computed} from "vue";
import {dow, months, range, sum, roundUpToMultipleOf} from "../utils.js";


export default {
  name: "DatePicker",
  props: {
    openOnDate: {type: Date, required: false},
    value: {type: Date, required: false,},
  },
  emits: ['input'],
  setup(props) {

    const openMonthDate = ref(new Date(props.openOnDate?.getTime()))
    const year = computed(() => openMonthDate.value.getFullYear())
    const month = computed(() => openMonthDate.value.getMonth())
    const startDate = computed(() => new Date(year.value, month.value).getDay())
    const amountOfDaysInMonth = computed(() => 40 - (new Date(year.value, month.value, 40)).getDate());
    const daysInMonth = computed(() => range(amountOfDaysInMonth.value, 1).map(date => new Date(openMonthDate.value.getFullYear(), openMonthDate.value.getMonth(), date)))
    const setMonth = (operator) => openMonthDate.value = new Date(openMonthDate.value.getFullYear(), sum(openMonthDate.value.getMonth())(operator)(1));
    const numberOfCells = computed(() => roundUpToMultipleOf(7, amountOfDaysInMonth.value + startDate.value))

    return {
      startDate,
      daysInMonth,
      numberOfCells,
      dow,
      amountOfDaysInMonth,
      months,
      openMonthDate,
      setMonth,
    }
  },
}
</script>

<style scoped>
header {
  display: flex;
  /*align-items: center;*/
  justify-content: space-between;
}

.calendar-wrapper {
  margin: 0 auto;
  width: max-content;
}

.calendar {
  border: solid 1px black;
  display: grid;
  grid-template-columns: repeat(7, 2rem);
  grid-auto-rows: 2rem;
  gap: 1px;
  background-color: black;

}

.cell {
  background-color: white;
  font-size: .7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.selected {
  background-color: darkblue;
  color: white;
}

.arrow {
  cursor: pointer;
  font-weight: 500;
  transition: 300ms;
}

.arrow:hover {
  transform: scale(1.5);
}
</style>