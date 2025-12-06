import { SITE_CONFIG } from '@/constants/siteconfig';

const FooterLinks = () => {
  return (
    <div className="flex flex-row gap-2 w-full sm:w-auto">
      {/* Policies */}
      <div className="flex-1/2 flex-row ">
        <h4 className="text-lg text-black font-semibold mb-4">Policies</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          {SITE_CONFIG.footer.policies.map((item) => (
            <li key={item.label}>
              <a href={item.href} className="hover:underline focus:underline transition-colors">{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
      {/* Menu */}
      <div className="flex-1/2 ">
        <h4 className="text-lg text-black font-semibold mb-4">Menu</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          {SITE_CONFIG.footer.menu.map((item) => (
            <li key={item.label}>
              <a href={item.href} className="hover:underline focus:underline transition-colors">{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FooterLinks;
