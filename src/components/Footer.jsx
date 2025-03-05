import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  const footerSections = [
    {
      title: 'Support',
      links: ['Help Center', 'Safety information', 'Cancellation options', 'Our COVID-19 Response'],
    },
    {
      title: 'Community',
      links: ['Lushstay.org: disaster relief', 'Support refugees', 'Celebrating diversity', 'Combating discrimination'],
    },
    {
      title: 'Hosting',
      links: ['Try hosting', 'Explore hosting resources', 'Visit our community forum', 'How to host responsibly'],
    },
    {
      title: 'About',
      links: ['Newsroom', 'Learn about new features', 'Letter from our founders', 'Careers', 'Investors'],
    },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-600 dark:text-gray-300 hover:text-airbnb-red dark:hover:text-airbnb-red transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t dark:border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 dark:text-gray-300">
              © 2025 Lushstay Clone. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-airbnb-red dark:hover:text-airbnb-red">
                <FaGithub className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-airbnb-red dark:hover:text-airbnb-red">
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-airbnb-red dark:hover:text-airbnb-red">
                <FaTwitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}