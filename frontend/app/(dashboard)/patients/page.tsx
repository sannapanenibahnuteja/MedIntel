"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Patient,
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
} from "@/lib/patient";

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingPatientId, setEditingPatientId] = useState<number | null>(null);

const [form, setForm] = useState({
  first_name: "",
  last_name: "",
  age: "",
  gender: "",
  disease: "",
  phone: "",
  blood_group: "",
  email: "",
  height: "",
});

const loadPatients = async () => {
  try {
    const token = localStorage.getItem("token") || "";

    const data = await getPatients(token, search);

    setPatients(data);
  } catch (error) {
    console.error(error);
    toast.error("Failed to load patients.");
  } finally {
    setLoading(false);
  }
};
const savePatient = async () => {
  if (
    !form.first_name ||
    !form.last_name ||
    !form.age ||
    !form.gender
  ) {
    toast.error("Please fill all required fields.");
    return;
  }

  try {
  const token = localStorage.getItem("token") || "";

  const patientData = {
    first_name: form.first_name,
    last_name: form.last_name,
    age: Number(form.age),
    gender: form.gender,
    disease: form.disease || undefined,
    phone: form.phone || undefined,
    blood_group: form.blood_group || undefined,
    email: form.email || undefined,
    height: form.height
      ? Number(form.height)
      : undefined,
  };

  if (editingPatientId) {
    await updatePatient(
      editingPatientId,
      patientData,
      token
    );

    toast.success("Patient updated successfully!");
  } else {
    await createPatient(
      patientData,
      token
    );

    toast.success("Patient created successfully!");
  }

    setShowModal(false);

    setForm({
      first_name: "",
      last_name: "",
      age: "",
      gender: "",
      disease: "",
      phone: "",
      blood_group: "",
      email: "",
      height: "",
    });

    loadPatients();
  } catch (error) {
    console.error(error);
    toast.error("Unable to create patient.");
  }
};
const handleDelete = async (id: number) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this patient?"
  );

  if (!confirmed) return;

  try {
    const token = localStorage.getItem("token") || "";

    await deletePatient(id, token);

    toast.success("Patient deleted successfully!");

    loadPatients();
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete patient.");
  }
};

  useEffect(() => {
  loadPatients();
}, [search]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

  <div>
    <h1 className="text-4xl font-bold text-blue-600">
      Patients
    </h1>

    <p className="mt-2 text-gray-500">
      Manage all registered patients
    </p>
  </div>

  <div className="flex items-center gap-3">

    <input
      type="text"
      placeholder="🔍 Search patients..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-72 rounded-lg border border-gray-300 bg-white p-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
    />

    <button
      onClick={() => {
        setEditingPatientId(null);

        setForm({
          first_name: "",
          last_name: "",
          age: "",
          gender: "",
          disease: "",
          phone: "",
          blood_group: "",
          email: "",
          height: "",
        });

        setShowModal(true);
      }}
      className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
    >
      + Add Patient
    </button>

  </div>

</div>

      <div className="overflow-hidden rounded-xl bg-white shadow">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left text-gray-700">ID</th>
              <th className="p-4 text-left text-gray-700">Name</th>
              <th className="p-4 text-left text-gray-700">Age</th>
              <th className="p-4 text-left text-gray-700">Gender</th>
              <th className="p-4 text-left text-gray-700">Disease</th>
              <th className="p-4 text-left text-gray-700">Phone</th>
              <th className="p-4 text-center text-gray-700">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : patients.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  No patients found.
                </td>
              </tr>
            ) : (
              patients.map((patient) => (
                <tr
                  key={patient.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4 text-gray-800">
                    {patient.id}
                  </td>

                  <td className="p-4 text-gray-800">
                    {patient.first_name} {patient.last_name}
                  </td>

                  <td className="p-4 text-gray-800">
                    {patient.age}
                  </td>

                  <td className="p-4 text-gray-800">
                    {patient.gender}
                  </td>

                  <td className="p-4 text-gray-800">
                    {patient.disease}
                  </td>

                  <td className="p-4 text-gray-800">
  {patient.phone}
</td>

<td className="p-4">
  <div className="flex justify-center gap-2">

    <button
  onClick={() => {
    setEditingPatientId(patient.id!);

    setForm({
      first_name: patient.first_name,
      last_name: patient.last_name,
      age: patient.age.toString(),
      gender: patient.gender,
      disease: patient.disease || "",
      phone: patient.phone || "",
      blood_group: patient.blood_group || "",
      email: patient.email || "",
      height: patient.height
        ? patient.height.toString()
        : "",
    });

    setShowModal(true);
  }}
  className="rounded-lg bg-yellow-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-yellow-600"
>
  Edit
</button>

    <button
      onClick={() => handleDelete(patient.id!)}
      className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
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
                Add Patient
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-3xl text-gray-500 hover:text-red-500"
              >
                ×
              </button>

            </div>

            <div className="grid grid-cols-2 gap-5">

              <input
                placeholder="First Name"
                value={form.first_name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    first_name: e.target.value,
                  })
                }
                className="rounded-lg border border-gray-300 bg-white p-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />

              <input
                placeholder="Last Name"
                value={form.last_name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    last_name: e.target.value,
                  })
                }
                className="rounded-lg border p-3"
              />

              <input
                type="number"
                placeholder="Age"
                value={form.age}
                onChange={(e) =>
                  setForm({
                    ...form,
                    age: e.target.value,
                  })
                }
                className="rounded-lg border p-3"
              />

              <input
                placeholder="Gender"
                value={form.gender}
                onChange={(e) =>
                  setForm({
                    ...form,
                    gender: e.target.value,
                  })
                }
                className="rounded-lg border p-3"
              />

              <input
                placeholder="Disease"
                value={form.disease}
                onChange={(e) =>
                  setForm({
                    ...form,
                    disease: e.target.value,
                  })
                }
                className="rounded-lg border p-3"
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
                className="rounded-lg border p-3"
              />

              <input
                placeholder="Blood Group"
                value={form.blood_group}
                onChange={(e) =>
                  setForm({
                    ...form,
                    blood_group: e.target.value,
                  })
                }
                className="rounded-lg border p-3"
              />

              <input
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className="rounded-lg border border-gray-300 bg-white p-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />

              <input
                placeholder="Height"
                value={form.height}
                onChange={(e) =>
                  setForm({
                    ...form,
                    height: e.target.value,
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
  onClick={savePatient}
  className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
>
  Save Patient
</button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}