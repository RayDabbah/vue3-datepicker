<template>
  <h1>{{ dow[startDate] }}</h1>
  <h1>{{ startDate }}</h1>
  <header>
    <div>{{ months[openMonthDate.getMonth()] }}</div>
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
    <div class="cell" v-for="n in (42 - amountOfDaysInMonth - startDate)"></div>
  </div>
</template>

<script>

import {ref} from "vue";


const dow = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const range = (end, start = 0) => {
  let arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }

  return arr;
}

export default {
  name: "DatePicker",
  props: {
    openOnDate: {type: Date, required: false},
    value: {type: Date, required: false,},
  },
  setup(props) {

    const openMonthDate = ref(new Date(props.openOnDate?.getTime()))
    const year = openMonthDate.value.getFullYear()
    const month = openMonthDate.value.getMonth()
    const startDate = ref(new Date(year, month).getDay())
    const amountOfDaysInMonth = 40 - (new Date(year, month, 40)).getDate();
    const daysInMonth = ref(range(amountOfDaysInMonth, 1).map(date => new Date(openMonthDate.value.getFullYear(), openMonthDate.value.getMonth(), date)))


    return {
      startDate,
      daysInMonth,
      dow,
      amountOfDaysInMonth: ref(amountOfDaysInMonth),
      months,
      openMonthDate,
    }
  },
}
</script>

<style scoped>
.calendar {
  margin: 0 auto;
  border: solid 1px black;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: black;
  width: 10rem;
  height: 10rem;
}

.cell {
  background-color: white;
  font-size: .7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.selected{
  background-color: darkblue;
  color: white;
}
</style>