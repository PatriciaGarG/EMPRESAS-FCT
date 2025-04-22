import { supabase } from './DatabaseConnection';

export async function fetchCompany() {
  const { data, error } = await supabase
    .from('company')
    .select(
      'id, name, cif, address, student_count, active, phone, email, modality_id, modality (name), province_id, province (name)'
    );
  console.log(data);
  if (data) {
    return data;
  }
  if (error) {
    console.error('Error fetching company data:', error);
  }
  return data;
}
