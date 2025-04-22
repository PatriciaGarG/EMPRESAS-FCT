<template>
    <Pie :data="chartData" :options="chartOptions"/>
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
    ArcElement,
    PieController,
    plugins,
 } from 'chart.js';
 import { Pie } from 'vue-chartjs';
 import  ChartDataLabels from 'chartjs-plugin-datalabels';

 ChartJS.register(Title, Tooltip, Legend, ArcElement, PieController, ChartDataLabels);

// GRÁFICA
const chartData = ref({ labels:[], datasets:[]});
const chartOptions = ref({
    responsive: true,
    plugins: {
        legend: {display: false},
        title:{display: true, text:'Calificaciones totales', font:{ size: 25 }, color: '#000000'},
        datalabels: {
            color: '#000000',
            formatter: (value, context) => {
                return context.chart.data.labels[context.dataIndex];
            },
            font: {
                weight: 'bold',
                size: 25
            }
        }},
        
    })

// OBTENER LA EMPRESA
const route = useRoute();
const companyId = route.params.id;

onMounted(async () => {
    const {data: ratingsChart, error} = await supabase
    .from('internship')
    .select('alumn_id, result')
    .eq('company_id', companyId);

    if(error){
        console.error('Error la información:', error);
        return;
    }

    const ratings = {
        apto: 0,
        'no apto': 0,

    };

    ratingsChart.forEach((i) =>{
        const result = i.result?.toLowerCase();
        if(ratings.hasOwnProperty(result)){
            ratings[result]++;
        }
    })

    chartData.value = {
        labels: ['Apto', 'No Apto'],
        datasets: [
            {
                data: [
                ratings['apto'],
                 ratings['no apto']
                ], 
            backgroundColor: ['#0829fb', '#fb0808', '#13ea09'],
            hoverOffset: 10
        }
        
    ]
    }
})


</script>