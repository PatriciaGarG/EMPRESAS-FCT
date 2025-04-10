<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import type { DataUser } from '../../types/auth';
  import { signInWithEmail } from '../services/auth';
  import { useRouter } from 'vue-router';

  //Router
  const router = useRouter();

  //Datos del formulario
  const dataUser: DataUser = reactive({
    email: '',
    password: '',
  });

  //Errores
  const errors = reactive({
    email: '',
    password: '',
    login: '',
  });

  //Carga
  const isLoading = ref<boolean>(false);

  //Función para logear
  async function handleSubmit(e: Event) {
    e.preventDefault();

    // Limpiar errores
    errors.email = '';
    errors.password = '';

    // Validación básica
    if (!dataUser.email) {
      errors.email = 'Campo obligatorio';
    }

    if (!dataUser.password) {
      errors.password = 'Campo obligatorio';
    }

    // Si hay errores, no continuar
    if (errors.email || errors.password) {
      return;
    }

    // Cambiar el estado de carga a true
    isLoading.value = true;

    // Llamada a la API Supabase
    try {
      const { error } = await signInWithEmail(dataUser);

      if (error) {
        if (error.message === 'Invalid login credentials') {
          dataUser.password = '';
          errors.email = 'Email o contraseña incorrectas';
        } else {
          dataUser.email = '';
          dataUser.password = '';
          errors.login =
            'Ha ocurrido un error inesperado, inténtalo de nuevo más tarde';
        }
      } else {
        router.push('/dashboard');
      }
    } finally {
      isLoading.value = false;
    }
  }

  function handleInput(field: keyof typeof dataUser) {
    dataUser[field] = dataUser[field].trim();

    // Si el campo está vacío después de escribir, mostramos el error
    if (!dataUser[field]) {
      errors[field] = `Campo obligatorio`;
    } else {
      errors[field] = '';
    }
  }
</script>

<template>
  <main class="flex justify-center mt-5">
    <section class="border-2 px-10 pt-5 pb-7 border-gray-400 rounded-2xl">
      <h1 class="text-[1.7rem] font-light">Iniciar sesión</h1>
      <form @submit="handleSubmit" class="line relative pb-8">
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
              :class="{ 'border-red-500': errors.email }"
              placeholder="Introduce tu email"
              v-model="dataUser.email"
              @input="handleInput('email')"
            />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">
              {{ errors.email }}
            </p>
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
              :class="{ 'border-red-500': errors.password }"
              placeholder="Introduce tu contraseña"
              v-model="dataUser.password"
              @input="handleInput('password')"
            />
            <p v-if="errors.password" class="text-red-500 text-sm mt-1">
              {{ errors.password }}
            </p>
          </div>
        </div>
        <button
          class="w-full mt-9 rounded-md py-2 px-5 text-white hover:ring-2 hover:outline-none transition-all"
          :disabled="isLoading"
          :class="{
            'bg-primary hover:ring-secondary cursor-pointer': !isLoading,
            'bg-gray-400 cursor-not-allowed': isLoading,
          }"
        >
          Iniciar sesión
        </button>
        <p v-if="errors.login" class="text-red-500 text-sm mt-1">
          {{ errors.login }}
        </p>
      </form>
      <div class="flex justify-center pt-4">
        <p>
          ¿Eres nuev@?
          <router-link
            to="/register"
            class="text-secondary text-center underline cursor-pointer"
            >Regístrate aquí</router-link
          >
        </p>
      </div>
    </section>
  </main>
</template>
