"use client"
import { useState, useEffect } from "react";
import JobList from "@/components/JobList";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";


interface Job {
    id: string;
    role: string;
    company: string;
    appliedOn: string;
    status: string;
}

export default function UserProfilePage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [user, setUser] = useState<any>(null);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    // fetch job applications based on the user email
    useEffect(() => {
        const fetchJobApplications = async () => {
            try {
                // get email from localStorage
                const email = localStorage.getItem("email");
                console.log("Email from localStorage", email);

                if (!email) {
                    throw new Error("User email not found.");
                }

                // API to get job application for that user
                const applicationsResponse = await fetch(`${API_URL}/api/applicant/applications/${email}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!applicationsResponse.ok) {
                    throw new Error("Failed to fetch job applications");
                }

                const applicationsData = await applicationsResponse.json();
                console.log("application info", applicationsData);

                if (Array.isArray(applicationsData) && applicationsData.length > 0) {
                    setUser(applicationsData[0]);
                    setJobs(applicationsData);
                } else {
                    setJobs([]); 
                    setUser(null); 
                }
            } catch (error) {
                console.error("Error fetching job applications:", error);
            }
        };

        fetchJobApplications();
    }, []);

    if (!user && jobs.length === 0) {
        return (
            <>
                <Navbar />
                <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow-lg">
                    <p>No applications found.</p>
                </div>
            </>
        );
    }
    


    //get initials 
    const userInitials = user.fullName
        .split(" ")
        .map((name: string) => name[0])
        .join("");

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow-lg">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        {/* User Avatar */}
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                            {userInitials} {/* Display initials */}
                        </div>
                        <div>
                            <h1 className="font-semibold text-2xl text-gray-800">{user.fullName}</h1>
                            <p className="text-gray-500">{user.education || "No education information provided"}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => alert("Edit Profile")}
                        className="border p-2 rounded-md text-sm font-semibold text-blue-500 hover:bg-gray-100 transition-all duration-200 ease-in-out"
                    >
                        Edit Profile
                    </button>
                </div>

                {/* User Details Section */}
                <div className="my-5 space-y-4">
                    {/* Full Name */}
                    <div className="flex items-center gap-3">
                        <span className="font-medium text-lg text-gray-700">Full Name:</span>
                        <span className="text-gray-600">{user.fullName}</span>
                    </div>

                    {/* Education */}
                    <div className="flex items-center gap-3">
                        <span className="font-medium text-lg text-gray-700">Education:</span>
                        <span className="text-gray-600">{user.education || "No education information provided"}</span>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-3">
                        <span className="font-medium text-lg text-gray-700">Email:</span>
                        <span className="text-gray-600">{user.email}</span>
                    </div>

                    {/* Phone Number */}
                    <div className="flex items-center gap-3">
                        <span className="font-medium text-lg text-gray-700">Phone:</span>
                        <span className="text-gray-600">{user.phoneNumber}</span>
                    </div>

                    {/* Resume Link */}
                    {user.uploadResume ? (
                        <div className="flex items-center gap-3">
                            <span className="font-medium text-lg text-gray-700">Resume:</span>
                            <a
                                href={user.uploadResume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                {user.uploadResume.split("-").pop().split("?")[0]}
                            </a>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <span className="font-medium text-lg text-gray-700">Resume:</span>
                            <span>NA</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <span className="font-medium text-lg text-gray-700">Skills:</span>
                    <span className="text-gray-600 ">{user.skills}</span>
                </div>







            </div>







            {/* Applied Jobs Section */}
            <div className="mb-20">
            {jobs.length > 0 ? (
                <JobList jobs={jobs} />
            ) : (
                <p>No applications found.</p>
            )}
            </div>

            <Footer/>



        </>
    );
}
