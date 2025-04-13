import { reactive } from 'vue';
import { fetchCurrentCompanyData } from '../components/services/alumn-data';

export const useCurrentCompanyData = (id: string) => {
  const currentCompanyData: CurrentCompany = reactive({
    company: '',
    cycle: '',
    end_date: '',
    start_date: '',
    result: '',
  });

  const getCurrentCompanyData = async () => {
    const { data, error } = await fetchCurrentCompanyData(id);
  
    if (error) {
      console.log(error);
    } else {
      const currentCompany: CurrentCompanyDB = data[0];

      currentCompanyData.company = currentCompany.company_id.name;
      currentCompanyData.cycle = currentCompany.cycle_id.name;
      currentCompanyData.end_date = currentCompany.end_date;
      currentCompanyData.start_date = currentCompany.start_date;
      currentCompanyData.result = currentCompany.result;
    }
  };
  return {
    currentCompanyData,
    getCurrentCompanyData,
  };
};
