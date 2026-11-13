# Case Study: Check-in Rapido Motoclub & Gestione Ingressi

Un'applicazione front-end pensata per risolvere un problema concreto di gestione sul campo: velocizzare le registrazioni e i pagamenti all'ingresso di un circuito di motocross durante le giornate di prove libere.

---

## 📌 Lo scenario
All'apertura della pista si creano spesso code all'ingresso. L'operatore al botteghino deve verificare se il pilota è socio del club, se possiede una licenza sportiva attiva e calcolare la quota corretta in pochi istanti.

Questo progetto dimostra come passare da un'esigenza reale sul campo a una progettazione software solida, tracciabile e pronta per essere implementata con **TypeScript, React e Tailwind CSS**.

---

## 📂 Documentazione inclusa nel repository

Per garantire ordine e qualità nello sviluppo, il progetto è documentato prima di toccare il codice:

* 📄 **[PRD (Product Requirements Document)](docs/PRD.md)**: analisi del contesto, bisogni reali delle persone, requisiti funzionali e gestione preventiva dei rischi.
* 📋 **[Backlog e User Stories](docs/BACKLOG.md)**: le 6 funzionalità principali scritte dal punto di vista di chi usa l'app, con criteri di accettazione rigorosi (*Dato che / Quando / Allora*), casi limite gestiti e dipendenze chiare.

---

## 🎯 Punti di forza del flusso progettato

1. **Taglio verticale delle funzionalità (Story Slicing)**: ogni passaggio produce un risultato completo e verificabile a schermo.
2. **Prevenzione degli errori umani**:
   - Calcolo automatico della quota in base a categoria ed età.
   - Blocco visivo immediato se la licenza sportiva risulta scaduta.
   - Disabilitazione dei pulsanti di conferma durante il salvataggio per evitare doppi inserimenti.
3. **Flessibilità per l'utente**:
   - Pulsante "Torna indietro" sempre presente per cambiare idea o correggere un tocco errato.
   - Emissione della fattura gestita come scelta opzionale per non rallentare chi necessita solo della ricevuta standard.
   - Invio digitale dei documenti direttamente via email.

---

## 🛠️ Tecnologie previste per l'implementazione
* **TypeScript** per la tipizzazione sicura di tariffe, stati pilota e codici licenza.
* **React** per la gestione dello stato a step (wizard fluido e veloce).
* **Tailwind CSS** per un'interfaccia con pulsanti ampi, contrastati e facili da usare anche su tablet o schermi touch.