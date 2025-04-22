import { reactive } from 'vue';
import type { Alumn, AlumnDB } from '../types/alumn';
import { fetchAlumn } from '../components/services/AlumnService';

export const useAlumn = () => {
  const alumn: Alumn[] = reactive([]);

  const getAlumn = async () => {
    try {
      const data = await fetchAlumn();
      if (data) {
        const alumnDataDB = data as unknown as AlumnDB[];
        alumnDataDB.forEach((alumnDB) => {
          alumn.push({
            id: alumnDB.id,
            name: `${alumnDB.first_name} ${alumnDB.last_name_1} ${alumnDB.last_name_2}`.trim(),
            dni: alumnDB.dni,
            phone: alumnDB.phone,
            company_name:
              alumnDB.internship && alumnDB.internship[0]
                ? alumnDB.internship[0].company_id?.name
                : null,
            company_id:
              alumnDB.internship && alumnDB.internship[0]
                ? alumnDB.internship[0].company_id?.id
                : null,
            email: alumnDB.email,
            enrollment_center: alumnDB.enrollment_center,
            modality_id: alumnDB.modality_id,
            cycle_id: alumnDB.cycle_id,
            province_id: alumnDB.province_id,
            status: alumnDB.status,
          });
        });
        console.log(alumn);
        console.log('Alumn data fetched successfully:', alumnDataDB);
      }
    } catch (error) {
      console.error('Error fetching alumn data:', error);
    }
  };

  return {
    alumn,
    getAlumn,
  };
};
