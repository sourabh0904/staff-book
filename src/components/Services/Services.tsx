'use client';

import { useState, useEffect } from 'react';
import { FiBriefcase, FiUser, FiFileText, FiMail } from 'react-icons/fi';
import { SITE_CONFIG } from '../../constants/siteconfig';
import ServiceCard from '../shared/ServiceCard';
import ResumeWritingSection from '../shared/ResumeWritingSection';
import ContactUsSection from '../shared/ContactUsSection';
import ProfileSubMenu from '../shared/ProfileSubMenu';
import { THEME } from '@/styles/theme';

export default function Services() {
  const { services } = SITE_CONFIG;
  const [activeTab, setActiveTab] = useState('recruiters');

  const menuItems = [
    {
      icon: <FiBriefcase />,
      label: 'Plans for Recruiters',
      key: 'recruiters',
    },
    {
      icon: <FiUser />,
      label: 'Plans for Job Seekers',
      key: 'jobseekers',
    },
    {
      icon: <FiFileText />,
      label: 'Resume Writing',
      key: 'resume',
    },
    {
      icon: <FiMail />,
      label: 'Contact Us',
      key: 'contact',
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset for sticky header (approx 140px: 70px navbar + 70px submenu)
      const offset = 150;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveTab(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map(item => item.key);
      const scrollPosition = window.scrollY + 200; // Offset for trigger point

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className={`min-h-screen ${THEME.colors.background.page} pt-20`}>
      {/* Submenu Navigation */}
      <ProfileSubMenu
        menuItems={menuItems}
        activeTab={activeTab}
        onTabChange={scrollToSection}
      />
      
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 pb-20 pt-8">
        {/* Recruiter Plans Section */}
        <section id="recruiters" className="mb-20 scroll-mt-32">
          <div className="text-center mb-10">
            <h2 className={`${THEME.components.typography.sectionTitle} text-3xl md:text-4xl mb-3`}>
              {services.recruiterPlans.title}
            </h2>
            <p className={`${THEME.components.typography.subheading} max-w-2xl mx-auto`}>
              Find the perfect plan to streamline your hiring process and connect with top talent.
            </p>
          </div>
          
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4 md:mx-0 md:px-0">
            {services.recruiterPlans.plans.map((plan, index) => (
              <div key={index} className="min-w-[85vw] sm:min-w-[350px] md:min-w-0 snap-center h-full">
                <ServiceCard
                  title={plan.title}
                  features={plan.features}
                  price={plan.price}
                  image={plan.image}
                  popular={plan.popular}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Job Seeker Plans Section */}
        <section id="jobseekers" className="mb-20 scroll-mt-32">
          <div className="space-y-16">
            <div>
              <div className="text-center mb-10">
                <h2 className={`${THEME.components.typography.sectionTitle} text-3xl md:text-4xl mb-3`}>
                  {services.jobSeekerPlans.title}
                </h2>
                <p className={`${THEME.components.typography.subheading} max-w-2xl mx-auto`}>
                  Boost your career with our premium services designed for job seekers.
                </p>
              </div>
              
              <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4 md:mx-0 md:px-0">
                {services.jobSeekerPlans.plans.map((plan, index) => (
                  <div key={index} className="min-w-[85vw] sm:min-w-[350px] md:min-w-0 snap-center h-full">
                    <ServiceCard
                      title={plan.title}
                      features={plan.features}
                      price={plan.price}
                      image={plan.image}
                      popular={plan.popular}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Plans */}
            <div>
              <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4 md:mx-0 md:px-0">
                {services.additionalPlans.plans.map((plan, index) => (
                  <div key={index} className="min-w-[85vw] sm:min-w-[350px] md:min-w-0 snap-center h-full">
                    <ServiceCard
                      title={plan.title}
                      features={plan.features}
                      price={plan.price}
                      image={plan.image}
                      popular={plan.popular}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Resume Writing Section */}
        <section id="resume" className="mb-20 scroll-mt-32">
          <ResumeWritingSection />
        </section>

        {/* Contact Us Section */}
        <section id="contact" className="scroll-mt-32">
          <ContactUsSection />
        </section>
      </div>
    </div>
  );
}