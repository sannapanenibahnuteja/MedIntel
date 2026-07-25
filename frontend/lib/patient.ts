import api from "./api";

export interface Patient {
  id?: number;
  first_name: string;
  last_name: string;
  age: number;
  gender: string;
  disease?: string;
  phone?: string;
  blood_group?: string;
  email?: string;
  height?: number;
}

export async function getPatients(
  token: string,
  search = ""
) {
  const response = await api.get("/patients", {
    params: {
      search,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function createPatient(
  patient: Patient,
  token: string
) {
  const response = await api.post(
    "/patients",
    patient,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function updatePatient(
  id: number,
  patient: Patient,
  token: string
) {
  const response = await api.put(
    `/patients/${id}`,
    patient,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function deletePatient(
  id: number,
  token: string
) {
  await api.delete(`/patients/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}