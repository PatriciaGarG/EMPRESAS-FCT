<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue';
  import type { CurrentCompany } from '../../types/alumnData';
  import { normalize } from '../../composables/useCommon';
  import type { Option } from 'vue3-select-component';

  const emit = defineEmits(['close', 'dataSaved']);

  const errors = reactive<Record<string, string>>({});

  //Carga
  const isLoading = ref<boolean>(false);

  onMounted(() => {});

  // Función para eliminar tildes y mayus en el filtro en el select
  //Extraer lógica?
  const customFilter = (
    _option: Option<string>,
    label: string,
    search: string
  ) => {
    return normalize(label).includes(normalize(search));
  };

  const handleSubmit = async () => {
    isLoading.value = true;
    try {
    } finally {
      isLoading.value = false;
    }
  };
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    
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
