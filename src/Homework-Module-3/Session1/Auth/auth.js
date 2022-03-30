var client_id = '9cf84f79755f46bab22ab96acb78db0f';
var redirect_uri = 'http://localhost:3000/callback';


var scope = 'playlist-modify-private';

var url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);

export default url