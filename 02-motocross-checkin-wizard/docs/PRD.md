# PRD — Check-in Rapido e Gestione Ingressi Pista Motocross

## 1. Perché nasce questo progetto?
Durante le giornate di apertura della pista di motocross, all'ingresso si forma spesso una fila continua di furgoni e piloti. L'operatore alla cassa deve fare tutto a mano: chiedere i dati, controllare se la persona è tesserata con il club, verificare la licenza sportiva, calcolare la tariffa corretta ed eventualmente rilasciare ricevuta o fattura.

Questo processo manuale porta a:
- Tempi di attesa lunghi sotto il sole o al freddo prima di poter entrare in pista.
- Errori occasionali nei conteggi della cassa (tariffe soci scambiate con quelle standard).
- Rischio di far entrare piloti con licenza sportiva o visita medica scaduta, con conseguenti problemi legali e assicurativi per l'associazione.

## 2. Obiettivo principale
Creare una schermata di check-in semplice, chiara e guidata (pensata sia per tablet che per computer alla cassa), che consenta all'operatore di registrare un pilota e incassare la quota corretta in meno di 60 secondi, riducendo a zero gli errori di calcolo.

---

## 3. Chi usa l'applicazione?
- **L'operatore al botteghino**: ha bisogno di pulsanti grandi, pochi passaggi lineari e risposte immediate a schermo. Non deve perdere tempo a cercare informazioni nascoste tra i menu.
- **Il pilota**: vuole entrare in pista il prima possibile, pagare la tariffa corretta per la sua categoria e ricevere il documento di spesa direttamente via email senza foglietti volanti.

---

## 4. Requisiti di base (Cosa deve fare il sistema)

| ID | Nome Requisito | Descrizione pratica |
| :--- | :--- | :--- |
| **RF-01** | Selezione categoria e quota automatica | L'operatore sceglie la tipologia di pilota (Adulto, Under 14, Donna) e lo stato di affiliazione (Socio del club o Non socio). Il totale da pagare si aggiorna subito a vista d'occhio. |
| **RF-02** | Controllo validità licenza sportiva | Inserendo il codice della tessera, l'applicazione controlla subito se la copertura assicurativa per l'anno in corso è valida. Se è scaduta, blocca l'ingresso. |
| **RF-03** | Modifica facile dell'errore (Torna indietro) | Se l'operatore preme una categoria per sbaglio, deve poter tornare indietro con un solo tocco senza perdere i dati inseriti o dover ricominciare da zero. |
| **RF-04** | Riepilogo chiaro prima della conferma | Una schermata finale di riepilogo mostra chi sta entrando, quanto deve pagare e chiede la conferma prima di chiudere la registrazione. |
| **RF-05** | Fattura solo su richiesta | Di default il sistema chiude la registrazione con ricevuta ordinaria. Solo se il pilota lo richiede espressamente, si aprono i campi fiscali (Partita IVA / Codice Fiscale). |
| **RF-06** | Invio digitale via email | A conferma avvenuta, la ricevuta o la fattura viene spedita all'indirizzo email del pilota. |

---

## 5. Rischi e come li gestiamo

1. **Rischio: Doppio clic sul pulsante di conferma**
   - *Soluzione*: Appena si tocca il pulsante "Conferma e Registra", il tasto si disabilita all'istante evitando doppi addebiti o registrazioni duplicate nel sistema.
2. **Rischio: Licenza scaduta non notata per la fretta**
   - *Soluzione*: Se la licenza non è valida, compare un avviso rosso evidente e il tasto per confermare resta disabilitato.
3. **Rischio: Errori di battitura nell'indirizzo email**
   - *Soluzione*: L'interfaccia controlla che l'email abbia un formato sensato prima di consentire l'invio.