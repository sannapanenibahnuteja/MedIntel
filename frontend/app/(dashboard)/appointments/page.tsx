"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  Appointment,
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "@/lib/appointment";

import { Patient, getPatients } from "@/lib/patient";
import { Doctor, getDoctors } from "@/lib/doctor";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [form, setForm] = useState({
    patient_id: "",
    doctor_id: "",
    appointment_date: "",
    appointment_time: "",
    notes: "",
    status: "SCHEDULED",
  });

  const loadData = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      console.log("TOKEN:", token);

      const [
        appointmentData,
        patientData,
        doctorData,
      ] = await Promise.all([
        getAppointments(token, search),
        getPatients(token),
        getDoctors(token),
      ]);

      setAppointments(appointmentData);
      setPatients(patientData);
      setDoctors(doctorData);

    } catch (error) {
      console.error(error);
      toast.error("Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  };
  const saveAppointment = async () => {
  if (
    !form.patient_id ||
    !form.doctor_id ||
    !form.appointment_date ||
    !form.appointment_time
  ) {
    toast.error("Please fill all required fields.");
    return;
  }

  try {
    const token = localStorage.getItem("token") || "";

    const appointmentData: Appointment = {
      patient_id: Number(form.patient_id),
      doctor_id: Number(form.doctor_id),
      appointment_date: form.appointment_date,
      appointment_time: form.appointment_time,
      notes: form.notes,
      status: form.status,
    };

    if (editingId) {
      await updateAppointment(
        editingId,
        appointmentData,
        token
      );

      toast.success("Appointment updated!");
    } else {
      await createAppointment(
        appointmentData,
        token
      );

      toast.success("Appointment created!");
    }

    setShowModal(false);

    setEditingId(null);

    setForm({
      patient_id: "",
      doctor_id: "",
      appointment_date: "",
      appointment_time: "",
      notes: "",
      status: "SCHEDULED",
    });

    loadData();

  } catch (error) {
    console.error(error);
    toast.error("Failed to save appointment.");
  }
};

  useEffect(() => {
    loadData();
  }, [search]);
    return (
    <div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-4xl font-bold text-blue-600">
            Appointments
          </h1>

          <p className="mt-2 text-gray-500">
            Manage all appointments
          </p>
        </div>

        <div className="flex items-center gap-3">

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-72 rounded-lg border border-gray-300 bg-white p-3 text-gray-900"
          />

          <button
            onClick={() => setShowModal(true)}
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            + Add Appointment
          </button>

        </div>

      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Patient</th>
              <th className="p-4 text-left">Doctor</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Time</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>
                <td colSpan={6} className="p-8 text-center">
                  Loading...
                </td>
              </tr>

            ) : appointments.length === 0 ? (

              <tr>
                <td colSpan={6} className="p-8 text-center">
                  No appointments found.
                </td>
              </tr>

            ) : (

              appointments.map((appointment) => (

                <tr
                  key={appointment.id}
                  className="border-t"
                >

                  <td className="p-4">
                    {appointment.id}
                  </td>

                  <td className="p-4">
  {
    patients.find(
      (p) => p.id === appointment.patient_id
    )?.first_name
  }{" "}
  {
    patients.find(
      (p) => p.id === appointment.patient_id
    )?.last_name
  }
</td>

<td className="p-4">
  {
    doctors.find(
      (d) => d.id === appointment.doctor_id
    )?.name
  }
</td>

                  <td className="p-4">
                    {appointment.appointment_date}
                  </td>

                  <td className="p-4">
                    {appointment.appointment_time}
                  </td>

                  <td className="p-4">
                    {appointment.status}
                  </td>
                  <td className="p-4">

  <div className="flex justify-center gap-2">

    <button
      onClick={() => {
        setEditingId(appointment.id!);

        setForm({
          patient_id: appointment.patient_id.toString(),
          doctor_id: appointment.doctor_id.toString(),
          appointment_date: appointment.appointment_date,
          appointment_time: appointment.appointment_time,
          notes: appointment.notes || "",
          status: appointment.status || "SCHEDULED",
        });

        setShowModal(true);
      }}
      className="rounded-lg bg-yellow-500 px-3 py-2 text-sm text-white hover:bg-yellow-600"
    >
      Edit
    </button>


    <button
      onClick={async () => {

        const confirmDelete = window.confirm(
          "Delete this appointment?"
        );

        if (!confirmDelete) return;

        try {

          const token =
            localStorage.getItem("token") || "";

          await deleteAppointment(
            appointment.id!,
            token
          );

          toast.success(
            "Appointment deleted!"
          );

          loadData();

        } catch(error) {

          console.error(error);

          toast.error(
            "Failed to delete appointment."
          );

        }

      }}
      className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
    >
      Delete
    </button>

  </div>

</td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>
      {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

    <div className="w-full max-w-2xl rounded-xl bg-white p-8 shadow-2xl">

      <div className="mb-6 flex justify-between">

        <h2 className="text-2xl font-bold text-gray-800">
          Add Appointment
        </h2>

        <button
          onClick={() => setShowModal(false)}
          className="text-3xl text-gray-500"
        >
          ×
        </button>

      </div>


      <div className="grid grid-cols-2 gap-5">

        <select
          value={form.patient_id}
          onChange={(e) =>
            setForm({
              ...form,
              patient_id: e.target.value,
            })
          }
          className="rounded-lg border p-3"
        >
          <option value="">
            Select Patient
          </option>

          {patients.map((patient) => (
            <option
              key={patient.id}
              value={patient.id}
            >
              {patient.first_name} {patient.last_name}
            </option>
          ))}

        </select>


        <select
          value={form.doctor_id}
          onChange={(e) =>
            setForm({
              ...form,
              doctor_id: e.target.value,
            })
          }
          className="rounded-lg border p-3"
        >

          <option value="">
            Select Doctor
          </option>

          {doctors.map((doctor) => (
            <option
              key={doctor.id}
              value={doctor.id}
            >
              {doctor.name}
            </option>
          ))}

        </select>


        <input
          type="date"
          value={form.appointment_date}
          onChange={(e) =>
            setForm({
              ...form,
              appointment_date: e.target.value,
            })
          }
          className="rounded-lg border p-3"
        />


        <input
          type="time"
          value={form.appointment_time}
          onChange={(e) =>
            setForm({
              ...form,
              appointment_time: e.target.value,
            })
          }
          className="rounded-lg border p-3"
        />


        <select
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status: e.target.value,
            })
          }
          className="rounded-lg border p-3"
        >
          <option value="SCHEDULED">
            Scheduled
          </option>

          <option value="COMPLETED">
            Completed
          </option>

          <option value="CANCELLED">
            Cancelled
          </option>

        </select>


        <input
          placeholder="Notes"
          value={form.notes}
          onChange={(e) =>
            setForm({
              ...form,
              notes: e.target.value,
            })
          }
          className="rounded-lg border p-3"
        />

      </div>


      <div className="mt-8 flex justify-end gap-4">

        <button
          onClick={() => setShowModal(false)}
          className="rounded-lg border px-5 py-3"
        >
          Cancel
        </button>


        <button
          onClick={saveAppointment}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white"
        >
          Save Appointment
        </button>

      </div>

    </div>

  </div>
)}

    </div>
  );
}