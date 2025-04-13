import { reactive } from 'vue';
import { fetchAlumnData } from '../components/services/alumn-data';
import type { AlumnData, AlumnDataDB } from '../types/alumnData';

export const useAlumnData = (id: string) => {
  const alumnData: AlumnData = reactive({
    id: '',
    name: '',
    enrollment_center: '',
    dni: '',
    phone: '',
    email: '',
    cycle: '',
    modality: '',
    province: '',
    status: '',
  });

  //Función para obtener los datos del alumno de Supabase e insertalos en el objeto
  const getAlumnData = async () => {
    const { data, error } = await fetchAlumnData(id);
    
    if (error) {
      console.log(error);
    } else {
      //Guardamos los datos en el reactive
      const alumn: AlumnDataDB = data[0];
      alumnData.id = id;
      alumnData.name = `${alumn.first_name} ${alumn.last_name_1} ${alumn.last_name_2 ? alumn.last_name_2 : ''}`.trim();
      alumnData.enrollment_center = alumn.enrollment_center;
      alumnData.dni = alumn.dni;
      alumnData.phone = alumn.phone;
      alumnData.email = alumn.email;
      alumnData.status = alumn.status;
      alumnData.province = alumn.province_id?.name;
      alumnData.cycle = alumn.cycle_id?.name;
      alumnData.modality = alumn.modality_id?.name;
    }
  };

  return {
    alumnData,
    getAlumnData,
  };
};
