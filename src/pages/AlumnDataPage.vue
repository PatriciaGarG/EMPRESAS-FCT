<template>
  <div class="bg-gray-light h-screen">
    <AlumnData />
  </div>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { onMounted, provide, reactive } from 'vue';
  import AlumnData from '../components/alumn-data/AlumnData.vue';
  import {
    fetchAlumnData,
    fetchCurrentCompanyData,
  } from '../components/services/alumn-data';

  // [*] INFORMACIÓN DEL ALUMNO [*]
  const route = useRoute();
  const id = route.params.id as string;

  const alumnData: AlumnData = reactive({
    id: '',
    name: '',
    enrollment_center: '',
    dni: '',
    phone: '',
    email: '',
    cycle: '',
    modality: '',
    province: '',
    status: '',
  });

  //Función para obtener los datos del alumno de Supabase e insertalos en el objeto
  const getAlumnData = async () => {
    const { data, error } = await fetchAlumnData(id);

    if (error) {
      console.log(error);
    } else {
      //Guardamos los datos en el reactive
      const alumn: AlumnDataDB = data[0];
      alumnData.id = id;
      alumnData.name =
        `${alumn.first_name} ${alumn.last_name_1} ${alumn.last_name_2 ? alumn.last_name_2 : ''}`.trim();
      alumnData.enrollment_center = alumn.enrollment_center;
      alumnData.dni = alumn.dni;
      alumnData.phone = alumn.phone;
      alumnData.email = alumn.email;
      alumnData.status = alumn.status;
      alumnData.province = alumn.province_id?.name;
      alumnData.cycle = alumn.cycle_id?.name;
      alumnData.modality = alumn.modality_id?.name;
    }
  };

  // Llamamos a la función cuando el componente se monta
  onMounted(() => {
    getAlumnData();
  });

  // Proporcionamos la variable a los hijos, nietos, etc...
  provide('alumnData', alumnData);

  // [*] INFORMACIÓN DE LA EMPRESA ACTUAL [*]
  if (alumnData.status !== 'sin empresa') {
    const currentCompanyData = reactive({
      company_id: {
        name: '',
      },
      cycle_id: {
        name: '',
      },
      end_date: '',
      start_date: '',
      result: ''
    });

    const getCurrentCompanyData = async () => {
      const { data, error } = await fetchCurrentCompanyData(id);

      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    };

    onMounted(() => {
      getCurrentCompanyData();
    });

    // Proporcionamos la variable a los hijos, nietos, etc...
    provide('alumnData', alumnData);
  }
</script>
