import { useSEO } from '../hooks/useSEO';

export default function Privacy() {
  useSEO({
    title: 'Privacy Policy | IE Work Permits Explorer',
    description: 'Privacy policy for ie-work-permits.com — what data we collect, how third-party advertising (Google AdSense) works, and your choices.',
    path: '/privacy',
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-gray-500 mb-8">Last updated: September 2026</p>

      <div className="prose prose-sm max-w-none space-y-6 text-gray-700">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Overview</h2>
          <p>
            IE Work Permits Explorer ("this site") is an independent, non-commercial project that
            visualises publicly available Irish employment permit statistics published by the
            Department of Enterprise, Trade and Employment (DETE). We do not require account
            registration and do not collect personal data through forms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Data source</h2>
          <p>
            All company, sector, county and nationality statistics displayed on this site come from
            DETE's official published spreadsheets. No personal data about permit applicants is
            processed or stored by this site.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Analytics</h2>
          <p>
            We use Vercel Analytics to understand aggregate traffic (page views, country, device
            type). This service is cookieless and does not track individuals across websites.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Advertising (Google AdSense)</h2>
          <p>
            This site may display ads served by Google AdSense. Google, as a third-party vendor,
            uses cookies to serve ads based on your prior visits to this or other websites. Google's
            use of advertising cookies enables it and its partners to serve ads based on your visit
            to this site and/or other sites on the Internet.
          </p>
          <p className="mt-2">
            You may opt out of personalised advertising by visiting{' '}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Google Ads Settings
            </a>
            . You can also visit{' '}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              www.aboutads.info/choices
            </a>{' '}
            to opt out of third-party vendors' use of cookies for personalised advertising.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Cookies</h2>
          <p>
            This site stores a single non-tracking preference in your browser's local storage (your
            selected display language). No advertising or tracking cookies are set by us directly;
            any such cookies come from third-party ad providers described above.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Third-party links</h2>
          <p>
            This site links to external job boards (Google Jobs, LinkedIn), official Irish government
            resources (DETE, Irish Immigration), and a payment page (Buy Me a Coffee). We are not
            responsible for the privacy practices of those external sites.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Contact</h2>
          <p>
            Questions about this policy can be sent via the contact details on the{' '}
            <a href="/about" className="text-blue-600 hover:text-blue-800 underline">About</a> page.
          </p>
        </section>
      </div>
    </div>
  );
}
