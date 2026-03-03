export interface Silnik {
  moc_km: number;
  pojemnosc: number;
  rodzaj_paliwa: string;
}

export interface Przebieg {
  ile: number;
  czy_cofany: boolean;
}

export interface Auto {
  id: number;
  marka: string;
  model: string;
  rocznik: string;
  przebieg: Przebieg;
  silnik: Silnik;
  cena: number;
  zdjecieUrl?: string; 
}
