<script lang="ts" setup>
  import { inject, onMounted, reactive, watch } from 'vue';
  import type { AlumnData } from '../../types/alumnData';
  import VueSelect, { type Option } from 'vue3-select-component';
  import { normalize } from '../../composables/useCommon';
  import { useSelectOptions } from '../../composables/useSelectOptions';
  import { useValidation } from '../../composables/useValidation';
  import { updateAlumnData } from '../services/alumn-data';

  const alumnData = inject('alumnData') as AlumnData;

  const { provincesData, modalitiesData, cyclesData, getSelectOptions } =
    useSelectOptions();

  const emit = defineEmits(['close']);

  const { validateAlumnForm, validateField } = useValidation();

  const errors = reactive<Record<string, string>>({});

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

  const handleSubmit = () => {
    const validationErrors = validateAlumnForm(alumnDataForm);
    Object.assign(errors, validationErrors);

    if (Object.keys(errors).length === 0) {
      console.log('Formulario válido:', alumnDataForm);
      // guardar o emitir
      const {
        cycle_name,
        full_name,
        modality_name,
        province_name,
        ...validAlumnData
      } = alumnDataForm;
      updateAlumnData(validAlumnData);
    } else {
      console.log('Errores:', errors);
    }
  };

  const handleInputChange = (
    field: keyof AlumnData,
    value: string | number | null
  ) => {
    const error = validateField(field, value);
    if (error) {
      errors[field] = error;
    } else {
      delete errors[field];
    }
  };
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div class="flex gap-5">
      <div class="basis-1/3">
        <label class="block font-semibold"
          >Nombre <span class="text-secondary">*</span></label
        >
        <input
          v-model="alumnDataForm.first_name"
          class="w-full border rounded px-4 py-2 border-gray-400"
          :class="{ 'border-red-500': errors.first_name }"
          @input="handleInputChange('first_name', alumnDataForm.first_name)"
        />
        <p v-if="errors.first_name" class="text-red-500 text-sm mt-1">
          {{ errors.first_name }}
        </p>
      </div>
      <div class="basis-1/3">
        <label class="block font-semibold"
          >Primer apellido <span class="text-secondary">*</span></label
        >
        <input
          v-model="alumnDataForm.last_name_1"
          class="w-full border rounded px-4 py-2 border-gray-400"
          :class="{ 'border-red-500': errors.last_name_1 }"
          @input="handleInputChange('first_name', alumnDataForm.last_name_1)"
        />
        <p v-if="errors.last_name_1" class="text-red-500 text-sm mt-1">
          {{ errors.last_name_1 }}
        </p>
      </div>
      <div class="basis-1/3">
        <label class="block font-semibold">Segundo apellido</label>
        <input
          v-model="alumnDataForm.last_name_2"
          class="w-full border rounded px-4 py-2 border-gray-400"
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
          class="w-full border rounded px-4 py-2 border-gray-400"
          :class="{ 'border-red-500': errors.dni }"
          @input="handleInputChange('dni', alumnDataForm.dni)"
        />
        <p v-if="errors.dni" class="text-red-500 text-sm mt-1">
          {{ errors.dni }}
        </p>
      </div>
      <div class="basis-1/4">
        <label class="block font-semibold"
          >Teléfono <span class="text-secondary">*</span></label
        >
        <input
          v-model="alumnDataForm.phone"
          class="w-full border rounded px-4 py-2 border-gray-400"
          :class="{ 'border-red-500': errors.phone }"
          @input="handleInputChange('phone', alumnDataForm.phone)"
        />
        <p v-if="errors.phone" class="text-red-500 text-sm mt-1">
          {{ errors.phone }}
        </p>
      </div>
      <div class="basis-2/4">
        <label class="block font-semibold"
          >Email <span class="text-secondary">*</span></label
        >
        <input
          v-model="alumnDataForm.email"
          type="email"
          class="w-full border rounded px-4 py-2 border-gray-400"
          :class="{ 'border-red-500': errors.email }"
          @input="handleInputChange('email', alumnDataForm.email)"
        />
        <p v-if="errors.email" class="text-red-500 text-sm mt-1">
          {{ errors.email }}
        </p>
      </div>
    </div>
    <div class="mt-8 flex gap-5">
      <div class="basis-1/2">
        <label class="block font-semibold"
          >Centro <span class="text-secondary">*</span></label
        >
        <input
          v-model="alumnDataForm.enrollment_center"
          class="w-full border rounded px-4 py-2 border-gray-400"
          :class="{ 'border-red-500': errors.enrollment_center }"
          @input="
            handleInputChange(
              'enrollment_center',
              alumnDataForm.enrollment_center
            )
          "
        />
        <p v-if="errors.enrollment_center" class="text-red-500 text-sm mt-1">
          {{ errors.enrollment_center }}
        </p>
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
          :class="{ 'select-error': errors.province_id }"
          @option-selected="
            handleInputChange('province_id', alumnDataForm.province_id)
          "
        />
        <p v-if="errors.province_id" class="text-red-500 text-sm mt-1">
          {{ errors.province_id }}
        </p>
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
          :class="{ 'select-error': errors.cycle_id }"
          @option-selected="
            handleInputChange('cycle_id', alumnDataForm.cycle_id)
          "
        />
        <p v-if="errors.cycle_id" class="text-red-500 text-sm mt-1">
          {{ errors.cycle_id }}
        </p>
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
          :class="{ 'select-error': errors.modality_id }"
          @option-selected="
            handleInputChange('modality_id', alumnDataForm.modality_id)
          "
        />
        <p v-if="errors.modality_id" class="text-red-500 text-sm mt-1">
          {{ errors.modality_id }}
        </p>
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
    box-shadow: 0 0 0 2px #3b82f66e;
  }

  .custom-select {
    --vs-border: 1px solid oklch(70.7% 0.022 261.325);
    --vs-border-radius: 0.375rem;
    --vs-padding: 0.5rem 1rem;
    --vs-font-size: 1rem;
    --vs-text-color: #000000;
    --vs-placeholder-color: #6b7280;
  }

  .custom-select.select-error {
    --vs-border: 1px solid oklch(63.7% 0.237 25.331);
  }

  :deep(.single-value) {
    max-width: 50px;
  }
</style>
