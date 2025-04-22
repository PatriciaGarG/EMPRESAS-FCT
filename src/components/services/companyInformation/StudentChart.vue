<template>
    <Bar :data= "chartData" :options="chartOptions"/>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../DatabaseConnection'
import { 
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    plugins
 } from 'chart.js';
 import { Bar } from 'vue-chartjs';
 import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels);

// GRÁFICA
const chartData = ref({ labels:[], datasets:[]});
const chartOptions = ref ({
    responsive: true,
    plugins: {
        legend: {display: false},
        title: {display: true, text: 'Alumnos admitidos por año', font: {
            size: 25},
            color: '#000000'
        },
        datalabels: {
            display: false
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 1
            },
            suggestedMax: 5
        },
       
        }
    });

// OBTENER LA EMPRESA
const route = useRoute();
const companyId = route.params.id;

onMounted( async () => {
    const { data: internshipsChart , error } = await supabase
    .from('internship')
    .select('alumn_id, start_date')
    .eq('company_id', companyId);

    if(error){
        console.error('Error al obtener el internship:', error);
        return;
    } 
     

    // Agrupación por años
    const yearCount: Record<string, Set<string>> = {};

        internshipsChart?.forEach((i) => {
            const year = new Date(i.start_date).getFullYear();
            if(!yearCount[year]) yearCount[year] = new Set();
            yearCount[year].add(i.alumn_id);
            
        });

    const sortedYears = Object.keys(yearCount).sort();
    const counts = sortedYears.map((year) => yearCount[year].size); //Cantidad de alumnos únicos (mappeo)
    console.log('Años:', sortedYears);
    console.log('Conteo:', counts);


    chartData.value = {
        labels: sortedYears,
        datasets: [{           
                label: 'Nº de alumnos',
                data: counts,
                backgroundColor: '#3b82f6'
        }],
    }

})


</script>