import api from "./api";

export interface Appointment {
  id?: number;
  patient_id: number;
  doctor_id: number;
  appointment_date: string;
  appointment_time: string;
  status?: string;
  notes?: string;
}

export async function getAppointments(
  token: string,
  search = ""
) {
  const response = await api.get("/appointments", {
    params: {
      search,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function createAppointment(
  appointment: Appointment,
  token: string
) {
  const response = await api.post(
    "/appointments",
    appointment,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function updateAppointment(
  id: number,
  appointment: Appointment,
  token: string
) {
  const response = await api.put(
    `/appointments/${id}`,
    appointment,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function deleteAppointment(
  id: number,
  token: string
) {
  await api.delete(`/appointments/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}