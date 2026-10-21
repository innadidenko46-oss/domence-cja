import { LifeScenario, TeletechnicService, FaqItem, Capability, CameraProduct } from '../types.ts';

// Copy rules (CLAUDE.md): plain words, no model numbers or protocols, only what the company
// installs. Photos are Unsplash ids (src/components/Photo.tsx), never shown as our projects.

/** Light, blinds, heating, sensors and control: /systemy */
export const CAPABILITIES: Capability[] = [
  {
    id: 'cap-lighting',
    title: 'Światło nastrojowe i ściemnianie',
    badge: 'Światło',
    description:
      'Każdą lampę możesz przyciemnić tak, jak lubisz, a światło zmienia barwę w ciągu dnia: rano jest jaśniejsze, wieczorem cieplejsze.',
    inSwitchboard: 'Moduły montujemy w rozdzielnicy i łączymy kablem. To najpewniejsze rozwiązanie do nowego domu.',
    behindSwitches: 'Małe moduły chowamy za zwykłymi włącznikami. Działa z lampami, które już masz, bez kucia ścian.',
    example: 'Rano światło powoli się rozjaśnia. W nocy przy podłodze zapala się delikatne, ciepłe światło, które nie rozbudza.',
    features: [
      'Płynne ściemnianie od bardzo słabego do pełnego światła',
      'Ciepła barwa wieczorem, jaśniejsza w ciągu dnia',
      'Sceny na kolację, czytanie i film',
      'Światło bez męczącego migotania',
    ],
  },
  {
    id: 'cap-blinds',
    title: 'Rolety i żaluzje, które same wiedzą, kiedy się zamknąć',
    badge: 'Rolety i żaluzje',
    description:
      'Rolety i żaluzje ustawiają się według pory dnia: rano wpuszczają światło, w upalne popołudnie chronią pokój przed nagrzaniem, o zmierzchu dają prywatność.',
    inSwitchboard: 'Moduły w rozdzielnicy wyczuwają, gdy coś blokuje roletę, i od razu ją zatrzymują.',
    behindSwitches: 'Moduły za zwykłymi włącznikami rolet. Działa z roletami z silnikami, które już masz.',
    example: 'Rano żaluzje powoli się uchylają. O zmierzchu rolety same się zamykają.',
    features: [
      'Ustawianie według pory dnia i godziny zachodu słońca',
      'Ochrona pokoju przed upałem',
      'Zamykanie o zmierzchu i po wyjściu z domu',
      'Zatrzymanie rolety, gdy coś ją blokuje',
    ],
  },
  {
    id: 'cap-climate',
    title: 'Osobna temperatura w każdym pokoju',
    badge: 'Ogrzewanie',
    description:
      'W sypialni chłodniej do snu, w łazience cieplej rano. Ogrzewanie podłogowe i grzejniki trzymają temperaturę ustawioną dla każdego pokoju.',
    inSwitchboard: 'Przy ogrzewaniu podłogowym moduły sterują każdą pętlą osobno, prosto z szafki rozdzielacza.',
    behindSwitches: 'Na grzejnikach montujemy głowice, a w pokojach małe czujniki temperatury. Bez kucia.',
    example: 'W sypialni na noc jest 18,5°C, a w łazience rano 23°C. Gdy otwierasz okno, grzejnik w tym pokoju sam się wyłącza.',
    features: [
      'Osobna temperatura w każdym pokoju',
      'Ogrzewanie podłogowe bez przegrzewania',
      'Wyłączenie grzania przy otwartym oknie',
      'Podgląd temperatury i wilgotności w telefonie',
    ],
  },
  {
    id: 'cap-sensors',
    title: 'Czujniki ruchu: światło zapala się, gdy wchodzisz',
    badge: 'Czujniki',
    description:
      'Małe czujniki ruchu zapalają światło, gdy wchodzisz do korytarza, łazienki czy garderoby, i gaszą je, gdy wychodzisz. Mierzą też jasność, więc w dzień światło się nie włącza.',
    inSwitchboard: 'Czujniki działają w domu, bez internetu, i reagują od razu.',
    behindSwitches: 'Czujniki na baterie montujemy w kilka minut, bez kucia ścian. Bateria wystarcza na długo.',
    example: 'Wstajesz w nocy do łazienki: światło przy podłodze zapala się samo, a po chwili gaśnie.',
    features: [
      'Światło zapala się, gdy wchodzisz, i gaśnie, gdy wychodzisz',
      'Pomiar jasności: w dzień czujnik nie włącza światła',
      'Czujniki w oknach: widzisz w telefonie, co jest otwarte',
      'Montaż bez kucia ścian',
    ],
  },
  {
    id: 'cap-interface',
    title: 'Panel na ścianie, zwykły włącznik albo telefon',
    badge: 'Sterowanie',
    description:
      'Jeden panel na ścianie może zastąpić rząd włączników, termostat i sterowanie roletami. Zwykłe włączniki dalej działają jak zawsze.',
    inSwitchboard: 'Szklany panel dotykowy pokazuje temperaturę i steruje światłem oraz roletami.',
    behindSwitches: 'Moduły działają z włącznikami, które wybierze architekt. Nie musisz zmieniać osprzętu.',
    example: 'Przy wejściu do pokoju naciskasz jeden klawisz „Relaks”: światło przygasa, a rolety się zamykają.',
    features: [
      'Panel dotykowy na ścianie',
      'Działa z włącznikami, które już masz',
      'Sterowanie z panelu, włącznika albo telefonu',
      'Aplikacja dla wszystkich domowników, bez opłat',
    ],
  },
];

