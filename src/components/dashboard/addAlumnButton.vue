<script setup lang="ts">
import Modal from '../common/Modal.vue';
import { ref } from 'vue';
import addAlumn from './addAlumn.vue';

const modalAddAlumn = ref();

  function openAddAlumnModal() {
    // Open the modal when the button is clicked
    modalAddAlumn.value?.openModal();
  };

</script>



<template>
    <Modal ref="modalAddAlumn" title="Añadir alumnos"><addAlumn></addAlumn></Modal>
    <div class="bg-gray-100">
    <button @click="openAddAlumnModal" class="relative flex justify-center h-full bg-gray-200 ring-2 ring-blue-950 p-2 rounded-2xl shadow-2xl hover:ring-3 ml-[90%] mt-[250px]">Insertar alumn@</button>
    </div>
</template>