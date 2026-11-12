import { describe, it, expect } from "vitest";
import { aggiungiAlCarrello } from "../cart/cart.logic.js";
import type {
  ElementoCarrello,
  PacchettoViaggio,
} from "../types/cart.types.ts";

describe("Gestione del carrello", () => {
  const viaggioEgitto: PacchettoViaggio = {
    id: "egitto-1",
    titolo: "Tour Piramidi",
    prezzo: 300,
  };

  const viaggioGiappone: PacchettoViaggio = {
    id: "giappone-1",
    titolo: "Tour Kyoto",
    prezzo: 1200,
  };

  it("dovrebbe aggiungere un pacchetto a un carrello vuoto", () => {
    const carrello: ElementoCarrello[] = [];

    const risultato = aggiungiAlCarrello(carrello, viaggioEgitto);

    expect(risultato.length).toBe(1);
    expect(risultato[0]?.quantita).toBe(1);
    expect(risultato[0]?.pacchetto.id).toBe(viaggioEgitto.id);
    expect(carrello).toHaveLength(0);
  });

  it("dovrebbe incrementare la quantità di un pacchetto già presente", () => {
    const carrello: ElementoCarrello[] = [
      { pacchetto: viaggioEgitto, quantita: 1 },
    ];

    const risultato = aggiungiAlCarrello(carrello, viaggioEgitto);

    expect(risultato.length).toBe(1);
    expect(risultato[0]?.quantita).toBe(2);
    expect(carrello[0]?.quantita).toBe(1);
  });

  it("dovrebbe aggiungere due pacchetti con ID differenti", () => {
    const carrello: ElementoCarrello[] = [];

    const conEgitto = aggiungiAlCarrello(carrello, viaggioEgitto);
    const risultato = aggiungiAlCarrello(conEgitto, viaggioGiappone);

    expect(risultato.length).toBe(2);

    const egitto = risultato.find((e) => e.pacchetto.id === viaggioEgitto.id);
    const giappone = risultato.find(
      (e) => e.pacchetto.id === viaggioGiappone.id,
    );

    expect(egitto?.quantita).toBe(1);
    expect(giappone?.quantita).toBe(1);
    expect(carrello).toHaveLength(0);
  });
});
