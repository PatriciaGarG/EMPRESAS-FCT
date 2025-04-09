<script lang="ts" setup>
import { ref } from "vue";
import { getAlumn } from "../services/AlumnService";
import type { Alumn } from "../../types/alumn.d.ts";
import type { Ref } from "vue";
import { onMounted } from "vue";

const alumnData: Ref<Alumn[] | null> = ref([]);
const getAlumnData = async () => {
  try {
    const response = await getAlumn();
    alumnData.value = response;
    console.log("Alumn data fetched successfully:", alumnData.value);
  } catch (error) {
    console.error("Error fetching alumn data:", error);
  }
};
onMounted(() => {
  getAlumnData();
});

</script>
<template>
<form class="flex flex-col items-center justify-center h-screen bg-gray-100">
  <div class="w-full max-w-md p-8 space-y-3 rounded-xl shadow-md bg-white">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido 2</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(alumno, index) in alumnData" :key="index">
          <td class="px-6 py-4 whitespace-nowrap">{{ alumno.first_name }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ alumno.last_name_1 }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ alumno.last_name_2 }}</td>
        </tr>
      </tbody> 
    </table>
  </div>

</form>
</template>