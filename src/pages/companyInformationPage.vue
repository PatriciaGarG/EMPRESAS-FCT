<template>
  <div class="no-print">
    <HeaderDashboard />
  </div>
  <body class="bg-gray-200 h-screen">
    <div v-if="loading">Cargando empresa...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="company">
      <div id="tittleAndButtons" class="flex space-x-4">
        <div
          id="goBackButtom"
          class="no-print mr w-15 ml-15 mt-8 border-2 border-white rounded-full p-4 text-5xl font-bold text-black bg-white"
        >
          <button @click="$router.back">
            <img src="../assets/arrow-left.svg" />
          </button>
        </div>

        <div
          id="nameTag"
          class="w-auto mt-8 border-2 border-blue-900 rounded-lg p-4 text-left text-5xl font-bold text-white bg-blue-900"
        >
          {{ company.name }}
        </div>
        <div id="modifyAndDeleteButtons" class="no-print">
          <button
            @click="openModifyCompany()"
            id="modifyButton"
            class="mt-20 w-35 h-10 ml-270 border-2 rounded-full bg-orange-400 text-2xl text-white border-orange-400"
          >
            Modificar
          </button>
          <button
            id="deleteButton"
            @click="openDelete()"
            class="ml-5 w-35 h-10 border-2 rounded-full bg-red-500 text-2xl text-white border-red-500"
          >
            Eliminar
          </button>
        </div>
      </div>
      <div id="dataContainer" class="flex space-x-4">
        <div
          id="company"
          class="w-250 mt-10 h-70 ml-15 border-2 border-gray-950 rounded-lg p-4 bg-white"
        >
          <h2 class="text-left text-3xl font-bold text-black">Datos</h2>
          <br />
          <div id="informationCompany">
            Dirección:
            {{ company?.province?.name ?? 'Sin provincia ni dirección' }},
            {{ company.address }} <br />
            CIF: {{ company.cif }} <br />
            Disponibilidad: {{ company.active ? 'Sí' : 'No' }} <br />
            Teléfono: {{ company.phone }} <br />
            E-mail: {{ company.email }}<br />
            Modalidad: {{ company?.modality?.name ?? 'Sin modalidad' }}
            <br />
          </div>
        </div>

        <div
          id="vocationalTrainingCyclesCompatible"
          class="w-190 mt-10 h-70 border-2 border-gray-950 rounded-lg p-4 bg-white"
        >
          <div v-if="loadingCycles">Cargando ciclos...</div>
          <div v-else-if="errorCycles">{{ errorCycles }}</div>
          <div v-else-if="cyclesCompany.length > 0">
            <h2 class="text-left text-3xl font-bold text-black">
              Ciclos compatibles
            </h2>
            <br />
            <div
              id="vocationalTrainingCycles"
              v-for="(cycle, index) in cyclesCompany"
              :key="index"
            >
              Nombre: {{ cycle.name }} <br />
              Nivel de grado: {{ cycle.education_level }} <br />
              Modalidad: {{ cycle.modality?.name ?? 'Sin modalidad' }} <br />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="students">
      <div v-if="loadingAlumn">Cargando alumnos...</div>
      <div v-else-if="errorAlumn">{{ errorAlumn }}</div>
      <div v-else-if="alumnDetails.length > 0">
        <div
          id="currentlyStudents"
          class="page-break w-full max-w-445 overflow-x-auto border-2 item-center border-gray-950 rounded-lg shadow-md p-4 mt-2 ml-15"
        >
          <h2 class="text-3xl font-bold border-b-2 border-gray-200">
            Alumnos actuales
          </h2>
          <div class="grid gap-4">
            <ul>
              <li v-for="(alumn, index) in currentStudents" :key="index">
                <div
                  v-if="alumn.first_name"
                  class="bg-white p-6 rounded-lg shadow-md mb-4 border border-gray-300 overflow-x-auto"
                >
                  <div
                    class="grid grid-cols-11 gap-2 text-gray-600 font-semibold text-xl mb-1"
                  >
                    <p>Nombre</p>
                    <p>Apellidos</p>
                    <p>DNI</p>
                    <p>Centro de matriculación</p>
                    <p>Ciclo cursado y modalidad</p>
                    <p>Provincia</p>
                    <p>Teléfono</p>
                    <p>E-mail</p>
                    <p>Fecha de inicio</p>
                    <p>Fecha de fin</p>
                    <p>Estado</p>
                  </div>
                  <div
                    class="grid grid-cols-11 gap-2 text-gray-800 text-lg mb-4"
                  >
                    <p>{{ alumn.first_name }}</p>
                    <p>{{ alumn.last_name_1 }} {{ alumn.last_name_2 }}</p>
                    <p>{{ alumn.dni }}</p>
                    <p>{{ alumn.enrollment_center }}</p>
                    <p>
                      {{ alumn?.cycle?.name }} <br />{{ alumn?.modality?.name }}
                    </p>
                    <p>{{ alumn.province?.name }}</p>
                    <p>{{ alumn.phone }}</p>
                    <p>{{ alumn.email }}</p>
                    <p>{{ alumn.start_date }}</p>
                    <p>{{ alumn.end_date }}</p>
                    <p>{{ alumn.status }}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div
          id="oldStudents"
          class="page-break w-full max-w-445 overflow-x-auto border-2 item-center border-gray-950 rounded-lg shadow-md p-4 mt-2 ml-15"
        >
          <h2 class="text-3xl font-bold border-b-2 border-gray-200">
            Alumnos antiguos
          </h2>
          <ul>
            <li v-for="(alumn, index) in oldStudents" :key="index">
              <div
                v-if="alumn.first_name"
                class="bg-white p-6 rounded-lg shadow-md mb-4 border border-gray-300 overflow-x-auto"
              >
                <div
                  class="grid grid-cols-11 gap-2 text-gray-600 font-semibold text-xl mb-1"
                >
                  <p>Nombre</p>
                  <p>Apellidos</p>
                  <p>DNI</p>
                  <p>Centro de matriculación</p>
                  <p>Ciclo cursado y modalidad</p>
                  <p>Provincia</p>
                  <p>Teléfono</p>
                  <p>E-mail</p>
                  <p>Fecha de inicio</p>
                  <p>Fecha de fin</p>
                  <p>Resultado de la práctica</p>
                </div>
                <div class="grid grid-cols-11 gap-2 text-gray-800 text-lg mb-4">
                  <p>{{ alumn.first_name }}</p>
                  <p>{{ alumn.last_name_1 }} {{ alumn.last_name_2 }}</p>
                  <p>{{ alumn.dni }}</p>
                  <p>{{ alumn.enrollment_center }}</p>
                  <p>
                    {{ alumn?.cycle?.name }} <br />{{ alumn?.modality?.name }}
                  </p>
                  <p>{{ alumn.province?.name }}</p>
                  <p>{{ alumn.phone }}</p>
                  <p>{{ alumn.email }}</p>
                  <p>{{ alumn.start_date }}</p>
                  <p>{{ alumn.end_date }}</p>
                  <p>{{ alumn.result }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

      <div class=" w-full max-w-450 max-h-100 border-2 border-gray 950 rounded-lg shadow-md p-6 mt-4 ml-15 mb-15">
        <StudentsChart/>
      </div>
      <br/>
      <div class="page-break w-full max-w-450 max-h-100 border-2 border-gray 950 rounded-lg shadow-md p-6 mt-4 ml-5 mr-16 mb-15">
        <RatingsChart/>
      </div>

    
    <div>
      <button
       onclick="window.print()"
        class="no-print bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Descargar PDF
      </button>
    </div>

  </body>

  <Modal ref="modalModifyCompany" title="Modificar datos de la empresa">
    <ModifyCompany
      :company-id="route.params.id"
      :company-data="company"
      @update="fetchCompany"
    />
  </Modal>

  <Modal ref="modalDeleteCompany" title="¿Seguro quieres eliminar esta empresa?">
    <DeleteCompany
      :company-id="route.params.id"
      @delete="fetchCompany"
      @close="modalDeleteCompany?.closeModal()"
    />
    
 </Modal>

</template>

<style scoped>
  @media print{
    .no-print{
      display: none;
    }

    .page-break {
      page-break-after: always;
    }

  }

</style>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { supabase } from '../components/services/DatabaseConnection';
  import ModifyCompany from '../components/services/companyInformation/ModifyCompany.vue';
  import DeleteCompany from '../components/services/companyInformation/DeleteCompany.vue';
  import StudentsChart from '../components/services/companyInformation/StudentChart.vue';
  import RatingsChart from '../components/services/companyInformation/RatingsChart.vue';
  import Modal from '../components/common/Modal.vue';
  import HeaderDashboard from '../components/common/HeaderDashboard.vue';



  const modalModifyCompany = ref();
  const modalDeleteCompany = ref();

  const openModifyCompany = () => {
    modalModifyCompany.value?.openModal();
  };

  const openDelete = () => {
    modalDeleteCompany.value?.openModal();
  };

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
    province: string;
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
      .from('company')
      .select(
        'name, cif, address, active, phone, email, province:province_id (name), modality:modality_id (name)'
      )
      .eq('id', companyId)
      .single();

    if (companyErr) {
      error.value = companyErr.message;
    } else {
      company.value = companyData;
    }

    // OBTENER CICLOS ASOCIADOS A LA EMPRESA SELECCIONADA
    const { data: cyclesData, error: cyclesErr } = await supabase
      .from('company_cycle')
      .select(
        'cycle:cycle_id (name, education_level, modality:modality_id (name))'
      )
      .eq('company_id', companyId);

    if (cyclesErr) {
      errorCycles.value = cyclesErr.message;
    } else {
      cyclesCompany.value = cyclesData.map((item: any) => item.cycle);
    }

    // OBTENER ALUMNOS ASOCIADOS A LA EMPRESA SELECCIONADA
    const { data: internData, error: internErr } = await supabase
      .from('internship')
      .select('alumn_id')
      .eq('company_id', companyId);

    if (internErr) {
      errorAlumn.value = internErr.message;
    } else {
      const alumnIds = internData.map((item: any) => item.alumn_id);
      const { data: alumnData, error: alumnErr } = await supabase
        .from('alumn')
        .select(
          '*, cycle:cycle_id (name), modality:modality_id (name), province:province_id (name)'
        )
        .in('id', alumnIds);

      if (alumnErr) {
        errorAlumn.value = alumnErr.message;
      } else {
        alumnDetails.value = alumnData;
      }
    }

    // MOSTRAR LOS ALUMNOS EN LA TABLA ACTUALES O ANTIGUOS SEGÚN EL ESTADO
    const { data: intershipData, error: intershipErr } = await supabase
      .from('internship')
      .select('*')
      .eq('company_id', companyId);

    if (intershipErr) {
      errorIntership.value = intershipErr.message;
      console.log(intershipErr);
    } else {
      interships.value = intershipData;
    }

    // FILTRADO DE ALUMNOS ACTUALES Y ANTIGUOS
    const currentlyStudents = alumnDetails.value
      .filter((alumn: any) => {
        return (
          alumn.status &&
          typeof alumn.status === 'string' &&
          ['activo', 'sin cursar', 'cursando'].includes(
            alumn.status.toLowerCase()
          )
        );
      })
      .map((alumn: any) => {
        const intern = interships.value.find((i) => i.alumn_id === alumn.id);
        return {
          ...alumn,
          start_date: intern?.start_date,
          end_date: intern?.end_date,
        };
      });

    const oldStudentsFilter = alumnDetails.value
      .filter((alumn: any) => {
        return (
          alumn.status &&
          typeof alumn.status === 'string' &&
          alumn.status.toLowerCase() === 'finalizado'
        );
      })
      .map((alumn: any) => {
        const intern = interships.value.find((i) => i.alumn_id === alumn.id);
        return {
          ...alumn,
          start_date: intern?.start_date,
          end_date: intern?.end_date,
          result: intern?.result,
        };
      });

    // OBTENER LOS ALUMNOS ACTUALES
    currentStudents.value = currentlyStudents;

    // OBTENER LOS ALUMNOS ANTIGUOS
    oldStudents.value = oldStudentsFilter;

    loadingIntership.value = false;
    loadingCycles.value = false;
    loading.value = false;
    loadingAlumn.value = false;
  });
</script>
