import api from "./api";

export interface Doctor {
  id?: number;
  name: string;
  specialization: string;
  qualification: string;
  experience: number;
  email: string;
  phone: string;
  consultation_fee: number;
  available: boolean;
}

export async function getDoctors(
  token: string,
  search = ""
) {
  const response = await api.get("/doctors", {
    params: {
      search,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function createDoctor(
  doctor: Doctor,
  token: string
) {
  const response = await api.post(
    "/doctors",
    doctor,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function updateDoctor(
  id: number,
  doctor: Doctor,
  token: string
) {
  const response = await api.put(
    `/doctors/${id}`,
    doctor,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function deleteDoctor(
  id: number,
  token: string
) {
  await api.delete(`/doctors/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}