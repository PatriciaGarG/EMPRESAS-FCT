import { ref } from 'vue';
import { fetchAllCompanyData } from '../components/services/company-data';

export const useAllCompanyData = () => {
  const allCompanyOptions = ref<any[]>([]);

  //Función para obtener los datos del alumno de Supabase e insertalos en el objeto
  const getAllCompanyData = async () => {
    const { data, error } = await fetchAllCompanyData();

    if (error) {
      console.log(error);
    } else {
      allCompanyOptions.value = [
        { label: 'Sin empresa', value: null },
        ...data.map((company: any) => ({
          label:
            company.name + ' - ' + company.province?.name + ' - ' + company.cif,
          value: company.id,
        })),
      ];
    }
  };

  return {
    allCompanyOptions,
    getAllCompanyData,
  };
};
