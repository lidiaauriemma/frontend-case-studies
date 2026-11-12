import type { PacchettoViaggio, ElementoCarrello } from "../types/cart.types.ts";

export function aggiungiAlCarrello(
  elementi: ElementoCarrello[],
  pacchetto: PacchettoViaggio,
): ElementoCarrello[] {
  // con find cerchiamo se c'è lo stesso elemento nel carrello, confrontando l'id del pacchetto
  const elementoEsistente = elementi.find(
    (e) => e.pacchetto.id === pacchetto.id,
  );

  // se l'elemento esiste gia, incrementiamo la quantità con lo spread operator
  // per creare un nuovo array con l'elemento aggiornato
  if (elementoEsistente) {
    return elementi.map((e) => {
      if (e.pacchetto.id === pacchetto.id) {
        return {
          ...e,
          quantita: e.quantita + 1,
        };
      }
      return e;
    });
  }

  // se non c'è, aggiungiamo il nuovo elemento
  return [
    ...elementi,
    {
      pacchetto,
      quantita: 1,
    },
  ];
}
