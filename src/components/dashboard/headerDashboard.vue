<!--Here we give form to the Header-->
<script lang="ts" setup></script>

<template>
  <div
    class="w-full h-[100px] flex bg-blue-950 items-center justify-between"
  >
    <h1 class="relative text-white">Davante icon</h1>
    <div class="relative flex justify-end w-[750px] text-center font-bold">
      <button
        href=""
        class="w-[200px] h-[100px] px-4 bg-gray-100 text-black text-[19px] hover:text-[20px]"
      >
        Alumn@s
      </button>
      <router-link to="/empresa">
      <button
        href=""
        class="w-[200px] h-[100px] text-white px-4 hover:bg-gray-100 hover:text-black text-[19px] hover:text-[20px]"
      >
        Empresas
      </button></router-link>
      <router-link to="/"><button
        class="w-[200px] h-[100px] text-black px-4 bg-gray-100 hover:bg-gray-300 hover:text-black text-[19px] hover:text-[20px]"
      >
        Cerrar sesion
      </button></router-link>
    </div>
  </div>
</template>
