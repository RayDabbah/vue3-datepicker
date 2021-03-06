<template>
  <div class="calendar-root">
    <input
        @click="open = !open"
        :style="inputStyle"
        type="text"
        readonly
        :value="selectedDate?.toLocaleDateString()"
        v-if="!stayOpen"
    >
    <div class="container" ref="calendar">
      <div v-if="open || stayOpen" class="calendar-wrapper" :class="{'toggle-calendar-wrapper': !stayOpen}">
        <header>
          <div
              @click="() => setMonth('-')"
              class="arrow"
          >&lt;
          </div>
          <div>{{ months[openMonthDate.getMonth()] }} {{ openMonthDate.getFullYear() }}</div>
          <div
              @click="() => setMonth('+')"
              class="arrow"
          >&gt;
          </div>
        </header>
        <div class="weekdays">
          <div
              v-for="day in dow"
          >{{ day }}
          </div>
        </div>
        <div class="calendar">
          <div
              class="cell"
              v-for="n in startDate"
          ></div>
          <div
              @click="() => setDate(date)"
              v-for="date in daysInMonth"
              class="cell selectable"
              :class="{selected: datesEqual(date, value)}"
          >
            <div>{{ date.getDate() }}</div>
          </div>
          <div
              class="cell"
              v-for="n in (numberOfCells - amountOfDaysInMonth - startDate)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted, defineProps, defineEmits} from 'vue';
import {dow, months, range, sum, roundUpToMultipleOf, datesEqual} from '../utils.js';

const props = defineProps({
  openOnDate: {type: Date, default: () => new Date()},
  value: {type: Date, required: false},
  inputStyle: {type: [String, Object], required: false},
  stayOpen: {type: Boolean, default: false,},
});

const calendar = ref(null)
const emit = defineEmits(['input'],)

const openMonthDate = ref(props.value || new Date(props.openOnDate.getTime()));

const open = ref(false);

const year = computed(() => openMonthDate.value.getFullYear());

const month = computed(() => openMonthDate.value.getMonth());

const selectedDate = ref(null)

const startDate = computed(() =>
    new Date(year.value, month.value).getDay()
);

const amountOfDaysInMonth = computed(
    () => 40 - new Date(year.value, month.value, 40).getDate()
);

const daysInMonth = computed(() =>
    range(amountOfDaysInMonth.value, 1).map(
        (date) =>
            new Date(
                openMonthDate.value.getFullYear(),
                openMonthDate.value.getMonth(),
                date
            )
    )
);

const setMonth = (operator) =>
    (openMonthDate.value = new Date(
        openMonthDate.value.getFullYear(),
        sum(openMonthDate.value.getMonth())(operator)(1)
    ));

const numberOfCells = computed(() =>
    roundUpToMultipleOf(7, amountOfDaysInMonth.value + startDate.value)
);

const setDate = d => {
  selectedDate.value = d;
  emit('input', d)
};

onMounted(() => {
  document.addEventListener('click', ({target}) => {
    if (target.contains(calendar.value)) {
      open.value = false;
    }
  })
})

</script>

<style scoped>
.calendar-root {
  width: max-content;
  position: relative;
  display: inline-block;
}

header {
  display: flex;
  justify-content: space-between;
}

.container {
  position: relative;
  z-index: 1000;
}

.toggle-calendar-wrapper {
  position: absolute;
  left: 20%;

}

.calendar-wrapper {
  width: max-content;
  box-shadow: #8080801f 3px 3px 5px;
  padding: 5px;
  border-radius: 4px;
  background: white;
}

.calendar {
  display: grid;
  grid-template-columns: repeat(7, 32px);
  grid-auto-rows: 32px;
  gap: 8px;
  padding: 8px;
  font-weight: 500;
}

.weekdays {
  padding: 8px;
  display: grid;
  grid-template-columns: repeat(7, 32px);
  grid-template-rows: 32px;
  border-bottom: 1px solid #3C3C431E;
  font-weight: 500;
  gap: 8px;
  align-items: end;
  text-align: center;
}

.cell {
  background-color: white;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  transition: 150ms ease-in-out;
}

.selectable.cell:hover {
  cursor: pointer;
  background: cornflowerblue;
  color: white;
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