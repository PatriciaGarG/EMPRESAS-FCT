<template>
  <div class="bg-gray-light h-screen">
    <HeaderCommon />
    <AlumnData />
  </div>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { onMounted, provide, watch } from 'vue';
  import AlumnData from '../components/alumn-data/AlumnData.vue';
  import HeaderCommon from '../components/common/HeaderCommon.vue';
  import { useAlumnData } from '../composables/useAlumnData';
  import { useCurrentCompanyData } from '../composables/useCurrentCompanyData';

  // Id del alumno de la URL
  const route = useRoute();
  const id = route.params.id as string;

  // Información del alumno
  const { alumnData, getAlumnData } = useAlumnData(id);

  // Información de la empresa
  const { currentCompanyData, getCurrentCompanyData } =
    useCurrentCompanyData(id);

  // Proporcionar la info a los hijos y nietos
  provide('currentCompanyData', currentCompanyData);
  provide('alumnData', alumnData);

  // Llamamos a las funciones cuando el componente se monta
  onMounted(() => {
    getAlumnData();
  });

  // Esperar a los datos del alumno y si hay una empresa, llamar a la DB
  watch(
    () => alumnData.status,
    (newStatus) => {
      if (newStatus && newStatus.toLowerCase() !== 'sin empresa') {
        getCurrentCompanyData();
      }
    }
  );
</script>
