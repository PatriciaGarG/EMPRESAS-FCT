import { ref } from 'vue';
import type { Alumn, AlumnDB } from '../types/alumn.d.ts';
import { getAlumn } from '../components/services/AlumnService';

const alumnData = ref<Alumn[]>([]);
let loaded = false;

export const useAlumn = async () => {
  if (!loaded) {
    const data = await getAlumn();
    if (data) {
      const alumnDataDB = data as unknown as AlumnDB[];
      alumnData.value = alumnDataDB.map((a) => ({
        id: a.id,
        name: `${a.first_name} ${a.last_name_1} ${a.last_name_2 ?? ''}`.trim(),
        dni: a.dni,
        phone: a.phone,
        email: a.email,
        enrollment_center: a.enrollment_center,
        modality_id: a.modality_id,
        cycle_id: a.cycle_id,
        province_id: a.province_id,
        status: a.status,
        company_name: a.internship?.[0]?.company_id?.name ?? null,
        company_id: a.internship?.[0]?.company_id?.id ?? null,
      }));
      loaded = true;
    }
  }

  return { alumnData };
};