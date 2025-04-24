<script setup lang="ts">
  import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';

  type Option = { id: string; name: string };

  const props = defineProps<{
    options: Option[];
    placeholder?: string;
    label?: string;
  }>();

  const emit = defineEmits<(e: 'update:modelValue', value: string[]) => void>();

  const search = ref('');
  const isOpen = ref(false);
  const selected = ref<string[]>([]);

  const toggleOption = (id: string) => {
    if (selected.value.includes(id)) {
      selected.value = selected.value.filter((val) => val !== id);
    } else {
      selected.value.push(id);
    }
  };

  const filteredOptions = computed(() =>
    props.options.filter((opt) =>
      opt.name.toLowerCase().includes(search.value.toLowerCase())
    )
  );

  watch(selected, () => {
    emit('update:modelValue', selected.value);
  });

  const dropdownId = computed(() =>
    props.label
      ? props.label.toLowerCase().replace(/ /g, '-') + '-multiselect'
      : undefined
  );

  const dropdownRef = ref<HTMLElement | null>(null);

  const onClickOutside = (e: MouseEvent) => {
    if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
      isOpen.value = false;
    }
  };

  onMounted(() => {
    document.addEventListener('click', onClickOutside);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('click', onClickOutside);
  });
</script>

<template>
  <div class="relative w-full" ref="dropdownRef">
    <label
      v-if="props.label"
      :for="dropdownId"
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      {{ props.label }}
    </label>

    <div
      class="group w-full border border-gray-300 rounded bg-white text-sm focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 flex items-center min-h-[38px] pr-10"
      @click="isOpen = !isOpen"
    >
      <div class="flex-1 px-3 py-2 text-left">
        <span
          v-if="selected.length === 0"
          class="text-gray-900 text-sm leading-5"
        >
          {{ props.placeholder || 'Selecciona opciones' }}
        </span>
        <div v-else class="flex flex-wrap gap-1">
          <span
            v-for="id in selected"
            :key="id"
            class="bg-gray-200 rounded-full px-2 py-1 text-xs flex items-center gap-1"
          >
            {{ props.options.find((o) => o.id === id)?.name }}
            <button
              type="button"
              class="text-gray-500 hover:text-red-500 font-bold"
              @click.stop="toggleOption(id)"
            >
              ×
            </button>
          </span>
        </div>
      </div>

      <div
        class="flex items-center justify-center h-full w-8 bg-white group-hover:bg-gray-200 text-gray-500"
      >
        <svg
          class="h-4 w-4 transition transform"
          :class="{ 'rotate-180': isOpen }"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
          stroke="currentColor"
        >
          <path
            d="M6 8l4 4 4-4"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>

    <div
      v-show="isOpen"
      class="absolute mt-1 w-full z-10 bg-white border border-gray-300 rounded shadow max-h-60 overflow-auto"
    >
      <input
        type="text"
        v-model="search"
        placeholder="Buscar..."
        class="w-full px-3 py-2 text-sm border-b border-gray-200 focus:outline-none"
      />
      <ul class="divide-y divide-gray-100 max-h-48 overflow-y-auto">
        <li
          v-for="option in filteredOptions"
          :key="option.id"
          @click="toggleOption(option.id)"
          class="cursor-pointer px-3 py-2 hover:bg-gray-100 flex items-center gap-2 text-sm"
        >
          <input
            type="checkbox"
            class="form-checkbox h-4 w-4 text-primary"
            :checked="selected.includes(option.id)"
            @change.stop
          />
          <span>{{ option.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
