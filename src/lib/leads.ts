// Lead delivery for the enquiry form.
//
// With a form service (VITE_FORM_ENDPOINT, and VITE_FORM_ACCESS_KEY for Web3Forms) the
// enquiry is sent directly. Without one the form says so honestly and offers a ready
// e-mail to send from the visitor's own mail program: nothing opens by surprise and
// nothing is counted as sent. See docs/launch-checklist.md.

import { track } from './analytics.ts';
import { SITE } from '../config/site.ts';

export const CONTACT_EMAIL = SITE.email;

const ENDPOINT = (import.meta.env.VITE_FORM_ENDPOINT as string | undefined)?.trim() || '';
const ACCESS_KEY = (import.meta.env.VITE_FORM_ACCESS_KEY as string | undefined)?.trim() || '';
// Formspree names its special fields differently from Web3Forms
const IS_FORMSPREE = /(^|\.)formspree\.io$/.test((() => {
  try {
    return new URL(ENDPOINT).hostname;
  } catch {
    return '';
  }
})());

export const hasFormBackend = ENDPOINT !== '';

/** Named in the privacy policy as a recipient of the enquiry */
export const formProviderName = IS_FORMSPREE ? 'Formspree Inc. (USA)' : /web3forms\.com/.test(ENDPOINT) ? 'Web3Forms' : 'dostawca usługi formularzy';

// Mail programs reject very long mailto: links, so the prefilled body is shortened
// until the whole encoded link fits.
const MAILTO_HREF_LIMIT = 1900;

/** 'sent': the form service accepted it. 'manual': the visitor still has to send the e-mail. */
export type LeadResult = 'sent' | 'manual';

export interface Lead {
  subject: string;
  body: string;
  /** Polish labels as keys: the engineer reads them in the e-mail. Empty values are left out. */
  fields: Record<string, string>;
  /** The visitor's e-mail, so "Reply" in the mail program answers them */
  replyTo?: string;
  /** Hidden field only bots fill in */
  honeypot: string;
}

export const mailtoHref = (subject: string, body: string) => {
  // RFC 6068: line breaks in a mailto body are CRLF
  const make = (text: string) =>
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text.replace(/\r?\n/g, '\r\n'))}`;
  let text = body;
  let href = make(text);
  while (href.length > MAILTO_HREF_LIMIT && text.length > 0) {
    text = text.slice(0, -40);
    href = make(`${text}…`);
  }
  return href;
};

export async function sendLead(lead: Lead): Promise<LeadResult> {
  if (!hasFormBackend) return 'manual';

  // A filled hidden field usually means a bot, but a password manager can fill it too:
  // send it marked instead of dropping what may be a real enquiry.
  const suspicious = lead.honeypot.trim() !== '';
  const subject = suspicious ? `[możliwy spam] ${lead.subject}` : lead.subject;
  const fields = Object.fromEntries(Object.entries(lead.fields).filter(([, v]) => v.trim() !== ''));
  const service = IS_FORMSPREE
    ? { _subject: subject, ...(lead.replyTo ? { _replyto: lead.replyTo } : {}) }
    : {
        ...(ACCESS_KEY ? { access_key: ACCESS_KEY } : {}),
        subject,
        from_name: `Strona ${SITE.name}`,
        ...(lead.replyTo ? { replyto: lead.replyTo } : {}),
      };

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...service, ...fields }),
      signal: controller.signal,
    });
    // Both services can answer 2xx and still report a failure in the body
    const data: { success?: boolean; ok?: boolean; errors?: unknown } = await res.json().catch(() => ({}));
    if (!res.ok || data.success === false || data.ok === false || data.errors) {
      throw new Error(`status ${res.status}`);
    }
    if (!suspicious) track('Zapytanie', { sposob: 'formularz' });
    return 'sent';
  } catch (err) {
    // Shows the owner in the statistics that enquiries are failing (expired key, quota)
    const reason =
      err instanceof DOMException && err.name === 'AbortError'
        ? 'timeout'
        : err instanceof Error && err.message.startsWith('status ')
          ? err.message.slice(7)
          : 'siec';
    track('Zapytanie: błąd', { powod: reason });
    throw err;
  } finally {
    window.clearTimeout(timeout);
  }
}
