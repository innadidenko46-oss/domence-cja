import { useState, useEffect, useRef, FormEvent, KeyboardEvent, ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PropertyState, AreaRange, Interest } from '../types.ts';
import { INTEREST_OPTIONS } from '../data/interests.ts';
import { CONTACT_EMAIL, hasFormBackend, mailtoHref, sendLead, LeadResult } from '../lib/leads.ts';
import { track } from '../lib/analytics.ts';
import { getDraft, saveDraft, clearDraft, EnquiryDraft, ContactBy } from '../lib/enquiryDraft.ts';
import { visitSummary } from '../lib/visitSource.ts';
import { INSTALL_TIMELINES, RESPONSE_LINE, SITE } from '../config/site.ts';
import { ContactChoice, contactByLine } from './ContactChoice.tsx';
import { Hammer, Home, ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Phone, Mail, User, MapPin, Copy } from 'lucide-react';

interface EnquiryFormProps {
  /** Chosen on another page (home, a landing page): start at step 2 */
  initialInterest?: Interest;
  /** Stage already known from the link, e.g. the no-chiselling page */
  initialStage?: PropertyState;
}

const STAGE_OPTIONS: { value: PropertyState; param: string; title: string; sub: string; icon: typeof Home }[] = [
  { value: 'deweloperski', param: 'budowa', title: 'W budowie albo remoncie', sub: 'Kable poprowadzimy, zanim zamkniesz ściany.', icon: Hammer },
  { value: 'retro', param: 'gotowy', title: 'Gotowy i wykończony', sub: 'Montujemy bez kucia ścian.', icon: Home },
];

const AREA_OPTIONS: { value: AreaRange; label: string }[] = [
  { value: 'do_60', label: 'do 60 m²' },
  { value: '61_110', label: '61–110 m²' },
  { value: '111_180', label: '111–180 m²' },
  { value: 'ponad_180', label: 'powyżej 180 m²' },
];

const plain = (s: string) => s.replace(/ /g, ' ');
const interestLabel = (i: Interest) => plain(INTEREST_OPTIONS.find((o) => o.value === i)!.title);
/** "Jedno i drugie" says nothing on its own in a summary */
const interestSummary = (i: Interest) => (i === 'oba' ? 'inteligentny dom oraz kamery i wideodomofon' : INTEREST_OPTIONS.find((o) => o.value === i)!.title.toLowerCase());
const areaLabel = (a: AreaRange) => AREA_OPTIONS.find((o) => o.value === a)!.label;
const stageLabel = (s: PropertyState) => (s === 'deweloperski' ? 'Dom w budowie albo remoncie' : 'Gotowy, wykończony dom');

/** The consent the visitor ticks. Its exact words also go into the lead, as proof of consent. */
const consentText = (by: ContactBy) =>
  by === 'email'
    ? 'Zgadzam się na kontakt tylko e-mailem w sprawie tego zapytania, także na przesłanie mi propozycji dla mojego domu. Zgodę mogę w każdej chwili wycofać.'
    : 'Zgadzam się na kontakt telefoniczny i e-mailowy w sprawie tego zapytania, także na przedstawienie mi propozycji dla mojego domu. Zgodę mogę w każdej chwili wycofać.';

