<script setup lang="ts">
  import Modal from '../../common/Modal.vue';
  import { ref } from 'vue';
  import AddCompany from './AddCompany.vue';

  const modalAddCompany = ref();

  function openAddCompanyModal() {
    modalAddCompany.value?.openModal();
  }
</script>

<template>
  <Modal ref="modalAddCompany" title="Añadir nueva empresa">
    <AddCompany @close="modalAddCompany?.closeModal()"/>
  </Modal>
  <div class="">
    <button
      @click="openAddCompanyModal"
      class="relative flex justify-center h-full bg-gray-200 ring-2 ring-blue-950 p-2 rounded-2xl shadow-2xl hover:ring-3 ml-[90%] mt-[250px]">
      Crear empresa
    </button>
  </div>
</template>
