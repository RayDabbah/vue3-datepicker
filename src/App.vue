<template>
  <h1 v-if="date">{{date}}</h1>
  <h1 v-else>Please select a date</h1>
  <DatePicker
    @input="setDate"
    :value="date"
    :inputStyle="{background: 'lightgrey'}"
    :stay-open="true"
  />
</template>

<script>
import { defineComponent, ref } from "vue";
import DatePicker from "./components/DatePicker.vue";

export default defineComponent({
  name: "App",
  setup() {
    const date = ref();

    const setDate = (newDate) => (date.value = newDate);

    return {
      date,
      setDate,
    };
  },
  components: {
    DatePicker,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
