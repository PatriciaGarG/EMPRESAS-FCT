<template>
    <div>
      <h1>Test de conexión a Supabase</h1>
      <div v-if="loading">Cargando...</div>
      <div v-else-if="error">❌ Error: {{ error }}</div>
      <div v-else>
        <h2>Resultado:</h2>
        <pre>{{ company }}</pre>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { supabase } from '../components/services/DatabaseConnection'
  
  const company = ref(null)
  const loading = ref(true)
  const error = ref<string | null>(null)
  
  onMounted(async () => {
    const { data, error: err } = await supabase
      .from('company')
      .select('*')
      .limit(1)
  
    if (err) {
      error.value = err.message
    } else {
      company.value = data
    }
  
    loading.value = false
  })
  </script>
  