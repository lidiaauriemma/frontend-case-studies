# PRD: Persistenza e Gestione dello Stato Carrello
**Progetto:** `01-modia-travel-cart-logic`  
**Document Type:** Lean PRD (Product Requirement Document)  
**Versione:** 2.0 (allineata al codice reale)  
**Autore:** Technical Product Owner & Front-End Architect  
**Stato:** In Review / Pronto per Backlog  

---

## 1. Contesto & Descrizione del Problema

* **Utente coinvolto:**  
  Viaggiatore che naviga il catalogo di pacchetti viaggio e intende aggiungere una o più esperienze al carrello.
* **Problema osservabile:**  
  L'aggiunta di un pacchetto al carrello deve produrre uno stato coerente e prevedibile. In assenza di una funzione pura dedicata, le operazioni di aggiornamento rischiano mutazioni dirette dell'array, duplicazione degli articoli e stati UI inconsistenti (`idle`, `loading`, `error`, `success`).
* **Conseguenza negativa:**  
  Duplicati nel carrello, conteggi errati, impossibilità di testare il comportamento in isolamento e regressioni difficili da individuare.

---

## 2. Obiettivi di Business

### Outcome (Risultato per l'Utente)
L'utente ottiene un carrello affidabile: ogni clic su "Aggiungi al carrello" produce un aggiornamento deterministico, senza duplicati, con la quantità corretta per ogni pacchetto.

### Obiettivi Tecnici (In-Scope - v2.0)
1. Definire modelli di dominio tipizzati per pacchetto e riga carrello in `src/types/cart.types.ts`.
2. Rappresentare lo stato UI del carrello tramite unione discriminata `StatoCarrello`.
3. Implementare la logica di aggiunta come funzione pura e immutabile `aggiungiAlCarrello` in `src/cart/cart.logic.ts`.
4. Garantire copertura di unit test con Vitest in `src/test/cart.test.ts`.

### Non-Obiettivi (Out-of-Scope - v2.0+)
1. Persistenza del carrello in `localStorage` o backend.
2. Integrazione con metodi di pagamento rateali.
3. Sistema di raccomandazione automatica di viaggi correlati.
4. Gestione di coupon, sconti promozionali e regole di prezzo complesse.

---

## 3. Requisiti Funzionali

### Requisiti Funzionali (RF)
* **RF-01:** Il modello `PacchettoViaggio` deve esporre i campi `id: string`, `titolo: string`, `prezzo: number`.
* **RF-02:** Il modello `ElementoCarrello` deve associare un `PacchettoViaggio` alla relativa `quantita: number`.
* **RF-03:** Lo stato UI del carrello deve essere tipizzato con l'unione discriminata `StatoCarrello`, con i valori `status: "idle" | "loading" | "error" | "success"` e il campo `elementi: ElementoCarrello[]` su tutti i rami.
* **RF-04:** Il ramo `status: "error"` deve includere il campo obbligatorio `messaggioErrore: string`.
* **RF-05:** La funzione `aggiungiAlCarrello(elementi, pacchetto)` deve:
  1. Cercare un elemento esistente tramite `elementi.find((e) => e.pacchetto.id === pacchetto.id)`.
  2. Se presente, restituire un nuovo array tramite `elementi.map(...)` con `quantita: e.quantita + 1` (spread operator `...e`).
  3. Se assente, restituire `[...elementi, { pacchetto, quantita: 1 }]`.
* **RF-06:** La funzione non deve mai mutare l'array di input né gli oggetti in esso contenuti.

### Requisiti Non Funzionali (RNF)
* **RNF-01 (Tipizzazione):** Compilazione TypeScript in modalità `strict` con `noUncheckedIndexedAccess` ed `exactOptionalPropertyTypes`.
* **RNF-02 (Moduli):** Il progetto usa ESModules (`"type": "module"` in `package.json`) e `verbatimModuleSyntax`; gli import di soli tipi devono usare `import type`.
* **RNF-03 (Purezza):** `aggiungiAlCarrello` deve essere una funzione pura, testabile in isolamento e priva di side effect.
* **RNF-04 (Safe Navigation):** Gli accessi a valori potenzialmente `undefined` (es. `risultato[0]` in test) devono usare l'operatore `?.`.
* **RNF-05 (User-friendly Errors):** I messaggi veicolati nel ramo `error` devono essere comprensibili per l'utente, mai tecnici (cfr. `RULES.md`).

---

## 4. Architettura Tecnica

### 4.1 Modelli di Dominio — `src/types/cart.types.ts`

L'unione discriminata consente al compilatore di restringere il tipo sul campo `status` e rende impossibile accedere a `messaggioErrore` al di fuori del ramo `error`.

---

