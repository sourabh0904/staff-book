"use client";
import React, { useState } from "react";
import Image from "next/image";
import { THEME } from '../../styles/theme';
import { FiMapPin, FiUserPlus, FiMessageSquare } from "react-icons/fi";
import MapComponent from "../shared/MapComponent";

// Data for Map Section
const mapProfiles = [
  {
    id: 1,
    name: "Riya Goyal",
    role: "HR Manager",
    avatar: "/homePage/profile.png",
  },
  {
    id: 2,
    name: "Radhika Garg",
    role: "UI/UX Designer",
    avatar: "/homePage/profile.png",
  },
  {
    id: 3,
    name: "Manish Mishra",
    role: "Software Engineer",
    avatar: "/homePage/profile.png",
  },
];

// Data for Suggested Networking
const suggestedProfiles = [
  {
    id: 1,
    name: "Riya Goyal",
    role: "HR Manager",
    avatar: "/homePage/profile.png",
  },
  {
    id: 2,
    name: "Radhika Garg",
    role: "UI/UX Designer",
    avatar: "/homePage/profile.png",
  },
  {
    id: 3,
    name: "Manish Mishra",
    role: "Software Engineer",
    avatar: "/homePage/profile.png",
  },
];

// Data for Recruiters Online
const recruitersList = [
  {
    id: 1,
    name: "John Doee",
    role: "HR at Microsoft",
    avatar: "/homePage/profile.png",
  },
  {
    id: 2,
    name: "John Doee",
    role: "HR at Microsoft",
    avatar: "/homePage/profile.png",
  },
];

const NetworkingRightSidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="flex flex-col gap-2 pb-4">
      {/* Map Section */}
      <div className={THEME.components.card.default}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FiMapPin className="text-primary" />
            <h3 className={THEME.components.typography.cardTitle}>
              Job Locations
            </h3>
          </div>
        </div>
        
        {/* Map Component */}
        <MapComponent users={mapProfiles} />
      </div>

      {/* Suggested for Networking */}
      <div className={THEME.components.card.default}>
        <h3 className={`${THEME.components.typography.cardTitle} mb-4`}>
          Suggested for networking
        </h3>
        <div className="space-y-3">
          {suggestedProfiles.map((profile) => (
            <div key={profile.id} className={`${THEME.components.card.base} p-3 flex items-center justify-between gap-2 hover:shadow-md transition-all group`}>
              <div className="flex items-center gap-3 min-w-0 cursor-pointer">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover border border-gray-100 group-hover:border-primary transition-colors flex-shrink-0"
                />
                <div className="min-w-0">
                  <h4 className={`${THEME.colors.text.main} text-sm font-semibold truncate group-hover:text-primary transition-colors`}>{profile.name}</h4>
                  <p className={`${THEME.components.typography.meta} truncate`}>{profile.role}</p>
                </div>
              </div>
              <button className={`flex-shrink-0 px-4 py-1.5 rounded-full ${THEME.components.button.primary} text-xs font-medium flex items-center gap-1 shadow-sm`}>
                <FiUserPlus size={14} />
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NetworkingRightSidebar;
