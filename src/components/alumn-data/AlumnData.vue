<script lang="ts" setup>
  import AlumnInfo from './AlumnInfo.vue';
  import { inject } from 'vue';
  import CurrentCompany from './CurrentCompany.vue';
  import ExtraInfo from './ExtraInfo.vue';
  import type { AlumnData } from '../../types/alumnData';

  const alumnData = inject('alumnData') as AlumnData;
</script>

<template>
  <main
    class="w-full p-10 grid grid-cols-[1fr_1fr] grid-rows-[auto_auto_auto] align-center gap-x-10 gap-y-5"
  >
    <section class="flex h-fit gap-6 items-center">
      <div
        class="relative w-[45px] h-[45px] bg-white rounded-full cursor-pointer hover:border-secondary hover:bg-secondary border-1 transition-all"
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
          {{ alumnData.name }}
        </p>
      </div>
    </section>
    <section class="flex gap-4 h-fit justify-end self-end">
      <!-- Hacer botones componentes reutilizables -->
      <button
        class="bg-gray-600 px-6 py-3 rounded-3xl text-white cursor-pointer hover:bg-secondary"
      >
        Modificar datos
      </button>
      <button
        class="bg-gray-600 px-6 py-3 rounded-3xl text-white cursor-pointer hover:bg-secondary"
      >
        Eliminar alumno
      </button>
    </section>
    <AlumnInfo />
    <section
      class="w-full border-2 text-xl bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
    >
      <CurrentCompany v-if="alumnData.status !== 'sin empresa'" />
      <p v-else>Aquí hay que ver que información poner cuando el alumno no tiene empresa</p>
    </section>
    <ExtraInfo />
  </main>
</template>
