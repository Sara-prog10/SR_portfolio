import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="py-8 border-t border-gray-800 bg-dark-950 text-center relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} <Link to="/admin" className="hover:text-primary-400 transition-colors">Ravichandran Saravanan</Link>. All rights reserved.
        </p>
        <p className="text-gray-600 text-xs mt-2 font-mono">
          Built with React & Tailwind.
        </p>
      </div>
    </footer>
  );
}
