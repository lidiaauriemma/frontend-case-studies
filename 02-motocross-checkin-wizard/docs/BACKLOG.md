# Backlog di Prodotto — Check-in Motoclub

Questo documento organizza le singole funzionalità da sviluppare. Ogni attività è autonoma, verificabile dall'esterno e legata a un'esigenza pratica descritta nel PRD.

---

## Tabella di sintesi delle priorità

| ID | Titolo | Origine PRD | Priorità | Dipendenze | Stato |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **US-01** | Calcolo quota di ingresso standard | RF-01, O-01 | Alta | Nessuna | Pronta |
| **US-02** | Navigazione a ritroso (Pulsante Indietro) | RF-03, O-01 | Alta | US-01 | Pronta |
| **US-03** | Riepilogo dati e conferma finale | RF-04, O-01 | Alta | US-01 | Pronta |
| **US-04** | Emissione fattura su richiesta | RF-05 | Alta | US-03 | Pronta |
| **US-05** | Verifica validità licenza sportiva | RF-02, O-01 | Alta | US-01 | Pronta |
| **US-06** | Invio ricevuta o fattura via email | RF-06 | Media | US-03, US-04 | Pronta |

---

## Schede di dettaglio delle User Story

### US-01: Calcolo quota di ingresso standard
* **Origine PRD**: RF-01, O-01
* **Priorità**: Alta
* **Dipendenze**: Nessuna

> **Come** operatore agli ingressi,  
> **voglio** selezionare la categoria del pilota e indicare se è socio del club,  
> **affinché** il sistema calcoli subito il prezzo corretto senza costringermi a fare calcoli a mente o su carta.

#### Criteri di accettazione:
* **Criterio 1 — Pilota Adulto non socio (Tariffa intera)**
  * **Dato che** l'operatore si trova nella schermata iniziale di check-in
  * **Quando** seleziona la categoria "Adulto" e la voce "Non socio"
  * **Allora** il sistema mostra a schermo la quota di 30 € e abilita il pulsante per proseguire.
* **Criterio 2 — Pilota Adulto socio del club (Tariffa scontata)**
  * **Dato che** la categoria selezionata è "Adulto"
  * **Quando** l'operatore seleziona la voce "Socio del club"
  * **Allora** il totale visualizzato si aggiorna immediatamente a 25 €.

---

### US-02: Navigazione a ritroso (Pulsante Torna Indietro)
* **Origine PRD**: RF-03, O-01
* **Priorità**: Alta
* **Dipendenze**: US-01

> **Come** operatore agli ingressi,  
> **voglio** avere a disposizione un pulsante "Torna indietro" sempre visibile durante i passaggi,  
> **affinché** possa correggere un tocco involontario senza perdere i dati inseriti e senza dover ricaricare l'intera applicazione.

#### Criteri di accettazione:
* **Criterio 1 — Annullamento dell'ultima selezione**
  * **Dato che** l'operatore si trova al passaggio successivo alla scelta della categoria
  * **Quando** preme il pulsante "Torna indietro"
  * **Allora** la schermata torna al passaggio precedente, rimuove la selezione errata e azzera il conteggio provvisorio.
* **Criterio 2 — Primo passaggio del flusso (Caso limite)**
  * **Dato che** l'operatore è fermo alla primissima schermata
  * **Quando** guarda l'interfaccia
  * **Allora** il pulsante "Torna indietro" non è visibile oppure appare disattivato (in grigio).

---

### US-03: Riepilogo dati e conferma finale check-in
* **Origine PRD**: RF-04, O-01
* **Priorità**: Alta
* **Dipendenze**: US-01

> **Come** operatore agli ingressi,  
> **voglio** vedere una schermata chiara di riepilogo prima di salvare l'ingresso,  
> **affinché** possa fare un controllo visivo veloce insieme al pilota e non commettere errori di cassa.

