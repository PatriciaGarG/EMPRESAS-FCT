<script lang="ts" setup></script>

<template>
  <main class="flex justify-center mt-5">
    <section class="border-2 px-10 pt-5 pb-10 border-gray-400 rounded-2xl">
      <h1 class="text-[1.7rem] font-light">Crear cuenta</h1>
      <form>
        <div class="mt-5">
          <label for="name" class="font-bold">Nombre</label>
          <div class="relative mt-1">
            <img
              src="../../assets/user-icon.png"
              alt="icono de usuario"
              width="25"
              class="absolute top-[6px] left-[7px]"
            />
            <input
              type="text"
              name="name"
              id="name"
              class="border-1 w-[300px] py-1 pr-1 pl-10 text-[1.1rem]"
              placeholder="Introduce tu nombre"
            />
          </div>
        </div>
        <div class="mt-5">
          <label for="email" class="font-bold">E-mail</label>
          <div class="relative mt-1">
            <img
              src="../../assets/email-icon.png"
              alt="icono de email"
              width="22"
              class="absolute top-[7px] left-[8px]"
            />
            <input
              type="text"
              name="email"
              id="email"
              class="border-1 w-[300px] py-1 pr-1 pl-10 text-[1.1rem]"
              placeholder="Introduce tu email"
            />
          </div>
        </div>
        <div class="mt-5">
          <label for="password" class="font-bold">Contraseña</label>
          <div class="relative mt-1">
            <img
              src="../../assets/pass-icon.png"
              alt="icono de password"
              width="22"
              class="absolute top-[7px] left-[8px]"
            />
            <input
              type="password"
              name="password"
              id="password"
              class="border-1 w-[300px] py-1 pr-1 pl-10 text-[1.1rem]"
              placeholder="Introduce tu contraseña"
            />
          </div>
        </div>
        <div class="mt-5">
          <label for="password-confirm" class="font-bold"
            >Confirma tu contraseña</label
          >
          <div class="relative mt-1">
            <img
              src="../../assets/pass-icon.png"
              alt="icono de password"
              width="22"
              class="absolute top-[7px] left-[8px]"
            />
            <input
              type="password"
              name="password-confirm"
              id="password-confirm"
              class="border-1 w-[300px] py-1 pr-1 pl-10 text-[1.1rem]"
              placeholder="Introduce tu contraseña"
            />
          </div>
        </div>
        <button
          class="w-full mt-9 bg-[#0834ac] rounded-md py-2 px-5 text-white hover:cursor-pointer hover:ring-2 hover:ring-[#68b3fa] hover:outline-none transition-all"
        >
          Registrarse
        </button>
      </form>
    </section>
  </main>
</template>
