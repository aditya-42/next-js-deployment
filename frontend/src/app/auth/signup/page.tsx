"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

import Axios from "axios";
import { useState } from "react";

// importing Navbar
import Navbar from "../../../components/shared/Navbar";

// footer
import Footer from "../../../components/shared/Footer";

export default function Signup() {
  // State to hold form data
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [profile, setProfile] = useState(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Handle file selection
  const handleFileChange = (e) => {
    setProfile(e.target.files[0]); // Store the file object
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profile) {
      return alert("Please select a profile picture");
    }

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("profile", profile);

    try {
      const response = await Axios.post(`${API_URL}/api/users/create-users`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);

      if (response.status === 201) {
        alert("User created successfully");
        window.location.href = "/auth/login"; // Redirect to login page
      }
    } catch (error) {
      alert("An error occurred. Please try again later. " + error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit} 
          className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 border border-black-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>

          <div className="my-2">
            <Label className="font-bold">Full Name</Label>
            <Input
              type="text"
              placeholder="Enter Full Name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="my-2">
            <Label className="font-bold">Email</Label>
            <Input
              type="email"
              placeholder="Enter Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="my-2">
            <Label className="font-bold">Phone Number</Label>
            <Input
              type="tel"
              placeholder="Enter Number"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="my-2">
            <Label className="font-bold">Password</Label>
            <Input
              type="password"
              placeholder="Enter Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Radio Buttons for Role Selection */}
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="applicant"
                  className="cursor-pointer"
                  onChange={(e) => setRole(e.target.value)}
                />
                <Label>Applicant</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  className="cursor-pointer"
                  onChange={(e) => setRole(e.target.value)}
                />
                <Label>Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Profile Picture Upload */}
          <div>
            <Label>Profile</Label>
            <Input
              accept="image/*"
              type="file"
              className="cursor-pointer"
              onChange={handleFileChange} 
            />
          </div>

          <Button type="submit" className="w-full my-4 bg-[#6A38C2] hover:bg-[#5a2cbf]">
            Signup
          </Button>

          <span className="text-sm">
            Already have an account?{" "}
            <a href="/auth/login" className="text-blue-600">
              Login
            </a>
          </span>
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
