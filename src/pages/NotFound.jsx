import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';
import PrimaryButton from '../components/PrimaryButton';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>

      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0D0D0D] to-[#1A1A1A] text-white px-4">
        {/* Icon */}
        <HiOutlineExclamationTriangle className="w-20 h-20 text-[#FF6B00] mb-6" />

        {/* Heading */}
        <h1 className="text-5xl font-semibold mb-2">404</h1>
        <h2 className="text-2xl font-light text-gray-300 mb-4">
          Oops! Page not found.
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-center max-w-md mb-8">
          The page you’re looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        {/* Back Button */}
        <Link to="/">
          <PrimaryButton className="bg-[#FF6B00] hover:bg-[#e66000] text-white px-8 py-3 rounded-lg font-medium shadow-lg transition-all duration-200">
            Go Back Home
          </PrimaryButton>
        </Link>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-10">
          © {new Date().getFullYear()} Emirates Limo. All rights reserved.
        </p>
      </div>
    </>
  );
}
