interface URl {
    API_URL_SPOTIFY : string | undefined;
    SPOTIFY_AUTH_URL: string;
    SPOTIFY_SCOPE: string;
    RESPONSE_TYPE: string;
    REDIRECT_URI: string;
  }

  const url: URl = {
      API_URL_SPOTIFY: process.env.REACT_APP_SPOTIFY_ID,
      REDIRECT_URI: "http://localhost:3000",
      SPOTIFY_AUTH_URL: 'https://accounts.spotify.com/authorize',
      SPOTIFY_SCOPE: 'playlist-modify-private user-read-private',
      RESPONSE_TYPE: 'token',
  };

// var client_id = process.env.REACT_APP_SPOTIFY_ID;
// var redirect_uri = 'http://localhost:3000';
// var scope =  'playlist-modify-private';
// var url = 'https://accounts.spotify.com/authorize';

// url += '?response_type=token';
// url += '&client_id=' + encodeURIComponent(client_id);
// url += '&scope=' + encodeURIComponent(scope);
// url += '&redirect_uri=' + encodeURIComponent(redirect_uri);

export default url;