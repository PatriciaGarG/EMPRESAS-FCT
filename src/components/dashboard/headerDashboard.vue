<!--Here we give form to the Header-->
<script lang="ts" setup></script>

<template>
  <div
    class="relative w-full h-[100px] flex bg-primary items-center justify-between"
  >
    <img
      src="../../assets/logo-basic.png"
      alt="Logo de Medac"
      class="bg-gray-light max-h-25 p-3"
    />

    <div class="relative flex justify-end w-[750px] text-center font-bold">
      <button
        class="w-[200px] bg-gray-light hover:bg-secondary text-black hover:text-white text-[19px] hover:text-[20px]"
      >
        Alumn@s
      </button>

      <router-link to="/empresa">
        <button
          class="w-[200px] h-[100px] hover:bg-secondary text-white hover:text-black text-[19px] hover:text-[20px]"
        >
          Empresas
        </button></router-link
      >

      <router-link to="/"
        ><button
          class="relative flex items-center justify-center w-[200px] hover:bg-gray-light hover:text-black text-black text-[19px] hover:text-[20px]"
        >
          Cerrar sesion
        </button></router-link
      >
    </div>
  </div>
</template>