/** Cameras, intercom panels and access: /teletechnika */
export const CAMERA_PRODUCTS: CameraProduct[] = [
  {
    id: 'cam-color',
    name: 'Kamera z kolorowym obrazem w nocy',
    category: 'cctv_color',
    tagline: 'Kolorowy, ostry obraz przez całą noc, zamiast szarego ziarna',
    bestUse: 'Elewacja, drzwi wejściowe, wjazd',
    highlights: [
      'Kolorowy obraz o zmierzchu i w nocy',
      'Po wykryciu człowieka kamera sama włącza miękkie światło',
      'Ostry obraz, który zajmuje mniej miejsca na dysku',
      'Metalowa obudowa odporna na deszcz i mróz',
    ],
  },
  {
    id: 'cam-deter',
    name: 'Kamera, która reaguje światłem i komunikatem',
    category: 'cctv_deter',
    tagline: 'Odróżnia ludzi i auta od zwierząt. Gdy ktoś podchodzi nocą, włącza światło i odtwarza komunikat.',
    bestUse: 'Wejście do domu, brama wjazdowa i garaż',
    highlights: [
      'Odróżnia ludzi i auta od zwierząt, gałęzi i deszczu',
      'Nocą włącza światło i odtwarza komunikat, gdy ktoś podchodzi',
      'Rozmowa przez kamerę prosto z telefonu',
      'Powiadomienie ze zdjęciem na telefon',
    ],
  },
  {
    id: 'cam-wide',
    name: 'Kamera z szerokim widokiem i zoomem',
    category: 'cctv_wide',
    tagline: 'Widzisz całe podwórko, a drugi obiektyw sam przybliża idącą osobę',
    bestUse: 'Teren wokół domu, podjazd i brama',
    highlights: [
      'Jeden obiektyw stale widzi cały teren przed domem',
      'Drugi sam przybliża i śledzi idącą osobę',
      'Jedna kamera zamiast kilku zwykłych',
    ],
  },
  {
    id: 'intercom-panel',
    name: 'Panel przy furtce z kamerą',
    category: 'intercom_panel',
    tagline: 'Kamera, klawiatura na kod i czytnik breloków w jednym panelu ze stali albo aluminium',
    bestUse: 'Furtka i brama wjazdowa',
    highlights: [
      'Szeroka kamera widzi całą osobę przed furtką i paczkę na ziemi',
      'Furtkę otwierasz kodem, brelokiem albo z telefonu',
      'Otwiera też bramę wjazdową',
      'Odporny na deszcz i mróz',
    ],
  },
  {
    id: 'intercom-face',
    name: 'Otwieranie twarzą',
    category: 'intercom_face',
    tagline: 'Furtka albo drzwi otwierają się, gdy czytnik rozpozna domownika',
    bestUse: 'Furtka i drzwi wejściowe',
    highlights: [
      'Wchodzisz z zakupami bez szukania kluczy',
      'Czytnika nie oszukasz zdjęciem ani filmem',
      'Działa po ciemku i w pełnym słońcu',
      'Jednorazowy kod dla gościa lub kuriera',
    ],
  },
  {
    id: 'intercom-screen',
    name: 'Ekran w domu',
    category: 'intercom_screen',
    tagline: 'Dotykowy ekran na ścianie do rozmów z furtką i podglądu kamer',
    bestUse: 'Hol, kuchnia albo salon',
    highlights: [
      'Odbierasz domofon i otwierasz furtkę',
      'Podgląd na żywo ze wszystkich kamer',
      'Rozmowy między pokojami, np. kuchnia z piętrem',
      'Jeden kabel do zasilania i obrazu',
    ],
  },
];

