<!-- <template>
    <div class="w-full h-[300px]">
    <Bar :data="chartStudentData" :options="chartOptions"/>
    </div>

</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { supabase } from '../DatabaseConnection';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Ticks } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps<{ companyId: string;}>();

const chartStudent = ref({
    labels: [],
    datasets: [{
        label: 'Estudiantes anuales',
        data: [],
        backgroundColor: '#3b82fb', 
        borderRadius: 5,
        minBarLength: 10
    }]
})

const chartStudentData = computed(() => { return chartStudent.value;});

const chartOptions = {
    indexAxis: 'x',
    responsive: true,
    maintainingAspectRatio: false, 
    plugins: {
        legend: {display: false},
        title: {display: false},
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                },
                min: 0,
                max: 5

            },
            x: {
                ticks: {autoskip: false}
            }
            }
    }

onMounted(async () =>{
    const { data, error } = await supabase
    .from("internship")
    .select("start_date")
    .eq("company_id", props.companyId)

    if(error){
        console.error("Error al obtener los datos en la primera gráfica:", error);
        return;
    }

    const years: Record<string, number> = {};

    data.forEach((internship) => {
        if(internship.start_date){
            const year = new Date(internship.start_date).getFullYear();
            years[year] = (years[year] || 0) + 1;
        }
      
    });

    const sortedYears = Object.keys(years).sort();
    chartStudent.value.labels = sortedYears;
    chartStudent.value.datasets[0].data = sortedYears.map((year) => years[year]);

    console.log('Fechas encontradas:', data);
    console.log('Conteo por años:', years);
    console.log('Años ordenados:', sortedYears);
    console.log("Datos finales del gráfico:", chartStudentData.value);
    console.log("Valores de data (barras):", chartStudentData.value.datasets[0].data);

})
</script> -->


<template>
    <div class="w-full max-w-md">
        <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
        <div>console.log("renderizando chart")</div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted, computed, watch } from 'vue';
  import { supabase } from '../DatabaseConnection';
  import { Bar } from 'vue-chartjs';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  } from 'chart.js';
  
  // Registrar componentes de Chart.js
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
  
  // Props
  const props = defineProps<{ companyId: string }>();
  console.log("Company ID recibido en el componente StudentChart:", props.companyId);

  
  // Datos reactivos del gráfico
  const chartStudent = ref({
    labels: [] as string[],
    datasets: [
      {
        label: 'Estudiantes anuales',
        data: [] as number[],
        backgroundColor: 'rgba(59, 130, 251, 0.8)', // azul con opacidad
        borderRadius: 5,
        minBarLength: 10,
      },
    ],
  });
  
  // Computado para pasar a la gráfica
  const chartStudentData = computed(() => chartStudent.value);
  
  // Opciones de la gráfica
  const chartOptions = {
    indexAxis: 'x',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        min: 0,
        max: 5,
      },
      x: {
        ticks: { autoSkip: false },
      },
    },
  };
  
  // Obtener datos al montar el componente
  onMounted(async () => {
    const { data, error } = await supabase
      .from('internship')
      .select('start_date')
      .eq('company_id', props.companyId);
  
    if (error) {
      console.error('Error al obtener los datos en la primera gráfica:', error);
      return;
    }
  
    console.log("Datos crudos desde Supabase:", data);
    console.log("Error al traer datos:", error);


    const years: Record<string, number> = {};
  
    data.forEach((internship) => {
      if (internship.start_date) {
        const year = new Date(internship.start_date).getFullYear().toString();
        console.log("Fecha válida encontrada:", internship.start_date, "Año:", year);
        years[year] = (years[year] || 0) + 1;
      }
    });
  
    const sortedYears = Object.keys(years).sort();
    chartStudent.value.labels = sortedYears;
    chartStudent.value.datasets[0].data = sortedYears.map((year) => years[year]);
  
    // Logs para depurar
    console.log('Fechas encontradas:', data);
    console.log('Conteo por años:', years);
    console.log('Años ordenados:', sortedYears);
    console.log('Datos finales del gráfico:', chartStudentData.value);
    console.log('Valores de data (barras):', chartStudentData.value.datasets[0].data);
  });
  
  // Ver cambios en los datos del gráfico
  watch(chartStudentData, (newVal) => {
    console.log('Chart data actualizada:', newVal);
  }, { deep: true });
  
  </script>
  