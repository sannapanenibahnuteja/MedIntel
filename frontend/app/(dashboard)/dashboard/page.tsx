"use client";

import { useEffect, useState } from "react";
import {
  Users,
  UserCog,
  Calendar,
  FileText,
  TrendingUp,
} from "lucide-react";

import { getDashboardStats } from "@/lib/dashboard";

export default function Dashboard() {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0,
    medical_records: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const token = localStorage.getItem("token") || "";

        const data = await getDashboardStats(token);

        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadStats();
  }, []);

  return (
    <div>

      <div className="mb-10 flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Welcome back to MedIntel Hospital Management System
          </p>

        </div>

        <div className="rounded-xl bg-blue-600 px-6 py-3 text-white shadow-lg">
          <p className="text-sm opacity-80">
            System Status
          </p>

          <p className="text-lg font-bold">
            ● Online
          </p>
        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-blue-100">
                Total Patients
              </p>

              <h2 className="mt-3 text-5xl font-bold">
  {stats.patients}
</h2>

            </div>

            <Users size={50} />

          </div>

        </div>

        <div className="rounded-2xl bg-gradient-to-r from-green-600 to-green-500 p-6 text-white shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-green-100">
                Doctors
              </p>

              <h2 className="mt-3 text-5xl font-bold">
  {stats.doctors}
</h2>

            </div>

            <UserCog size={50} />

          </div>

        </div>

        <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 p-6 text-white shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-orange-100">
                Appointments
              </p>

              <h2 className="mt-3 text-5xl font-bold">
  {stats.appointments}
</h2>

            </div>

            <Calendar size={50} />

          </div>

        </div>

        <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-purple-500 p-6 text-white shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-purple-100">
                Medical Records
              </p>

              <h2 className="mt-3 text-5xl font-bold">
  {stats.medical_records}
</h2>

            </div>

            <FileText size={50} />

          </div>

        </div>

      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">

        <div className="rounded-2xl bg-white p-8 shadow-lg">

          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-800">

            <TrendingUp />

            Hospital Overview

          </h2>

          <div className="space-y-5">

            <div className="flex justify-between rounded-lg bg-slate-100 p-4">

              <span>Total Patients</span>

              <strong>{stats.patients}</strong>

            </div>

            <div className="flex justify-between rounded-lg bg-slate-100 p-4">

              <span>Today's Appointments</span>

              <strong>{stats.appointments}</strong>

            </div>

            <div className="flex justify-between rounded-lg bg-slate-100 p-4">

              <span>Doctors Available</span>

              <strong>{stats.doctors}</strong>

            </div>

            <div className="flex justify-between rounded-lg bg-slate-100 p-4">

              <span>Medical Records</span>

              <strong>{stats.medical_records}</strong>

            </div>

          </div>

        </div>

        <div className="rounded-2xl bg-white p-8 shadow-lg">

          <h2 className="mb-6 text-2xl font-bold text-slate-800">
            Recent Activity
          </h2>

          <div className="space-y-4">

            <div className="rounded-lg border-l-4 border-blue-600 bg-slate-50 p-4">
              No recent activities yet.
            </div>

            <div className="rounded-lg border-l-4 border-green-600 bg-slate-50 p-4">
              Patient registrations will appear here.
            </div>

            <div className="rounded-lg border-l-4 border-orange-500 bg-slate-50 p-4">
              Appointment updates will appear here.
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}