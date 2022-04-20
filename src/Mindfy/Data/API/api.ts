import axios from 'axios';
const SPOTIFY_APP_URL = 'https://api.spotify.com/v1';

export const searchTrack = async (query: string, accessToken: string) => {
  const requestOptions = {
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.get(
    `${SPOTIFY_APP_URL}/search?type=track&q=${query}`,
    requestOptions
  );
  return response.data;
};

export const getUserProfile = async (accessToken: string) => {
  const requestOptions = {
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.get(`${SPOTIFY_APP_URL}/me`, requestOptions);

  return response.data;
};

export const createPlaylist = async (
  accessToken: string,
  userId: string,
  { name, description } : {name: string, description: string}
) => {
  const data = JSON.stringify({
    name,
    description,
    public: false,
    collaborative: false,
  });

  const requestOptions = {
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.post(
    `${SPOTIFY_APP_URL}/users/${userId}/playlists`,
    data,
    requestOptions
  );
  return response.data;
};

export const addTracksPlaylist = async (accessToken: string, playlistId: string, uris: string[]) => {
  const data = JSON.stringify({
    uris,
  });

  const requestOptions = {
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(
    `${SPOTIFY_APP_URL}/playlists/${playlistId}/tracks`,
    data,
    requestOptions
  );

  return response.data;
};
