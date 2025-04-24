<script lang="ts" setup>
  import AlumnInfo from './AlumnInfo.vue';
  import { computed, inject, provide, ref } from 'vue';
  import CurrentCompany from './CurrentCompany.vue';
  import ActionButton from '../common/ActionButton.vue';
  import type { AlumnData } from '../../types/alumnData';
  import Modal from '../common/Modal.vue';
  import DeleteAlumn from './DeleteAlumn.vue';
import CompanyForm from './CompanyForm.vue';

  const modalCurrentCompany = ref();

function openCurrentCompanyModal() {
  modalCurrentCompany.value?.openModal();
}

  const alumnData = inject('alumnData') as AlumnData;

  // Computed para manejar la reactividad de has_company
  const hasCompany = computed(() => alumnData.has_company);

  const modalDelete = ref();


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
      <router-link to="/dashboard/alumn">
      <div
      @click="$router.back"
        class="relative min-w-[45px] min-h-[45px] bg-white rounded-full cursor-pointer hover:border-primary hover:bg-primary border-1 transition-all"
      >
        <img
          class="absolute top-[2px] left-[3px]"
          src="../../assets/return.png"
          alt="icono de volver atrás"
          width="40"
        />
      </div>
    </router-link>
      <div>
        <p class="bg-primary py-4 px-6 rounded-2xl text-2xl text-white">
          {{ alumnData.full_name }}
        </p>
      </div>
    </section>
    <section class="flex gap-4 h-fit justify-end self-end">
      <ActionButton @click="openDeleteModal"> Eliminar alumn@ </ActionButton>
    </section>
    <AlumnInfo />
    <section
      class="border-2 text-xl bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow w-full max-w-full overflow-hidden"
    >
      <CurrentCompany v-if="hasCompany" />
      <p v-else>
        <h1 class="text-2xl font-bold text-gray-800">🏢 Empresa actual</h1>
        <p class="mt-4 mb-10">{{ alumnData.full_name }} no tiene una empresa asignada en este momento</p>
        <div
    @click="openCurrentCompanyModal"
    class="flex items-center justify-center p-2 rounded-2xl bg-gray-200 gap-2 cursor-pointer font-semibold hover:bg-gray-300"
  >
    <img
      src="../../assets/add-icon.png"
      alt="icono de editar"
      class="size-6 cursor-pointer"
    />
    <button class="text-[0.9rem] cursor-pointer">Añadir empresa</button>
  </div>
      </p>
    </section>
    <Modal ref="modalDelete" title="¿Seguro que quieres borrar este alumn@?">
      <DeleteAlumn @close="modalDelete?.closeModal()" />
    </Modal>
    <Modal ref="modalCurrentCompany" title="Modificar datos del alumn@">
    <CompanyForm @close="modalCurrentCompany?.closeModal()" />
  </Modal>
  </main>
</template>
