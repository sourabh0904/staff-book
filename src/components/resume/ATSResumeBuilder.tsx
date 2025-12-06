/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import {
  FiUser,
  FiBriefcase,
  FiBook,
  FiAward,
  FiCode,
  FiFileText,
  FiDownload,
  FiEye,
  FiCheckCircle,
  FiAlertCircle,
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiChevronRight,
} from "react-icons/fi";
import { THEME } from "../../styles/theme";
import Card from "../shared/Card";

interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    location: string;
    graduationDate: string;
    gpa?: string;
  }>;
  skills: string[];
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
  }>;
}

interface ATSScore {
  score: number;
  issues: string[];
  suggestions: string[];
}

export default function ATSResumeBuilder() {
  const [activeSection, setActiveSection] = useState<string>("personal");
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      portfolio: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    certifications: [],
  });

  const [atsScore, setAtsScore] = useState<ATSScore>({
    score: 0,
    issues: [],
    suggestions: [],
  });

  // Calculate ATS Score
  const calculateATSScore = () => {
    let score = 0;
    const issues: string[] = [];
    const suggestions: string[] = [];

    // Check personal info
    if (resumeData.personalInfo.fullName) score += 10;
    else issues.push("Missing full name");

    if (resumeData.personalInfo.email) score += 10;
    else issues.push("Missing email");

    if (resumeData.personalInfo.phone) score += 10;
    else issues.push("Missing phone number");

    // Check summary
    if (resumeData.summary && resumeData.summary.length > 50) score += 15;
    else suggestions.push("Add a professional summary (50+ words)");

    // Check experience
    if (resumeData.experience.length > 0) {
      score += 20;
      resumeData.experience.forEach((exp) => {
        if (exp.description.length < 100) {
          suggestions.push(`Add more details to ${exp.title} role`);
        }
      });
    } else {
      issues.push("No work experience added");
    }

    // Check education
    if (resumeData.education.length > 0) score += 15;
    else issues.push("No education added");

    // Check skills
    if (resumeData.skills.length >= 5) score += 20;
    else suggestions.push("Add at least 5 relevant skills");

    setAtsScore({ score, issues, suggestions });
  };

  React.useEffect(() => {
    calculateATSScore();
  }, [resumeData]);

  const sections = [
    { id: "personal", label: "Personal Info", icon: <FiUser size={18} /> },
    { id: "summary", label: "Summary", icon: <FiFileText size={18} /> },
    { id: "experience", label: "Experience", icon: <FiBriefcase size={18} /> },
    { id: "education", label: "Education", icon: <FiBook size={18} /> },
    { id: "skills", label: "Skills", icon: <FiCode size={18} /> },
    { id: "certifications", label: "Certifications", icon: <FiAward size={18} /> },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column: ATS Score & Tips */}
      <div className="lg:col-span-1 space-y-6">
        <Card className="sticky top-24">
          <Card.Header>
            <h3 className={THEME.components.typography.cardTitle}>ATS Compatibility Score</h3>
          </Card.Header>
          <Card.Content>
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E8E4FF"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={atsScore.score >= 80 ? "#10B981" : atsScore.score >= 60 ? "#F59E0B" : "#EF4444"}
                    strokeWidth="3"
                    strokeDasharray={`${atsScore.score}, 100`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className={`text-3xl font-bold ${
                    atsScore.score >= 80 ? "text-green-600" : atsScore.score >= 60 ? "text-yellow-600" : "text-red-600"
                  }`}>
                    {atsScore.score}%
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {atsScore.issues.length > 0 && (
                <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                  <p className="text-sm font-bold text-red-700 mb-2 flex items-center gap-2">
                    <FiAlertCircle /> Issues to Fix:
                  </p>
                  <ul className="space-y-1">
                    {atsScore.issues.map((issue, idx) => (
                      <li key={idx} className="text-xs text-red-600 ml-6 list-disc">{issue}</li>
                    ))}
                  </ul>
                </div>
              )}

              {atsScore.suggestions.length > 0 && (
                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
                  <p className="text-sm font-bold text-yellow-700 mb-2 flex items-center gap-2">
                    <FiCheckCircle /> Suggestions:
                  </p>
                  <ul className="space-y-1">
                    {atsScore.suggestions.map((suggestion, idx) => (
                      <li key={idx} className="text-xs text-yellow-600 ml-6 list-disc">{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Right Column: Form & Preview */}
      <div className="lg:col-span-2 space-y-6">
        <Card noPadding>
          <div className="flex border-b border-gray-100 overflow-x-auto scrollbar-hide [mask-image:linear-gradient(to_right,transparent,black_20px,black_calc(100%_-_20px),transparent)] px-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                  activeSection === section.id
                    ? `text-[${THEME.colors.primary}] border-b-2 border-[${THEME.colors.primary}] bg-light-bg`
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {section.icon}
                {section.label}
              </button>
            ))}
          </div>
          
          <div className="p-6">
            {activeSection === "personal" && (
              <PersonalInfoForm resumeData={resumeData} setResumeData={setResumeData} />
            )}
            {activeSection === "summary" && (
              <SummaryForm resumeData={resumeData} setResumeData={setResumeData} />
            )}
            {activeSection === "experience" && (
              <ExperienceForm resumeData={resumeData} setResumeData={setResumeData} />
            )}
            {activeSection === "education" && (
              <EducationForm resumeData={resumeData} setResumeData={setResumeData} />
            )}
            {activeSection === "skills" && (
              <SkillsForm resumeData={resumeData} setResumeData={setResumeData} />
            )}
            {activeSection === "certifications" && (
              <CertificationsForm resumeData={resumeData} setResumeData={setResumeData} />
            )}
          </div>
        </Card>

        {/* Live Preview Section */}
        <Card>
          <Card.Header>
            <div className="flex items-center justify-between">
              <h3 className={THEME.components.typography.cardTitle}>Live Preview</h3>
              <div className="flex gap-2">
                <button className={`p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors`}>
                  <FiEye size={18} />
                </button>
                <button className={`${THEME.components.button.primary} px-3 py-1.5 text-xs flex items-center gap-2`}>
                  <FiDownload size={16} />
                  Download PDF
                </button>
              </div>
            </div>
          </Card.Header>
          <Card.Content>
             <div className="border border-gray-200 rounded-lg p-8 bg-white min-h-[600px] shadow-sm">
              <ResumePreview data={resumeData} />
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}

// Form Components
function PersonalInfoForm({ resumeData, setResumeData }: any) {
  return (
    <div className="space-y-5">
      <h3 className={THEME.components.typography.sectionTitle}>Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700">Full Name *</label>
          <input
            type="text"
            className={THEME.components.input.default}
            value={resumeData.personalInfo.fullName}
            onChange={(e) => setResumeData({
              ...resumeData,
              personalInfo: { ...resumeData.personalInfo, fullName: e.target.value }
            })}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700">Email *</label>
          <input
            type="email"
            className={THEME.components.input.default}
            value={resumeData.personalInfo.email}
            onChange={(e) => setResumeData({
              ...resumeData,
              personalInfo: { ...resumeData.personalInfo, email: e.target.value }
            })}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700">Phone *</label>
          <input
            type="tel"
            className={THEME.components.input.default}
            value={resumeData.personalInfo.phone}
            onChange={(e) => setResumeData({
              ...resumeData,
              personalInfo: { ...resumeData.personalInfo, phone: e.target.value }
            })}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700">Location</label>
          <input
            type="text"
            placeholder="City, Country"
            className={THEME.components.input.default}
            value={resumeData.personalInfo.location}
            onChange={(e) => setResumeData({
              ...resumeData,
              personalInfo: { ...resumeData.personalInfo, location: e.target.value }
            })}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700">LinkedIn Profile</label>
          <input
            type="url"
            className={THEME.components.input.default}
            value={resumeData.personalInfo.linkedin}
            onChange={(e) => setResumeData({
              ...resumeData,
              personalInfo: { ...resumeData.personalInfo, linkedin: e.target.value }
            })}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700">Portfolio/Website</label>
          <input
            type="url"
            className={THEME.components.input.default}
            value={resumeData.personalInfo.portfolio}
            onChange={(e) => setResumeData({
              ...resumeData,
              personalInfo: { ...resumeData.personalInfo, portfolio: e.target.value }
            })}
          />
        </div>
      </div>
    </div>
  );
}

function SummaryForm({ resumeData, setResumeData }: any) {
  return (
    <div className="space-y-4">
      <h3 className={THEME.components.typography.sectionTitle}>Professional Summary</h3>
      <p className="text-sm text-gray-500">
        Write a compelling summary that highlights your key achievements and career goals (50-150 words recommended)
      </p>
      <textarea
        placeholder="Example: Results-driven software engineer with 5+ years of experience in full-stack development..."
        className={`${THEME.components.input.default} min-h-[200px]`}
        value={resumeData.summary}
        onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
      />
      <p className="text-xs text-gray-400 text-right">
        {resumeData.summary.split(' ').filter((w: string) => w).length} words
      </p>
    </div>
  );
}

function ExperienceForm({ resumeData, setResumeData }: any) {
  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          id: Date.now().toString(),
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
    });
  };

  const updateExperience = (id: string, field: string, value: any) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp: any) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className={THEME.components.typography.sectionTitle}>Work Experience</h3>
        <button
          onClick={addExperience}
          className={`${THEME.components.button.primary} px-4 py-2 text-sm flex items-center gap-2`}
        >
          <FiPlus size={16} />
          Add Experience
        </button>
      </div>
      
      {resumeData.experience.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
            <FiBriefcase size={24} />
          </div>
          <p className="text-gray-500 font-medium">No experience added yet</p>
          <p className="text-xs text-gray-400 mt-1">Add your past work experience to boost your ATS score</p>
        </div>
      ) : (
        <div className="space-y-6">
          {resumeData.experience.map((exp: any) => (
            <div key={exp.id} className="p-5 border border-gray-200 rounded-xl space-y-4 bg-gray-50/50 hover:bg-white hover:shadow-sm transition-all">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-gray-800">Experience Details</h4>
                <button
                  onClick={() => {
                    setResumeData({
                      ...resumeData,
                      experience: resumeData.experience.filter((e: any) => e.id !== exp.id),
                    });
                  }}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Job Title *"
                  className={THEME.components.input.default}
                  value={exp.title}
                  onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Company *"
                  className={THEME.components.input.default}
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                />
              </div>
              
              <textarea
                placeholder="Description (Use bullet points for ATS optimization)"
                className={`${THEME.components.input.default} min-h-[120px]`}
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EducationForm({ resumeData, setResumeData }: any) {
  return (
    <div className="space-y-6">
      <h3 className={THEME.components.typography.sectionTitle}>Education</h3>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Degree (e.g., Bachelor of Science in Computer Science)"
          className={THEME.components.input.default}
        />
        <input
          type="text"
          placeholder="Institution"
          className={THEME.components.input.default}
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Graduation Year"
            className={THEME.components.input.default}
          />
          <input
            type="text"
            placeholder="GPA (Optional)"
            className={THEME.components.input.default}
          />
        </div>
      </div>
    </div>
  );
}

function SkillsForm({ resumeData, setResumeData }: any) {
  const [newSkill, setNewSkill] = useState("");
  
  const addSkill = () => {
    if (newSkill.trim()) {
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  return (
    <div className="space-y-6">
      <h3 className={THEME.components.typography.sectionTitle}>Skills</h3>
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Add a skill (e.g., React, Python, Project Management)"
          className={THEME.components.input.default}
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addSkill()}
        />
        <button
          onClick={addSkill}
          className={`${THEME.components.button.primary} px-6`}
        >
          Add
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-4">
        {resumeData.skills.map((skill: string, idx: number) => (
          <span
            key={idx}
            className={`px-3 py-1.5 bg-[${THEME.colors.primaryLight}] text-[${THEME.colors.primary}] rounded-lg text-sm font-medium flex items-center gap-2`}
          >
            {skill}
            <button
              onClick={() => {
                setResumeData({
                  ...resumeData,
                  skills: resumeData.skills.filter((_: any, i: number) => i !== idx),
                });
              }}
              className="hover:text-red-600 transition-colors"
            >
              ×
            </button>
          </span>
        ))}
        {resumeData.skills.length === 0 && (
          <p className="text-sm text-gray-400 italic">No skills added yet. Add at least 5 skills.</p>
        )}
      </div>
    </div>
  );
}

function CertificationsForm({ resumeData, setResumeData }: any) {
  return (
    <div className="space-y-6">
      <h3 className={THEME.components.typography.sectionTitle}>Certifications</h3>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Certification Name"
          className={THEME.components.input.default}
        />
        <input
          type="text"
          placeholder="Issuing Organization"
          className={THEME.components.input.default}
        />
        <input
          type="text"
          placeholder="Date Obtained"
          className={THEME.components.input.default}
        />
      </div>
    </div>
  );
}

function ResumePreview({ data }: { data: ResumeData }) {
  return (
    <div className="space-y-6 font-serif max-w-[210mm] mx-auto">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-wide mb-2">
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <div className="text-sm text-gray-600 flex flex-wrap justify-center gap-3">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span>• LinkedIn</span>}
          {data.personalInfo.portfolio && <span>• Portfolio</span>}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-gray-900 border-b border-gray-300 pb-1 uppercase">Professional Summary</h2>
          <p className="text-sm text-gray-700 leading-relaxed text-justify">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-gray-900 border-b border-gray-300 pb-1 uppercase">Work Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="space-y-1">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-bold text-gray-800">{exp.title}</h3>
                <span className="text-xs text-gray-600 italic">
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </span>
              </div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-sm font-semibold text-gray-700">{exp.company}</span>
                <span className="text-xs text-gray-600">{exp.location}</span>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-line pl-4 border-l-2 border-gray-100">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-gray-900 border-b border-gray-300 pb-1 uppercase">Skills</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-700">
            {data.skills.map((skill, idx) => (
              <span key={idx} className="bg-gray-50 px-2 py-0.5 rounded text-xs border border-gray-100">{skill}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
