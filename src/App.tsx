import AppRouter from "./routes/Router";
import { Provider } from 'react-redux';
import GlobalStyles from "./GlobalStyles";
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyles/>
      <AppRouter />
    </Provider>
  );
}

export default App;
