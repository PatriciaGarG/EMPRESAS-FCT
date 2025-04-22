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
      allCompanyOptions.value = data.map((company: any) => ({
        name: company.name,
      }));
    }
  };

  return {
    allCompanyOptions,
    getAllCompanyData,
  };
};
