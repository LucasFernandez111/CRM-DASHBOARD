import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { DateContextProvider } from './context/DateContextProvider';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { ApiProvider } from './context/ApiContext';
import AuthProvider from './context/AuthContext';
import { AppRouter } from './routes/AppRouter';
function App() {
  return (
    <DateContextProvider>
      <ApiProvider>
        <AuthProvider>
          <BrowserRouter>
            <Toaster position="top-right" richColors expand={false} />
            <AppRouter />
          </BrowserRouter>
        </AuthProvider>
      </ApiProvider>
    </DateContextProvider>
  );
}

export default App;
