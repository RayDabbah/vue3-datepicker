<template>
  <h1>{{ dow[startDate] }}</h1>
  <h1>{{startDate }}</h1>
  <div class="calendar">
    <div :style="{'grid-column': date === 1 ? startDate + 1  : null, 'ba': 'yellow'}" v-for="date in daysInMonth" class="cell">{{ date }}</div>
  </div>
</template>

<script>

import {ref, reactive} from "vue";


const dow = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
    openDate: {type: Date, default: () => new Date()}
  },
  setup(props) {

    const year = props.openDate.getFullYear();
    const month = props.openDate.getMonth();
    const startDate = ref(new Date(year, month).getDay());
    const daysInMonth = ref(range(40 - (new Date(year, month, 40)).getDate(), 1));

    console.log(startDate.value);

    return {
      startDate,
      daysInMonth,
      dow
    }
  }

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
}
</style>