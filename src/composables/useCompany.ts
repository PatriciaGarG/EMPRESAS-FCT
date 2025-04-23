import { reactive } from 'vue';
import type { Company } from '../types/company';
import { fetchCompany } from '../components/services/CompanyService';

export const useCompany = () => {
  const company: Company[] = reactive([]);

  const getCompany = async () => {
    try {
      const data = await fetchCompany();
      if (data) {
        const companyDataDB = data as unknown as Company[];

        companyDataDB.forEach((companyDB) => {
          company.push({
            id: companyDB.id,
            name: companyDB.name,
            cif: companyDB.cif,
            address: companyDB.address,
            student_count: companyDB.student_count,
            active: companyDB.active,
            phone: companyDB.phone,
            email: companyDB.email,
            modality_id: companyDB.modality_id,
            province_id: companyDB.province_id,
            modality: { name: companyDB.modality.name },
            province: { name: companyDB.province.name },
          });
        });
        console.log(company);
        console.log('Company data fetched successfully:', companyDataDB);
      }
    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  };

  return {
    company,
    getCompany,
  };
};
