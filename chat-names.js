class ChatNamesDisplay {
    constructor() {
        this.names = [];
        this.currentIndex = 0;
        this.isReading = false;
        this.readingInterval = null;
        this.readingSpeed = 2000; // 2 sekundy na imię
        
        this.initializeElements();
        this.bindEvents();
        this.loadNamesFromStorage();
    }

    initializeElements() {
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.chatInput = document.getElementById('chatInput');
        this.addNameBtn = document.getElementById('addNameBtn');
        this.namesContainer = document.getElementById('namesContainer');
        this.currentNameDisplay = document.getElementById('currentName');
    }

    bindEvents() {
        this.startBtn.addEventListener('click', () => this.startReading());
        this.stopBtn.addEventListener('click', () => this.stopReading());
        this.clearBtn.addEventListener('click', () => this.clearAll());
        this.addNameBtn.addEventListener('click', () => this.addName());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addName();
            }
        });
    }

    addName() {
        const name = this.chatInput.value.trim();
        if (name) {
            const nameData = {
                name: name,
                timestamp: new Date().toLocaleTimeString('pl-PL'),
                id: Date.now()
            };
            
            this.names.push(nameData);
            this.saveNamesToStorage();
            this.displayNames();
            this.chatInput.value = '';
            
            // Auto-scroll do nowego imienia
            this.scrollToName(nameData.id);
            
            // Jeśli czytanie jest aktywne, zatrzymaj i uruchom ponownie
            if (this.isReading) {
                this.stopReading();
                setTimeout(() => this.startReading(), 500);
            }
        }
    }

    startReading() {
        if (this.names.length === 0) {
            alert('Brak imion do odczytania!');
            return;
        }

        this.isReading = true;
        this.startBtn.disabled = true;
        this.stopBtn.disabled = false;
        
        // Rozpocznij od pierwszego imienia
        this.currentIndex = 0;
        this.readNextName();
        
        this.readingInterval = setInterval(() => {
            this.currentIndex++;
            if (this.currentIndex >= this.names.length) {
                this.currentIndex = 0; // Powtórz od początku
            }
            this.readNextName();
        }, this.readingSpeed);
    }

    stopReading() {
        this.isReading = false;
        this.startBtn.disabled = false;
        this.stopBtn.disabled = true;
        
        if (this.readingInterval) {
            clearInterval(this.readingInterval);
            this.readingInterval = null;
        }
        
        // Usuń aktywne podświetlenie
        this.removeActiveHighlight();
        this.currentNameDisplay.innerHTML = '<span>Oczekiwanie na imiona...</span>';
    }

    readNextName() {
        if (this.names.length === 0) return;
        
        const nameData = this.names[this.currentIndex];
        
        // Aktualizuj wyświetlanie aktualnego imienia
        this.currentNameDisplay.innerHTML = `<span>${nameData.name}</span>`;
        this.currentNameDisplay.classList.add('highlight');
        
        // Usuń poprzednie aktywne podświetlenie
        this.removeActiveHighlight();
        
        // Dodaj aktywne podświetlenie do aktualnego imienia
        const nameElement = document.querySelector(`[data-id="${nameData.id}"]`);
        if (nameElement) {
            nameElement.classList.add('active');
            
            // Auto-scroll do aktywnego imienia
            this.scrollToName(nameData.id);
        }
        
        // Usuń highlight po animacji
        setTimeout(() => {
            this.currentNameDisplay.classList.remove('highlight');
        }, 1000);
    }

    removeActiveHighlight() {
        const activeElements = document.querySelectorAll('.name-item.active');
        activeElements.forEach(el => el.classList.remove('active'));
    }

    scrollToName(nameId) {
        const nameElement = document.querySelector(`[data-id="${nameId}"]`);
        if (nameElement) {
            const container = document.querySelector('.names-display');
            const elementTop = nameElement.offsetTop;
            const containerTop = container.scrollTop;
            const containerHeight = container.clientHeight;
            const elementHeight = nameElement.clientHeight;
            
            // Oblicz pozycję do wycentrowania elementu
            const scrollTo = elementTop - containerTop - (containerHeight / 2) + (elementHeight / 2);
            
            container.scrollTo({
                top: scrollTo,
                behavior: 'smooth'
            });
        }
    }

    displayNames() {
        if (this.names.length === 0) {
            this.namesContainer.innerHTML = `
                <div class="welcome-message">
                    <h2>Witaj!</h2>
                    <p>Dodaj imiona aby rozpocząć odczytywanie</p>
                </div>
            `;
            return;
        }

        this.namesContainer.innerHTML = this.names.map(nameData => `
            <div class="name-item" data-id="${nameData.id}">
                <div class="name">${this.escapeHtml(nameData.name)}</div>
                <div class="timestamp">${nameData.timestamp}</div>
            </div>
        `).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    clearAll() {
        if (confirm('Czy na pewno chcesz usunąć wszystkie imiona?')) {
            this.names = [];
            this.saveNamesToStorage();
            this.displayNames();
            this.stopReading();
            this.currentNameDisplay.innerHTML = '<span>Oczekiwanie na imiona...</span>';
        }
    }

    saveNamesToStorage() {
        localStorage.setItem('chatNames', JSON.stringify(this.names));
    }

    loadNamesFromStorage() {
        const savedNames = localStorage.getItem('chatNames');
        if (savedNames) {
            try {
                this.names = JSON.parse(savedNames);
                this.displayNames();
            } catch (e) {
                console.error('Błąd podczas ładowania zapisanych imion:', e);
                this.names = [];
            }
        }
    }

    // Funkcja do importowania imion z zewnętrznego źródła (np. API chatu)
    importNamesFromChat(chatData) {
        if (Array.isArray(chatData)) {
            chatData.forEach(chatMessage => {
                if (chatMessage.name && typeof chatMessage.name === 'string') {
                    const nameData = {
                        name: chatMessage.name.trim(),
                        timestamp: new Date().toLocaleTimeString('pl-PL'),
                        id: Date.now() + Math.random()
                    };
                    
                    this.names.push(nameData);
                }
            });
            
            this.saveNamesToStorage();
            this.displayNames();
            
            // Auto-scroll do ostatniego imienia
            if (this.names.length > 0) {
                this.scrollToName(this.names[this.names.length - 1].id);
            }
        }
    }

    // Funkcja do ustawienia prędkości odczytywania
    setReadingSpeed(speedMs) {
        this.readingSpeed = speedMs;
        if (this.isReading) {
            this.stopReading();
            setTimeout(() => this.startReading(), 100);
        }
    }

    // Funkcja do eksportowania imion
    exportNames() {
        const dataStr = JSON.stringify(this.names, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'chat-names.json';
        link.click();
        URL.revokeObjectURL(url);
    }
}

// Inicjalizacja aplikacji
document.addEventListener('DOMContentLoaded', () => {
    const app = new ChatNamesDisplay();
    
    // Dodaj dodatkowe funkcje do globalnego scope (dla łatwego testowania)
    window.chatApp = app;
    
    // Przykład użycia z zewnętrznym API (można dostosować)
    // app.importNamesFromChat([
    //     { name: "Jan" },
    //     { name: "Anna" },
    //     { name: "Piotr" }
    // ]);
    
    console.log('Chat Names Display zainicjalizowany!');
    console.log('Użyj window.chatApp do testowania funkcji');
});