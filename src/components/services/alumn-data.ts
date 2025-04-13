import { supabase } from './DatabaseConnection';

export async function fetchAlumnData(id: string): Promise<any> {
  try {
    const { data, error } = await supabase
      .from('alumn')
      .select(
        'first_name, last_name_1, last_name_2, dni, enrollment_center, phone, email, status, modality_id:modality(name), cycle_id:cycle(name), province_id:province(name)'
      )
      .eq('id', id);
  
    return { data, error };
  } catch (error) {
    console.error('Error al obtener los datos:', error);

    return error;
  }
}

export async function fetchCurrentCompanyData(id: string): Promise<any> {
  try {
    const { data, error } = await supabase
      .from('internship')
      .select('company_id:company(name), start_date, end_date, cycle_id:cycle(name), result')
      .eq('alumn_id', id);

    return { data, error };
  } catch (error) {
    console.error('Error al obtener los datos:', error);

    return error;
  }
}