### 4.2 Logica di Business — `src/cart/cart.logic.ts`
**Vincoli implementativi:**
* Verifica preventiva tramite `find` sull'`id` del pacchetto.
* Immutabilità garantita da `map` + spread operator; nessun `push`, `splice` o assegnazione diretta.
* Nuovi inserimenti tramite spread dell'array esistente.
* Import di soli tipi con `import type`, obbligatorio per `verbatimModuleSyntax`.

### 4.3 Configurazione
* `package.json`: `"type": "module"` per ESModules; dipendenze `vitest` e `typescript`.
* `tsconfig.json`: `module: "nodenext"`, `target: "esnext"`, `strict: true`, `verbatimModuleSyntax: true`, `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`.

---

## 5. Edge Cases

| ID | Scenario | Comportamento atteso |
| :--- | :--- | :--- |
| **EC-01** | Carrello vuoto (`[]`) | Viene restituito un nuovo array con un solo `ElementoCarrello` a `quantita: 1`. |
| **EC-02** | Pacchetto già presente | La `quantita` viene incrementata di 1; la lunghezza dell'array resta invariata. |
| **EC-03** | Pacchetti con `id` differenti | Vengono mantenuti come righe distinte, ciascuna con `quantita: 1` se nuove. |
| **EC-04** | Immutabilità dell'input | L'array originale e i suoi elementi restano invariati dopo la chiamata. |
| **EC-05** | Accesso a indici potenzialmente assenti | Uso obbligatorio di `?.` (es. `risultato[0]?.quantita`) per rispettare `noUncheckedIndexedAccess`. |
| **EC-06** | Stato `error` | Deve esporre `messaggioErrore` user-friendly, senza dettagli tecnici. |

---

## 6. Strategia di Test

Suite Vitest in `src/test/cart.test.ts` (`describe`, `it`, `expect`), ambiente ESModules.

### Casi coperti
1. **Aggiunta a carrello vuoto**  
   *Given* carrello `[]`, *When* `aggiungiAlCarrello(carrello, viaggioEgitto)`, *Then* `risultato.length === 1`, `risultato[0]?.quantita === 1`, `risultato[0]?.pacchetto.id === viaggioEgitto.id` e `carrello` resta vuoto.
2. **Incremento di un pacchetto già presente**  
   *Given* carrello con `{ pacchetto: viaggioEgitto, quantita: 1 }`, *When* aggiunta dello stesso pacchetto, *Then* `risultato.length === 1`, `risultato[0]?.quantita === 2` e `carrello[0]?.quantita === 1` (nessuna mutazione).
3. **Aggiunta di due pacchetti con ID differenti**  
   *Given* carrello con `viaggioEgitto`, *When* aggiunta di `viaggioGiappone`, *Then* `risultato.length === 2`, entrambi con `quantita === 1` e array originale non mutato.

### Criteri di accettazione della suite
* Tutti i test devono passare con `npx vitest run`.
* Nessun errore di compilazione TypeScript (`npx tsc --noEmit`).
* Gli import nei test rispettano `verbatimModuleSyntax` (`import type` per i tipi).
* Gli accessi indicizzati usano `?.` per conformità a `noUncheckedIndexedAccess`.

---

## 7. Rischi e Mitigazioni

| Rischio Identificato | Segnale di Allarme | Risposta Preventiva / Soluzione |
| :--- | :--- | :--- |
| **R-01: Mutazione accidentale dell'array** | Test di immutabilità falliti. | Uso esclusivo di `map` e spread operator; nessun metodo mutativo. |
| **R-02: Duplicazione di pacchetti con lo stesso `id`** | Presenza di righe duplicate nel carrello. | Verifica preventiva con `find` prima dell'inserimento. |
| **R-03: Import di tipi a runtime** | Errori di build con `verbatimModuleSyntax`. | Uso sistematico di `import type`. |
| **R-04: Accessi non sicuri a indici** | Errori TypeScript con `noUncheckedIndexedAccess`. | Uso dell'operatore `?.` negli accessi a `risultato[0]`, `carrello[0]`. |

---

## 8. Domande Aperte (Open Questions)

| ID | Domanda da Chiarire | Responsabile | Scadenza |
| :--- | :--- | :--- | :--- |
| **DQ-01** | La persistenza su `localStorage` è prevista per una v2.0? Attualmente è fuori perimetro. | Product Owner & Lead Dev | Prima del prossimo Sprint |
| **DQ-02** | Quale strategia di gestione errori (toast vs. stato `error` del carrello) adottare per pacchetti non più disponibili? | Backend Team & UX | Entro fine Sprint Planning |
| **DQ-03** | È necessario introdurre un limite massimo di quantità per singolo pacchetto? | Product Owner | Prima della definizione dei test di integrazione |
