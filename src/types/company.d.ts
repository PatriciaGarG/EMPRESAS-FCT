//DATOS
export type Company = {
  id: string;
  name: string;
  cif: string;
  address: string;
  active: boolean;
  phone: string;
  email: string;
  modality_id: string;
  modality: { name: string };
  province_id: string;
  province: { name: string };
};

export type CompanyDB = Company & {
  company_cycle?: {
    cycle_id: {
      id: string;
      name: string;
    };
  }[];
};

export type CompanyWithCycles = Company & {
  cycles: { id: string; name: string }[];
};
