<script lang="ts" setup>

</script>

<template>
  <div class="w-full h-[100px] flex bg-primary items-center justify-between">
    <img src="../../assets/logo-white.png" alt="Logo de Medac" width="380" />
    <div
      class="relative flex justify-end w-[750px] text-center font-bold not-supports-[display:grid]:flex"
    >
      <router-link to="/dashboard/alumn">
        <button
          class="w-[200px] h-[100px] px-4 bg-gray-light hover:bg-orange-600 hover:not-focus:bg-secondary text-black text-[19px] hover:text-[20px] cursor-pointer"
        >
          Alumn@s
        </button>
      </router-link>

      <router-link to="/dashboard/company">
        <button
          class="w-[200px] h-[100px] text-white px-4 hover:bg-orange-600 hover:not-focus:bg-secondary hover:text-black text-[19px] hover:text-[20px] cursor-pointer"
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
