interface AlumnDataDB {
  first_name: string;
  last_name_1: string;
  last_name_2: string;
  dni: string;
  enrollment_center: string;
  phone: string;
  email: string;
  status: string;
  modality_id: { name: string };
  cycle_id: { name: string };
  province_id: { name: string };
}

interface AlumnData {
  id: string;
  name: string;
  dni: string;
  enrollment_center: string;
  phone: string;
  email: string;
  status: string;
  modality: string;
  cycle: string;
  province: string;
}
