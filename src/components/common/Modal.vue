<script lang="ts" setup>
  import { ref, defineEmits } from 'vue';

  // Definir un emit para cerrar el modal
  const emit = defineEmits(['close']);

  //Props
  defineProps({
    title: String,
  });

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

  // Exponer funciones accesibles desde fuera del componente
  defineExpose({
    openModal,
    closeModal
  });

</script>

<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 flex justify-center items-center z-50 transition-all"
    :style="{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }"
  >
    <div
      class="bg-white p-8 rounded-xl shadow-lg w-[80vw] transition-all opacity-100"
    >
      <header class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold">{{ title }}</h3>
        <button
          @click="closeModal"
          class="text-gray-500 text-3xl hover:text-secondary cursor-pointer"
        >
          &times;
        </button>
      </header>
      <main class="overflow-y-auto max-h-[77vh] pr-8 pl-1 pb-1">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<style scoped>
  .transition-all {
    transition: all 0.3s ease-in-out;
  }
</style>
