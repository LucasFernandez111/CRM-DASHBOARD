import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ApiProvider } from './context/ApiContext';
import { DateContextProvider } from './context/DateContextProvider';
import store from './redux/store';
import { AppRouter } from './routes/AppRouter';
function App() {
  return (
    <DateContextProvider>
      <ApiProvider>
        <BrowserRouter>
          <Provider store={store}>
            <Toaster position="top-right" richColors expand={false} />

            <AppRouter />
          </Provider>
        </BrowserRouter>
      </ApiProvider>
    </DateContextProvider>
  );
}

export default App;
