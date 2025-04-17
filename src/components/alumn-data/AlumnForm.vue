<script lang="ts" setup>
  import { inject, onMounted, reactive, watch } from 'vue';
  import type { AlumnData } from '../../types/alumnData';
  import VueSelect, { type Option } from 'vue3-select-component';
  import { normalize } from '../../composables/useCommon';
  import { useSelectOptions } from '../../composables/useSelectOptions';

  const alumnData = inject('alumnData') as AlumnData;

  const { provincesData, modalitiesData, cyclesData, getSelectOptions } =
    useSelectOptions();

  const emit = defineEmits(['close']);

  const alumnDataForm = reactive({
    ...alumnData,
  });

  onMounted(() => {
    getSelectOptions();
  });

  // Función para eliminar tildes y mayus en el filtro en el select
  //Extraer lógica?
  const customFilter = (
    _option: Option<string>,
    label: string,
    search: string
  ) => {
    return normalize(label).includes(normalize(search));
  };
</script>

<template>
  <form @submit.prevent="console.log('guardado')" class="space-y-4">
    <div class="flex gap-5">
      <div class="basis-1/3">
        <label class="block font-semibold"
          >Nombre <span class="text-secondary">*</span></label
        >
        <input
          v-model="alumnDataForm.first_name"
          class="w-full border rounded px-4 py-2"
        />
      </div>
      <div class="basis-1/3">
        <label class="block font-semibold"
          >Primer apellido <span class="text-secondary">*</span></label
        >
        <input
          v-model="alumnDataForm.last_name_1"
          class="w-full border rounded px-4 py-2"
        />
      </div>
      <div class="basis-1/3">
        <label class="block font-semibold">Segundo apellido</label>
        <input
          v-model="alumnDataForm.last_name_2"
          class="w-full border rounded px-4 py-2"
          placeholder="Opcional"
        />
      </div>
    </div>
    <div class="flex gap-5 mt-8">
      <div class="basis-1/4">
        <label class="block font-semibold"
          >DNI <span class="text-secondary">*</span></label
        >
        <input
          v-model="alumnDataForm.dni"
          class="w-full border rounded px-4 py-2"
        />
      </div>
      <div class="basis-1/4">
        <label class="block font-semibold"
          >Teléfono <span class="text-secondary">*</span></label
        >
        <input
          v-model="alumnDataForm.phone"
          class="w-full border rounded px-4 py-2"
        />
      </div>
      <div class="basis-2/4">
        <label class="block font-semibold"
          >Email <span class="text-secondary">*</span></label
        >
        <input
          v-model="alumnDataForm.email"
          type="email"
          class="w-full border rounded px-4 py-2"
        />
      </div>
    </div>
    <div class="mt-8 flex gap-5">
      <div class="basis-1/2">
        <label class="block font-semibold"
          >Centro <span class="text-secondary">*</span></label
        >
        <input
          v-model="alumnDataForm.enrollment_center"
          class="w-full border rounded px-4 py-2"
        />
      </div>
      <div class="basis-1/2">
        <label class="block font-semibold mb-1"
          >Provincia <span class="text-secondary">*</span></label
        >
        <VueSelect
          v-model="alumnDataForm.province_id"
          :options="provincesData"
          :filter-by="customFilter"
          placeholder="Selecciona una provincia"
          class="custom-select"
        />
      </div>
    </div>
    <div class="mt-8 flex gap-5">
      <div class="basis-2/3">
        <label class="block font-semibold mb-1"
          >Ciclo <span class="text-secondary">*</span></label
        >
        <VueSelect
          v-model="alumnDataForm.cycle_id"
          :options="cyclesData"
          :filter-by="customFilter"
          placeholder="Selecciona una ciclo"
          class="custom-select"
        />
      </div>
      <div class="basis-1/3">
        <label class="block font-semibold mb-1"
          >Modalidad <span class="text-secondary">*</span></label
        >
        <VueSelect
          v-model="alumnDataForm.modality_id"
          :options="modalitiesData"
          :filter-by="customFilter"
          placeholder="Selecciona una modalidad"
          class="custom-select"
        />
      </div>
    </div>
    <div class="mt-10 flex gap-5">
      <button
        type="submit"
        class="bg-primary text-white px-4 py-2 rounded hover:outline-2 cursor-pointer hover:outline-secondary"
      >
        Guardar cambios
      </button>
      <button
        type="button"
        @click="emit('close')"
        class="bg-gray-600 text-white px-4 py-2 rounded hover:outline-2 cursor-pointer hover:bg-secondary"
      >
        Cancelar
      </button>
    </div>
  </form>
</template>
<style scoped>
  input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px #3b82f66e; /* un pequeño halo azul opcional */
  }

  .custom-select {
    --vs-border: 1px solid #000000; /* Similar al borde por defecto de los inputs */
    --vs-border-radius: 0.375rem; /* Redondear los bordes, igual que en los inputs */
    --vs-padding: 0.5rem 1rem; /* Padding similar a px-4 py-2 */
    --vs-font-size: 1rem; /* Ajusta el tamaño de la fuente */
    --vs-text-color: #000000; /* Color de texto oscuro (como en los inputs) */
    --vs-placeholder-color: #6b7280; /* Color del placeholder (gris) */
  }

  :deep(.single-value) {
    max-width: 50px;
  }
</style>