#### Criteri di accettazione:
* **Criterio 1 — Schermata di riepilogo trasparente**
  * **Dato che** sono state selezionate categoria e quota
  * **Quando** si apre la schermata finale
  * **Allora** compaiono in evidenza: categoria pilota, quota calcolata e il pulsante "Conferma e Registra".
* **Criterio 2 — Protezione dai doppi tocchi accidentali (Caso limite)**
  * **Dato che** l'operatore è sulla schermata di riepilogo
  * **Quando** preme una volta "Conferma e Registra"
  * **Allora** il pulsante mostra subito uno stato di caricamento ("Salvataggio in corso...") e si disabilita per impedire registrazioni doppie.

---

### US-04: Gestione opzionale dell'emissione fattura
* **Origine PRD**: RF-05
* **Priorità**: Alta
* **Dipendenze**: US-03

> **Come** operatore agli ingressi,  
> **voglio** poter spuntare l'opzione "Richiedi fattura" solo se il pilota la richiede espressamente,  
> **affinché** non debba chiedere codici fiscali o partite IVA a chi vuole solo una normale ricevuta per girare in pista.

#### Criteri di accettazione:
* **Criterio 1 — Flusso standard (Ricevuta ordinaria)**
  * **Dato che** l'operatore è nel riepilogo finale
  * **Quando** la spunta "Richiedi fattura" rimane spenta
  * **Allora** non compare alcun campo fiscale aggiuntivo e l'operatore può completare subito l'ingresso.
* **Criterio 2 — Flusso con richiesta fattura**
  * **Dato che** l'operatore è nel riepilogo finale
  * **Quando** attiva la spunta "Richiedi fattura"
  * **Allora** compaiono a schermo i campi per Codice Fiscale / Partita IVA e Codice Destinatario (SDI), rendendoli obbligatori per poter confermare.

---

### US-05: Controllo validità licenza sportiva
* **Origine PRD**: RF-02, O-01
* **Priorità**: Alta
* **Dipendenze**: US-01

> **Come** operatore agli ingressi,  
> **voglio** che il sistema verifichi se la tessera o la licenza del pilota è valida per l'anno in corso,  
> **affinché** io possa far entrare solo piloti con copertura assicurativa attiva per la tutela del motoclub.

#### Criteri di accettazione:
* **Criterio 1 — Licenza in regola**
  * **Dato che** l'operatore è nella sezione di verifica pilota
  * **Quando** inserisce il codice della licenza valido
  * **Allora** compare una conferma visiva verde con la scritta "Licenza Attiva" e si sblocca il pulsante per andare al riepilogo.
* **Criterio 2 — Licenza scaduta o non trovata (Caso limite)**
  * **Dato che** l'operatore ha inserito il codice licenza
  * **Quando** il codice risulta scaduto
  * **Allora** compare un messaggio rosso di blocco ("Attenzione: Licenza scaduta o non valida") e il pulsante per proseguire resta bloccato.

---

### US-06: Invio ricevuta o fattura via email
* **Origine PRD**: RF-06
* **Priorità**: Media
* **Dipendenze**: US-03, US-04

> **Come** pilota registrato,  
> **voglio** ricevere il riepilogo dell'ingresso e il documento di pagamento sulla mia casella email,  
> **affinché** possa conservare la prova di spesa sullo smartphone senza accumulare fogli di carta che rischiano di perdersi nel paddock.

#### Criteri di accettazione:
* **Criterio 1 — Invio con indirizzo corretto**
  * **Dato che** l'operatore ha inserito un indirizzo email corretto
  * **Quando** la registrazione viene confermata con successo
  * **Allora** il sistema notifica a schermo "Documento inviato con successo a [email]".
* **Criterio 2 — Controllo formato email (Caso limite)**
  * **Dato che** l'operatore digita una mail con sintassi incompleta (es. manca la chiocciola o il dominio)
  * **Quando** tenta di procedere
  * **Allora** il campo si evidenzia con l'avviso "Inserisci un indirizzo email valido" prima di chiudere la schermata.