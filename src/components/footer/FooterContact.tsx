import Image from 'next/image';
import { SITE_CONFIG } from '@/constants/siteconfig';

const FooterContact = () => {
  return (
    <div className='flex-1  '>
      <h4 className="text-lg text-black font-semibold mb-4">Contact</h4>
      <ul className="space-y-2 text-sm text-gray-700">
        <li>Email: <a href={`mailto:${SITE_CONFIG.footer.email}`} className="hover:underline">{SITE_CONFIG.footer.email}</a></li>
        <li>Phone: <a href={`tel:${SITE_CONFIG.footer.phone}`} className="hover:underline">{SITE_CONFIG.footer.phone}</a></li>
      </ul>
      <div className="flex gap-3 mt-4">
        <a href={SITE_CONFIG.footer.social.facebook} aria-label="Facebook"><Image src="/socials/facebook.svg" alt="Facebook" width={24} height={24} /></a>
        <a href={SITE_CONFIG.footer.social.instagram} aria-label="Instagram"><Image src="/socials/instagram.svg" alt="Instagram" width={24} height={24} /></a>
        <a href={SITE_CONFIG.footer.social.linkedin} aria-label="LinkedIn"><Image src="/socials/linkedin.svg" alt="LinkedIn" width={24} height={24} /></a>
        <a href={SITE_CONFIG.footer.social.google} aria-label="Google"><Image src="/socials/google.svg" alt="Google" width={24} height={24} /></a>
      </div>
    </div>
  );
};

export default FooterContact;
