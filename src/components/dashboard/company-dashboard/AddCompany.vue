<template>
    <form @submit.prevent="submitFormCompanies" class="w-[50vw]">
        <label>Nombre</label><br/>
        <input 
        type="text"
        v-model="newCompany.name"
        placeholder="Nombre de la empresa"
        class="w-full border rounded-md p-2"
          :class="errorTitle.name ? 'border-red-500' : 'border-gray-300'"
          @input="validateTitles"><br/>
          <p v-if="errorTitle.name" class="text-red-500 text-sm mt-1">Debe ser un nombre válido</p>
        <label>Dirección</label><br/>
        <input
        type="text"
        v-model="newCompany.address"
        placeholder="Dirección de la empresa"
        class="w-full border rounded-md p-2"
          :class="errorTitle.address ? 'border-red-500' : 'border-gray-300'"
          @input="validateTitles"><br/>
          <p v-if="errorTitle.address" class="text-red-500 text-sm mt-1">Debe ser una dirección válida</p>
        <label>CIF</label><br/>
        <input
        type="text"
        v-model="newCompany.cif"
        placeholder="CIF de la empresa"
        class="w-full border rounded-md p-2"
          :class="errorTitle.cif ? 'border-red-500' : 'border-gray-300'"
          @input="validateTitles"><br/>
          <p v-if="errorTitle.cif" class="text-red-500 text-sm mt-1">Debe ser un CIF válido y con mayúsculas</p>
        <label>Teléfono</label><br/>
        <input
        type="text"
        v-model="newCompany.phone"
        placeholder="Teléfono de la empresa"
        class="w-full border rounded-md p-2"
          :class="errorTitle.phone ? 'border-red-500' : 'border-gray-300'"
          @input="validateTitles"><br/>
          <p v-if="errorTitle.phone" class="text-red-500 text-sm mt-1">Debe ser un número de teléfono válido</p>
        <label>Email</label><br/>
        <input
        type="email"
        v-model="newCompany.email"
        placeholder="Email de la empresa"
        class="w-full border rounded-md p-2"
          :class="errorTitle.email ? 'border-red-500' : 'border-gray-300'"
          @input="validateTitles"><br/>
          <p v-if="errorTitle.email" class="text-red-500 text-sm mt-1">Debe ser un email válido</p>
        <label>Provincia</label><br/>
        <select v-model="newCompany.province_id">
            <option v-for="provinceItem in province" :key="provinceItem.id" :value="provinceItem.id">
                {{ provinceItem.name }}
            </option>
        </select><br/>
        <label>Modalidad</label><br/>
        <select v-model="newCompany.modality_id">
            <option v-for="modalityItem in modalities" :key="modalityItem.id" :value="modalityItem.id">
                {{ modalityItem.name }}
            </option>
        </select><br/>
        <label>Ciclo/s</label><br/>
        <select v-model="newCompany.cycle" multiple>
            <option v-for="cycleItem in cycles" :key="cycleItem.id" :value="cycleItem.id">
                {{ cycleItem.name }}
            </option>
        </select><br/>
        <label>¿Busca alumnos?</label>
        <input type="checkbox" v-model="newCompany.status"><br/>

        <div class="flex justify-end mt-4">
            <button type="submit" 
            :disabled="!isValidate"
            :class="isValidate ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Crear empresa</button>
        </div>
    </form>
</template>


<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../../services/DatabaseConnection';
import { computed } from 'vue';



interface Company {
    id?: number;
    name: string;
    cif: string;
    address: string;
    phone: string;
    email: string;
    status: boolean;
    province_id: number | null;
    modality_id: number | null;
    cycle: number[];
}
interface Option {
    id: number;
    name: string;
}

const province = ref<Option[]>([]);
const modalities = ref<Option[]>([]);
const cycles = ref<Option[]>([]);

const errorTitle = ref ({
  name: false,
  address: false,
  cif: false,
  phone: false,
  email: false,
});


const validateTitles = () =>{
  errorTitle.value.name = !/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(newCompany.value.name);
  errorTitle.value.address = !/^[a-zA-ZÀ-ÿ0-9/\\\\\s]{1,40}$/.test(newCompany.value.address);
  errorTitle.value.cif = !/^[ABCDEFGHJKLMNPQRSUVW][0-9]{7}[0-9A-J]$/.test(newCompany.value.cif);
  errorTitle.value.phone = !/^[0-9]{9,15}$/.test(newCompany.value.phone);
  errorTitle.value.email = !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(newCompany.value.email);

  return !Object.values(errorTitle.value).includes(true);
}

const isValidate = computed(() =>{
  return ( newCompany.value &&
  !Object.values(errorTitle.value).includes(true) &&  
  newCompany.value.name &&
  newCompany.value.address &&
  newCompany.value.cif &&
  newCompany.value.phone &&
  newCompany.value.email)
})




const newCompany = ref<Company>({
    name: '',
    cif: '',
    address: '',
    phone: '',
    email: '',
    province_id: null,
    modality_id: null,
    status: true,
    cycle: [],

})

const submitFormCompanies = async () => {
    const {data: insertCompany, error: insertCompanyError} = await supabase
        .from('company')
        .insert([
            {
                name: newCompany.value.name,
                cif: newCompany.value.cif,
                address: newCompany.value.address,
                phone: newCompany.value.phone,
                email: newCompany.value.email,
                province_id: newCompany.value.province_id,
                modality_id: newCompany.value.modality_id,
                active: newCompany.value.status,
            }
        ])
        .select()

        if(insertCompanyError){
            alert('Error al insertar la empresa: ' + insertCompanyError.message);
            console.log(insertCompanyError.message);
            return;
        }

        const companyId = insertCompany?.[0]?.id;
        if(!companyId){
            console.log('Error al obtener el ID de la empresa creada');
            return;
        }

        const cyclesRelation = newCompany.value.cycle.map((cycleId) => ({
            company_id: companyId,
            cycle_id: cycleId,
        }))

        const { error: cycleError} = await supabase
            .from('company_cycle')
            .insert(cyclesRelation);

            if(cycleError){
                alert('Empresa creada, ciclos no añadidos: ' + cycleError.message);
                console.log(cycleError.message);
                return;
            }

}

onMounted(async () =>{
    const { data: pronvinceData } = await supabase.from("province").select("*");
  province.value = pronvinceData ?? [];

  const { data: modalitiesData } = await supabase.from("modality").select("*");
  modalities.value = modalitiesData ?? [];

  const { data: cycleDataAll } = await supabase.from("cycle").select("*");
  cycles.value = cycleDataAll ?? [];
    
})
</script>