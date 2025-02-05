"use client";
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from "react";
import { Mail, Contact, Pen } from "lucide-react";
import JobList from "@/components/JobList";
import { AppliedJobs } from "@/types/AppliedJobs";
import { v4 as uuidv4 } from "uuid";

export const jobs: AppliedJobs[] = [
  {
    id: uuidv4(),
    date: "2025-02-01",
    role: "Frontend Developer",
    company: "ABC Corp",
    status: "PENDING",
  },
  {
    id: uuidv4(),
    date: "2025-01-28",
    role: "Backend Engineer",
    company: "XYZ Ltd",
    status: "APPROVED",
  },
  {
    id: uuidv4(),
    date: "2025-01-20",
    role: "UI Designer",
    company: "Creative Studio",
    status: "REJECTED",
  },
];

const mockUser = {
  fullname: "John Doe",
  bio: "Experienced with 2yrs in FullStack development",
  email: "johndoe@gmail.com",
  phoneNumber: "9000000000",
  skills: ["Next.js", "TypeScript", "Prisma", "GraphQL"],
  resume: {
    link: "https://example.com/resume.pdf",
    name: "John_Resume.pdf",
  },
};

export default function UserProfilePage() {
  const [, setOpen] = useState(false);
  const user = mockUser;

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <FaRegUserCircle size={70}  />
          <div>
            <h1 className="font-medium text-xl">{user.fullname}</h1>
            <p>{user.bio}</p>
          </div>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="border p-2 rounded hover:bg-gray-100"
        >
          <Pen />
        </button>
      </div>

      <div className="my-5">
        <div className="flex items-center gap-3 my-2">
          <Mail />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center gap-3 my-2">
          <Contact />
          <span>{user.phoneNumber}</span>
        </div>
      </div>

      <div className="my-5">
        <h1 className="font-bold">Skills</h1>
        <div className="flex gap-2 flex-wrap">
          {user.skills.map((skill, index) => (
            <span key={index} className="px-2 py-1 bg-gray-200 rounded text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h1 className="font-bold">Resume</h1>
        {user.resume ? (
          <a
            href={user.resume.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {user.resume.name}
          </a>
        ) : (
          <span>NA</span>
        )}
      </div>

      {/* Applied Jobs Section */}
      <JobList jobs={jobs} />
    </div>
  );
}
