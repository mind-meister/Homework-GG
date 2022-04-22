import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../../Redux/Store/store';
import {rest} from "msw"
import {setupServer} from "msw/node"
import Home from './Home';



const SPOTIFY_APP_URL = 'https://api.spotify.com/v1';

export const server = setupServer(
  rest.get(`${SPOTIFY_APP_URL}/search`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        tracks: {
          items: [
            {
              id: '1',
              album: {
                images: [
                  {
                    url: 'Images URL',
                  },
                ],
              },
              name: 'Track Title',
              artists: [
                {
                  name: 'Track Artist',
                },
              ],
              external_urls: {
                spotify: 'Spotify URL',
              },
              uri: 'Track Uri',
            },
          ],
        },
      })
    );
  })
);

const setup = () =>
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );

describe('Create Playlist should be render', () => {
  beforeEach(setup);
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    cleanup();
  });
  afterAll(() => server.close());

  it('Should render tracks after search', async () => {
    const buttonSearch = screen.getByLabelText('search-button');

    userEvent.click(buttonSearch);

    await screen.findByText('Playlist Title');
    expect(screen.getByText('Playlist Title')).toBeInTheDocument();
  });

  it('Should render track items after search', async () => {
    const searchInput = screen.getByLabelText('search-input');
    const buttonSearch = screen.getByLabelText('search-button');

    userEvent.type(searchInput, 'justin');
    userEvent.click(buttonSearch);

    await screen.findByText(/playlist title/i);
  });
});
