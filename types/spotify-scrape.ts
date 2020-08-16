export interface ArtistLocation {
  [city: string]: string;
};

export interface Cities {
  [location: string]: {
    artists: string[];
    listeners: number;
  }
}