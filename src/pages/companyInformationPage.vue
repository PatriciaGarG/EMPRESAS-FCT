<template>
  <body className="bg-gray-200 h-screen">
    <div v-if="loading">Cargando empresa...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="company">
      
    <div id="tittleAndButtons" className="flex space-x-4">
      <div id="goBackButtom" className="mr w-15 ml-15  mt-8 border-2 border-white rounded-full p-4 text-5xl font-bold text-black bg-white">
        <button @click="$router.back"><img src="../assets/arrow-left.svg"></button>
      </div>
      
      <div id="nameTag" className=" w-auto  mt-8 border-2 border-blue-900 rounded-lg p-4 text-left text-5xl font-bold text-white bg-blue-900">{{ company.name }}</div>
      <div id="modifyAndDeleteButtons">
        <button id="modifyButton" className="mt-20 w-35 h-10 ml-270 border-2 rounded-full bg-orange-400 text-2xl text-white border-orange-400">Modificar</button>
        <button id="deleteButton" className="ml-5 w-35 h-10 border-2 rounded-full bg-red-500 text-2xl text-white border-red-500">Eliminar</button>
        <!-- Ponerlo como componentes ambos botones-->
      </div>
    </div>
      <div id="dataContainer" className="flex space-x-4">
      <div id="company" className="w-250  mt-10 h-70 ml-15 border-2 border-gray-950 rounded-lg p-4 bg-white">
        <h2 className="text-left text-3xl font-bold text-black">Datos</h2><br/>
        <div id="informationCompany">
          Dirección: {{ company?.province.name }}, {{ company.address }} <br />
          CIF: {{ company.cif }} <br />
          Disponibilidad: {{ company.active ? "Sí" : "No" }} <br />
          Teléfono: {{ company.phone }} <br />
          E-mail: {{ company.email }}<br />
          Modalidad/es: {{ company?.modality.name }} <br />
          <!--Buscar desde otra tabla porque sino me da un uuid-->
        </div>
    </div>

    <div id="vocationalTrainingCyclesCompatible" className="w-190 mt-10 h-70 border-2 border-gray-950 rounded-lg p-4 bg-white">
      <div v-if="loadingCycles">Cargando ciclos...</div>
      <div v-else-if="errorCycles">{{ errorCycles }}</div>
      <div v-else-if="cyclesCompany.length > 0">
        <h2 className="text-left text-3xl font-bold text-black">Ciclos compatibles</h2><br/>
         <div id="vocationalTrainingCycles" v-for="(cycle, index) in cyclesCompany":key="index">
          Nombre: {{ cycle.name }} <br />
          Nivel de grado: {{ cycle.education_level }} <br />
          Modalidad: {{ cycle.modality.name }} <br />
         </div>
       </div>
     </div>
    </div>
    </div>

    <div id="students">
      <div v-if="loadingAlumn">Cargando alumnos...</div>
      <div v-else-if="errorAlumn">{{ errorAlumn }}</div>
      <div v-else-if="alumnDetails.length > 0">
        <div id="currentlyStudents">
          <h2>Alumnos actuales</h2>
          <ul>
            <li v-for="(alumn, index) in currentStudents" :key="index">
              <div v-if="alumn.first_name">
                Nombre: {{ alumn.first_name }} <br />
                Apellidos: {{ alumn.last_name_1 }} {{ alumn.last_name_2 }}
                <br />
                DNI: {{ alumn.dni }} <br />
                Centro de matriculación: {{ alumn.enrollment_center }} <br />
                Ciclo cursado y modalidad: {{ alumn?.cycle?.name }},{{alumn?.modality?.name}}<br />
                Provincia:{{ alumn.province?.name}} <br />
                Teléfono: {{ alumn.phone }} <br />
                E-mail: {{ alumn.email }} <br />
                Fecha de inicio: {{ alumn.start_date }} <br />
                Fecha de fin: {{ alumn.end_date }} <br />
                Estado: {{ alumn.status }} <br />
              </div>
            </li>
          </ul>
          <div id="oldStudents">
            <h2>Alumnos antiguos</h2>
            <ul>
              <li v-for="(alumn, index) in oldStudents" :key="index">
                <div v-if="alumn.first_name">
                  Nombre: {{ alumn.first_name }} <br />
                  Apellidos: {{ alumn.last_name_1 }} {{ alumn.last_name_2 }}<br />
                  DNI: {{ alumn.dni }} <br />
                  Centro de matriculación: {{ alumn.enrollment_center }} <br />
                  Ciclo cursado y modalidad: {{ alumn?.cycle?.name }},{{alumn?.modality?.name}}<br />
                  Email: {{ alumn.email }} <br />
                  Fecha de inicio: {{ alumn.start_date }} <br />
                  Fecha de fin: {{ alumn.end_date }} <br />
                  Resultado de la práctica: {{ alumn.result }} <br />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { supabase } from "../components/services/DatabaseConnection";

interface Company {
  name: string;
  cif: string;
  address: string;
  active: boolean;
  phone: string;
  email: string;
  province: {
    name: string;
  };
  modality: {
    name: string;
  };
}

