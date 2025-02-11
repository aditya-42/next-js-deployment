"use client";

import { useState, useEffect } from "react";
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
import { Edit2, MoreHorizontal } from "lucide-react";

// Fetch users from the API
async function fetchApplicants() {
  const response = await fetch("/api/users");  
  const data = await response.json();
  return data;
}

export default function Admin() {
  const [applicants, setApplicants] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const getApplicants = async () => {
      const data = await fetchApplicants();
      setApplicants(data);
    };

    getApplicants();
  }, []);

  // Filter applicants by name or email
  const filteredApplicants = applicants.filter(
    (applicant) =>
      applicant.fullname.toLowerCase().includes(filter.toLowerCase()) ||
      applicant.email.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex items-center justify-between my-5">
        <Input
          className="w-1/3"
          placeholder="Filter by name or email"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Button>New Applicant</Button>
      </div>

      <div>
        <Table>
          <TableCaption>A list of recent job applicants</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Avatar</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredApplicants.map((applicant) => (
              <TableRow key={applicant._id}> 
                <TableCell>
                  <Avatar>
                    <AvatarImage src={applicant.avatar || "/default-avatar.png"} />
                  </Avatar>
                </TableCell>
                <TableCell>{applicant.fullname}</TableCell>
                <TableCell>{applicant.email}</TableCell>
                <TableCell>{applicant.phoneNumber}</TableCell>
                <TableCell>{applicant.role}</TableCell>
                <TableCell>{new Date(applicant.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div className="flex items-center gap-2 cursor-pointer">
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