/** ['etap', 'metraż', 'termin'] → "etap, metraż i termin" */
const listPl = (items: string[]) => (items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} i ${items[items.length - 1]}`);

type Field = 'name' | 'phone' | 'email' | 'location' | 'agreement';
type FieldErrors = Partial<Record<Field, string>>;
const FIELD_ORDER: Field[] = ['name', 'phone', 'email', 'location', 'agreement'];

// 9–15 digits, written with spaces, dashes, brackets or a leading +
const phoneOk = (v: string) => /^\+?[\d\s()-]+$/.test(v) && (v.match(/\d/g)?.length ?? 0) >= 9 && (v.match(/\d/g)?.length ?? 0) <= 15;
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

// Selected state: petrol, the same in every control on the site
const optionClass = (active: boolean) =>
  `rounded-[2px] text-left transition-colors border cursor-pointer focus-visible:ring-2 focus-visible:ring-petrol-600 focus-visible:ring-offset-2 ${
    active ? 'bg-petrol-50 border-petrol-700 ring-1 ring-petrol-700' : 'bg-white border-gray-300 hover:border-petrol-700'
  }`;

const radioCardClass = (active: boolean) =>
  `flex items-start gap-3 rounded-[2px] border cursor-pointer transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-petrol-600 has-[:focus-visible]:ring-offset-2 ${
    active ? 'bg-petrol-50 border-petrol-700 ring-1 ring-petrol-700' : 'bg-white border-gray-300 hover:border-petrol-700'
  }`;

// gray-500 borders keep inputs visible (3:1); a real outline also shows in Windows high contrast
const inputClass = (invalid?: boolean) =>
  `w-full px-4 py-3 rounded-[2px] text-base border bg-gray-50 text-gray-900 placeholder:text-gray-500 focus:border-petrol-700 focus:outline-2 focus:outline-offset-0 focus:outline-petrol-600 ${
    invalid ? 'border-red-600' : 'border-gray-500'
  }`;

/** One answer of a step 2 question: a real radio button, so screen readers hear "1 of 4" */
const RadioCard = ({
  id,
  name,
  checked,
  onChange,
  className,
  children,
}: {
  id: string;
  name: string;
  checked: boolean;
  onChange: () => void;
  className: string;
  children: ReactNode;
}) => (
  <label htmlFor={id} className={`${radioCardClass(checked)} ${className}`}>
    <input type="radio" id={id} name={name} checked={checked} onChange={onChange} required className="accent-petrol-700 w-4 h-4 shrink-0 mt-1" />
    {children}
  </label>
);

/** History state of an enquiry step: which step, and which step the visitor came from */
type StepState = { krok?: number; z?: number } | null;

export const EnquiryForm: React.FC<EnquiryFormProps> = ({ initialInterest, initialStage }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const nav = location.state as StepState;

  const saved = getDraft();
  const [interest, setInterest] = useState<Interest | undefined>(initialInterest ?? saved.interest);
  const [form, setForm] = useState<EnquiryDraft>({ ...saved, stage: initialStage ?? saved.stage });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [result, setResult] = useState<LeadResult | null>(null);
  const [mail, setMail] = useState({ subject: '', body: '' });
  const [copied, setCopied] = useState<boolean | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const sectionRef = useRef<HTMLElement>(null);
  const trackedSteps = useRef(new Set<number>());

  const step2Done = Boolean(form.stage && form.area && form.timeline);
  // Each step is a browser history entry, so the phone's Back button goes one step back
  // instead of leaving the enquiry. A step can't be reached before the earlier ones are answered.
  const wanted = nav?.krok ?? (initialInterest ? 2 : 1);
  const step = !interest ? 1 : wanted >= 3 && !step2Done ? 2 : Math.min(Math.max(wanted, 1), 3);

  // Counts each step once per visit for the funnel in the statistics
  const markStep = (n: number) => {
    if (n < 2 || trackedSteps.current.has(n)) return;
    trackedSteps.current.add(n);
    track('Zapytanie: krok', { krok: String(n) });
  };

  // Answers that came with the link are answers too: keep them for when the visitor comes back
  useEffect(() => {
    saveDraft({ ...(initialInterest ? { interest: initialInterest } : {}), ...(initialStage ? { stage: initialStage } : {}) });
    if (initialInterest) markStep(2);
    // Only once, for the answers the page opened with
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = (patch: Partial<EnquiryDraft>) => {
    setForm((prev) => ({ ...prev, ...patch }));
    saveDraft(patch);
  };

  const searchWith = (changes: Record<string, string>) => {
    const params = new URLSearchParams(location.search);
    params.delete('state');
    for (const [k, v] of Object.entries(changes)) params.set(k, v);
    return `?${params}`;
  };

  const goTo = (next: number) => {
    markStep(next);
    // Going back to the step we came from: use the existing history entry
    if (next < step && nav?.z === next) {
      navigate(-1);
      return;
    }
    navigate({ search: location.search }, { state: { krok: next, z: step } });
  };

  const chooseInterest = (val: Interest) => {
    setInterest(val);
    saveDraft({ interest: val });
    markStep(2);
    navigate({ search: searchWith({ chce: val }) }, { state: { krok: 2, z: 1 } });
  };

  const chooseStage = (opt: (typeof STAGE_OPTIONS)[number]) => {
    update({ stage: opt.value });
    // The address says the same as the answer, so coming back later doesn't undo it
    navigate({ search: searchWith({ etap: opt.param }) }, { replace: true, state: location.state });
  };

  // A new step or the result: move focus to its heading so screen readers announce it
  const shown = useRef({ step, result });
  useEffect(() => {
    if (shown.current.step === step && shown.current.result === result) return;
    shown.current = { step, result };
    sectionRef.current?.querySelector<HTMLElement>('[data-step-heading]')?.focus();
  }, [step, result]);

  const missing = [!form.stage && 'etap', !form.area && 'metraż', !form.timeline && 'termin'].filter((x): x is string => Boolean(x));

  const nextFromStep2 = () => {
    if (step2Done) {
      goTo(3);
      return;
    }
    // Show where the missing answer is instead of a button that does nothing
    const firstMissing = !form.stage ? `enq-stage-${STAGE_OPTIONS[0].value}` : !form.area ? `enq-area-${AREA_OPTIONS[0].value}` : 'enq-timeline-0';
    document.getElementById(firstMissing)?.focus();
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (form.name.trim().length < 2) next.name = 'Podaj imię i nazwisko (co najmniej 2 litery).';
    if (form.contactBy === 'phone' && !form.phone.trim()) next.phone = 'Podaj numer, pod który mamy zadzwonić.';
    else if (form.phone.trim() && !phoneOk(form.phone.trim())) next.phone = 'Wpisz numer telefonu, np. 601 234 567.';
    if (form.contactBy === 'email' && !form.email.trim()) next.email = 'Podaj e-mail, na który mamy odpisać.';
    else if (form.email.trim() && !emailOk(form.email.trim())) next.email = 'Wpisz poprawny adres e-mail.';
    if (form.location.trim().length < 2) next.location = 'Podaj miejscowość, żebyśmy wiedzieli, czy dojedziemy.';
    if (!form.agreement) next.agreement = 'Zaznacz zgodę, żebyśmy mogli się odezwać.';
    return next;
  };

  const clearError = (field: Field) => setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));

  // Enter in a text field moves to the next one instead of sending a half-filled form
  const handleFormKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    const target = e.target;
    if (e.key !== 'Enter' || !(target instanceof HTMLInputElement) || !['text', 'tel', 'email'].includes(target.type)) return;
    const fields = [...e.currentTarget.querySelectorAll<HTMLElement>('input[data-field], textarea[data-field]')];
    const i = fields.indexOf(target);
    if (i >= 0 && i < fields.length - 1) {
      e.preventDefault();
      fields[i + 1].focus();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending || !interest || !form.stage || !form.area) return;
    const found = validate();
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((f) => found[f]);
    if (firstInvalid) {
      document.getElementById(`enq-${firstInvalid}`)?.focus();
      return;
    }

    const emailOnly = form.contactBy === 'email';
    const source = visitSummary();
    const consent = plain(consentText(form.contactBy));
    const subject = `Zapytanie: ${interestLabel(interest)}, ${plain(form.timeline).toLowerCase()}${emailOnly ? ' – TYLKO E-MAIL, nie dzwonić' : ''} – ${form.name.trim()}`;
    const body = [
      `Imię i nazwisko: ${form.name.trim()}`,
      `Preferowany kontakt: ${contactByLine(form.contactBy)}`,
      `Telefon: ${form.phone.trim() || '—'}`,
      `E-mail: ${form.email.trim() || '—'}`,
      `Miejscowość: ${form.location.trim()}`,
      '',
      `Czego dotyczy: ${interestLabel(interest)}`,
      `Etap: ${stageLabel(form.stage)}`,
      `Metraż: ${areaLabel(form.area)}`,
      `Planowany montaż: ${plain(form.timeline)}`,
      '',
      `Wiadomość: ${form.message.trim() || '—'}`,
      '',
      `Skąd: ${source || '—'}`,
      `Zgoda na kontakt: ${consent}`,
    ].join('\n');
    setMail({ subject, body });
    setCopied(null);
    setSendError(false);
    setSending(true);
    try {
      const res = await sendLead({
        subject,
        body,
        honeypot,
        replyTo: form.email.trim() || undefined,
        fields: {
          'Imię i nazwisko': form.name.trim(),
          'Preferowany kontakt': contactByLine(form.contactBy),
          Telefon: form.phone.trim(),
          'E-mail': form.email.trim(),
          Miejscowość: form.location.trim(),
          'Czego dotyczy': interestLabel(interest),
          Etap: stageLabel(form.stage),
          Metraż: areaLabel(form.area),
          'Planowany montaż': plain(form.timeline),
          Wiadomość: form.message.trim(),
          Skąd: source,
          'Zgoda na kontakt': consent,
        },
      });
      setResult(res);
      if (res === 'sent') clearDraft();
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  const copyBody = async () => {
    try {
      await navigator.clipboard.writeText(`${mail.subject}\n\n${mail.body}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const copyButton = (
    <button type="button" onClick={copyBody} className="btn-secondary cursor-pointer focus-visible:ring-2 focus-visible:ring-petrol-600 focus-visible:ring-offset-2">
      <Copy className="w-4 h-4" aria-hidden="true" />
      {copied ? 'Skopiowano' : 'Kopiuj treść'}
    </button>
  );
  const copyStatus = (
    <p role="status" className="mt-2 text-sm text-gray-700 empty:mt-0">
      {copied === false ? 'Nie udało się skopiować. Zaznacz tekst poniżej i skopiuj go ręcznie.' : copied ? 'Treść skopiowana.' : ''}
    </p>
  );

  return (
    <section ref={sectionRef} id="zapytanie" aria-label="Formularz zapytania" className="pt-6 pb-16 sm:pt-10 sm:pb-20 lg:pb-24 border-t bg-gray-100 border-gray-200 text-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="rounded-[2px] border p-5 sm:p-10 lg:p-12 shadow-xl bg-white border-gray-200">
          {!result && (
            <div className="mb-8">
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="font-semibold text-petrol-700">Twoje zapytanie</span>
                <span className="text-gray-600" aria-live="polite">
                  Krok {step} z{' '}3
                </span>
              </div>
              <div className="w-full h-1 rounded-[2px] overflow-hidden bg-gray-200" aria-hidden="true">
                <div className="h-full bg-petrol-700 transition-[width] duration-300" style={{ width: `${(step / 3) * 100}%` }} />
              </div>
            </div>
          )}

          {step === 1 && !result && (
            <div key="step-1" className="animate-fade-up">
              <h2 data-step-heading tabIndex={-1} className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-2 text-gray-900 focus:outline-none">
                Co Cię interesuje?
              </h2>
              <p className="text-base mb-6 leading-relaxed text-gray-600">Wybierz jedną odpowiedź. Szczegóły zaznaczysz w{' '}następnym kroku.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {INTEREST_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => chooseInterest(opt.value)}
                      aria-pressed={interest === opt.value}
                      className={`p-5 sm:p-6 flex sm:block items-start gap-4 ${optionClass(interest === opt.value)}`}
                    >
                      <Icon className="w-6 h-6 text-petrol-700 shrink-0 sm:mb-4" aria-hidden="true" />
                      <span>
                        <span className="block font-display text-base font-bold text-gray-900">{opt.title}</span>
                        <span className="block text-base text-gray-600 mt-1.5 leading-relaxed">{opt.sub}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && !result && (
            <div key="step-2" className="animate-fade-up">
              <h2 data-step-heading tabIndex={-1} className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-2 text-gray-900 focus:outline-none">
                Twój dom
              </h2>
              <p className="text-base mb-6 leading-relaxed text-gray-600">
                {interest && (
                  <>
                    Twój wybór: <strong className="font-semibold text-gray-900">{interestSummary(interest)}</strong>.{' '}
                  </>
                )}
                Od tego, na jakim etapie jest dom, zależy, jak montujemy: z{' '}nowymi kablami czy bez kucia ścian.
              </p>

              <fieldset>
                <legend className="text-sm font-semibold mb-3 text-gray-900">Na jakim etapie jest dom?</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {STAGE_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <RadioCard
                        key={opt.value}
                        id={`enq-stage-${opt.value}`}
                        name="enq-stage"
                        checked={form.stage === opt.value}
                        onChange={() => chooseStage(opt)}
                        className="p-4"
                      >
                        <Icon className="w-5 h-5 text-petrol-700 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>
                          <span className="block text-base font-bold text-gray-900">{opt.title}</span>
                          <span className="block text-base text-gray-600 mt-1 leading-relaxed">{opt.sub}</span>
                        </span>
                      </RadioCard>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="mt-7">
                <legend className="text-sm font-semibold mb-3 text-gray-900">Jaki metraż, mniej więcej?</legend>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {AREA_OPTIONS.map((opt) => (
                    <RadioCard
                      key={opt.value}
                      id={`enq-area-${opt.value}`}
                      name="enq-area"
                      checked={form.area === opt.value}
                      onChange={() => update({ area: opt.value })}
                      className="p-3 min-h-11 font-semibold text-base"
                    >
                      <span>{opt.label}</span>
                    </RadioCard>
                  ))}
                </div>
              </fieldset>

              <fieldset className="mt-7">
                <legend className="text-sm font-semibold mb-3 text-gray-900">Kiedy planujesz montaż?</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {INSTALL_TIMELINES.map((opt, i) => (
                    <RadioCard
                      key={opt}
                      id={`enq-timeline-${i}`}
                      name="enq-timeline"
                      checked={form.timeline === opt}
                      onChange={() => update({ timeline: opt })}
                      className="p-3.5 min-h-11 font-semibold text-base"
                    >
                      <span>{opt}</span>
                    </RadioCard>
                  ))}
                </div>
              </fieldset>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => goTo(1)}
                  className="inline-flex items-center justify-center gap-2 min-h-11 px-3 text-sm font-semibold text-gray-700 hover:text-gray-900 cursor-pointer focus-visible:ring-2 focus-visible:ring-petrol-600"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  <span>Wstecz</span>
                </button>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <p id="enq-step2-hint" className="text-sm text-gray-600 text-center empty:hidden" aria-live="polite">
                    {missing.length ? `Zaznacz jeszcze: ${listPl(missing)}` : ''}
                  </p>
                  <button
                    type="button"
                    aria-disabled={!step2Done}
                    aria-describedby="enq-step2-hint"
                    onClick={nextFromStep2}
                    className="btn-engineering-primary cursor-pointer aria-disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-petrol-600 focus-visible:ring-offset-2"
                  >
                    <span>Dalej: kontakt</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && !result && interest && form.stage && form.area && (
            <div key="step-3" className="animate-fade-up">
              <h2 data-step-heading tabIndex={-1} className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 focus:outline-none">
                Jak mamy się z{' '}Tobą skontaktować?
              </h2>
              <p className="mt-2 text-base text-gray-600">
                Twoje odpowiedzi: {interestSummary(interest)}, {stageLabel(form.stage).toLowerCase()}, {areaLabel(form.area)}, {form.timeline.toLowerCase()}.{' '}
                <button
                  type="button"
                  onClick={() => goTo(2)}
                  className="inline-flex items-center min-h-11 font-semibold text-petrol-700 underline underline-offset-4 hover:text-amber-800 cursor-pointer focus-visible:ring-2 focus-visible:ring-petrol-600"
                >
                  Zmień odpowiedzi
                </button>
              </p>

              <ul className="flex flex-wrap gap-x-6 gap-y-2 my-6 py-4 border-y border-gray-200 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-petrol-700" aria-hidden="true" />
                  Bezpłatne sprawdzenie domu
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-petrol-700" aria-hidden="true" />
                  To nie jest zamówienie ani wycena
                </li>
              </ul>

              <form onSubmit={handleSubmit} onKeyDown={handleFormKeyDown} noValidate className="space-y-5 max-w-xl">
                <p className="text-sm text-gray-600">Pola bez dopisku „opcjonalnie” są wymagane.</p>
                <div>
                  <label htmlFor="enq-name" className="block text-sm font-semibold mb-2 text-gray-800">
                    Imię i{' '}nazwisko
                  </label>
                  <div className="relative">
                    <input
                      id="enq-name"
                      data-field
                      name="name"
                      autoComplete="name"
                      enterKeyHint="next"
                      type="text"
                      maxLength={60}
                      value={form.name}
                      onChange={(e) => {
                        update({ name: e.target.value.trimStart() });
                        clearError('name');
                      }}
                      placeholder="np. Marek Wiśniewski"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'enq-name-error' : undefined}
                      className={`${inputClass(!!errors.name)} pl-10`}
                    />
                    <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-4" aria-hidden="true" />
                  </div>
                  {errors.name && (
                    <p id="enq-name-error" className="mt-1.5 text-sm font-medium text-red-700">
                      {errors.name}
                    </p>
                  )}
                </div>

                <ContactChoice
                  idPrefix="enq"
                  value={form.contactBy}
                  onChange={(v) => {
                    update({ contactBy: v });
                    clearError('phone');
                    clearError('email');
                  }}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="enq-phone" className="block text-sm font-semibold mb-2 text-gray-800">
                      {form.contactBy === 'email' ? 'Telefon (opcjonalnie)' : 'Telefon'}
                    </label>
                    <div className="relative">
                      <input
                        id="enq-phone"
                        data-field
                        name="phone"
                        autoComplete="tel"
                        inputMode="tel"
                        enterKeyHint="next"
                        type="tel"
                        maxLength={25}
                        value={form.phone}
                        onChange={(e) => {
                          update({ phone: e.target.value });
                          clearError('phone');
                        }}
                        placeholder="601 234 567"
                        aria-required={form.contactBy === 'phone'}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'enq-phone-error' : undefined}
                        className={`${inputClass(!!errors.phone)} pl-10`}
                      />
                      <Phone className="w-4 h-4 text-gray-500 absolute left-3.5 top-4" aria-hidden="true" />
                    </div>
                    {errors.phone && (
                      <p id="enq-phone-error" className="mt-1.5 text-sm font-medium text-red-700">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="enq-email" className="block text-sm font-semibold mb-2 text-gray-800">
                      {form.contactBy === 'email' ? 'E-mail' : 'E-mail (opcjonalnie)'}
                    </label>
                    <div className="relative">
                      <input
                        id="enq-email"
                        data-field
                        name="email"
                        autoComplete="email"
                        enterKeyHint="next"
                        type="email"
                        maxLength={254}
                        value={form.email}
                        onChange={(e) => {
                          update({ email: e.target.value });
                          clearError('email');
                        }}
                        placeholder="twoj@email.pl"
                        aria-required={form.contactBy === 'email'}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'enq-email-error' : undefined}
                        className={`${inputClass(!!errors.email)} pl-10`}
                      />
                      <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-4" aria-hidden="true" />
                    </div>
                    {errors.email && (
                      <p id="enq-email-error" className="mt-1.5 text-sm font-medium text-red-700">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="enq-location" className="block text-sm font-semibold mb-2 text-gray-800">
                    Miejscowość
                  </label>
                  <div className="relative">
                    <input
                      id="enq-location"
                      data-field
                      name="location"
                      autoComplete="address-level2"
                      enterKeyHint="next"
                      type="text"
                      maxLength={80}
                      value={form.location}
                      onChange={(e) => {
                        update({ location: e.target.value });
                        clearError('location');
                      }}
                      placeholder="np. Warszawa, Ząbki, Piaseczno"
                      aria-required="true"
                      aria-invalid={!!errors.location}
                      aria-describedby={errors.location ? 'enq-location-error enq-location-hint' : 'enq-location-hint'}
                      className={`${inputClass(!!errors.location)} pl-10`}
                    />
                    <MapPin className="w-4 h-4 text-gray-500 absolute left-3.5 top-4" aria-hidden="true" />
                  </div>
                  {errors.location && (
                    <p id="enq-location-error" className="mt-1.5 text-sm font-medium text-red-700">
                      {errors.location}
                    </p>
                  )}
                  <p id="enq-location-hint" className="mt-1.5 text-sm text-gray-600">
                    Montujemy w{' '}Warszawie i{' '}okolicach.
                  </p>
                </div>

                <div>
                  <label htmlFor="enq-message" className="block text-sm font-semibold mb-2 text-gray-800">
                    Wiadomość (opcjonalnie)
                  </label>
                  <textarea
                    id="enq-message"
                    data-field
                    name="message"
                    rows={3}
                    maxLength={500}
                    value={form.message}
                    onChange={(e) => update({ message: e.target.value })}
                    placeholder={form.contactBy === 'email' ? 'Np. o co chcesz zapytać?' : 'Np. kiedy najlepiej zadzwonić?'}
                    className={inputClass()}
                  />
                </div>

                {/* Only bots see and fill this field. Password managers are told to skip it. */}
                <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                  <label htmlFor="enq-website">Strona internetowa</label>
                  <input
                    id="enq-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    data-1p-ignore
                    data-lpignore="true"
                    data-bwignore
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="enq-agreement" className="flex items-start gap-3 cursor-pointer text-sm text-gray-700">
                    <input
                      id="enq-agreement"
                      type="checkbox"
                      checked={form.agreement}
                      onChange={(e) => {
                        update({ agreement: e.target.checked });
                        clearError('agreement');
                      }}
                      aria-required="true"
                      aria-invalid={!!errors.agreement}
                      aria-describedby={errors.agreement ? 'enq-agreement-error' : undefined}
                      className="mt-0.5 accent-petrol-700 w-5 h-5 shrink-0 focus-visible:ring-2 focus-visible:ring-petrol-600 focus-visible:ring-offset-2"
                    />
                    <span className="leading-snug">{consentText(form.contactBy)}</span>
                  </label>
                  {errors.agreement && (
                    <p id="enq-agreement-error" className="mt-1.5 text-sm font-medium text-red-700">
                      {errors.agreement}
                    </p>
                  )}
                </div>

                {/* Short information required by RODO art. 13, next to the form */}
                <p className="text-sm leading-relaxed text-gray-600">
                  Administratorem Twoich danych jest {SITE.legal.companyName || SITE.name}. Wykorzystamy je, żeby odpowiedzieć na zapytanie i{' '}przygotować
                  propozycję. Szczegóły, w{' '}tym Twoje prawa:{' '}
                  <a
                    href="/polityka-prywatnosci"
                    target="_blank"
                    rel="noopener"
                    className="underline underline-offset-2 font-semibold text-petrol-700 hover:text-petrol-800"
                  >
                    polityka prywatności
                    <span className="sr-only"> (otwiera się w{' '}nowej karcie)</span>
                  </a>
                  .
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => goTo(2)}
                    className="btn-secondary sm:w-1/3 cursor-pointer focus-visible:ring-2 focus-visible:ring-petrol-600 focus-visible:ring-offset-2"
                  >
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                    <span>Wstecz</span>
                  </button>
                  <button
                    type="submit"
                    aria-disabled={sending}
                    aria-busy={sending}
                    className="btn-engineering-primary sm:w-2/3 shadow-sm cursor-pointer aria-disabled:cursor-wait aria-disabled:opacity-80 focus-visible:ring-2 focus-visible:ring-petrol-600 focus-visible:ring-offset-2"
                  >
                    {/* Without a form service nothing is sent yet: the button says what it does */}
                    {!hasFormBackend ? 'Przygotuj wiadomość e-mail' : sending ? 'Wysyłanie…' : 'Wyślij zapytanie'}
                  </button>
                </div>
                {sendError && (
                  <div role="alert" className="text-sm text-red-700 border-l-2 border-red-600 pl-3">
                    <p>
                      Nie udało się wysłać zapytania. Twoje odpowiedzi są w{' '}formularzu: spróbuj ponownie za chwilę albo{' '}
                      <a
                        href={mailtoHref(mail.subject, mail.body)}
                        onClick={() => track('Zapytanie e-mailem', { po: 'bledzie' })}
                        className="font-semibold underline underline-offset-2"
                      >
                        wyślij je e-mailem na {CONTACT_EMAIL}
                      </a>
                      .
                    </p>
                    <div className="mt-3">{copyButton}</div>
                    {copyStatus}
                  </div>
                )}
                <p className="text-sm text-gray-600">Odpowiadamy {RESPONSE_LINE}.</p>
              </form>
            </div>
          )}

          {result === 'sent' && (
            <div role="status" className="text-center py-6 animate-fade-in">
              <div className="w-14 h-14 rounded-[2px] bg-petrol-50 text-petrol-700 flex items-center justify-center mx-auto mb-4 border border-petrol-100">
                <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
              </div>
              <h2 data-step-heading tabIndex={-1} className="font-display text-2xl sm:text-3xl font-bold mb-2 text-gray-900 focus:outline-none">
                Dziękujemy. Zapytanie dotarło.
              </h2>
              <p className="text-base text-gray-600 max-w-md mx-auto mb-6 leading-relaxed">
                {form.contactBy === 'email'
                  ? `Odezwiemy się e-mailem, ${RESPONSE_LINE}. Dopytamy o szczegóły i zaproponujemy termin bezpłatnego sprawdzenia domu. Nie będziemy dzwonić.`
                  : `Odezwiemy się telefonicznie, ${RESPONSE_LINE}. Dopytamy o szczegóły i umówimy bezpłatne sprawdzenie domu.`}
              </p>
              <Link to="/" className="btn-secondary focus-visible:ring-2 focus-visible:ring-petrol-600 focus-visible:ring-offset-2">
                Wróć na stronę główną
              </Link>
            </div>
          )}

          {result === 'manual' && (
            <div role="status" className="py-2 animate-fade-in">
              <div className="w-14 h-14 rounded-[2px] bg-petrol-50 text-petrol-700 flex items-center justify-center mb-4 border border-petrol-100">
                <Mail className="w-7 h-7" aria-hidden="true" />
              </div>
              <h2 data-step-heading tabIndex={-1} className="font-display text-2xl sm:text-3xl font-bold mb-2 text-gray-900 focus:outline-none">
                Ostatni krok: wyślij nam tę wiadomość
              </h2>
              <p className="text-base text-gray-600 max-w-xl mb-6 leading-relaxed">
                Zapytanie jeszcze do nas nie dotarło. Otwórz gotową wiadomość w{' '}swojej poczcie i{' '}kliknij „Wyślij”. Jeśli
                poczta się nie otworzy, skopiuj treść i{' '}wyślij ją na <strong className="text-gray-900">{CONTACT_EMAIL}</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={mailtoHref(mail.subject, mail.body)}
                  onClick={() => track('Zapytanie e-mailem')}
                  className="btn-engineering-primary focus-visible:ring-2 focus-visible:ring-petrol-600 focus-visible:ring-offset-2"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  Otwórz wiadomość w{' '}poczcie
                </a>
                {copyButton}
              </div>
              {copyStatus}
              <pre className="mt-6 p-4 rounded-[2px] border border-gray-200 bg-gray-50 text-sm text-gray-700 whitespace-pre-wrap font-sans max-h-72 overflow-auto">
                {mail.body}
              </pre>
              <button
                type="button"
                onClick={() => setResult(null)}
                className="mt-4 inline-flex items-center gap-2 min-h-11 text-sm font-semibold text-gray-700 hover:text-gray-900 cursor-pointer focus-visible:ring-2 focus-visible:ring-petrol-600"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Wróć do formularza
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
