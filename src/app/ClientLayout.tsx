"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import MessageWidget from "@/components/shared/MessageWidget";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return (
    <>
      <Navbar />
      {children}
      {user && <MessageWidget />}
      <Footer />
    </>
  );
}