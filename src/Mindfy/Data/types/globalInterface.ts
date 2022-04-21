export interface Track {
    album: Album;
    artists: Artist[];
    available_markets?: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ExternalIDS;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string | null;
    track_number: number;
    type: string;
    uri: string;
  }

  export interface ExternalUrls {
    spotify: string;
  }
  
  export interface ExternalIDS {
    isrc: string;
  }

  export interface Image {
    height: number | null;
    url: string;
    width: number | null;
  }

  export interface Artist {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }
  
  export interface Album {
    album_type: string;
    artists: Artist[];
    available_markets?: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string | Date;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  }


  export interface User {
    country: string;
    display_name: string;
    email: string;
    explicit_content: ExplicitContent;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images: Image[];
    product: string;
    type: string;
    uri: string;
  }

  export interface ExplicitContent {
    filter_enabled: boolean;
    filter_locked: boolean;
  }
  export interface Followers {
    href: string;
    total: number;
  }