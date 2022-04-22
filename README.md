# Mindfy - Create Playlist

This is my final project submission for GenerasiGigih.

<p align="center">
  <img src="/public/img/preview.png" alt='preview'>
</p>

<p align="center">
Mindfy create spotify playlist app. 
</p>

[Live preview.](https://mindfy.vercel.app/)

## About
Mindfy is a web application to create playlists based on the songs you want to choose, Mindfy also implements the Spotify API and connects to your spotify account to search, create and add tracks to your account playlists.

## Features
- Login with your spotify account
- Search your recommended tracks
- Create playlist
- Add tracks to your playlist
- See your playlist
- See your account
- Your done create playlist

## Built Using

- [Create React App](https://create-react-app.dev/) to initialize the project.
- [Jest](https://jestjs.io/) & [react testing-library](https://testing-library.com/) for testing.
- [Axios](https://github.com/axios/axios) for making API calls.
- [React redux](https://react-redux.js.org/) for state management.
- Written in [typescript](https://typescriptlang.org).
- [Hosted on Vercel](https://vercel.com/).

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_REDIRECT_URI` used for grant flow callback.

`REACT_APP_SPOTIFY_ID` your spotify developer client id.

see [.env.example](/.env.example)


## Getting Started

First you can clone the project

```bash
  git clone https://github.com/mind-meister/Mindfy
```

Go to the project directory

```bash
  cd Mindfy
```

Install dependencies

```bash
  npm
```

Start the server (but you need to [setup .env](#environment-variables) first)

```bash
  npm start
```

Open http://localhost:3000 with your browser to see the result.
