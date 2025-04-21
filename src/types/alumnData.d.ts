export interface AlumnDataDB {
  first_name: string;
  last_name_1: string;
  last_name_2: string | null;
  dni: string;
  enrollment_center: string;
  phone: string;
  email: string;
  status: string;
  modality: { name: string };
  cycle: { name: string };
  province: { name: string };
  modality_id: string;
  cycle_id: string;
  province_id: string;
}

export interface AlumnData {
  id: string;
  full_name: string;
  first_name: string;
  last_name_1: string;
  last_name_2: string | null;
  dni: string;
  enrollment_center: string;
  phone: string;
  email: string;
  status: string;
  modality_name: string;
  cycle_name: string;
  province_name: string;
  modality_id: string;
  cycle_id: string;
  province_id: string;
  has_company: boolean;
}

export interface CurrentCompanyDB {
  company_id: { name: string };
  cycle_id: { name: string };
  end_date: string;
  start_date: string;
  result: string;
}

interface CurrentCompany {
  company: string;
  cycle: string;
  end_date: string;
  start_date: string;
  result: string;
}
