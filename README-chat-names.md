# Chat Names Display

Strona internetowa do wyświetlania i odczytywania imion z chatu na żywo. Aplikacja automatycznie przewija się do nowych imion i centruje je na ekranie.

## Funkcje

- ✅ **Auto-scroll** - automatyczne przewijanie do nowego imienia
- ✅ **Centrowanie** - nowe imię jest zawsze wycentrowane na ekranie
- ✅ **Ładny design** - nowoczesny interfejs z gradientami i animacjami
- ✅ **Responsywny** - działa na wszystkich urządzeniach
- ✅ **Local Storage** - zapisuje imiona w przeglądarce
- ✅ **Symulacja chatu** - możliwość testowania bez zewnętrznego API
- ✅ **Kontrola prędkości** - regulacja tempa odczytywania imion

## Jak używać

### Podstawowe użycie

1. Otwórz `chat-names.html` w przeglądarce
2. Wpisz imię w polu "Symuluj chat" i naciśnij Enter lub "Dodaj"
3. Kliknij "Start Reading" aby rozpocząć automatyczne odczytywanie
4. Użyj "Stop" aby zatrzymać odczytywanie
5. "Clear All" usuwa wszystkie imiona

### Integracja z zewnętrznym chatem

Aplikacja ma wbudowaną funkcję do importowania imion z zewnętrznego API:

```javascript
// Przykład importowania imion z API chatu
const chatData = [
    { name: "Jan" },
    { name: "Anna" },
    { name: "Piotr" }
];

window.chatApp.importNamesFromChat(chatData);
```

### Dostosowanie prędkości

```javascript
// Ustaw prędkość odczytywania (w milisekundach)
window.chatApp.setReadingSpeed(3000); // 3 sekundy na imię
```

## Wdrażanie na GitHub Pages

### Krok 1: Utwórz repozytorium

1. Przejdź na [GitHub](https://github.com)
2. Kliknij "New repository"
3. Nazwij repozytorium (np. `chat-names-display`)
4. Zaznacz "Public"
5. Kliknij "Create repository"

### Krok 2: Prześlij pliki

```bash
# Sklonuj repozytorium
git clone https://github.com/TWOJA_NAZWA_UZYTKOWNIKA/chat-names-display.git
cd chat-names-display

# Skopiuj pliki aplikacji
# - chat-names.html (zmień nazwę na index.html)
# - chat-names.css
# - chat-names.js

# Prześlij na GitHub
git add .
git commit -m "Initial commit: Chat Names Display app"
git push origin main
```

### Krok 3: Włącz GitHub Pages

1. W repozytorium przejdź do "Settings"
2. Przewiń do sekcji "Pages"
3. W "Source" wybierz "Deploy from a branch"
4. W "Branch" wybierz "main" i "/ (root)"
5. Kliknij "Save"

Twoja strona będzie dostępna pod adresem:
`https://TWOJA_NAZWA_UZYTKOWNIKA.github.io/chat-names-display`

## Struktura plików

```
chat-names-display/
├── index.html          # Główna strona (zmień nazwę z chat-names.html)
├── chat-names.css      # Style CSS
├── chat-names.js       # Logika JavaScript
└── README.md           # Ten plik
```

## Dostosowanie

### Zmiana kolorów

Edytuj plik `chat-names.css` i zmień wartości w zmiennych CSS:

```css
body {
    background: linear-gradient(135deg, #TWÓJ_KOLOR_1 0%, #TWÓJ_KOLOR_2 100%);
}
```

### Zmiana czcionki

W pliku `chat-names.html` zmień link do Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=TWÓJA_CZCIONKA:wght@300;400;600;700&display=swap" rel="stylesheet">
```

### Dodanie nowych funkcji

Aplikacja jest napisana w klasie `ChatNamesDisplay`. Możesz łatwo dodać nowe funkcje edytując plik `chat-names.js`.

## Wsparcie

- **Przeglądarki**: Chrome, Firefox, Safari, Edge (nowsze wersje)
- **Urządzenia**: Desktop, tablet, mobile
- **Wymagania**: JavaScript włączony, CSS3, HTML5

## Licencja

Wolne do użytku osobistego i komercyjnego.

---

**Uwaga**: Aby aplikacja działała poprawnie na GitHub Pages, zmień nazwę pliku `chat-names.html` na `index.html`.