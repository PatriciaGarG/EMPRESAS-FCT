<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';

  const route = useRoute();

  const isAlumnActive = computed(() => route.path.includes('/dashboard/alumn'));
  const isCompanyActive = computed(() =>
    route.path.includes('/dashboard/company')
  );
</script>

<template>
  <div class="w-full h-[100px] flex bg-primary items-center justify-between">
    <img src="../../assets/logo-white.png" alt="Logo de Medac" width="380" />
    <div
      class="relative flex justify-end w-[750px] text-center font-bold not-supports-[display:grid]:flex"
    >
      <router-link to="/dashboard/alumn">
        <button
          :class="[
            'w-[200px] h-[100px] px-4 text-[19px] hover:text-[20px] cursor-pointer',
            isAlumnActive
              ? 'bg-gray-light text-black'
              : 'bg-primary text-white hover:bg-orange-600',
          ]"
        >
          Alumn@s
        </button>
      </router-link>

      <router-link to="/dashboard/company">
        <button
          :class="[
            'w-[200px] h-[100px] px-4 text-[19px] hover:text-[20px] cursor-pointer',
            isCompanyActive
              ? 'bg-gray-light text-black'
              : 'bg-primary text-white hover:bg-orange-600',
          ]"
        >
          Empresas
        </button>
      </router-link>
      <router-link to="/"
        ><button
          class="w-[200px] h-[100px] text-black px-4 bg-gray-300 hover:bg-secondary hover:text-black text-[19px] hover:text-[20px] cursor-pointer"
        >
          Cerrar sesión
        </button></router-link
      >
    </div>
  </div>
</template>
