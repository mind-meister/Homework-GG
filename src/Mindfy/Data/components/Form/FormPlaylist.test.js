import { cleanup, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import FormPlaylist from "./FormPlaylist"
import store from "../../Redux/Store/store"
import userEvent from "@testing-library/user-event"


const setup = () =>
    render(
        <Provider store={store}>
            <FormPlaylist />
        </Provider>
    )

    describe('Form Playlist should be render', () => {
        beforeEach(setup);
        afterEach(cleanup);

        it('Success render Form Create Playlist', () => {
            expect(screen.getByText(/Create A New playlist/i)).toBeInTheDocument();
            expect(screen.getByTestId('form-input')).toBeInTheDocument();
            expect(screen.getByTestId('form-description')).toBeInTheDocument();
            expect(screen.getByText('SUBMIT')).toBeInTheDocument();
          });

          it('Type in form Create Playlist', () => {
            const titleInput = screen.getByTestId('form-input');
            const descriptionInput = screen.getByTestId('form-description');
        
            userEvent.type(titleInput, 'Playlist Title');
            userEvent.type(descriptionInput, 'Description');
        
            expect(titleInput).toHaveValue('Playlist Title');
            expect(descriptionInput).toHaveValue('Description');
          });

});