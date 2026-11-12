export interface PacchettoViaggio {
  id: string;
  titolo: string;
  prezzo: number;
}

export interface ElementoCarrello {
  pacchetto: PacchettoViaggio;
  quantita: number;
}

// union descriminata per rappresentare lo stato del carrello
export type StatoCarrello =
  | {
      status: "idle";
      elementi: ElementoCarrello[];
    }
  | {
      status: "loading";
      elementi: ElementoCarrello[];
    }
  | {
      status: "error";
      elementi: ElementoCarrello[];
      messaggioErrore: string;
    }
  | {
      status: "success";
      elementi: ElementoCarrello[];
    };
