<template>
  
      <form v-if="company" @submit.prevent="updateDataCompany" class="w-[50vw]">
        <label class="">Nombre</label>
        <input
          v-model="company.name"
          type="text"
          placeholder="Nombre"
          class="w-full border rounded-md p-2"
          :class="errorTitle.name ? 'border-red-500' : 'border-gray-300'"
          @input="validateTitles"
        />
        <p v-if="errorTitle.name" class="text-red-500 text-sm mt-1">Debe ser un nombre válido</p>
        <label class="">Dirección</label>
        <input
          v-model="company.address"
          type="text"
          placeholder="Dirección"
          class="w-full border rounded-md p-2"
          :class="errorTitle.address ? 'border-red-500' : 'border-gray-300'"
          @input="validateTitles"
        />
        <p v-if="errorTitle.address" class="text-red-500 text-sm mt-1">Debe ser una dirección válida</p>
        <label class="">CIF</label>
        <input
          v-model="company.cif"
          type="text"
          placeholder="CIF"
          class="w-full border rounded-md p-2"
          :class="errorTitle.cif ? 'border-red-500' : 'border-gray-300'"
          @input="validateTitles"
        />
        <p v-if="errorTitle.cif" class="text-red-500 text-sm mt-1">Debe ser un CIF válido y con mayúsculas</p>
        <label class="">Teléfono</label>
        <input
          v-model="company.phone"
          type="text"
          placeholder="Teléfono"
          class="w-full border rounded-md p-2"
          :class="errorTitle.phone ? 'border-red-500' : 'border-gray-300'"
          @input="validateTitles"
        />
        <p v-if="errorTitle.phone" class="text-red-500 text-sm mt-1">Debe ser un número de teléfono válido</p>
        <label class="">E-mail</label>
        <input
          v-model="company.email"
          type="text"
          placeholder="Email"
          class="w-full border rounded-md p-2"
          :class="errorTitle.email ? 'border-red-500' : 'border-gray-300'"
          @input="validateTitles"
        />
        <p v-if="errorTitle.email" class="text-red-500 text-sm mt-1">Debe ser un email válido</p>

        <label class="">Provincia</label>
        <select
          v-model="company.province_id"
          class="w-full border rounded-md p-2 mb-2 text-lg"
        >
          <option
            v-for="province in province"
            :key="province.id"
            :value="province.id"
          >
            {{ province.name }}
          </option>
        </select>
        <input
          v-model="newProvince"
          type="text"
          placeholder="Nueva provincia"
          class="w-full rounded-md p-2 mb-4"
        />
        <button
          type="button"
          @click="addProvince"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Añadir provincia</button
        ><br />

        <label class="">Modalidad</label>
        <select
          v-model="company.modality_id"
          class="w-full border rounded-md p-2 mb-2 text-lg"
        >
          <option
            v-for="modality in modalities"
            :key="modality.id"
            :value="modality.id"
          >
            {{ modality.name }}
          </option>
        </select>
        <input
          v-model="newModality"
          type="text"
          placeholder="Nueva modalidad"
          class="w-full rounded-md p-2 mb-4"
        />
        <button
          type="button"
          @click="addModality"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Añadir modalidad</button
        ><br />

        <label class="block mb-2 font-semibold">Ciclos asignados</label>
        <div class="flex flex-wrap gap-2 mb-4">
          <div 
          v-for="cycleId in company.cycle_id"
          :key="cycleId"
          class="flex items-center bg-grar-200 px-3 py-1 rounded-full text-sm">
            <span class="mr-2">
              {{getCycleNameById(cycleId)}}
            </span>
            <button 
              @click="removeCycle(cycleId)"
              class="text-red-600 hover:text-red-800 font-bold">
            <img src="/src/assets/x-square.svg"/>
            </button>
          </div>
        </div>
        <button
        v-if="company.cycle_id.lenght"
        @click="removeAllCycles"
        class="mb-4 text-sm text-red-600 underline hover:text-red-800">
        Eliminar todos los ciclos
      </button>

      <label class="block font-semibold mb-1">Añadir ciclos</label>
      <select multiple 
      v-model="company.cycle_id"
      class="w-full border rounded-md p-2 mb-2 text-lg">
        <option v-for="cycle in cycles" :key="cycle.id" :value="cycle.id" :disabled="company.cycle_id.includes(cycle.id)">
          {{ cycle.name }}
        </option>
      </select>
        <input
          v-model="newCycle"
          type="text"
          placeholder="Nuevo ciclo"
          class="w-full rounded-md p-2 mb-4"
        />
        <button
          type="button"
          @click="addCycle"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Añadir ciclo</button
        ><br />

        <div class="flex justify-end mt-4">
          <button
            type="submit"
            :disabled="!isValidate"
            :class="isValidate ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Actualizar
          </button>
      </div>
      </form>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { supabase } from "../DatabaseConnection";
