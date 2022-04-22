import { cleanup, render, screen } from "@testing-library/react";
import Tracks from "./Tracks";

const setup = () =>
  render(
      <Tracks />
  );

  describe('Tracks components should be render', () => {
    beforeEach(setup);
    afterEach(cleanup);

    it('Tracks render Tracks component', () => {
        const imageTrack = screen.getByLabelText("image-track");
        const titleTrack = screen.getByLabelText('title-track');
        const artistTrack = screen.getByLabelText('artist-track');
        const btnTrack = screen.getByLabelText('button-track');
        
        expect(imageTrack).toBeInTheDocument();
        expect(titleTrack).toBeInTheDocument();
        expect(artistTrack).toBeInTheDocument();
        expect(btnTrack).toBeInTheDocument();
    })
  })

