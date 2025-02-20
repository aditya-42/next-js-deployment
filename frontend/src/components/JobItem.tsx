"use client"
import React from "react";

type JobItemProps = {
  job: {
    id: string;
    role: string;
    company: string;
    appliedOn: string;
    status: string;
  };
};

const JobItem = ({ job }: JobItemProps) => {
  
  let statusClass = "";

 
  if (job.status === "PENDING") {
    statusClass = "bg-yellow-500 text-black"; 
  } else if (job.status === "SELECTED") {
    statusClass = "bg-green-500 text-white"; 
  } else if (job.status === "REJECTED") {
    statusClass = "bg-red-500 text-white"; 
  }

  return (
    <tr>
      <td className="px-4 py-2">{new Date(job.appliedOn).toLocaleDateString()}</td>
      <td className="px-4 py-2">{job.prevJobTitle}</td>
      <td className="px-4 py-2">{job.prevCompanyName}</td>
      <td className={`px-4 py-2 ${statusClass} rounded-full w-5 px-2 py-1 mt-2 rounded text-white `}>
        {job.status}
      </td>
    </tr>
  );
}

export default JobItem;
