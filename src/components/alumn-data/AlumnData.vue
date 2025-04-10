<script lang="ts" setup>
    import { onMounted, reactive } from 'vue';
    import { fetchAlumnData } from '../services/alumn-data';
    import { useRoute } from 'vue-router'

    const route = useRoute()

    const alumnData = reactive({
      name: '',
      enrollment_center: '',
      dni: '',
      phone: '',
      email: '',
      addres: '',
      cycle: '',
      modality: '',
      province: '',
      status: '',
    });

    //ME QUEDÉ AQUÍ
    const id = route.params.id;

    const getAlumnData = async () => {
      const response = await fetchAlumnData();
      console.log(response);
    };

    // Llamamos a la función cuando el componente se monta
    onMounted(() => {
      getAlumnData();
    });
</script>

<template>
  <main
    class="bg-gray-200 w-full h-screen p-10 grid grid-cols-2 grid-rows-3 align-center"
  >
    <section class="flex h-fit gap-6 items-center">
      <div
        class="relative w-[45px] h-[45px] bg-white rounded-full cursor-pointer hover:border-secondary border-1 transition-all"
      >
        <img
          class="absolute top-[2px] left-[3px]"
          src="../../assets/return.png"
          alt="icono de volver atrás"
          width="40"
        />
      </div>
      <div>
        <p class="bg-primary py-4 px-6 rounded-2xl text-2xl text-white">
          Rosa Melano
        </p>
      </div>
    </section>
    <section>
      <button>Modificar datos</button>
      <button>Eliminar alumnos</button>
    </section>
    <section class="p-8 border-2 rounded-2xl">
      <h1>Datos</h1>
      <p>Nombre:</p>
      <p>Centro de matrulación:</p>
      <p>DNI:</p>
      <p>Teléfono:</p>
      <p>Email:</p>
      <p>Dirección:</p>
      <p>Ciclo cursante:</p>
      <p>Modalidad:</p>
      <p>Estado:</p>
    </section>
  </main>
</template>
