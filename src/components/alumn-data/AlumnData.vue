<script lang="ts" setup>
  import AlumnInfo from './AlumnInfo.vue';
  import { computed, inject, provide, ref } from 'vue';
  import CurrentCompany from './CurrentCompany.vue';
  import ExtraInfo from './ExtraInfo.vue';
  import ActionButton from '../common/ActionButton.vue';
  import type { AlumnData } from '../../types/alumnData';
  import Modal from '../common/Modal.vue';
  import AlumnForm from './AlumnForm.vue';
  import CompanyForm from './CompanyForm.vue';
  import DeleteAlumn from './DeleteAlumn.vue';

  const alumnData = inject('alumnData') as AlumnData;

  // Computed para manejar la reactividad de has_company
  const hasCompany = computed(() => alumnData.has_company);

  const modalAlumn = ref();
  const modalCompany = ref();
  const modalDelete = ref();

  function openAlumnModal() {
    modalAlumn.value?.openModal();
  }

  function openCompanyModal() {
    modalCompany.value?.openModal();
  }
  function openDeleteModal() {
    modalDelete.value?.openModal();
  }

  // Función para actualizar has_company
  const updateHasCompany = (newValue: boolean) => {
    alumnData.has_company = newValue;
  };


  provide('updateHasCompany', updateHasCompany);
</script>

<template>
  <main
    class="w-full p-10 grid grid-cols-[1fr_1fr] grid-rows-[auto_auto_auto] align-center gap-x-10 gap-y-5"
  >
    <section class="flex h-fit gap-6 items-center">
      <div
        class="relative min-w-[45px] min-h-[45px] bg-white rounded-full cursor-pointer hover:border-primary hover:bg-primary border-1 transition-all"
      >
        <img
          class="absolute top-[2px] left-[3px]"
          src="../../assets/return.png"
          alt="icono de volver atrás"
          width="40"
        />
      </div>
      <div>
        <p class="bg-primary py-4 px-6 rounded-2xl text-2xl text-white">
          {{ alumnData.full_name }}
        </p>
      </div>
    </section>
    <section class="flex gap-4 h-fit justify-end self-end">
      <ActionButton @click="openAlumnModal"> Modificar alumn@ </ActionButton>
      <ActionButton @click="openCompanyModal"> Modificar empresa </ActionButton>
      <ActionButton @click="openDeleteModal"> Eliminar alumn@ </ActionButton>
    </section>
    <AlumnInfo />
    <section
      class="text-xl w-full max-w-full overflow-hidden"
      id="synoptic_table"
    >
      <CurrentCompany v-if="hasCompany" />
      <p v-else>
        Aquí hay que ver que información poner cuando el alumno no tiene empresa
      </p>
    </section>
    <ExtraInfo />
    <Modal ref="modalAlumn" title="Modificar datos del alumn@">
      <AlumnForm @close="modalAlumn?.closeModal()" />
    </Modal>
    <Modal ref="modalCompany" title="Modificar datos de la empresa actual">
      <CompanyForm @close="modalCompany?.closeModal()" />
    </Modal>
    <Modal ref="modalDelete" title="¿Seguro que quieres borrar este alumn@?">
      <DeleteAlumn @close="modalDelete?.closeModal()" />
    </Modal>
  </main>
</template>
