import { SITE_CONFIG } from '@/constants/siteconfig';
import FooterLogo from './footer/FooterLogo';
import FooterContact from './footer/FooterContact';

export default function Footer() {
  return (
    <footer className="w-full bg-[#f3f2ed] border-t border-gray-200 py-12 md:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Logo & Branding */}
          <div className="flex flex-col">
            <FooterLogo />
          </div>

          {/* Column 2: Overview / Menu */}
          <div className="flex flex-col">
            <h4 className="text-base font-bold text-gray-900 mb-6">Overview</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              {SITE_CONFIG.footer.menu.map((item) => (
                <li key={item.label}>
                  <a 
                    href={item.href} 
                    className="hover:text-black transition-colors duration-200 block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Policies */}
          <div className="flex flex-col">
            <h4 className="text-base font-bold text-gray-900 mb-6">Policies</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              {SITE_CONFIG.footer.policies.map((item) => (
                <li key={item.label}>
                  <a 
                    href={item.href} 
                    className="hover:text-black transition-colors duration-200 block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col">
            <FooterContact />
          </div>
        </div>

        {/* Copyright / Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200/60">
          <p className="text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name || 'Staff Book'}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
