import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react'; // or any icon lib you like

export default function Breadcrumb({ paths = [] }) {
  return (
    <nav className="flex items-center text-sm text-gray-400 gap-2">
      {paths.map((path, index) => (
        <div key={index} className="flex items-center gap-2">
          {index !== 0 && <ChevronRight className="text-gray-400" />}
          {index === paths.length - 1 ? (
            <span className="font-normal text-gray-900">{path.label}</span>
          ) : (
            <Link
              to={path.href}
              className="hover:text-primary-600 transition-colors"
            >
              {path.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
