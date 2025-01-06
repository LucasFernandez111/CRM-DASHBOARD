import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';

import store from './redux/store';
import { AppRouter } from './routes/AppRouter';
import { DateContextProvider } from './context';
import OrdersProvider from './context/Orders/OrdersProvider';
import { StatusOnline } from './components/StatusOnline';

function App() {
  return (
    <StatusOnline>
      <BrowserRouter>
        <DateContextProvider>
          <Provider store={store}>
            <Toaster position="top-right" richColors expand={false} />
            <OrdersProvider>
              <AppRouter />
            </OrdersProvider>
          </Provider>
        </DateContextProvider>
      </BrowserRouter>
    </StatusOnline>
  );
}

export default App;
