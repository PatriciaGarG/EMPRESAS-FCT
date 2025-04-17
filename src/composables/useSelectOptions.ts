import { fetchSelectOptions } from '../components/services/select-options';

export const useSelectOptions = () => {
  const provincesData: any = [];
  const cyclesData: any = [];
  const modalitiesData: any = [];

  const getSelectOptions = async () => {
    const { provinces, cycles, modalities } = await fetchSelectOptions();

    if (provinces && cycles && modalities) {
      provinces.forEach((province: any) => {
        provincesData.push({
          label: province.name,
          value: province.id,
        });
      });

      cycles.forEach((cycle: any) => {
        cyclesData.push({
          label: cycle.name,
          value: cycle.id,
        });
      });

      modalities.forEach((modality: any) => {
        modalitiesData.push({
          label: modality.name,
          value: modality.id,
        });
      });
    } else {
      throw Error('Error al obtener las opciones del select');
    }
  };

  return {
    getSelectOptions,
    provincesData,
    cyclesData,
    modalitiesData,
  };
};
