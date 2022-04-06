var client_id = process.env.REACT_APP_SPOTIFY_ID;
var redirect_uri = 'http://localhost:3000';


var url = 'https://accounts.spotify.com/authorize';
var scope =  ['playlist-modify-private','playlist-read-private'];

url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);

export default url