export const TELETECHNIC_SERVICES: TeletechnicService[] = [
  {
    id: 'cctv',
    title: 'Kamery wokół domu z kolorowym obrazem w nocy',
    subtitle: 'Powiadomienia tylko wtedy, gdy trzeba',
    icon: 'Camera',
    description:
      'Kamery pokazują kolorowy obraz w nocy i odróżniają ludzi i auta od zwierząt. Nocą mogą włączyć światło, gdy ktoś podchodzi. Nagrania zostają w domu.',
    humanExplanation:
      'Kamera nagrywa w nocy obraz w kolorze i odróżnia człowieka czy auto od kota albo gałęzi, więc telefon nie dzwoni bez powodu. Nagrania zapisują się na dysku w szafce w domu, bez abonamentu.',
    equipment: [
      'Kamery na elewację, odporne na deszcz i mróz',
      'Rejestrator z dyskiem, który nagrywa przez całą dobę',
      'Jeden kabel do każdej kamery: idzie nim i obraz, i zasilanie',
      'Bezpłatna aplikacja do podglądu w telefonie',
    ],
  },
  {
    id: 'access',
    title: 'Wideodomofon i wejście twarzą, kartą albo kodem',
    subtitle: 'Rozmowa z furtki w telefonie, furtka i brama bez kluczy',
    icon: 'KeyRound',
    description:
      'Panel przy furtce, ekran w domu i aplikacja w telefonie. Furtkę otwierasz twarzą, kartą, kodem albo z telefonu, a bramę i garaż jednym przyciskiem.',
    humanExplanation:
      'Gdy dzwoni kurier, odbierasz rozmowę wideo w telefonie, otwierasz furtkę i widzisz, jak zostawia paczkę. Domownicy wchodzą bez szukania kluczy.',
    equipment: [
      'Panel przy furtce z kamerą, która widzi szeroko także pod słońce',
      'Czytnik twarzy, którego nie oszuka zdjęcie',
      'Ekran dotykowy w domu',
      'Elektrozaczep w furtce, otwierany z panelu, telefonu i czytnika',
    ],
  },
  {
    id: 'network',
    title: 'Kable i szafka na sprzęt',
    subtitle: 'Pewne połączenie dla kamer, wideodomofonu i automatyki',
    icon: 'Network',
    description:
      'Do kamer i wideodomofonu prowadzimy kable, a moduły automatyki łączymy z Twoją domową siecią. Rejestrator i sprzęt stoją w jednej uporządkowanej szafce. Internet zostaje u Twojego operatora.',
    humanExplanation:
      'Kamery i moduły mają pewne połączenie, więc obraz się nie zacina, a światło reaguje od razu. Każdy kabel jest opisany, więc łatwo coś później dołożyć.',
    equipment: [
      'Szafka na sprzęt z wentylacją, w której każdy kabel jest opisany',
      'Osobny kabel do każdej kamery i panelu przy furtce',
      'Osobna sieć dla kamer i automatyki, oddzielona od domowych komputerów',
      'Rejestrator nagrań w szafce, w domu',
    ],
  },
];

