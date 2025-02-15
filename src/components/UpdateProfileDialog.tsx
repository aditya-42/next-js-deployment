"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { X } from "lucide-react";  
import { useState } from "react";
import { User } from "@/types/User";  

interface UpdateProfileDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const UpdateProfileDialog: React.FC<UpdateProfileDialogProps> = ({ open, setOpen, user, setUser }) => {
  const [input, setInput] = useState({
    ...user,
    skills: user.skills.join(", "), 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    setUser({
      ...input,
      skills: input.skills.split(",").map((skill) => skill.trim()), 
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogClose asChild>
            <button onClick={() => setOpen(false)} className="absolute right-4 top-4">
              <X className="h-5 w-5 cursor-pointer" />
            </button>
          </DialogClose>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {["fullname", "email", "phoneNumber", "bio", "skills"].map((field) => (
            <div key={field} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={field} className="text-right capitalize">
                {field}
              </Label>
              <Input
                id={field}
                name={field}
                type="text"
                value={input[field as keyof typeof input] || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          ))}
        </div>

        <Button className="w-full my-4" onClick={handleSubmit}>
          Save Changes
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
