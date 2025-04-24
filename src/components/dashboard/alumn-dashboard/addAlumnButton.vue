<script setup lang="ts">
  import Modal from '../../common/Modal.vue';
  import { ref } from 'vue';
  import addAlumn from './addAlumn.vue';

  const modalAddAlumn = ref();

  function openAddAlumnModal() {
    // Open the modal when the button is clicked
    modalAddAlumn.value?.openModal();
  }
</script>

<template>
  <Modal ref="modalAddAlumn" title="Añadir alumnos"
    ><addAlumn @close="modalAddAlumn?.closeModal()"
  /></Modal>
    <button
      @click="openAddAlumnModal"
    >
      Insertar alumn@
    </button>
</template>
