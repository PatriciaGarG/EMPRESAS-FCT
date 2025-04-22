<script lang="ts" setup>
  import AlumnInfo from './AlumnInfo.vue';
  import { inject, ref } from 'vue';
  import CurrentCompany from './CurrentCompany.vue';
  import ExtraInfo from './ExtraInfo.vue';
  import ActionButton from '../common/ActionButton.vue';
  import type { AlumnData } from '../../types/alumnData';
  import Modal from '../common/Modal.vue';
  import AlumnForm from './AlumnForm.vue';
  import CompanyForm from './CompanyForm.vue';

  const alumnData = inject('alumnData') as AlumnData;

  const modalAlumn = ref();
  const modalCompany = ref();

  function openAlumnModal() {
    modalAlumn.value?.openModal();
  }

  function openCompanyModal() {
    modalCompany.value?.openModal();
  }
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
      <ActionButton @click="console.log('eliminar')">
        Eliminar alumn@
      </ActionButton>
    </section>
    <AlumnInfo />
    <section
      class="border-2 text-xl bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow w-full max-w-full overflow-hidden"
    >
      <CurrentCompany v-if="alumnData.has_company" />
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
    <br>
  </main>
</template>
