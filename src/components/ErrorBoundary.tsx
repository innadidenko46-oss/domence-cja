import React from 'react';
import { SITE } from '../config/site.ts';

interface ErrorBoundaryState {
  hasError: boolean;
}

// The most likely error is a page's code that can't load (e.g. an old tab after a new
// deploy). Trying again in place would fail the same way, so the button reloads the page,
// and the e-mail is there so an enquiry is never lost.
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; /** Changes with the page: a new page clears the error */ resetKey?: string },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidUpdate(prev: { resetKey?: string }) {
    if (this.state.hasError && prev.resetKey !== this.props.resetKey) this.setState({ hasError: false });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-3xl mx-auto px-4 py-24 text-center">
          <h1 className="font-display text-2xl sm:text-3xl font-bold mb-3">Coś poszło nie tak</h1>
          <p className="text-base text-gray-600 mb-8">
            Odśwież stronę albo wróć na stronę główną. Możesz też napisać do nas:{' '}
            <a href={`mailto:${SITE.email}`} className="font-semibold underline underline-offset-2 text-petrol-700">
              {SITE.email}
            </a>
            .
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <button type="button" onClick={() => window.location.reload()} className="btn-secondary cursor-pointer">
              Odśwież stronę
            </button>
            {/* A full load, not a router link: the router may be what failed */}
            <a href="/" className="btn-engineering-primary">
              Strona główna
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
