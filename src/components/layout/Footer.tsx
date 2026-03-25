export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-sm space-y-3">
        <div>
          <a
            href="https://buymeacoffee.com/lfaitanin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm no-underline transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#FFDD00', color: '#000' }}
          >
            ☕ Buy me a coffee
          </a>
        </div>
        <p>
          Data source:{' '}
          <a
            href="https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/statistics/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Department of Enterprise, Trade and Employment (DETE)
          </a>
        </p>
        <p className="text-gray-500">
          This is an independent project. Not affiliated with the Irish Government.
        </p>
      </div>
    </footer>
  );
}
