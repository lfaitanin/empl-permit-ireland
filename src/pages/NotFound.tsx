import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

export default function NotFound() {
  useSEO({
    title: 'Page not found',
    description: 'This page does not exist on IE Work Permits Explorer.',
  });

  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <p className="text-5xl font-bold text-gray-300 mb-4">404</p>
      <h1 className="text-xl font-semibold text-gray-900 mb-2">Page not found</h1>
      <p className="text-gray-500 mb-6">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium">Go to the dashboard</Link>
    </div>
  );
}
