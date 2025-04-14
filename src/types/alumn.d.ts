//DATOS
export type Alumn = {
  id: string;
  company_name: string;
  name: string;
  dni: string;
  phone: string;
  email: string;
  enrollment_center: string;
  modality_id: string;
  cycle_id: string;
  province_id: string;
  status: string;
};

//DATOS DE LA DB
export type CompanyDB = {
  company_id: [{ name: string }];
};

export type AlumnDB = {
  id: string;
  internship: CompanyDB[] | null;
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
