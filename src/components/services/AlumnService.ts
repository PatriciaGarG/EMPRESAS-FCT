import { supabase } from './DatabaseConnection';
export async function getAlumn() {
  const { data, error } = await supabase
    .from('alumn')
    .select('first_name, last_name_1, last_name_2, dni, phone, email');
  if (data) {
    return data;
  }
  if (error) {
    console.error('Error fetching alumn data:', error);
  }
  return null;
}
