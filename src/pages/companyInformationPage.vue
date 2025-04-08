<template>
    <body>
        <div v-if="loading">Cargando empresa...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else-if="company">
            <div id="goBackButtom">
                <button @click=""><-</button>
            </div>
            <div id="nameTag">{{company.name}}</div>
            <div id="modifyAndDeleteButtons">
                <button id="modifyButton">Modificar</button>
                <button id="deleteButton">Eliminar</button>
            </div>
            <div id="company">
                <h2>Datos</h2>
                <div id="informationCompany">
                    Dirección: {{company.province}}, {{company.address}} <br>
                    CIF: {{company.cif}} <br>
                    Disponibilidad: {{company.active}} <br>
                    Teléfono: {{company.phone}} <br>
                    E-mail: {{company.email}}<br>
                    Modalidad/es:{{company.modality_id}} <br>
                </div>
            </div>
            <div id="vocationalTrainingCyclesCompatible">
                <div v-if="loadingCycles">Cargando ciclos...</div>
                <div v-else-if="errorCycles">{{ errorCycles }}</div>
                <div v-else-if="cyclesCompany">
                    <h2>Ciclos compatibles</h2>
                    <div id="vocationalTrainingCycles">
                        Nombre: {{cyclesCompany.name}} <br>
                        Nivel de grado: {{cyclesCompany.education_level}} <br>
                    </div> </div>
                </div>
            </div>
    </body>
</template>
    
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { supabase } from '../components/services/DatabaseConnection';


interface Company {
    name: string;
    cif: string;
    province: string;
    address: string;
    active: boolean;
    phone: string;
    email: string;
    modality_id: string;
}

const route = useRoute();
const company = ref<Company | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () =>{
    const id = route.params.id
    console.log(typeof id);

    const {data, error: err} = await supabase
        .from('company')
        .select('*')
        .eq('id', id)
        .single()

    if(err) {
        error.value = err.message;
    } else{
        company.value = data
        console.log('Datos de la empresa:', data);
    }
    loading.value = false;

})

interface CyclesCompany {
    name: string;
    education_level: string;
}
const cyclesCompany = ref<CyclesCompany | null>(null);
const loadingCycles = ref(true);
const errorCycles = ref<string | null>(null);

onMounted(async () =>{
    const id_cycle = route.params.id_cycle
    console.log(typeof id_cycle);

    const {data, error: err} = await supabase
        .from('cycle')
        .select('*')
        .eq('id', id_cycle)
        .single()

    if(err) {
        errorCycles.value = err.message;
    } else{
        cyclesCompany.value = data
        console.log('Datos de la empresa:', data);
    }
    loadingCycles.value = false;
})
        


</script>
        