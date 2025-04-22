<script lang="ts" setup>
  //import { ref } from "vue";
  import headerDashboard from '../components/dashboard/headerDashboard.vue';
  import tableDashboard from '../components/dashboard/tableDashboard.vue';
  import addAlumnButton from '../components/dashboard/addAlumnButton.vue';
  import { onMounted, provide, reactive } from 'vue';
  import { getAlumn } from '../components/services/AlumnService';
  import type { Alumn, AlumnDB } from '../types/alumn';

  const alumnData = reactive([]) as Alumn[];
  // Define the type to be used in the table by the name we gave to the Alumn
  const getAlumnData = async () => {
    try {
      const data = await getAlumn();
      if (data) {
        const alumnDataDB = data as unknown as AlumnDB[];
        alumnDataDB.forEach((alumnDB) => {
          alumnData.push({
            id: alumnDB.id,
            name: `${alumnDB.first_name} ${alumnDB.last_name_1} ${alumnDB.last_name_2}`.trim(),
            dni: alumnDB.dni,
            phone: alumnDB.phone,
            company_name:
              alumnDB.internship && alumnDB.internship[0]
                ? alumnDB.internship[0].company_id?.name
                : null,
            company_id:
              alumnDB.internship && alumnDB.internship[0]
                ? alumnDB.internship[0].company_id?.id
                : null,
            email: alumnDB.email,
            enrollment_center: alumnDB.enrollment_center,
            modality_id: alumnDB.modality_id,
            cycle_id: alumnDB.cycle_id,
            province_id: alumnDB.province_id,
            status: alumnDB.status,
          });
        });
        console.log(alumnData);
        console.log('Alumn data fetched successfully:', alumnDataDB);
      }
    } catch (error) {
      console.error('Error fetching alumn data:', error);
    }
  };
  //Here we call the function to get the data from the API and we use it in the table
  onMounted(() => {
    getAlumnData();
  });

  provide('alumnData', alumnData);
</script>

<template>
  <headerDashboard></headerDashboard>
  <addAlumnButton></addAlumnButton>
  <tableDashboard></tableDashboard>
</template>
