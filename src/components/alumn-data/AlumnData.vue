<script lang="ts" setup>
import AlumnInfo from './AlumnInfo.vue';
import { inject } from 'vue';

const alumnData = inject('alumnData') as AlumnData;
</script>

<template>
  <main
    class="w-full p-10 grid grid-cols-[1fr_1fr] grid-rows-[auto_auto_auto] align-center gap-x-10"
  >
    <section class="flex h-fit gap-6 items-center mb-5">
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
           {{ alumnData.name }}
        </p>
      </div>
    </section>
    <section>
        <!-- Hacer botones componentes reutilizables -->
      <button>Modificar datos</button>
      <button>Eliminar alumnos</button>
    </section>
    <AlumnInfo />
  </main>
</template>
