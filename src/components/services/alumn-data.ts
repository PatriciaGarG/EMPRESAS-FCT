import type { AlumnData } from '../../types/alumnData';
import { supabase } from './DatabaseConnection';

export async function fetchAlumnData(id: string): Promise<any> {
  try {
    const { data, error } = await supabase
      .from('alumn')
      .select(
        'first_name, last_name_1, last_name_2, dni, enrollment_center, phone, email, status, modality_id, cycle_id, province_id,' +
          'modality(name), cycle(name), province(name)'
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
      .select(
        'company_id:company(name), start_date, end_date, cycle_id:cycle(name), result'
      )
      .eq('alumn_id', id);

    return { data, error };
  } catch (error) {
    console.error('Error al obtener los datos:', error);

    return error;
  }
}

export async function updateAlumnData(alumnData: any) {
  try {
    const { data, error } = await supabase
      .from('alumn')
      .upsert([alumnData], { onConflict: 'id' });

    if (error) {
      console.error('Error al actualizar los datos:', error.message);
      return { success: false, error: error.message };
    }

    console.log('Datos actualizados con éxito:', data);
    return { success: true, data };

  } catch (err: any) {
    console.error('Error al conectar con Supabase:', err);
    return { success: false, error: err.message };
  }
}