export const SCENARIOS: LifeScenario[] = [
  {
    id: 'sc-masteroff',
    number: '01',
    title: 'Wyjście z domu: „wyłącz wszystko”',
    tag: 'Codziennie',
    trigger: 'Przycisk przy drzwiach albo w telefonie',
    description:
      'Jeden przycisk przy drzwiach gasi wszystkie światła, odcina prąd w wybranych gniazdkach, np. tym od żelazka, opuszcza rolety i przełącza ogrzewanie w tryb oszczędny.',
    humanNote: 'Nie musisz wracać z połowy drogi, żeby sprawdzić żelazko. Naciskasz przycisk i wiesz, że dom jest wyłączony.',
    detailPoints: ['Wszystkie światła gasną', 'Wybrane gniazdka przestają dostawać prąd', 'Rolety się opuszczają', 'Ogrzewanie przechodzi w tryb oszczędny'],
    actionSteps: [
      { icon: 'Power', label: 'Gniazdka', detail: 'Żelazko bez prądu' },
      { icon: 'LightbulbOff', label: 'Światła', detail: 'Gasną w całym domu' },
      { icon: 'SlidersHorizontal', label: 'Rolety', detail: 'Opuszczają się' },
      { icon: 'Thermometer', label: 'Ogrzewanie', detail: 'Tryb oszczędny' },
    ],
    image: 'photo-1600607687939-ce8a6c25118c',
    icon: 'LogOut',
  },
  {
    id: 'sc-water',
    number: '02',
    title: 'Ochrona przed zalaniem',
    tag: 'Woda',
    trigger: 'Czujnik pod pralką, zmywarką albo przy kotle wykryje wodę',
    description:
      'Gdy pęknie wężyk pod umywalką, czujnik wykrywa wodę, a napęd na głównym zaworze od razu ją zakręca. W telefonie widzisz, gdzie był wyciek.',
    humanNote: 'Zalanie kończy się na kałuży, a nie na zniszczonej podłodze i suficie sąsiada. Także gdy śpisz albo jesteś na wakacjach.',
    detailPoints: [
      'Działa w domu, także bez internetu',
      'Powiadomienie w telefonie, gdzie jest wyciek',
      'Po usunięciu wycieku odkręcasz wodę jednym przyciskiem',
      'Czujnik gazu przy kuchence może tak samo zakręcić gaz',
    ],
    actionSteps: [
      { icon: 'Droplets', label: 'Czujnik', detail: 'Wykrywa wodę na podłodze' },
      { icon: 'ShieldCheck', label: 'Zawór', detail: 'Zakręca wodę od razu' },
      { icon: 'Phone', label: 'Telefon', detail: 'Pokazuje, gdzie jest wyciek' },
    ],
    image: 'photo-1584622650111-993a426fbf0a',
    icon: 'Droplets',
  },
  {
    id: 'sc-sunrise',
    number: '03',
    title: 'Łagodne budzenie',
    tag: 'Poranek',
    trigger: 'Godzina, którą ustawisz',
    description:
      'Przed budzikiem rolety powoli się podnoszą, a światło w sypialni stopniowo się rozjaśnia, jak o świcie. W łazience jest już ciepło.',
    humanNote: 'Budzisz się łagodniej, bo światło narasta powoli. Wchodzisz do ciepłej łazienki.',
    detailPoints: ['Rolety podnoszą się stopniowo', 'Światło w sypialni powoli się rozjaśnia', 'Łazienka dogrzewa się, zanim wstaniesz', 'W kuchni zapala się światło nad blatem'],
    actionSteps: [
      { icon: 'SunMedium', label: 'Światło', detail: 'Powoli się rozjaśnia' },
      { icon: 'SlidersHorizontal', label: 'Rolety', detail: 'Podnoszą się stopniowo' },
      { icon: 'Flame', label: 'Łazienka', detail: 'Ciepło, zanim wstaniesz' },
    ],
    image: 'photo-1507652313519-d4e9174996dd',
    icon: 'Sun',
  },
  {
    id: 'sc-courier',
    number: '04',
    title: 'Kurier przy furtce',
    tag: 'Wejście',
    trigger: 'Ktoś dzwoni do furtki',
    description: 'Dzwonek z furtki odbierasz w telefonie jako rozmowę wideo. Rozmawiasz z kurierem, otwierasz mu furtkę i widzisz, jak zostawia paczkę.',
    humanNote: 'Nie musisz prosić sąsiada o odbiór przesyłki. Otwierasz furtkę z daleka, a nagranie wizyty zostaje na dysku w domu.',
    detailPoints: ['Rozmowa z gościem w obie strony', 'Kody tymczasowe dla kuriera albo ekipy', 'Nagranie wizyty na dysku w domu', 'Światło przed furtką zapala się samo po zmroku'],
    actionSteps: [
      { icon: 'Video', label: 'Obraz', detail: 'Furtka na żywo w telefonie' },
      { icon: 'KeyRound', label: 'Otwarcie', detail: 'Jedno dotknięcie otwiera furtkę' },
      { icon: 'HardDrive', label: 'Nagranie', detail: 'Zostaje w domu, bez abonamentu' },
    ],
    image: 'photo-1600566753190-17f0baa2a6c3',
    icon: 'Video',
  },
  {
    id: 'sc-film',
    number: '05',
    title: 'Wieczór filmowy',
    tag: 'Wieczór',
    trigger: 'Przycisk „Film” przy kanapie albo w telefonie',
    description:
      'Rolety zjeżdżają do końca, lampy gasną i zostaje tylko delikatne światło przy podłodze.',
    humanNote: 'Nie chodzisz od okna do okna i od włącznika do włącznika. Jeden przycisk i możesz oglądać.',
    detailPoints: [
      'Rolety zasłaniają okna, więc na ekranie nie ma odblasków',
      'Delikatne światło przy podłodze, żeby bezpiecznie przejść do kuchni',
      'Po filmie ten sam przycisk przywraca zwykłe światło',
    ],
    actionSteps: [
      { icon: 'SlidersHorizontal', label: 'Rolety', detail: 'Zasłaniają okna do końca' },
      { icon: 'Sun', label: 'Światło', detail: 'Zostaje tylko przy podłodze' },
    ],
    image: 'photo-1513694203232-719a280e022f',
    icon: 'Tv',
  },
  {
    id: 'sc-sleep',
    number: '06',
    title: 'Spokojny sen',
    tag: 'Noc',
    trigger: 'Wstajesz w nocy z łóżka',
    description:
      'Gdy wstajesz w nocy, czujnik ruchu przy łóżku zapala słabe, ciepłe światło przy podłodze. Widzisz drogę do łazienki, a ostre światło Cię nie oślepia.',
    humanNote: 'Nie szukasz włącznika po omacku i nie mrużysz oczu przed ostrym światłem. Gdy wrócisz do łóżka, światło samo gaśnie.',
    detailPoints: ['Słabe, ciepłe światło, które nie razi oczu', 'Światło gaśnie samo, gdy wrócisz do łóżka', 'Działa tylko w godzinach, które ustawisz', 'Na noc ogrzewanie w sypialni obniża temperaturę'],
    actionSteps: [
      { icon: 'Moon', label: 'Światło przy podłodze', detail: 'Słabe i ciepłe, nie razi' },
      { icon: 'Thermometer', label: 'Sypialnia', detail: 'Ogrzewanie obniżone na noc' },
    ],
    image: 'photo-1617104678098-de229db51175',
    icon: 'Moon',
  },
  {
    id: 'sc-dinner',
    number: '07',
    title: 'Przytulna kolacja',
    tag: 'Wieczór',
    trigger: 'Przycisk w jadalni albo w telefonie',
    description: 'Lampy pod sufitem gasną, nad stołem zostaje ciepłe, przygaszone światło, a rolety się zamykają.',
    humanNote: 'Jeden przycisk zmienia salon w miejsce na spokojną kolację. Bez chodzenia od włącznika do włącznika.',
    detailPoints: ['Ciepłe, przygaszone światło nad stołem', 'Rolety w salonie i kuchni się zamykają', 'Delikatne podświetlenie blatów w kuchni', 'Ogrzewanie w jadalni trzyma przyjemne ciepło'],
    actionSteps: [
      { icon: 'Sun', label: 'Nad stołem', detail: 'Ciepłe, przygaszone światło' },
      { icon: 'SlidersHorizontal', label: 'Rolety', detail: 'Zamykają się' },
      { icon: 'Lightbulb', label: 'Blaty', detail: 'Delikatne podświetlenie' },
    ],
    image: 'photo-1584622781564-1d987f7333c1',
    icon: 'Sparkles',
  },
  {
    id: 'sc-vacation',
    number: '08',
    title: 'Wyjazd na urlop: dom wygląda na zamieszkały',
    tag: 'Wyjazd',
    trigger: 'Włączasz w aplikacji przed wyjazdem',
    description:
      'Wieczorami światła w kilku pokojach zapalają się i gasną o różnych porach, jakby ktoś był w domu. Woda jest zakręcona, a kamery przy wejściu wysyłają powiadomienia.',
    humanNote: 'Odpoczywasz spokojniej. Z ulicy widać światła w oknach, woda jest zakręcona, a obraz z kamer masz w telefonie.',
    detailPoints: [
      'Światła zapalają się w różnych pokojach o różnych porach',
      'Główny zawór wody zostaje zakręcony',
      'Ogrzewanie przechodzi w tryb oszczędny, ale dom się nie wychładza',
      'Kamery przy wejściu wysyłają powiadomienie, gdy pojawi się człowiek',
    ],
    actionSteps: [
      { icon: 'Lightbulb', label: 'Światła', detail: 'Jakby ktoś był w domu' },
      { icon: 'Droplets', label: 'Woda', detail: 'Zakręcona na czas wyjazdu' },
      { icon: 'Video', label: 'Kamery', detail: 'Powiadomią, gdy ktoś podejdzie' },
    ],
    image: 'photo-1600585154340-be6161a56a0c',
    icon: 'Plane',
  },
];

