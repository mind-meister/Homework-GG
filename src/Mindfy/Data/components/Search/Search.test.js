import { cleanup, screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "../../Redux/Store/store";
import Search from "./Search";

const setup = () =>
    render(
    <Provider store={store}>
        <Search />
    </Provider>
);

    describe('Search components should be render', () => {
        beforeEach(setup);
        afterEach(cleanup);
   
    it('Success render Search component', () => {
        expect(screen.getByLabelText('search-input')).toBeInTheDocument();
        expect(screen.getByText('Search')).toBeInTheDocument();
        // expect(screen.getByText('Clear Search')).toBeInTheDocument();
    });

    it('Search input value should be same as user typing', () => {
        const searchInput = screen.getByLabelText('search-input');
        userEvent.type(searchInput, 'hello');
    
       expect(searchInput.value).toBe('hello')
      });
})
