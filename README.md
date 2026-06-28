# RegexRiddle

Piattaforma web basata su sfide logiche e testuali con espressioni regolari. Gli utenti registrati possono creare enigmi e provare a risolvere quelli pubblicati dagli altri.

***

## Requisiti

- **Node.js** >= 18
- **npm** >= 9

***

## Struttura del progetto

```
RegexRiddle/
├── backend/      # API REST (Express + Sequelize + SQLite)
└── frontend/     # Single Page Application (Angular 21)
```

***

## Avvio del Backend

```bash
cd backend
npm install
```

Crea il file `.env` nella cartella `backend/` con il seguente contenuto:

```env
PORT=3000
JWT_SECRET=una_chiave_segreta_qualsiasi
```

Avvia il server:

```bash
npm run dev
```

Il backend sarà disponibile su `http://localhost:3000`.

> Il database SQLite viene creato automaticamente al primo avvio. Non è necessaria alcuna configurazione aggiuntiva.

***

## Avvio del Frontend

Apri un secondo terminale:

```bash
cd frontend
npm install
npm start
```

Il frontend sarà disponibile su `http://localhost:4200`.

> Il frontend usa un proxy configurato in `proxy.conf.json` per redirezionare le chiamate API verso `http://localhost:3000`. Assicurati che il backend sia già in esecuzione prima di aprire l'applicazione.

***

## Test End-to-End

I test E2E sono scritti con **Playwright** e si trovano nella cartella `frontend/tests/`.

```bash
cd frontend
npx playwright install   # solo la prima volta
npx playwright test
```

> Assicurati che sia backend che frontend siano in esecuzione prima di eseguire i test.

***

## Funzionalità principali

- Registrazione e login con autenticazione JWT
- Gestione del profilo utente con avatar
- Creazione di sfide regex con stringhe di controllo positive e negative (segrete)
- Risoluzione di sfide con verifica automatica della regex proposta
- Blocco: l'autore non può risolvere la propria sfida
- Blocco: lo stesso utente non può risolvere più volte la stessa sfida
- Classifica basata sul numero di enigmi risolti e sul numero medio di tentativi
- Statistiche personali

***

## Credenziali di esempio

Puoi registrare un nuovo account direttamente dall'applicazione tramite la pagina di registrazione.
