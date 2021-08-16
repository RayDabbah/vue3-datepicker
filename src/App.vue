<template>
  <img alt="Vue logo" src="./assets/logo.png"/>
  <DatePicker :openDate="new Date(2021, 8)"/>
</template>

<script>
import {defineComponent} from 'vue'
import DatePicker from "./components/DatePicker.vue";

export default defineComponent({
  name: 'App',
  components: {
    DatePicker,
  }
})
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