import { computed } from "vue";

// OBTENER LOS DATOS BASE DE LA EMPRESA
const props = defineProps<{
  companyId: string;
}>();

// OBTENER LAS REFERENCIAS DE LOS DATOS
const company = ref<any>(null);
const province = ref<any[]>([]);
const modalities = ref<any[]>([]);
const cycles = ref<any[]>([]);

// AÑADIR NUEVAS OPCIONES
const newProvince = ref("");
const newModality = ref("");
const newCycle = ref("");

// ERRORES
const errorTitle = ref ({
  name: false,
  address: false,
  cif: false,
  phone: false,
  email: false,
});

const validateTitles = () =>{
  errorTitle.value.name = !/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(company.value.name);
  errorTitle.value.address = !/^[a-zA-ZÀ-ÿ0-9/\\\\\s]{1,40}$/.test(company.value.address);
  errorTitle.value.cif = !/^[ABCDEFGHJKLMNPQRSUVW][0-9]{7}[0-9A-J]$/.test(company.value.cif);
  errorTitle.value.phone = !/^[0-9]{9,15}$/.test(company.value.phone);
  errorTitle.value.email = !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(company.value.email);

  return !Object.values(errorTitle.value).includes(true);
}

const isValidate = computed(() =>{
  return ( company.value &&
  !Object.values(errorTitle.value).includes(true) &&  
  company.value.name &&
  company.value.address &&
  company.value.cif &&
  company.value.phone &&
  company.value.email)
})

// CARGAR DATOS AL MONTAR EL COMPONENTE
onMounted(async () => {
  const { data: companyData, error: companyError } = await supabase
    .from("company")
    .select("*")
    .eq("id", props.companyId)
    .single();

  if (companyError) {
    console.error("Error al cargar los datos de la empresa:", companyError);
  } else {
    company.value = companyData;
  }

  const { data: existingCyclesData, error: existingCyclesError } =
    await supabase
      .from("company_cicle")
      .select("cycle_id")
      .eq("company_id", props.companyId);

  if (existingCyclesError) {
    console.error(
      "Error al cargar los ciclos de la empresa:",
      existingCyclesError
    );
  } else {
    company.value.cycle_id = existingCyclesData.map((c: any) => c.cycle_id);
  }

  const { data: pronvinceData } = await supabase.from("province").select("*");
  province.value = pronvinceData ?? [];

  const { data: modalitiesData } = await supabase.from("modality").select("*");
  modalities.value = modalitiesData ?? [];

  const { data: cycleDataAll } = await supabase.from("cycle").select("*");
  cycles.value = cycleDataAll ?? [];
});

