import React from "react"
import { AppliedJobs } from "@/types/AppliedJobs"
import JobItem from "./JobItem"

type JobListProps = {
    jobs:AppliedJobs[];
}

/*
export default function JobList({jobs} : JobListProps) {
    return (
        <ul>
            {jobs.map((job) => (
                <JobItem key={job.date} job={job}/>
            ))}
        </ul>
    )
}
*/
export default function JobList({ jobs }: JobListProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl p-4 mt-5 border">
      <h2 className="font-bold text-lg mb-4">Applied Jobs</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Job Role</th>
            <th className="px-4 py-2 text-left">Company</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length > 0 ? (
            jobs.map((job) => <JobItem key={job.id} job={job} />)
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No jobs applied yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}