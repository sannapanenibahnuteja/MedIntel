"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface DashboardChartsProps {
  patients: number;
  doctors: number;
  appointments: number;
  medicalRecords: number;
}

export default function DashboardCharts({
  patients,
  doctors,
  appointments,
  medicalRecords,
}: DashboardChartsProps) {
  const data = [
    {
      name: "Patients",
      value: patients,
    },
    {
      name: "Doctors",
      value: doctors,
    },
    {
      name: "Appointments",
      value: appointments,
    },
    {
      name: "Records",
      value: medicalRecords,
    },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-slate-800">
        Hospital Statistics
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="value" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}