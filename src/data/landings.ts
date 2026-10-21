// Landing pages for what people search in Warsaw. Plain words, no prices or model names:
// the same rules as the rest of the site (CLAUDE.md). Each one also needs a route in
// src/routes.tsx and a title and description in src/data/pages.json.

import type { FlowStep } from '../components/FlowDiagram.tsx';

export interface Landing {
  slug: string;
  badge: string;
  title: string;
  description: string;
  /** Unsplash photo id (wide screens only) */
  image: string;
  /** Query that opens the enquiry with answers already chosen, e.g. 'chce=dom&etap=gotowy' */
  query: string;
  benefitsTitle: string;
  intro: string;
  benefits: [title: string, text: string][];
  faq: [question: string, answer: string][];
  related: string[];
  /** "How it works" diagram: the devices in order, drawn in the brand style */
  flow: { title: string; steps: FlowStep[] };
}

export const LANDINGS: Record<string, Landing> = {
  'inteligentny-dom-warszawa': {
    slug: 'inteligentny-dom-warszawa',
    query: 'chce=dom',
    badge: "Inteligentny dom w Warszawie",
    title: "Inteligentny dom w Warszawie i okolicach",
    description: "Światło, rolety, ogrzewanie i ochrona przed zalaniem, które działają same, z włączników i z telefonu, także bez internetu. Do nowego domu i do gotowego mieszkania bez kucia ścian.",
    image: 'photo-1600607687939-ce8a6c25118c',
    benefitsTitle: "Co dom robi za Ciebie",
    intro: "Nie musisz znać się na technice. Mówisz, co ma się dziać w domu, a my dobieramy urządzenia i montujemy je tak, żeby działały razem.",
    benefits: [
      ["Światło", "Zwykłe włączniki zostają. Dochodzi sterowanie z telefonu i sceny, np. „Wieczór”, który jednym przyciskiem przygasza lampy w salonie."],
      ["Rolety", "Podnoszą się rano i opuszczają po zmroku. Wszystkie naraz albo pokój po pokoju."],
      ["Ogrzewanie", "Osobna temperatura w każdym pokoju i plan na cały tydzień. Gdy nikogo nie ma, dom grzeje mniej."],
      ["Woda i gaz", "Czujnik pod pralką wykrywa wyciek, a zawór sam zakręca wodę. O wszystkim dowiesz się z telefonu."],
      ["Prąd", "Widzisz w telefonie, ile prądu zużywa dom i co pobiera go najwięcej."],
      ["Wejście i brama", "Wideodomofon w telefonie, furtka otwierana twarzą, kartą albo kodem, brama i garaż z telefonu."],
    ],
    faq: [
      ["Czy dom działa bez internetu?", "Tak. Światło, rolety, ogrzewanie i czujniki działają w domu także bez internetu. Bez niego tracisz tylko podgląd domu z daleka."],
      ["Czy trzeba kuć ściany?", "W gotowym mieszkaniu zwykle nie. Małe moduły chowamy w puszkach za włącznikami. W nowym domu planujemy wszystko razem z elektryką."],
      ["Ile to kosztuje?", "To zależy od wielkości domu i tego, ile rzeczy ma działać samo. Cenę dostajesz na piśmie po bezpłatnej rozmowie i sprawdzeniu domu."],
      ["Gdzie montujecie?", "W Warszawie i miejscowościach wokół niej. Napisz, gdzie jest dom, a potwierdzimy, czy dojedziemy."],
    ],
    related: ['/systemy', '/ochrona-przed-zalaniem', '/automatyka-bez-kucia', '/scenariusze'],
    flow: {
      title: "Jak to działa w domu",
      steps: [
        { kind: 'switch', title: "Włączniki na ścianie", text: "Działają jak zawsze. Jeden przycisk może też włączyć całą scenę, np. „Wieczór”." },
        { kind: 'switchboard', title: "Moduły w rozdzielnicy", text: "Pilnują światła, rolet i ogrzewania. Działają w domu, także bez internetu." },
        { kind: 'phone', title: "Telefon, gdy chcesz", text: "Sterujesz z kanapy albo z pracy i widzisz, ile prądu zużywa dom." },
      ],
    },
  },
  'wideodomofon-i-kamery-warszawa': {
    slug: 'wideodomofon-i-kamery-warszawa',
    query: 'chce=kamery',
    badge: "Wideodomofon i kamery w Warszawie",
    title: "Wideodomofon i kamery w Warszawie i okolicach",
    description: "Widzisz, kto stoi przy furtce, i rozmawiasz z nim z telefonu. Kamery pokazują kolorowy obraz także w nocy, a nagrania zostają na dysku w domu.",
    image: 'photo-1600585154526-990dced4db0d',
    benefitsTitle: "Co dostajesz",
    intro: "Dobieramy kamery i wideodomofon do Twojego domu: ile ich potrzeba, gdzie je zamontować i jak poprowadzić kable.",
    benefits: [
      ["Gość przy furtce", "Dzwonek odbierasz na ekranie w domu albo w telefonie, nawet gdy jesteś w pracy."],
      ["Wejście bez kluczy", "Furtkę otwierasz twarzą, kartą albo kodem, a bramę i garaż z telefonu."],
      ["Obraz w nocy", "Kamery pokazują kolory także po zmroku, więc widać, kto stoi przy bramie."],
      ["Powiadomienia z sensem", "Kamera odróżnia człowieka i samochód od kota czy liści, więc telefon nie dzwoni bez powodu."],
      ["Nagrania w domu", "Obraz zapisuje się na dysku w domu. Bez abonamentu i bez opłat co miesiąc."],
      ["Kabel do każdej kamery", "Kamery łączymy kablem, który daje im też zasilanie. Obraz się nie zacina, a sprzęt stoi w jednej szafce."],
    ],
    faq: [
      ["Czy potrzebny jest abonament?", "Nie. Nagrania zapisują się na dysku w domu, a podgląd w telefonie nie wymaga opłat co miesiąc."],
      ["Czy kamery działają bez internetu?", "Tak, nagrywają na dysk w domu także bez internetu. Bez niego tracisz tylko podgląd z daleka."],
      ["Czy mogę dołożyć automatykę później?", "Tak. Możesz zacząć od wejścia i kamer, a światło czy rolety dołożyć później, bez wymiany tego, co już masz."],
      ["Ile to kosztuje?", "Zależy od liczby kamer, długości kabli i tego, co ma się dziać przy wejściu. Cenę dostajesz na piśmie po bezpłatnym sprawdzeniu domu."],
      ["Gdzie montujecie?", "W Warszawie i miejscowościach wokół niej. Napisz, gdzie jest dom, a potwierdzimy, czy dojedziemy."],
    ],
    related: ['/teletechnika', '/inteligentny-dom-warszawa', '/systemy'],
    flow: {
      title: "Od furtki do telefonu",
      steps: [
        { kind: 'gate-panel', title: "Panel przy furtce", text: "Gość dzwoni, a kamera w panelu pokazuje, kto stoi przy wejściu." },
        { kind: 'cabinet', title: "Szafka z rejestratorem", text: "Kable od kamer i panelu schodzą do jednej szafki. Nagrania zostają na dysku w domu." },
        { kind: 'screen', title: "Ekran w domu", text: "Rozmawiasz z gościem i otwierasz furtkę jednym przyciskiem." },
        { kind: 'phone', title: "Telefon poza domem", text: "Ten sam dzwonek odbierasz w aplikacji, nawet w pracy." },
      ],
    },
  },
  'ochrona-przed-zalaniem': {
    slug: 'ochrona-przed-zalaniem',
    query: 'chce=dom',
    badge: "Ochrona przed zalaniem",
    title: "Ochrona przed zalaniem: czujnik sam zakręca wodę",
    description: "Gdy czujnik wykryje wodę, zawór od razu ją zakręca, nawet gdy nikogo nie ma w domu. Dostajesz powiadomienie w telefonie.",
    image: 'photo-1584622650111-993a426fbf0a',
    benefitsTitle: "Jak to działa",
    intro: "Zalanie zwykle zaczyna się po cichu: wąż od pralki, zmywarka, kocioł. Czujnik na podłodze wyczuwa wodę wcześniej, niż ją zauważysz.",
    benefits: [
      ["Czujniki tam, gdzie może pojawić się woda", "Pod pralką, zmywarką, w łazience i przy kotle. Są małe, działają na baterie i nie potrzebują kabli."],
      ["Zawór na wejściu wody", "Napęd zakładamy na główny zawór wody. Gdy czujnik wykryje wodę, napęd sam zakręca dopływ."],
      ["Powiadomienie w telefonie", "Wiesz, gdzie i kiedy pojawiła się woda. Po usunięciu wycieku odkręcasz wodę jednym przyciskiem."],
      ["Czujnik gazu", "Przy kuchence lub kotle gazowym. Gdy wyczuje gaz, głośno piszczy, wysyła powiadomienie i może sam zakręcić zawór gazu."],
      ["Działa bez internetu", "Czujnik i zawór porozumiewają się w domu. Zawór zakręci wodę także wtedy, gdy internet nie działa."],
      ["Do gotowego mieszkania", "Zwykle bez kucia. Potrzebny jest dostęp do głównego zaworu wody: ocenimy go przy bezpłatnym sprawdzeniu domu."],
    ],
    faq: [
      ["Co się stanie, jeśli wyciek będzie w nocy?", "Zawór zakręci wodę od razu, a telefon pokaże powiadomienie. Rano zobaczysz, gdzie był wyciek."],
      ["Czy da się to zrobić w bloku?", "Tak, jeśli w mieszkaniu jest dostęp do zaworu wody, np. przy wodomierzu. Ocenimy to przy bezpłatnym sprawdzeniu domu."],
      ["Czy mogę zamówić tylko to?", "Tak. Ochronę przed zalaniem można zamówić osobno, a inne rzeczy dołożyć później. Cenę dostajesz na piśmie po bezpłatnej rozmowie i sprawdzeniu domu."],
      ["Gdzie montujecie?", "W Warszawie i miejscowościach wokół niej. Napisz, gdzie jest dom, a potwierdzimy, czy dojedziemy."],
    ],
    related: ['/inteligentny-dom-warszawa', '/automatyka-bez-kucia', '/faq'],
    flow: {
      title: "Co się dzieje, gdy pojawi się woda",
      steps: [
        { kind: 'leak-sensor', title: "Czujnik wyczuwa wodę", text: "Leży na podłodze pod pralką, zmywarką albo przy kotle." },
        { kind: 'valve', title: "Zawór zakręca wodę", text: "Napęd na głównym zaworze od razu zamyka dopływ, także bez internetu." },
        { kind: 'phone', title: "Wiesz o tym w telefonie", text: "Widzisz, gdzie był wyciek. Po naprawie odkręcasz wodę jednym przyciskiem." },
      ],
    },
  },
  'automatyka-bez-kucia': {
    slug: 'automatyka-bez-kucia',
    query: 'chce=dom&etap=gotowy',
    badge: "Mieszkanie bez kucia",
    title: "Inteligentne mieszkanie bez kucia ścian",
    description: "Masz gotowe wnętrze i nie chcesz remontu? Małe moduły chowamy za zwykłymi włącznikami, a ściany, płytki i gładzie zostają całe.",
    image: 'photo-1584622781564-1d987f7333c1',
    benefitsTitle: "Co da się zrobić bez kucia",
    intro: "Większość rzeczy montujemy w miejscach, które już są: w puszkach za włącznikami, przy grzejnikach i w skrzynce z bezpiecznikami.",
    benefits: [
      ["Światło", "Moduł mieści się w puszce za włącznikiem. Włącznik zostaje ten sam, a dochodzi sterowanie z telefonu i sceny."],
      ["Rolety", "Jeśli rolety mają silniki, podłączamy je bez nowych kabli. Sterujesz nimi z włącznika, z telefonu i według pory dnia."],
      ["Grzejniki", "Zamiast zwykłych pokręteł zakładamy głowice, które same pilnują temperatury w każdym pokoju."],
      ["Czujniki", "Czujniki zalania i ruchu działają na baterie, więc nie potrzebują kabli."],
      ["Wideodomofon", "Często da się go podłączyć do kabla po starym domofonie."],
      ["Krok po kroku", "Możesz zacząć od kilku pokoi, a kolejne dołożyć później. Nic nie trzeba wymieniać."],
    ],
    faq: [
      ["Czy zwykłe włączniki dalej działają?", "Tak. Domownicy włączają światło jak dawniej, a telefon jest dodatkiem."],
      ["Czy po montażu zostaje bałagan?", "Nie kujemy ścian, więc nie ma pyłu z bruzd. Pracujemy przy włącznikach, grzejnikach i w skrzynce z bezpiecznikami."],
      ["Czy to działa bez internetu?", "Tak. Włączniki, harmonogramy i czujniki działają w domu. Bez internetu tracisz tylko sterowanie z daleka."],
      ["Ile trwa montaż?", "Zależy od liczby pokoi i urządzeń. Termin dostajesz na piśmie razem z planem i ceną."],
    ],
    related: ['/systemy', '/ochrona-przed-zalaniem', '/faq'],
    flow: {
      title: "Co montujemy, nie ruszając ścian",
      steps: [
        { kind: 'switch', title: "Moduł za włącznikiem", text: "Chowamy go w puszce za zwykłym włącznikiem. Włącznik zostaje ten sam." },
        { kind: 'leak-sensor', title: "Czujniki na baterie", text: "Czujniki zalania i ruchu stawiamy tam, gdzie trzeba, bez kabli." },
        { kind: 'phone', title: "Sterowanie z telefonu", text: "Światło, rolety i ogrzewanie z telefonu i według pory dnia." },
      ],
    },
  },
};

// Labels for links to other pages from a landing
export const PAGE_LABELS: Record<string, string> = {
  '/systemy': "Inteligentny dom: światło, rolety i ogrzewanie",
  '/teletechnika': "Kamery i wideodomofon",
  '/scenariusze': "Co dom robi za Ciebie",
  '/faq': "Pytania i odpowiedzi",
  '/inteligentny-dom-warszawa': "Inteligentny dom w Warszawie i okolicach",
  '/wideodomofon-i-kamery-warszawa': "Wideodomofon i kamery w Warszawie i okolicach",
  '/ochrona-przed-zalaniem': "Ochrona przed zalaniem: czujnik sam zakręca wodę",
  '/automatyka-bez-kucia': "Inteligentne mieszkanie bez kucia ścian",
};
