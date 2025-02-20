import React, { useState, useEffect } from "react";
import axios from "axios";


export interface Job {
    _id: string;
    jobTitle: string;
    datePosted: string;
    profile: string;
  }
  
  export interface Applicant {
    _id: string;
    name: string;
    email: string;
    roleApplied: string; 
  }
  
const ApplicationTracking: React.FC = () => {
  const [section, setSection] = useState<"jobs" | "applicants">("jobs");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  useEffect(() => {
    fetchJobs();
    fetchApplicants();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get<Job[]>("http://localhost:5001/api/recruiter/getAlljobs");
      setJobs(response.data);
      console.log("Resposne from backend" , response);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchApplicants = async () => {
    try {
      const response = await axios.get<Applicant[]>("/api/applicants/recruiter");
      setApplicants(response.data);
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  const deleteJob = async (id: string) => {
    try {
      await axios.delete(`/api/jobs/${id}`);
      setJobs(jobs.filter(job => job._id !== id));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Application Tracking</h1>

      {/* Buttons for Switching Sections */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setSection("jobs")}
          className={`px-4 py-2 rounded ${section === "jobs" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
        >
          Jobs
        </button>
        <button
          onClick={() => setSection("applicants")}
          className={`px-4 py-2 rounded ${section === "applicants" ? "bg-green-600 text-white" : "bg-gray-300"}`}
        >
          Applicants
        </button>
      </div>

      {/* Jobs Section */}
      {section === "jobs" ? (
        <div>
          <h2 className="text-xl font-bold mb-3">Your Jobs</h2>
          <ul>
            {jobs.map(job => (
              <li key={job._id} className="border p-4 mb-3">
                <h3 className="text-lg font-bold">{job.jobTitle}</h3>
                <p>{job.location}</p>
                <button className="text-blue-500 mr-4">Edit</button>
                <button className="text-red-500" onClick={() => deleteJob(job._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        // Applicants Section
        <div>
          <h2 className="text-xl font-bold mb-3">Applicants</h2>
          <ul>
            {applicants.map(applicant => (
              <li key={applicant._id} className="border p-4 mb-3">
                <h3 className="text-lg font-bold">{applicant.name}</h3>
                <p>Email: {applicant.email}</p>
                <p>Applied for: {applicant.jobTitle}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ApplicationTracking;
