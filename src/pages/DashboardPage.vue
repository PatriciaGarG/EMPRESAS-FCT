<script lang="ts" setup>
  //import { ref } from "vue";
  import headerDashboard from '../components/dashboard/headerDashboard.vue';
  import tableDashboard from '../components/dashboard/tableDashboard.vue';
  import addAlumnButton from '../components/dashboard/addAlumnButton.vue';
</script>

<template>
  <headerDashboard></headerDashboard>
  <addAlumnButton></addAlumnButton>
  <tableDashboard></tableDashboard>
</template>
