Projekt przedstawia frontend oparty na React.js z routerem i biblioteką Axios - stanowi on interfejs użytkownika, który może korzystać z opcji oferowanych przez aplikację. Komunikacja z frontendem odbywa się poprzez asynchroniczne żądania HTTP, co umożliwia dynamiczne pobieranie danych bez konieczności przeładowywania strony. Router odpowiada za nawigację między widokami, tworząc jednolitą i płynną interakcję z użytkownikiem.

![image](https://github.com/IgorIrzycki/CollectionOrganizer-Frontend-React/assets/97196620/2ddd17c1-e979-46c2-8eba-46c012f8c834)


W kontekście funkcjonalności zarządzania kolekcją przedmiotów, kluczowym aspektem projektu interfejsu było stworzenie spójnego i jednolitego wyglądu dla poszczególnych komponentów reprezentujących kategorie, zestawy oraz same przedmioty. Ważnym jest, aby użytkownik mógł łatwo identyfikować i przemieszczać się między różnymi elementami kolekcji. Poniższy rysunek przedstawia wizualizację komponentów jako interaktywne „kafelki”, które są dostępne w aplikacji.

![image](https://github.com/IgorIrzycki/CollectionOrganizer-Frontend-React/assets/97196620/55273775-2d31-4e45-978f-8f12749b160d)


## Strona główna z opcjami dla zalogowanego użytkownika:
![image](https://github.com/IgorIrzycki/CollectionOrganizer-Frontend-React/assets/97196620/a8518461-c3bc-4ddd-8333-d5b5505ce626)


## Ekran początkowy funkcji przeglądania przedmiotów:
![image](https://github.com/IgorIrzycki/CollectionOrganizer-Frontend-React/assets/97196620/d31b5db0-a83f-4227-b501-589f5ee16434)

Każdy nowo zarejestrowany użytkownik musi na początku skorzystać z omawianej funkcji, aby mógł skorzystać z większości opcji oferowanych przez system. Początkowy ekran przedstawia listę kategorii dostępnych w systemie. Po wybraniu kategorii wyświetlona zostaje lista zestawów w niej zawartych. Na górze ekranu wyświetla się informacja o tym, w jakiej kategorii znajduje się dany użytkownik.

![image](https://github.com/IgorIrzycki/CollectionOrganizer-Frontend-React/assets/97196620/d91d1db5-d16b-4b59-b9bd-c698103ca6d6)

Jeżeli użytkownik kliknie któryś z zestawów, system wyświetla wtedy listę przedmiotów zawierających się w wybranym zestawie. Dodatkowo nad listą pojawia się wyszukiwarka, która w sposób dynamiczny filtruje przedmioty według wpisanej nazwy.

![image](https://github.com/IgorIrzycki/CollectionOrganizer-Frontend-React/assets/97196620/ae146826-9c74-49c4-b032-1470da720f3d)


## Ekran przedstawiający proces porównywania zasobów kolekcji z innymi użytkownikami

![image](https://github.com/IgorIrzycki/CollectionOrganizer-Frontend-React/assets/97196620/0a0d8c34-2f45-42ab-99d7-85e87c7a8b31)

Mechanizm porównywania zasobów kolekcji może okazać się bardzo przydatny, kiedy użytkownik postanawia wymienić się przedmiotami  z inną osobą. Początkowo ekran podzielony jest na trzy strefy. Pierwsza z nich zawiera tabelę, w której widnieją posiadane przez zalogowanego użytkownika zestawy. Po wybraniu zestawu za pomocą kliknięcia przycisku „Find Users”, wewnątrz drugiej strefy wyświetla się tabela zawierająca nazwy użytkowników, którzy również posiadają dany zestaw. Kiedy użytkownik wybierze któregoś użytkownika poprzez kliknięcie przycisku „Compare”, w trzeciej strefie wyświetlona zostaje tabela porównawcza z trzema kolumnami. Pierwszą kolumnę stanowią nazwy przedmiotów zawierających się w wybranym zestawie. Druga kolumna przedstawia ilościowy stan zestawu należącego do zalogowanego użytkownika, natomiast trzecia kolumna prezentuje ilościowy stan zestawu należącego do wybranego w drugiej strefie użytkownika. Pomocna może być legenda wyświetlona nad tabelą porównawczą, która wyjaśnia, że:
•	wiersze podświetlone na czerwono oznaczają przedmioty będące w kolekcji drugiego użytkownika, ale niebędące w kolekcji zalogowanego użytkownika,
•	wiersze podświetlone na zielono oznaczają przedmioty będące w kolekcji zalogowanego użytkownika, ale niebędące w kolekcji drugiego użytkownika.
Pozostałe wiersze w tabeli oznaczają natomiast, że dany przedmiot znajduje się 
w kolekcjach obu użytkowników bądź nie znajduje się w żadnej z tych kolekcji.

Warto zauważyć przycisk znajdujący się nad legendą tabeli porównawczej, opatrzony etykietą „Make a trade offer”, kliknięcie którego spowoduje przeniesienie użytkownika do kolejnej funkcji jaką jest tworzenie oferty wymiany. 


