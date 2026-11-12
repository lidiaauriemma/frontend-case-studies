# Modia Travel — Business Logic del Carrello & Unit Testing

Modulo dedicato alla gestione del carrello per la piattaforma **Modia Travel**, progettato con TypeScript e testato con Vitest. Il focus del progetto è l'adozione di standard architetturali moderni, l'immutabilità dello stato e la prevenzione di errori di sincronizzazione dell'interfaccia utente.

---

## 🎯 Obiettivi e Scelte Architetturali

- **Immutabilità dello Stato:** Gestione dei dati tramite funzioni pure, spread operator e metodi funzionali (`map`, `find`), eliminando qualsiasi mutazione diretta dell'array originario.
- **Prevenzione dei Duplicati:** Riconoscimento dei pacchetti viaggio già presenti nel carrello tramite identificatore univoco (`id`) e aggiornamento incrementale del campo `quantita`.
- **Type Safety Avanzata:** Configurazione conforme a standard moderni (`ESModules`, `verbatimModuleSyntax: true` e `noUncheckedIndexedAccess: true`), con tipizzazione esplicita di ogni struttura dati.
- **Unione Discriminata per la UI:** Modellazione rigorosa dello stato operativo (`idle`, `loading`, `error`, `success`) per evitare condizioni di gara, disallineamenti grafici e clic multipli in fase di elaborazione.
- **Automated Testing:** Verifica del comportamento del modulo a fronte di carrello vuoto o aggiunte ripetute tramite Vitest.

---

## 📁 Struttura del Modulo

```text
01-modia-travel-cart-logic/
├── src/
│   ├── types/cart.types.ts       # Interfacce dei dati e union discriminata StatoCarrello
│   ├── cart/cart.logic.ts        # Funzione pura di business logic (aggiungiAlCarrello)
│   └── test/cart.test.ts         # Suite di unit test con Vitest
├── prd.md                        # Specifiche funzionali e requisiti tecnici
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📄 Specifiche di Prodotto

I requisiti di business, i criteri di accettazione e la matrice degli stati applicativi sono descritti in dettaglio nel file [`prd.md`](./prd_reale_persistenza_carrello_modia.md).