export const WORKFLOW_STEPS = [
  {
    number: '01',
    title: 'Zapytanie o Twój dom',
    desc: 'Zaznaczasz, co Cię interesuje i kiedy planujesz montaż, i zostawiasz kontakt. Odezwiemy się telefonicznie albo e-mailem, jak wolisz.',
  },
  {
    number: '02',
    title: 'Bezpłatne sprawdzenie domu',
    desc: 'Inżynier ogląda rozdzielnicę, puszki i przewody, żeby zaplanować montaż bez niespodzianek.',
  },
  {
    number: '03',
    title: 'Plan i cena na piśmie',
    desc: 'Lista urządzeń, cena i termin montażu. Wiesz, co i za ile montujemy, zanim zaczniemy.',
  },
  {
    number: '04',
    title: 'Czysty montaż',
    desc: 'Wiercimy z odsysaniem pyłu, zabezpieczamy podłogi i opisujemy obwody w rozdzielnicy.',
  },
  {
    number: '05',
    title: 'Konfiguracja i nauka obsługi',
    desc: 'Bezpłatnie ustawiamy sceny i aplikacje pod Twój dom i uczymy domowników obsługi.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'dzialanie',
    onHome: true,
    question: 'Czy dom działa, gdy zabraknie internetu?',
    simpleAnswer:
      'Tak. Włączniki, rolety, ogrzewanie, czujniki zalania i kamery działają w domu bez internetu. Bez niego tracisz tylko podgląd domu z daleka i powiadomienia poza domem.',
    technicalDetails:
      'Moduły rozmawiają ze sobą przez domową sieć (router), nie przez serwer w internecie. Dlatego harmonogramy, sceny i czujniki działają dalej, gdy internet zniknie.',
  },
  {
    category: 'koszty',
    onHome: true,
    question: 'Ile to kosztuje?',
    simpleAnswer:
      'To zależy od wielkości domu i tego, ile rzeczy ma działać samo. Cenę dostajesz na piśmie po bezpłatnej rozmowie i sprawdzeniu domu, zanim cokolwiek zamówisz.',
    technicalDetails:
      'Na cenę wpływa liczba sterowanych lamp, rolet, grzejników i kamer, to, czy dom jest w budowie, i co już masz. Rolety z silnikami czy działające lampy często wykorzystujemy bez wymiany.',
  },
  {
    category: 'remont',
    onHome: true,
    question: 'Mam już wykończone mieszkanie. Czy trzeba kuć ściany?',
    simpleAnswer:
      'Zwykle nie. W gotowym mieszkaniu małe moduły chowamy w puszkach za włącznikami, a czujniki działają na baterie. Wiercimy z odsysaniem pyłu, więc kurzu jest bardzo mało.',
    technicalDetails:
      'Moduły mają wielkość pudełka zapałek i mieszczą się za zwykłym włącznikiem. Jeśli w puszce brakuje jednego przewodu, dokładamy mały element, dzięki któremu żarówki LED nie migają. Napęd zakręcający wodę zakładamy na istniejący zawór.',
  },
  {
    category: 'dzialanie',
    onHome: true,
    question: 'Jesteście nową firmą. Co, jeśli kiedyś Was zabraknie?',
    simpleAnswer:
      'Dom działa dalej jak zwykle: włączniki na ścianach działają zawsze, a moduły w rozdzielnicy mają czytelny opis, więc inny elektryk szybko zobaczy, co jest czym.',
    technicalDetails:
      'Montujemy urządzenia popularnych producentów, np. Shelly i Hikvision, dostępne w polskich sklepach. Zna je wielu instalatorów, więc rozbudowę albo wymianę modułu może zrobić także inna firma.',
  },
  {
    category: 'remont',
    question: 'Buduję dom. Kiedy najlepiej się odezwać?',
    simpleAnswer:
      'Najlepiej, zanim zamkniesz ściany, czyli przed tynkami. Wtedy kable do kamer, wideodomofonu i modułów da się poprowadzić bez kucia. Później też się da, ale część rzeczy zrobimy wtedy bezprzewodowo.',
    technicalDetails:
      'Moduły do nowego domu montujemy w rozdzielnicy, więc warto zostawić w niej miejsce, zanim zostanie zamówiona. Podpowiemy to przy bezpłatnym sprawdzeniu domu.',
  },
  {
    category: 'koszty',
    question: 'Czy trzeba płacić abonament?',
    simpleAnswer:
      'Nie. Aplikacje do sterowania domem i podglądu kamer są bezpłatne, a nagrania zapisują się na dysku w domu, nie w płatnej chmurze.',
    technicalDetails: 'Płacisz raz, za urządzenia i montaż według planu na piśmie. Nie ma miesięcznych opłat za zapis nagrań ani za sterowanie z telefonu.',
  },
  {
    category: 'bezpieczenstwo',
    question: 'Czy nagrania z kamer i wideodomofonu są bezpieczne?',
    simpleAnswer:
      'Nagrania z kamer i wideodomofonu zapisują się na dysku w rejestratorze w szafce na sprzęt, nie w chmurze.',
    technicalDetails:
      'Kamery podłączamy do osobnej sieci, oddzielonej od domowych komputerów i telefonów. Podgląd w aplikacji jest szyfrowany, a logowanie zabezpieczamy dodatkowym kodem.',
  },
  {
    category: 'dzialanie',
    question: 'Czy obsługa nie będzie za trudna dla dzieci albo starszych rodziców?',
    simpleAnswer:
      'Nie. Włączniki na ścianach działają tak samo jak w zwykłym domu: wciskasz klawisz i światło się zapala. Aplikacja to wygodny dodatek dla chętnych.',
    technicalDetails: 'Każde światło i każdą roletę da się obsłużyć zwykłym włącznikiem na ścianie. Jeśli moduł przestanie działać, włącznik dalej robi to, co zawsze.',
  },
  {
    category: 'bezpieczenstwo',
    question: 'Czy moduły w rozdzielnicy są bezpieczne?',
    simpleAnswer:
      'Tak. Montujemy moduły z oznaczeniem CE, które same wyłączają obwód przy przegrzaniu lub przeciążeniu, a każdy obwód ma też zwykły bezpiecznik.',
    technicalDetails: 'Moduły w rozdzielnicy mają wbudowany czujnik temperatury i same się wyłączają, gdy za bardzo się nagrzeją.',
  },
  {
    category: 'dzialanie',
    question: 'Co się stanie, gdy zabraknie prądu?',
    simpleAnswer:
      'Bez prądu nie działa nic, co jest zasilane z sieci, także automatyka. Gdy prąd wraca, system sam uruchamia się w kilka sekund, bez udziału domowników.',
    technicalDetails:
      'Dla każdego modułu ustawiamy, czy po powrocie prądu ma zostać wyłączony, czy wrócić do ostatniego stanu. Dzięki temu po nocnej przerwie w dostawie prądu światła nie zapalą się same.',
  },
  {
    category: 'koszty',
    question: 'Czy inteligentny dom obniża rachunki?',
    simpleAnswer:
      'Najwięcej daje osobne ogrzewanie każdego pokoju: dom grzeje mniej w nocy i tam, gdzie nikogo nie ma. Pomagają też rolety, które latem zatrzymują słońce. Ile zaoszczędzisz, zależy od domu i przyzwyczajeń.',
    technicalDetails: 'W telefonie widzisz, ile prądu zużywa dom i co pobiera go najwięcej. Rolety od strony słońca mogą opuszczać się same o ustalonej porze.',
  },
  {
    category: 'remont',
    question: 'Czy mogę zacząć od kilku rzeczy, a resztę dodać później?',
    simpleAnswer:
      'Tak. Możesz zacząć na przykład od świateł i rolet, a kamery, wideodomofon czy kolejne pokoje dodać później. Planujemy instalację tak, żeby dało się ją rozbudować bez kucia od nowa.',
    technicalDetails:
      'Nowe urządzenia łączą się z tymi, które już masz, i działają w tych samych scenach i w tej samej aplikacji. Przy pierwszym montażu zostawiamy miejsce w rozdzielnicy i w szafce na sprzęt.',
  },
  {
    category: 'remont',
    question: 'Ile trwa montaż?',
    simpleAnswer: 'To zależy od zakresu prac. Termin podajemy na piśmie razem z planem i ceną, zanim zaczniemy.',
    technicalDetails: 'Na czas montażu wpływa wielkość domu, liczba pomieszczeń i to, czy dom jest w budowie, czy już wykończony i umeblowany.',
  },
  {
    category: 'dzialanie',
    question: 'Co dostaję po montażu?',
    simpleAnswer: 'Uczymy domowników obsługi i bezpłatnie konfigurujemy system pod Twój dom: sceny, harmonogramy i aplikacje w telefonach.',
    technicalDetails: 'Sprawdzamy, czy każdy domownik umie zapalić światło, otworzyć furtkę i podejrzeć obraz z kamer.',
  },
];

