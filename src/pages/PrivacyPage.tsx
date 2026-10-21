import React from 'react';
import { PageHeader } from '../components/PageHeader.tsx';
import { SITE } from '../config/site.ts';
import { analyticsEnabled } from '../lib/analytics.ts';
import { formProviderName, hasFormBackend } from '../lib/leads.ts';

const UPDATED = '21 października 2026';

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mt-10 font-display text-xl sm:text-2xl font-bold text-gray-900">{children}</h2>
);

const mailLink = (
  <a href={`mailto:${SITE.email}`} className="font-semibold text-petrol-700 underline underline-offset-2">
    {SITE.email}
  </a>
);

// Privacy policy and the rules of the enquiry form, at their own address (ads and
// search engines need one). Company details come from src/config/site.json.
// Legal bases follow RODO; the consent to be contacted follows art. 398 of Prawo
// komunikacji elektronicznej. Have a lawyer confirm changes (docs/launch-checklist.md).
export const PrivacyPage: React.FC = () => {
  const { legal } = SITE;
  const controller = legal.companyName || SITE.name;
  const controllerDetails = [legal.address, legal.nip && `NIP ${legal.nip}`, legal.regon && `REGON ${legal.regon}`, legal.krs && `KRS ${legal.krs}`].filter(Boolean);

  return (
    <div className="bg-gray-50 text-gray-900">
      <PageHeader
        compact
        badge="Polityka prywatności"
        title="Polityka prywatności"
        description="Jakie dane zbieramy przez formularz, po co, jak długo je przechowujemy i jakie masz prawa. Bez prawniczego żargonu tam, gdzie się da."
      />

      <article className="py-12 lg:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-base leading-relaxed text-gray-700 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1.5">
          <p className="!mt-0 text-sm text-gray-600">Ostatnia zmiana: {UPDATED}</p>

          <H2>1. Kto odpowiada za Twoje dane</H2>
          <p>
            Administratorem Twoich danych osobowych i usługodawcą w rozumieniu ustawy o świadczeniu usług drogą elektroniczną jest{' '}
            <strong className="text-gray-900">{controller}</strong>
            {controllerDetails.length > 0 && <>, {controllerDetails.join(', ')}</>}. W sprawach danych osobowych napisz na {mailLink}.
          </p>

          <H2>2. Jakie dane zbieramy</H2>
          <p>Z formularza zapytania tylko te dane, które sam wpiszesz lub zaznaczysz:</p>
          <ul>
            <li>imię i nazwisko, telefon, e-mail i miejscowość,</li>
            <li>odpowiedzi o domu: co Cię interesuje, etap budowy lub wykończenia, metraż i planowany termin montażu,</li>
            <li>wiadomość, jeśli ją dopiszesz, i to, czy wolisz kontakt telefoniczny, czy tylko e-mail,</li>
            <li>treść zgody na kontakt, którą zaznaczasz w formularzu,</li>
            <li>
              skąd trafiłeś do formularza: pierwsza i ostatnia odwiedzona podstrona, nazwa witryny, z której przyszedłeś (np. google.com), i nazwa kampanii z linku, jeśli link ją zawiera.
            </li>
          </ul>
          <p>Jeśli napiszesz do nas bezpośrednio na {mailLink}, przetwarzamy też Twój adres e-mail i treść wiadomości.</p>
          <p>
            Przy każdym wejściu na stronę przeglądarka przesyła też dane techniczne: adres IP, datę i godzinę, adres odwiedzanej podstrony oraz informacje o przeglądarce i urządzeniu.
            Otrzymują je firmy wymienione w punktach 4 i 7.
          </p>
          <p>W wiadomości nie podawaj informacji o zdrowiu ani innych szczególnie chronionych danych. Nie są nam potrzebne.</p>

          <H2>3. Po co i na jakiej podstawie</H2>
          <ul>
            <li>
              Żeby odpowiedzieć na zapytanie, sprawdzić, czy dom jest w okolicy, w której pracujemy, porozmawiać o Twoim domu, umówić bezpłatne sprawdzenie domu i przygotować
              propozycję. To działania podejmowane na Twoje żądanie przed zawarciem umowy (art. 6 ust. 1 lit. b RODO). Jeśli zawrzemy umowę, na tej samej podstawie ją wykonujemy.
            </li>
            <li>
              Żeby kontaktować się z Tobą tylko w wybrany przez Ciebie sposób (telefonicznie i e-mailem albo tylko e-mailem) i przedstawić Ci propozycję: na podstawie Twojej zgody
              na taki kontakt, zaznaczonej w formularzu (art. 398 ustawy Prawo komunikacji elektronicznej). Zgodę możesz w każdej chwili wycofać, pisząc na {SITE.email}. Wycofanie
              zgody nie wpływa na zgodność z prawem kontaktu sprzed jej wycofania.
            </li>
            <li>
              Żeby przechowywać korespondencję po zakończeniu rozmów i w razie potrzeby wykazać jej przebieg albo bronić się przed roszczeniami, chronić stronę i formularz przed
              nadużyciami (logi serwera, filtr spamu), liczyć odwiedziny oraz sprawdzać, z których stron i kampanii przychodzą zapytania: na podstawie naszego prawnie
              uzasadnionego interesu (art. 6 ust. 1 lit. f RODO).
            </li>
            <li>Jeśli zawrzemy umowę: żeby wystawić fakturę i przechowywać dokumenty księgowe, czego wymagają przepisy podatkowe (art. 6 ust. 1 lit. c RODO).</li>
          </ul>
          <p>Nie wysyłamy newsletterów, nie sprzedajemy danych i nie przekazujemy ich firmom marketingowym. Nie podejmujemy decyzji automatycznie ani nie profilujemy.</p>

          <H2>4. Kto jeszcze może mieć dostęp do danych</H2>
          <p>
            Dane przekazujemy tylko firmom, które technicznie obsługują stronę, formularz i pocztę. Przetwarzają je na nasze zlecenie, według naszych poleceń i na podstawie umowy
            powierzenia przetwarzania danych:
          </p>
          <ul>
            <li>Vercel Inc. (USA): hosting strony, w tym logi serwera z adresem IP,</li>
            <li>dostawca naszej poczty e-mail,</li>
            {hasFormBackend && <li>{formProviderName}: przesyła formularz na naszą skrzynkę e-mail,</li>}
            {analyticsEnabled && <li>Plausible Insights OÜ (Estonia, UE): statystyki odwiedzin,</li>}
            <li>biuro rachunkowe, jeśli zawrzemy umowę.</li>
          </ul>
          <p>
            Niektóre z tych firm, np. Vercel, mogą przetwarzać dane w USA. Podstawą przekazania jest decyzja Komisji Europejskiej o odpowiednim stopniu ochrony danych w ramach EU-U.S.
            Data Privacy Framework (ramy ochrony danych UE–USA), jeśli dana firma w nich uczestniczy, albo standardowe klauzule umowne przyjęte przez Komisję Europejską. Kopię tych
            zabezpieczeń możesz otrzymać, pisząc na {SITE.email}.
          </p>

          <H2>5. Jak długo przechowujemy dane</H2>
          <p>
            Dane z zapytania i korespondencji przechowujemy przez czas rozmów o Twoim domu. Jeśli nie zawrzemy umowy, usuwamy je najpóźniej 12 miesięcy po ostatnim kontakcie, także
            ze skrzynki e-mail i z panelu dostawcy formularza. Jeśli zawrzemy umowę, przechowujemy je przez czas jej wykonywania, a potem do upływu terminów przedawnienia roszczeń z umowy, a dokumenty księgowe przez 5 lat, licząc od końca roku, w którym minął termin płatności podatku. Jeśli wycofasz zgodę na kontakt, przestaniemy się z Tobą
            kontaktować, ale zapytanie możemy przechowywać do końca tych okresów. Logi serwera przechowuje dostawca hostingu przez krótki czas potrzebny do zapewnienia
            bezpieczeństwa strony.
          </p>

          <H2>6. Twoje prawa</H2>
          <p>Masz prawo:</p>
          <ul>
            <li>dostępu do swoich danych i otrzymania ich kopii,</li>
            <li>sprostowania, usunięcia lub ograniczenia przetwarzania,</li>
            <li>przeniesienia danych, które nam podałeś, gdy przetwarzamy je w celu zawarcia lub wykonania umowy,</li>
            <li>wycofania zgody na kontakt w dowolnym momencie (bez wpływu na zgodność z prawem wcześniejszego kontaktu),</li>
            <li>skargi do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa).</li>
          </ul>
          <p>
            <strong className="text-gray-900">Prawo sprzeciwu.</strong> W każdej chwili możesz wnieść sprzeciw wobec przetwarzania Twoich danych na podstawie naszego prawnie
            uzasadnionego interesu (art. 6 ust. 1 lit. f RODO), z przyczyn związanych z Twoją szczególną sytuacją. Wtedy przestaniemy je przetwarzać, chyba że wykażemy ważne prawnie
            uzasadnione podstawy albo dane są nam potrzebne do ustalenia, dochodzenia lub obrony roszczeń.
          </p>
          <p>
            Podanie danych jest dobrowolne. Bez imienia, miejscowości oraz numeru telefonu albo adresu e-mail (zależnie od wybranego sposobu kontaktu) nie będziemy mogli odpowiedzieć
            na zapytanie.
          </p>

          <H2>7. Przeglądarka, cookies i statystyki</H2>
          <p>
            Strona nie używa cookies i nie zapisuje niczego w Twojej przeglądarce. Odpowiedzi z zapytania pamięta tylko do odświeżenia strony.
            {analyticsEnabled
              ? ' Odwiedziny liczymy narzędziem Plausible, na podstawie naszego prawnie uzasadnionego interesu (art. 6 ust. 1 lit. f RODO). Plausible nie używa cookies, nie zapisuje adresu IP i nie tworzy profili odwiedzających. Widzimy tylko zbiorcze liczby, np. ile osób weszło na stronę i skąd przyszły.'
              : ' Nie prowadzimy statystyk odwiedzin.'}
          </p>
          <p>
            Czcionki ładujemy z naszego serwera. Część zdjęć wnętrz ładuje się z serwerów serwisu Unsplash (images.unsplash.com). Unsplash otrzymuje wtedy adres IP Twojej
            przeglądarki i adres naszej strony i przetwarza je jako odrębny administrator, na własnych zasadach. Korzystamy z tego na podstawie naszego prawnie uzasadnionego interesu,
            czyli szybkiego wyświetlania zdjęć (art. 6 ust. 1 lit. f RODO). Zdjęcia mają charakter poglądowy: nie przedstawiają domów naszych klientów.
          </p>

          <H2>8. Kamery, które montujemy</H2>
          <p>
            Kamery i wideodomofony, które montujemy, nagrywają na dysk w Twoim domu. Nie przechowujemy Twoich nagrań. Gdy oglądasz obraz w telefonie poza domem, połączenie z rejestratorem może przechodzić przez serwery producenta aplikacji, na zasadach opisanych przez producenta. Jeśli kamera obejmuje teren poza Twoją posesją, np. chodnik albo
            ulicę, nagrania mogą podlegać przepisom o ochronie danych. Przy montażu pomożemy ustawić kamery tak, żeby obejmowały tylko Twoją posesję.
          </p>

          <H2>9. Regulamin formularza zapytania</H2>
          <ul>
            <li>
              Usługodawcą jest firma wskazana w punkcie 1. Przez stronę świadczymy drogą elektroniczną jedną usługę: formularz zapytania, którym możesz poprosić o kontakt i propozycję
              dla swojego domu. Usługa jest bezpłatna.
            </li>
            <li>Do korzystania z formularza potrzebne jest urządzenie z dostępem do internetu i aktualna przeglądarka z włączonym JavaScriptem.</li>
            <li>Umowa o korzystanie z formularza zostaje zawarta, gdy zaczynasz go wypełniać, i kończy się z chwilą wysłania zapytania albo opuszczenia strony.</li>
            <li>Nie wpisuj w formularzu treści o charakterze bezprawnym ani danych innych osób bez ich zgody.</li>
            <li>
              Zapytanie wysłane przez stronę nie jest zamówieniem ani ofertą w rozumieniu art. 66 Kodeksu cywilnego. Zakres, cenę i termin potwierdzamy na piśmie po rozmowie i sprawdzeniu domu.
            </li>
            <li>
              Korzystanie z internetu wiąże się z typowymi zagrożeniami, np. złośliwym oprogramowaniem albo podszywaniem się pod nadawcę wiadomości. Nigdy nie prosimy o hasła ani dane
              kart płatniczych.
            </li>
            <li>Reklamacje dotyczące działania formularza wyślij na {SITE.email}. Odpowiemy w ciągu 14 dni.</li>
          </ul>
        </div>
      </article>
    </div>
  );
};
