import Image from 'next/image';
import { SITE_CONFIG } from '@/constants/siteconfig';

const FooterContact = () => {
  return (
    <>
      <h4 className="text-base font-bold text-gray-900 mb-6">Contact Us</h4>
      <ul className="space-y-4 text-sm text-gray-600">
        <li className="flex flex-col gap-1">
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Email</span>
          <a href={`mailto:${SITE_CONFIG.footer.email}`} className="hover:text-black transition-colors duration-200">{SITE_CONFIG.footer.email}</a>
        </li>
        <li className="flex flex-col gap-1">
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Phone</span>
          <a href={`tel:${SITE_CONFIG.footer.phone}`} className="hover:text-black transition-colors duration-200">{SITE_CONFIG.footer.phone}</a>
        </li>
      </ul>
      
      <div className="flex gap-4 mt-8">
        {[
          { icon: '/socials/facebook.svg', href: SITE_CONFIG.footer.social.facebook, label: 'Facebook' },
          { icon: '/socials/instagram.svg', href: SITE_CONFIG.footer.social.instagram, label: 'Instagram' },
          { icon: '/socials/linkedin.svg', href: SITE_CONFIG.footer.social.linkedin, label: 'LinkedIn' },
          { icon: '/socials/google.svg', href: SITE_CONFIG.footer.social.google, label: 'Google' }
        ].map((social) => (
          <a 
            key={social.label}
            href={social.href} 
            aria-label={social.label} 
            className="opacity-70 hover:opacity-100 transform hover:scale-110 transition-all duration-200"
          >
            <Image src={social.icon} alt={social.label} width={22} height={22} />
          </a>
        ))}
      </div>
    </>
  );
};

export default FooterContact;
