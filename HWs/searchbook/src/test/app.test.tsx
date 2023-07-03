import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';

// test(`PaymentForm can be rendered`, () => {
//   const store = configureStore({ reducer: rootReducer });
//   render(
//     <Provider store={store}>
//       <PaymentForm />
//     </Provider>
//   );
// });

// test('full app rendering/navigating', async () => {
//   render(<App />, { wrapper: BrowserRouter });
//   const user = userEvent.default;

//   // verify page content for default route
//   expect(screen.getByText(/you are home/i)).toBeInTheDocument();

//   // verify page content for expected route after navigating
//   await user.click(screen.getByText(/about/i));
//   expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument();
// });