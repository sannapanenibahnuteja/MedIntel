"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  MedicalRecord,
  getMedicalRecords,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
} from "@/lib/medical_record";

import { Patient, getPatients } from "@/lib/patient";
import { Doctor, getDoctors } from "@/lib/doctor";
import { Appointment, getAppointments } from "@/lib/appointment";


export default function MedicalRecordsPage() {

  const [records, setRecords] = useState<MedicalRecord[]>([]);

  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingId, setEditingId] =
    useState<number | null>(null);


  const [form, setForm] = useState({
    patient_id: "",
    doctor_id: "",
    appointment_id: "",
    symptoms: "",
    diagnosis: "",
    medications: "",
    allergies: "",
    doctor_notes: "",
  });


  const loadData = async () => {

    try {

      const token =
        localStorage.getItem("token") || "";


      const [
        recordData,
        patientData,
        doctorData,
        appointmentData,
      ] = await Promise.all([

        getMedicalRecords(
          token,
          search
        ),

        getPatients(token),

        getDoctors(token),

        getAppointments(
          token
        ),

      ]);


      setRecords(recordData);

      setPatients(patientData);

      setDoctors(doctorData);

      setAppointments(appointmentData);


    } catch(error) {

      console.error(error);

      toast.error(
        "Failed to load medical records."
      );

    } finally {

      setLoading(false);

    }

  };
  const saveRecord = async () => {

  if (
    !form.patient_id ||
    !form.doctor_id ||
    !form.appointment_id ||
    !form.symptoms ||
    !form.diagnosis
  ) {
    toast.error(
      "Please fill all required fields."
    );
    return;
  }


  try {

    const token =
      localStorage.getItem("token") || "";


    const recordData: MedicalRecord = {

      patient_id: Number(form.patient_id),

      doctor_id: Number(form.doctor_id),

      appointment_id: Number(form.appointment_id),

      symptoms: form.symptoms,

      diagnosis: form.diagnosis,

      medications:
        form.medications || undefined,

      allergies:
        form.allergies || undefined,

      doctor_notes:
        form.doctor_notes || undefined,

    };


    if (editingId) {

      await updateMedicalRecord(
        editingId,
        recordData,
        token
      );

      toast.success(
        "Medical record updated!"
      );


    } else {

      await createMedicalRecord(
        recordData,
        token
      );

      toast.success(
        "Medical record created!"
      );

    }


    setShowModal(false);

    setEditingId(null);


    setForm({

      patient_id: "",
      doctor_id: "",
      appointment_id: "",
      symptoms: "",
      diagnosis: "",
      medications: "",
      allergies: "",
      doctor_notes: "",

    });


    loadData();


  } catch(error) {

    console.error(error);

    toast.error(
      "Failed to save medical record."
    );

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
            Medical Records
          </h1>

          <p className="mt-2 text-gray-500">
            Manage patient medical records
          </p>
        </div>


        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Search records..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-72 rounded-lg border border-gray-300 bg-white p-3 text-gray-900"
          />


          <button
            onClick={() => setShowModal(true)}
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            + Add Record
          </button>

        </div>

      </div>


      <div className="overflow-hidden rounded-xl bg-white shadow">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                ID
              </th>

              <th className="p-4 text-left">
                Patient
              </th>

              <th className="p-4 text-left">
                Doctor
              </th>

              <th className="p-4 text-left">
                Diagnosis
              </th>

              <th className="p-4 text-left">
                Symptoms
              </th>

              <th className="p-4 text-left">
                Date
              </th>
              <th className="p-4 text-center">
                 Actions
             </th>

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


            ) : records.length === 0 ? (

              <tr>
                <td
                  colSpan={6}
                  className="p-8 text-center"
                >
                  No medical records found.
                </td>
              </tr>


            ) : (

              records.map((record) => (

                <tr
                  key={record.id}
                  className="border-t"
                >

                  <td className="p-4">
                    {record.id}
                  </td>


                  <td className="p-4">
                    {
                      patients.find(
                        (p) =>
                          p.id === record.patient_id
                      )?.first_name
                    }{" "}
                    {
                      patients.find(
                        (p) =>
                          p.id === record.patient_id
                      )?.last_name
                    }
                  </td>


                  <td className="p-4">
                    {
                      doctors.find(
                        (d) =>
                          d.id === record.doctor_id
                      )?.name
                    }
                  </td>


                  <td className="p-4">
                    {record.diagnosis}
                  </td>


                  <td className="p-4">
                    {record.symptoms}
                  </td>


                  <td className="p-4">
                    {record.created_at
                      ?.split("T")[0]
                    }
                  </td>
                  <td className="p-4">

  <div className="flex justify-center gap-2">

    <button
      onClick={() => {

        setEditingId(record.id!);

        setForm({
          patient_id: record.patient_id.toString(),
          doctor_id: record.doctor_id.toString(),
          appointment_id: record.appointment_id.toString(),

          symptoms: record.symptoms,
          diagnosis: record.diagnosis,

          medications: record.medications || "",
          allergies: record.allergies || "",
          doctor_notes: record.doctor_notes || "",
        });

        setShowModal(true);

      }}
      className="rounded-lg bg-yellow-500 px-3 py-2 text-sm text-white hover:bg-yellow-600"
    >
      Edit
    </button>


    <button
      onClick={async () => {

        const confirmed = window.confirm(
          "Delete this medical record?"
        );

        if (!confirmed) return;


        try {

          const token =
            localStorage.getItem("token") || "";


          await deleteMedicalRecord(
            record.id!,
            token
          );


          toast.success(
            "Medical record deleted!"
          );


          loadData();


        } catch(error) {

          console.error(error);

          toast.error(
            "Failed to delete record."
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

    <div className="w-full max-w-3xl rounded-xl bg-white p-8 shadow-2xl">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold text-gray-800">
          Add Medical Record
        </h2>

        <button
          onClick={() => setShowModal(false)}
          className="text-3xl text-gray-500 hover:text-red-500"
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



        <select
          value={form.appointment_id}
          onChange={(e) =>
            setForm({
              ...form,
              appointment_id: e.target.value,
            })
          }
          className="rounded-lg border p-3"
        >

          <option value="">
            Select Appointment
          </option>

          {appointments.map((appointment) => (

            <option
              key={appointment.id}
              value={appointment.id}
            >
              Appointment #{appointment.id}
            </option>

          ))}

        </select>



        <input
          placeholder="Symptoms"
          value={form.symptoms}
          onChange={(e) =>
            setForm({
              ...form,
              symptoms: e.target.value,
            })
          }
          className="rounded-lg border p-3"
        />



        <input
          placeholder="Diagnosis"
          value={form.diagnosis}
          onChange={(e) =>
            setForm({
              ...form,
              diagnosis: e.target.value,
            })
          }
          className="rounded-lg border p-3"
        />



        <input
          placeholder="Medications"
          value={form.medications}
          onChange={(e) =>
            setForm({
              ...form,
              medications: e.target.value,
            })
          }
          className="rounded-lg border p-3"
        />



        <input
          placeholder="Allergies"
          value={form.allergies}
          onChange={(e) =>
            setForm({
              ...form,
              allergies: e.target.value,
            })
          }
          className="rounded-lg border p-3"
        />


        <textarea
          placeholder="Doctor Notes"
          value={form.doctor_notes}
          onChange={(e) =>
            setForm({
              ...form,
              doctor_notes: e.target.value,
            })
          }
          className="col-span-2 rounded-lg border p-3"
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
          onClick={saveRecord}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Save Record
        </button>

      </div>

    </div>

  </div>
)}

    </div>
  );
}