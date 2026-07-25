import api from "./api";

export interface MedicalRecord {
  id?: number;

  patient_id: number;
  doctor_id: number;
  appointment_id: number;

  symptoms: string;
  diagnosis: string;

  medications?: string;
  allergies?: string;
  doctor_notes?: string;

  created_at?: string;
  updated_at?: string;
}


export async function getMedicalRecords(
  token: string,
  search = ""
) {
  const response = await api.get(
    "/medical-records",
    {
      params: {
        search,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}


export async function createMedicalRecord(
  record: MedicalRecord,
  token: string
) {
  const response = await api.post(
    "/medical-records",
    record,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}


export async function updateMedicalRecord(
  id: number,
  record: MedicalRecord,
  token: string
) {
  const response = await api.put(
    `/medical-records/${id}`,
    record,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}


export async function deleteMedicalRecord(
  id: number,
  token: string
) {
  await api.delete(
    `/medical-records/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}