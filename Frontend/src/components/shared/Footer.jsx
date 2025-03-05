import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#1F2937] to-[#374151] text-white py-3 shadow-md">
      <div className="max-w-7xl mx-auto px-6 flex justify-center items-center">
        <h1 className="text-xl font-bold flex items-center text-center">
          Jobx<span className="text-[#F83002]">Devs</span>
        </h1>
      </div>

      <div className="flex justify-center gap-8 mt-4 text-lg items-center mb-4">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-[#F83002] hover:scale-125 hover:transition-all duration-300"
        >
          <FaFacebook className="w-6 h-6" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-[#F83002] hover:scale-125 hover:transition-all duration-300"
        >
          <FaTwitter className="w-6 h-6" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-[#F83002] hover:scale-125 hover:transition-all duration-300"
        >
          <FaLinkedin className="w-6 h-6" />
        </a>
      </div>

      <div className="text-center mt-2">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} JobxDevs. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
