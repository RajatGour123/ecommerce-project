




import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { OrderHistoryProvider } from '@/contexts/orderhistorycontext';

function MyApp({ Component, pageProps }) {
  return (
    <OrderHistoryProvider>
      <Component {...pageProps} />
    </OrderHistoryProvider>
  );
}

export default MyApp;