// ACTUALIZAR LA EMPRESA
const updateDataCompany = async () => {
  const { error: updateError } = await supabase
    .from("company")
    .update({
      name: company.value.name,
      address: company.value.address,
      cif: company.value.cif,
      phone: company.value.phone,
      email: company.value.email,
      province_id: company.value.province_id,
      modality_id: company.value.modality_id,
    })
    .eq("id", props.companyId);

  if (updateError) {
    console.error("Error al actualizar los datos de la empresa:", updateError);
    alert("Error al actualizar los datos de la empresa.");
    return;
  }

  const { data: existingCyclesData, error: existingCyclesError } =
    await supabase
      .from("company_cicle")
      .select("cycle_id")
      .eq("company_id", props.companyId);

  if (existingCyclesError) {
    console.error(
      "Error al cargar los ciclos de la empresa:",
      existingCyclesError
    );

    if(!validateTitles()){
      return;
    }
    return;
  }

  const newCyclesToAdd = company.value.cycle_id
    .filter(
      (cycleId: string) =>
        !existingCyclesData?.some(
          (existingCyclesData: any) => existingCyclesData.cycle_id === cycleId
        )
    )
    .map((cycleId: string) => ({
      company_id: props.companyId,
      cycle_id: cycleId,
    }));

  if (newCyclesToAdd.length > 0) {
    const { error: cyclesError } = await supabase
      .from("company_cicle")
      .insert(newCyclesToAdd);

    if (cyclesError) {
      console.error("Error al añadir los ciclos de la empresa:", cyclesError);
      alert("Error al añadir los ciclos de la empresa.");
      return;
    }
  }
  window.location.reload();

  
};

// AÑADIR NUEVA PROVINCIA
const addProvince = async () => {
    if (!newProvince.value.trim()) return;

    const { data: newItem, error } = await supabase
      .from("province")
      .insert({ name: newProvince.value })
      .select()
      .single();

    if (!error && newItem) {
      province.value.push(newItem);
      company.value.province_id = newItem.id;
      newProvince.value = "";
    } else {
      console.error("Error al añadir la provincia:", error);
    }
  };

  // AÑADIR NUEVA MODALIDAD
  const addModality = async () => {
    if (!newModality.value.trim()) return;

    const { data: newItem, error } = await supabase
      .from("modality")
      .insert({ name: newModality.value })
      .select()
      .single();

    if (!error && newItem) {
      modalities.value.push(newItem);
      company.value.modality_id = newItem.id;
      newModality.value = "";
    } else {
      console.error("Error al añadir la modalidad:", error);
    }
  };

  // AÑADIR NUEVO CICLO
  const addCycle = async () => {
    if (!newCycle.value.trim()) return;

    const { data: newItem, error } = await supabase
      .from("cycle")
      .insert({ name: newCycle.value })
      .select()
      .single();

    if (!error && newItem) {
      cycles.value.push(newItem);
      company.value.cycle_id = [...(company.value.cycle_id || []), newItem.id];
       const { error: relationError } = await supabase 
       .from("company_cicle")
        .insert({ company_id: props.companyId, cycle_id: newItem.id });
      if (relationError) {
        console.error("Error al añadir la relación empresa-ciclo:", relationError);
        alert("Error al añadir la relación empresa-ciclo.");
      } else {
      }
      newCycle.value = "";
    } else {
      console.error("Error al añadir el ciclo:", error);
      alert("Error al añadir el ciclo.");
    }

    
  };

// OBTENER CICLO POR ID
const getCycleNameById = (id:string) => {
  const found = cycles.value.find((c) => c.id === id);
  return found ? found.name : "Ciclo no encontrado";
}

// ELIMINAR UN CICLO
const removeCycle = async (cycleId:string) => {
  const {error} = await supabase 
  .from("company_cicle")
  .delete()
  .eq("company_id", props.companyId)
  .eq("cycle_id", cycleId);

  if(!error){
    company.value.cycle_id = company.value.cycle_id.filter((id:string) => id !== cycleId);
  }else{
    console.error("Error al eliminar el ciclo:", error);
    alert("Error al eliminar el ciclo.");
  }
}

// ELIMINAR TODOS LOS CICLOS
const removeAllCycles = async () => {
  const {error} = await supabase
  .from("company_cicle")
  .delete()
  .eq("company_id", props.companyId);

  if(!error){
    company.value.cycle_id = [];
  }else{
    console.error("Error al eliminar todos los ciclos:", error);
    alert("Error al eliminar todos los ciclos.");
  }
}
</script>
