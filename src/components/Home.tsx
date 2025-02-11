'use client';

import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
//import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from './hooks/useGetAllJobs';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  interface User {
    role?: string;
    // Add other user properties here
  }

  const [user, setUser] = useState<User | null>(null); // Local state for user
  const navigate = useNavigate();

  useGetAllJobs();

  useEffect(() => {
    // Simulate fetching user data (e.g., from localStorage or backend)
    const fetchedUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(fetchedUser);

    if (fetchedUser?.role === 'recruiter') {
      navigate('/admin/companies');
    }
  }, [user, navigate]); // Added dependencies

  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      {/* <LatestJobs /> */}
      <Footer />
    </div>
  );
};

export default Home;
