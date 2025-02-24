"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Edit2, MoreHorizontal, Menu, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import EditProfileModal from "@/components/shared/EditProfileModal"; 

interface User {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: "recruiter" | "applicant" | "admin";
  profile?: string;
}

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL?.endsWith("/")
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL + "/";

    useEffect(() => {
      if (typeof window === "undefined") return; // ✅ 确保 `fetchUser()` 只在客户端运行
    
      const fetchUser = async () => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            const parsedUser: User = JSON.parse(storedUser);
            const userId = parsedUser._id;
    
            if (!userId || userId === "undefined") {
              console.error("Invalid User ID:", userId);
              return;
            }
    
            const res = await fetch(`${API_URL}api/users/me?id=${userId}`);
            if (!res.ok) throw new Error(`Failed to fetch user: ${res.status}`);
    
            const data: User = await res.json();
            setUser(prevUser => ({
              ...(prevUser || {}), // ✅ 确保 `prevUser` 不是 `null`
              _id: userId,
              fullName: data.fullName || parsedUser.fullName,
              profile: data.profile || parsedUser.profile,
              email: data.email || parsedUser.email,
              phoneNumber: data.phoneNumber || parsedUser.phoneNumber,
              role: data.role || parsedUser.role,
            }));
    
            localStorage.setItem("user", JSON.stringify({
              ...parsedUser,
              profile: data.profile,
            }));
    
            console.log("🚀 Fetched user - profile:", data.profile);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      };
    
      fetchUser();
    }, []);
    
    
      
     
    


  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  const handleProfileSave = async (newUsername: string, newProfilePic: File | null) => {
    if (!user || !user._id) {
      console.error("Cannot update user: user ID is missing!");
      return;
    }
  
    const formData = new FormData();
    formData.append("fullName", newUsername);
    if (newProfilePic) {
      formData.append("profile", newProfilePic);
    }
  
    const res = await fetch(`${API_URL}api/users/update-user-profile/${user._id}`, {
      method: "PUT",
      body: formData,
    });
  
    if (res.ok) {
      const updatedUser = await res.json();
      const mergedUser = { ...user, ...updatedUser };
  
      setUser(mergedUser);
      localStorage.setItem("user", JSON.stringify(mergedUser));
  
      // ✅ 解决缓存问题，强制刷新 `AvatarImage`
      setTimeout(() => setUser({ ...mergedUser }), 100);
  
      setIsModalOpen(false);
    } else {
      console.error("Failed to update user profile:", await res.json());
    }
  };
  
  console.log("🚀 Navbar - user.profile:", user?.profile);
  console.log("🚀 Navbar - Final Avatar URL:", user?.profile ? `${API_URL}${user.profile.replace(/\\/g, "/")}` : "No profile found");

  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="flex items-center justify-between max-w-7xl mx-auto h-16 px-6 lg:px-8">
          <Link href="/" className="text-3xl font-bold text-[#F83002]">
            Tech<span className="text-black">Titans</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {!user ? (
              <div className="flex items-center gap-3">
                <Link href="/auth/login">
                  <Button className="bg-[#6A38C2]">Login</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-[#6A38C2]">Signup</Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                
                <Avatar>
                {user?.profile && (
                  <AvatarImage 
                    key={user.profile} // ✅ 确保 `AvatarImage` 重新渲染
                    src={`${API_URL.replace(/\/$/, "")}/${user.profile.replace(/^\/+/, "").replace(/\\/g, "/")}`} 
                    alt="User Avatar"
                    onLoad={() => console.log("✅ Avatar Image Loaded:", user.profile)}
                    onError={(e) => {
                      console.error("🚨 Avatar Image failed to load:", e.currentTarget.src);
                    }}
                  />
                )}

                </Avatar>




                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div className="flex items-center gap-2 w-fit cursor-pointer"
                      onClick={() => setIsModalOpen(true)}>
                      <Edit2 className="w-4" />
                      <span>Edit Profile</span>
                    </div>
                  </PopoverContent>
                </Popover>

                <Button className="bg-[#6A38C2] text-white flex items-center gap-2" onClick={handleLogout}>
                  <LogOut />
                  Logout
                </Button>
              </div>
            )}
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {user && (
        <EditProfileModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleProfileSave}
          currentUsername={user.fullName || ""}
          currentProfile={user.profile || ""} // ✅ 确保 `profile` 传递给 Modal
        />
      )}

    </>
  );
};

export default Navbar;
