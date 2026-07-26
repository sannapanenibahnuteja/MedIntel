import api from "./api";

export async function getDashboardStats(token: string) {
  const response = await api.get("/dashboard/stats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}