interface CyclesCompany {
  name: string;
  education_level: string;
  modality: {
    name: string;
  };
}

interface AlumnCompany {
  first_name: string;
  last_name_1: string;
  last_name_2: string;
  dni: string;
  enrollment_center: string;
  modality_id: string;
  cycle_id: {
    name: string;
  };
  address: string;
  province:string;
  phone: string;
  email: string;
  start_date: Date;
  end_date: Date;
  status: string;
  result: string;
}

const route = useRoute();
const company = ref<Company | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

const loadingAlumn = ref(true);
const errorAlumn = ref<string | null>(null);
const alumnDetails = ref<any[]>([]);

const interships = ref<any[]>([]);
const loadingIntership = ref(true);
const errorIntership = ref<string | null>(null);

const currentStudents = ref<AlumnCompany[]>([]);
const oldStudents = ref<AlumnCompany[]>([]);

const cyclesCompany = ref<CyclesCompany[]>([]);
const loadingCycles = ref(true);
const errorCycles = ref<string | null>(null);

onMounted(async () => {
  const companyId = route.params.id;

  // OBTENER DATOS DE LA EMPRESA SELECCIONADA
  const { data: companyData, error: companyErr } = await supabase
    .from("company")
    .select(
      "name, cif, address, active, phone, email, province:province_id (name), modality:modality_id (name)"
    )
    .eq("id", companyId)
    .single();

  if (companyErr) {
    error.value = companyErr.message;
  } else {
    company.value = companyData;
    console.log(
      "Datos de la empresa con provincia y modalidad escrito y no id:",
      companyData
    );
  }

  // OBTENER CICLOS ASOCIADOS A LA EMPRESA SELECCIONADA
  const { data: cyclesData, error: cyclesErr } = await supabase
    .from("company_cicle")
    .select(
      "cycle:cycle_id (name, education_level, modality:modality_id (name))"
    )
    .eq("company_id", companyId);

  if (cyclesErr) {
    errorCycles.value = cyclesErr.message;
  } else {
    cyclesCompany.value = cyclesData.map((item: any) => item.cycle);
    console.log("Ciclos asociados a la empresa:", cyclesCompany.value);
  }

  // OBTENER ALUMNOS ASOCIADOS A LA EMPRESA SELECCIONADA
  const { data: internData, error: internErr } = await supabase
    .from("internship")
    .select("alumn_id")
    .eq("company_id", companyId);

  if (internErr) {
    errorAlumn.value = internErr.message;
  } else {
    const alumnIds = internData.map((item: any) => item.alumn_id);
    const { data: alumnData, error: alumnErr } = await supabase
      .from("alumn")
      .select("*, cycle:cycle_id (name), modality:modality_id (name), province:province_id (name)")
      .in("id", alumnIds);

    if (alumnErr) {
      errorAlumn.value = alumnErr.message;
    } else {
      alumnDetails.value = alumnData;
      console.log("Datos de los alumnos:", alumnData);
    }
  }
  console.log("interships", interships.value);

  // MOSTRAR LOS ALUMNOS EN LA TABLA ACTUALES O ANTIGUOS SEGÚN EL ESTADO
  const { data: intershipData, error: intershipErr } = await supabase
    .from("internship")
    .select("*")
    .eq("company_id", companyId);

  if (intershipErr) {
    errorIntership.value = intershipErr.message;
    console.log(intershipErr);
  } else {
    interships.value = intershipData;
    console.log("Datos de las prácticas:", intershipData);
  }

  // FILTRADO DE ALUMNOS ACTUALES Y ANTIGUOS
  const currentlyStudents = alumnDetails.value
    .filter((alumn: any) => {
      return (
        alumn.status &&
        typeof alumn.status === "string" &&
        ["activo", "sin cursar", "cursando"].includes(
          alumn.status.toLowerCase()
        )
      );
    })
    .map((alumn: any) => {
      const intern = interships.value.find((i) => i.alumn_id === alumn.id);
      return {
        ...alumn, 
        start_date: intern?.start_date,
        end_date: intern?.end_date
      }
    });

  const oldStudents = alumnDetails.value
    .filter((alumn: any) => {
      return (
        alumn.status &&
        typeof alumn.status === "string" &&
        alumn.status.toLowerCase() === "finalizado"
      );
    })
    .map((alumn: any) =>{
      const intern = interships.value.find((i) => i.alumn_id === alumn.id);
      return {
        ...alumn, 
        start_date: intern?.start_date,
        end_date: intern?.end_date,
        result: intern?.result,
      };
    });

  console.log("Alumnos actuales:", currentlyStudents);
  console.log("Alumnos antiguos:", oldStudents);

  // OBTENER LOS ALUMNOS ACTUALES
    currentStudents.value = currentlyStudents;

  // OBTENER LOS ALUMNOS ANTIGUOS
    oldStudents.value = oldStudents;

  loadingIntership.value = false;
  loadingCycles.value = false;
  loading.value = false;
  loadingAlumn.value = false;
});
</script>
