<script lang="ts" setup>
  import { ref, defineEmits } from 'vue';

  // Definir un emit para cerrar el modal
  const emit = defineEmits(['close']);

  // Definir si el modal está visible
  const isVisible = ref(false);

  // Función para abrir el modal
  const openModal = () => {
    isVisible.value = true;
  };

  // Función para cerrar el modal
  const closeModal = () => {
    isVisible.value = false;
    emit('close');
  };

  // Exponer `openModal` como una función accesible desde fuera del componente
  defineExpose({
    openModal,
  });
</script>

<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 flex justify-center items-center z-50 transition-all"
    :style="{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }"
  >
    <div
      class="bg-white p-8 rounded-xl shadow-lg max-w-[80vw] w-full transition-all opacity-100 max-h-[90vh] overflow-y-auto"
    >
      <div class="flex justify-between items-center">
        <h3 class="text-xl font-semibold">Esto es un ejemplo</h3>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-800">
          &times;
        </button>
      </div>
      <form class="mt-4">
        <!-- Nombre del Alumno -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            id="name"
            type="text"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value="Juan Palomo Cuesta"
            disabled
          />
        </div>

        <!-- Estado -->
        <div class="mb-4">
          <label for="status" class="block text-sm font-medium text-gray-700">Estado</label>
          <input
            id="status"
            type="text"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value="Cursando"
            disabled
          />
        </div>

        <!-- DNI -->
        <div class="mb-4">
          <label for="dni" class="block text-sm font-medium text-gray-700">DNI</label>
          <input
            id="dni"
            type="text"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value="12345678J"
            disabled
          />
        </div>

        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value="sisi@medac.com"
            disabled
          />
        </div>

        <!-- Teléfono -->
        <div class="mb-4">
          <label for="phone" class="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            id="phone"
            type="text"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value="111222444"
            disabled
          />
        </div>

        <!-- Centro -->
        <div class="mb-4">
          <label for="center" class="block text-sm font-medium text-gray-700">Centro</label>
          <input
            id="center"
            type="text"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value="Medac Málaga"
            disabled
          />
        </div>

        <!-- Ciclo -->
        <div class="mb-4">
          <label for="cycle" class="block text-sm font-medium text-gray-700">Ciclo</label>
          <input
            id="cycle"
            type="text"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value="Desarrollo de Aplicaciones Web"
            disabled
          />
        </div>

        <!-- Modalidad -->
        <div class="mb-4">
          <label for="modality" class="block text-sm font-medium text-gray-700">Modalidad</label>
          <input
            id="modality"
            type="text"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value="Remoto"
            disabled
          />
        </div>

        <!-- Provincia -->
        <div class="mb-4">
          <label for="province" class="block text-sm font-medium text-gray-700">Provincia</label>
          <input
            id="province"
            type="text"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value="Tarragona"
            disabled
          />
        </div>

        <!-- Botón para cerrar el modal -->
        <div class="mt-6 flex justify-end">
          <button @click="closeModal" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Cerrar</button>
        </div>
      </form>

      <div class="mt-6 flex justify-end">
        <button
          @click="closeModal"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* Animación de desvanecimiento */
  .transition-all {
    transition: all 0.3s ease-in-out;
  }
</style>
