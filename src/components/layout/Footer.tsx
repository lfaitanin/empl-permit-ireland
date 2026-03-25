export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-sm">
        <p>
          Data source:{' '}
          <a
            href="https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/statistics/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-300 hover:text-primary-200 underline"
          >
            Department of Enterprise, Trade and Employment (DETE)
          </a>
        </p>
        <p className="mt-2 text-gray-500">
          This is an independent project. Not affiliated with the Irish Government.
        </p>
      </div>
    </footer>
  );
}
