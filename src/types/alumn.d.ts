export type Company = {
  company_id: { name: string };
  alumn_id: string;
};

export type Alumn = {
  id: Company[];
  first_name: string;
  last_name_1: string;
  last_name_2: string | null;
  dni: string;
  phone: string;
  email: string;
  enrollment_center: string;
  modality_id: string;
  cycle_id: string;
  province_id: string;
  status: string;
};
