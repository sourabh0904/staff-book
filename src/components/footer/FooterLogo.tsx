import Image from 'next/image';
import { SITE_CONFIG } from '@/constants/siteconfig';

const FooterLogo = () => {
  return (
    <div className="flex flex-col items-start gap-4 w-full md:w-[320px] lg:w-[420px]">
      {/* Logo */}
      <Image
        src="/logo.png"
        alt="Staff Book Logo"
        width={180}
        height={60}
        className="object-contain"
      />
      <span className="text-xs text-gray-500 mt-1">{SITE_CONFIG.footer.tagline}</span>
      {/* QR Codes + Store Buttons */}
      <div className="flex flex-row gap-4 mt-4">
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/homePage/scanner-google.png"
            alt="QR Code Android"
            width={72}
            height={72}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/homePage/scanner-google.png"
            alt="QR Code iOS"
            width={72}
            height={72}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default FooterLogo;
