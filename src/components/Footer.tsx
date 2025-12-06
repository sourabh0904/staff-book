import FooterLogo from './footer/FooterLogo';
import FooterLinks from './footer/FooterLinks';
import FooterContact from './footer/FooterContact';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t py-8 md:py-12">
      <div className="mx-auto w-full max-w-screen flex flex-col md:flex-row justify-between items-start px-4 gap-10 md:gap-20">
        {/* Left Column: Logo + QR */}
        <FooterLogo />
        
        {/* Right Columns: Policies, Menu, Contact */}
        <div className="flex flex-col md:flex-row   w-full justify-between">
          {/* Policies & Menu Row for mobile */}
          <div className="flex-2  flex-row gap-2 w-full ">
            <FooterLinks />
          </div>
          {/* Contact */}
          <FooterContact />
        </div>
      </div>
    </footer>
  );
}
