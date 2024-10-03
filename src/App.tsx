import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/Routers';
import { Toaster } from 'sonner';
import { DateContextProvider } from './context/DateContextProvider';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { ApiProvider } from './context/ApiContext';
import AuthProvider from './context/AuthContext';
function App() {
  return (
    <DateContextProvider>
      <ApiProvider>
        <AuthProvider>
          <BrowserRouter>
            <Toaster position="bottom-right" expand={false} />
            <Routes />
          </BrowserRouter>
        </AuthProvider>
      </ApiProvider>
    </DateContextProvider>
  );
}

export default App;
