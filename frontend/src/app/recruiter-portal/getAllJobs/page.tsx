"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Edit2, Trash2, MoreHorizontal } from "lucide-react";

import Navbar from "@/components/shared/Navbar";
import axios from "axios";

import { useState, useEffect , FormEvent , useCallback } from "react";

// Interface for job and applicant
export interface Job {
  _id: string;
  jobTitle: string;
  employmentType: string;
  jobDescription: string;
  location: string;
  salaryRangeMin: string;
  salaryRangeMax: string;
  requirements: string;
  skills: string;
  applicationDeadline: string;
  companyOverview: string;
  benefits: string;
  contactEmail: string;
  datePosted: string;
}

export interface Applicant {
  _id: string;
  fullName: string;
  email: string;
  role: string;
}

const GetAllJobs: React.FC = ({ jobId}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [section, setSection] = useState<"jobs" | "applicants" | "">("");
  const [jobFilter, setJobFilter] = useState<string>("");
  const [applicantFilter, setApplicantFilter] = useState<string>("");

  //state to track the modal 
  const [isModalOpen, setIsModalOpen] = useState(false);

  //tracking current job
  const [currentJob, setCurrentJob] = useState<Job | null>(null);

  //loading
  const [loading , setLoading] = useState(true);

  //get job details by id
  useEffect(() => {
    if (isModalOpen && jobId) {
      // Fetch job data when modal is opened
      const fetchJobData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:5001/api/recruiter/get-job-post/${jobId}`);
          setCurrentJob(response.data);
        } catch (error) {
          console.error('Error fetching job data:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchJobData();
    }
  }, [isModalOpen, jobId]);


  //delete job
  const deleteJob = (jobId: string) => {
    //take confirmation
    window.confirm("Are you sure you want to delete this job listing")
    axios
     .delete(`http://localhost:5001/api/recruiter/delete-job-post/${jobId}`)
     .then(() => {
        setJobs(jobs.filter((job) => job._id!== jobId));
      })
     .catch((error) => console.error("Error deleting job:", error));
  };

  //edit job

  // Fetch jobs when the jobs section is active
  useEffect(() => {
    if (section === "jobs") {
      axios
        .get<Job[]>("http://localhost:5001/api/recruiter/getAlljobs")
        .then((response) => {
          console.log("Repsponse", response)
          setJobs(response.data)
        })
        .catch((error) => console.error("Error fetching jobs:", error));

    }
  }, [section]);
 
  // Fetch applicants when the applicants section is active
  useEffect(() => {
    if (section === "applicants") {
      axios
        .get<Applicant[]>("http://localhost:5001/api/users/get-users")
        .then((response) => setApplicants(response.data))
        .catch((error) => console.error("Error fetching applicants:", error));
    }
  }, [section]);


  //edit button clicked
  const hadleEditClick = (job: Job) => {
    setIsModalOpen(true);
    setCurrentJob(job);
  }

    // Handle form changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (currentJob) {
        setCurrentJob({
          ...currentJob,
          [e.target.name]: e.target.value,
        });
      }
    };

  //form submission for updating job details
  const handleUpdateJob = async (jobData) => {
    if (jobData) {
      try {
        console.log("currentJob data before update:", jobData);

        const response = await axios.put(
          `http://localhost:5001/api/recruiter/update-job-post/${jobData._id}`,
          jobData
        );
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === jobData._id ? response.data : job
          )
        );
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error updating job:", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <h1 className="text-3xl font-semibold text-center my-8 text-gray-800">Application Tracking</h1>

      {/* Buttons to switch between jobs and applicants */}
      <div className="flex justify-center gap-6 mb-8">
        <Button
          onClick={() => setSection("jobs")}
          variant={section === "jobs"}
          className={`px-6 py-3 text-lg font-medium rounded-lg transition-all ${section === "jobs" ? "bg-blue-500 text-white shadow-md" : "border-2 border-blue-500 text-blue-500 hover:bg-blue-100"
            }`}
        >
          View Posted Jobs
        </Button>
        <Button
          onClick={() => setSection("applicants")}
          variant={section === "applicants" ? "solid" : "outline"}
          className={`px-6 py-3 text-lg font-medium rounded-lg transition-all ${section === "applicants" ? "bg-green-500 text-white shadow-md" : "border-2 border-green-500 text-green-500 hover:bg-green-100"
            }`}
        >
          View Applicants
        </Button>
      </div>


      <div className="max-w-6xl mx-auto my-10">
        {/* Conditionally render jobs table */}
        {section === "jobs" && (
          <>
            <div className="flex items-center justify-between my-5">
              <Input
                className="w-fit"
                placeholder="Filter jobs by title"
                value={jobFilter}
                onChange={(e) => setJobFilter(e.target.value)}
              />
            </div>

            {jobs.length === 0 ? (
              <p>No jobs available</p>
            ) : (
              <Table>
                <TableCaption>A list of jobs posted by your company</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Logo</TableHead>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Date Posted</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job._id}>
                      <TableCell>
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                        </Avatar>
                      </TableCell>
                      <TableCell>{job.jobTitle}</TableCell>
                      <TableCell>{new Date(job.datePosted).toLocaleDateString('en-GB')}</TableCell>
                      <TableCell className="text-right cursor-pointer">
                        <Popover>
                          <PopoverTrigger>
                            <MoreHorizontal />
                          </PopoverTrigger>
                          <PopoverContent className="w-40 py-2 px-3 bg-white rounded-lg shadow-lg">
                            <div className="flex flex-col gap-2 cursor-pointer">
                              <div className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md transition-all">
                                <Edit2 className="w-4 h-4 text-blue-500" />
                                <span onClick={()=>hadleEditClick(job)} className="text-sm text-gray-700">Edit</span>
                              </div>
                              <div className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md transition-all">
                                <Trash2 className="w-4 h-4 text-red-500" />
                                <span onClick={()=>deleteJob(job._id)}className="text-sm text-gray-700">Delete</span>
                              </div>
                            </div>
                          </PopoverContent>

                        </Popover>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </>
        )}

        {/* Conditionally render applicants table */}
        {section === "applicants" && (
          <>
            <div className="flex items-center justify-between my-5">
              <Input
                className="w-fit"
                placeholder="Filter applicants by name..."
                value={applicantFilter}
                onChange={(e) => setApplicantFilter(e.target.value)}
              />
            </div>

            {applicants.length === 0 ? (
              <p>No applicants available</p>
            ) : (
              <Table>
                <TableCaption>A list of applicants who applied to your jobs</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role Applied</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applicants
                    .filter((applicant) =>
                      applicant.fullName
                        .toLowerCase()
                        .includes(applicantFilter.toLowerCase())
                    )
                    .map((applicant) => (
                      <TableRow key={applicant._id}>
                        <TableCell>{applicant.fullName}</TableCell>
                        <TableCell>{applicant.email}</TableCell>
                        <TableCell>{applicant.role}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            )}
          </>
        )}
      </div>
      {/* Modal for Editing Job */}
      {isModalOpen && currentJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-1/3 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4">Edit Job</h2>

            {/* Job Form */}
            <Input
              name="jobTitle"
              value={currentJob.jobTitle}
              onChange={handleChange}
              placeholder="Job Title"
              className="mb-4"
            />
            <Input
              name="employmentType"
              value={currentJob.employmentType}
              onChange={handleChange}
              placeholder="Employment Type"
              className="mb-4"
            />
            <textarea
              name="jobDescription"
              value={currentJob.jobDescription}
              onChange={handleChange}
              placeholder="Job Description"
              className="mb-4 w-full p-2 border rounded"
            />
            <Input
              name="location"
              value={currentJob.location}
              onChange={handleChange}
              placeholder="Location"
              className="mb-4"
            />
            <Input
              name="salaryRangeMin"
              value={currentJob.salaryRangeMin}
              onChange={handleChange}
              placeholder="Min Salary"
              className="mb-4"
            />
            <Input
              name="salaryRangeMax"
              value={currentJob.salaryRangeMax}
              onChange={handleChange}
              placeholder="Max Salary"
              className="mb-4"
            />
            <Input
              name="requirements"
              value={currentJob.requirements}
              onChange={handleChange}
              placeholder="Requirements"
              className="mb-4"
            />
            <Input
              name="skills"
              value={currentJob.skills}
              onChange={handleChange}
              placeholder="Skills"
              className="mb-4"
            />
            <Input
              name="applicationDeadline"
              value={currentJob.applicationDeadline}
              onChange={handleChange}
              placeholder="Application Deadline"
              className="mb-4"
            />
            <textarea
              name="companyOverview"
              value={currentJob.companyOverview}
              onChange={handleChange}
              placeholder="Company Overview"
              className="mb-4 w-full p-2 border rounded"
            />
            <textarea
              name="benefits"
              value={currentJob.benefits}
              onChange={handleChange}
              placeholder="Benefits"
              className="mb-4 w-full p-2 border rounded"
            />
            <Input
              name="contactEmail"
              value={currentJob.contactEmail}
              onChange={handleChange}
              placeholder="Contact Email"
              className="mb-4"
            />

            <Button onClick={()=>handleUpdateJob(currentJob)} className="w-full mb-2">
              Update Job
            </Button>
            <Button
              onClick={() => setIsModalOpen(false)}
              variant="outline"
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
     
  );
};

export default GetAllJobs;
