export interface TopArtistSuccessReponse {
  href: string;
  items: TopArtist[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export interface TopArtist {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: null;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: {
    height: number;
    width: number;
    url: string;
  }[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface ApiError {
  error: {
    message: string;
    status: number;
  }
}