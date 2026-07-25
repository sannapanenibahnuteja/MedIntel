"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  Doctor,
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "@/lib/doctor";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingDoctorId, setEditingDoctorId] =
    useState<number | null>(null);

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    qualification: "",
    experience: "",
    email: "",
    phone: "",
    consultation_fee: "",
    available: true,
  });

  const loadDoctors = async () => {
    try {
      const token =
        localStorage.getItem("token") || "";

      const data = await getDoctors(
        token,
        search
      );

      setDoctors(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load doctors.");
    } finally {
      setLoading(false);
    }
  };
const saveDoctor = async () => {
  if (
    !form.name ||
    !form.specialization ||
    !form.qualification ||
    !form.experience ||
    !form.email ||
    !form.phone ||
    !form.consultation_fee
  ) {
    toast.error("Please fill all required fields.");
    return;
  }

  try {
    const token = localStorage.getItem("token") || "";

    const doctorData: Doctor = {
      name: form.name,
      specialization: form.specialization,
      qualification: form.qualification,
      experience: Number(form.experience),
      email: form.email,
      phone: form.phone,
      consultation_fee: Number(form.consultation_fee),
      available: form.available,
    };

    if (editingDoctorId) {
      await updateDoctor(
        editingDoctorId,
        doctorData,
        token
      );

      toast.success("Doctor updated successfully!");
    } else {
      await createDoctor(
        doctorData,
        token
      );

      toast.success("Doctor created successfully!");
    }

    setShowModal(false);

    setEditingDoctorId(null);

    setForm({
      name: "",
      specialization: "",
      qualification: "",
      experience: "",
      email: "",
      phone: "",
      consultation_fee: "",
      available: true,
    });

    loadDoctors();

  } catch (error) {
    console.error(error);
    toast.error("Unable to save doctor.");
  }
};
const handleDelete = async (id: number) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this doctor?"
  );

  if (!confirmed) return;

  try {
    const token = localStorage.getItem("token") || "";

    await deleteDoctor(id, token);

    toast.success("Doctor deleted successfully!");

    loadDoctors();

  } catch (error) {
    console.error(error);
    toast.error("Failed to delete doctor.");
  }
};

  useEffect(() => {
    loadDoctors();
  }, [search]);
    return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-4xl font-bold text-blue-600">
            Doctors
          </h1>

          <p className="mt-2 text-gray-500">
            Manage all registered doctors
          </p>
        </div>

        <div className="flex items-center gap-3">

          <input
            type="text"
            placeholder="Search doctors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-72 rounded-lg border border-gray-300 bg-white p-3 text-gray-900"
          />

          <button
            onClick={() => setShowModal(true)}
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            + Add Doctor
          </button>

        </div>

      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Specialization</th>
              <th className="p-4 text-left">Experience</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan={6}
                  className="p-8 text-center"
                >
                  Loading...
                </td>

              </tr>

            ) : doctors.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="p-8 text-center"
                >
                  No doctors found.
                </td>

              </tr>

            ) : (

              doctors.map((doctor) => (

                <tr
                  key={doctor.id}
                  className="border-t"
                >

                  <td className="p-4">
                    {doctor.id}
                  </td>

                  <td className="p-4">
                    {doctor.name}
                  </td>

                  <td className="p-4">
                    {doctor.specialization}
                  </td>

                  <td className="p-4">
                    {doctor.experience} yrs
                  </td>

                  <td className="p-4">
                    {doctor.phone}
                  </td>

                  <td className="p-4">
                    {doctor.available ? "Available" : "Unavailable"}
                  </td>
                  <td className="p-4">
  <div className="flex justify-center gap-2">

    <button
      onClick={() => {
        setEditingDoctorId(doctor.id!);

        setForm({
          name: doctor.name,
          specialization: doctor.specialization,
          qualification: doctor.qualification,
          experience: doctor.experience.toString(),
          email: doctor.email,
          phone: doctor.phone,
          consultation_fee: doctor.consultation_fee.toString(),
          available: doctor.available,
        });

        setShowModal(true);
      }}
      className="rounded-lg bg-yellow-500 px-3 py-2 text-sm font-semibold text-white hover:bg-yellow-600"
    >
      Edit
    </button>

    <button
      onClick={() => handleDelete(doctor.id!)}
      className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700"
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

          <div className="w-full max-w-3xl rounded-xl bg-white p-8 shadow-2xl">

            <div className="mb-8 flex items-center justify-between">

              <h2 className="text-2xl font-bold text-gray-800">
                {editingDoctorId ? "Edit Doctor" : "Add Doctor"}
              </h2>

              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingDoctorId(null);
                }}
                className="text-3xl text-gray-500 hover:text-red-500"
              >
                ×
              </button>

            </div>

            <div className="grid grid-cols-2 gap-5">

              <input
                placeholder="Doctor Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="rounded-lg border border-gray-300 p-3"
              />

              <input
                placeholder="Specialization"
                value={form.specialization}
                onChange={(e) =>
                  setForm({
                    ...form,
                    specialization: e.target.value,
                  })
                }
                className="rounded-lg border border-gray-300 p-3"
              />

              <input
                placeholder="Qualification"
                value={form.qualification}
                onChange={(e) =>
                  setForm({
                    ...form,
                    qualification: e.target.value,
                  })
                }
                className="rounded-lg border border-gray-300 p-3"
              />

              <input
                type="number"
                placeholder="Experience (Years)"
                value={form.experience}
                onChange={(e) =>
                  setForm({
                    ...form,
                    experience: e.target.value,
                  })
                }
                className="rounded-lg border border-gray-300 p-3"
              />

              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className="rounded-lg border border-gray-300 p-3"
              />

              <input
                placeholder="Phone"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
                className="rounded-lg border border-gray-300 p-3"
              />

              <input
                type="number"
                placeholder="Consultation Fee"
                value={form.consultation_fee}
                onChange={(e) =>
                  setForm({
                    ...form,
                    consultation_fee: e.target.value,
                  })
                }
                className="rounded-lg border border-gray-300 p-3"
              />

              <label className="flex items-center gap-3 rounded-lg border border-gray-300 p-3">
                <input
                  type="checkbox"
                  checked={form.available}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      available: e.target.checked,
                    })
                  }
                />

                Available
              </label>

            </div>

            <div className="mt-8 flex justify-end gap-4">

              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingDoctorId(null);
                }}
                className="rounded-lg border px-5 py-3"
              >
                Cancel
              </button>

              <button
                onClick={saveDoctor}
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                {editingDoctorId ? "Update Doctor" : "Save Doctor"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}