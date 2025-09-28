"use client";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

export default function CertificationList({ certifications = [], onAdd, onEdit, onDelete }) {
  return (
    <div className="rounded-lg">
      <div className="flex justify-between items-center mb-4">
        {/* Optional header */}
        {/* <h3 className="text-white font-semibold text-lg">Certifications</h3> */}
        {/* <button onClick={onAdd} className="px-3 py-1 rounded border border-white text-white bg-transparent">+ Add</button> */}
      </div>

      {certifications.length === 0 ? (
        <p className="text-gray-100 text-sm">No certifications added yet.</p>
      ) : (
        <div className="space-y-3">
          {certifications.map((c, idx) => (
            <div key={idx} className="flex justify-between items-start gap-4  rounded ">
              <div className="text-white flex-1">
                <h4 className="font-semibold">{c.name}</h4>
                <p className="text-gray-300 text-sm">
                  {c.provider} • {c.issueDate.month} {c.issueDate.year}
                  {c.expiryDate?.year ? ` • Expires ${c.expiryDate.month} ${c.expiryDate.year}` : ""}
                </p>
                {c.certificateId && <p className="text-gray-300 text-xs mt-1">ID: {c.certificateId}</p>}
                {c.credentialUrl && (
                  <a
                    href={c.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 text-sm underline"
                  >
                    View credential
                  </a>
                )}

                {/* ✅ Render local File object safely */}
                {c.media && (
                  <div className="mt-2">
                    <a
                      // href={URL.createObjectURL(c.media)}
                      href={typeof c.media === "string" ? c.media : URL.createObjectURL(c.media)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <img
                        // src={URL.createObjectURL(c.media)}
                        src={typeof c.media === "string" ? c.media : URL.createObjectURL(c.media)}
                        alt="Certificate"
                        className="w-40 h-24 object-cover rounded-md hover:shadow-lg transition"
                      />
                    </a>
                  </div>
                )}
              </div>

              <div className="flex gap-2 items-start">
                <button
                  onClick={() => onEdit(idx)}
                  className="p-1 border rounded-lg border-blue-300 text-white"
                >
                  <CiEdit />
                </button>
                <button
                  onClick={() => onDelete(idx)}
                  className="p-1 border rounded-lg border-red-300 text-red-400"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
