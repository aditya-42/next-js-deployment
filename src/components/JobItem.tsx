import React from "react";
import { AppliedJobs } from "@/types/AppliedJobs";

type AppliedJobsProps = {
  job: AppliedJobs;
};

const statusStyles: Record<AppliedJobs["status"], string> = {
  PENDING: "bg-yellow-500",
  APPROVED: "bg-green-500",
  REJECTED: "bg-red-500",
};

export default function JobItem({ job }: AppliedJobsProps) {
  return (
    <tr className="border-b">
      <td className="px-4 py-2">{job.date}</td>
      <td className="px-4 py-2">{job.role}</td>
      <td className="px-4 py-2">{job.company}</td>
      <td className="px-4 py-2">
        <span className={`px-2 py-1 rounded text-white ${statusStyles[job.status]}`}>
          {job.status}
        </span>
      </td>
    </tr>
  );
}