/** Four everyday examples on the home page */
export const EVERYDAY_SCENARIOS = [
  {
    id: 'airing',
    icon: 'Wind',
    title: 'Wietrzenie bez strat ciepła',
    subtitle: 'Czujnik okna i głowica na grzejniku',
    humanNote: 'Otwierasz okno w sypialni, a grzejnik sam się zakręca. Zamykasz okno i ciepło wraca. Nie grzejesz ulicy.',
    image: 'photo-1617104678098-de229db51175',
  },
  {
    id: 'leak',
    icon: 'Droplets',
    title: 'Ochrona przed zalaniem i gazem',
    subtitle: 'Czujniki zalania i gazu, zawór na wodzie',
    humanNote: 'Pęknięty wężyk pralki nie zaleje parkietu ani sąsiada, także gdy jesteś w pracy albo na wakacjach. Gdy czujnik wyczuje gaz, zawór może sam go zakręcić.',
    image: 'photo-1600566752355-35792bedcfea',
  },
  {
    id: 'solar',
    icon: 'Zap',
    title: 'Prąd ze słońca zostaje w domu',
    subtitle: 'Licznik prądu i panele na dachu',
    humanNote: 'Gdy panele dają więcej prądu, niż zużywasz, dom sam grzeje nim wodę w bojlerze. Mniej prądu oddajesz do sieci.',
    image: 'photo-1509391366360-2e959784a276',
  },
  {
    id: 'gate',
    icon: 'Car',
    title: 'Brama otwiera się przed Twoim autem',
    subtitle: 'Kamera przy bramie, brama i światło na podjeździe',
    humanNote: 'Nie szukasz pilota po ciemku. Kamera przy bramie rozpoznaje tablicę Twojego auta, brama sama się otwiera, a na podjeździe zapala się światło.',
    image: 'photo-1600566753190-17f0baa2a6c3',
  },
];
