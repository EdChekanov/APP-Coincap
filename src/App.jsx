import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Main from './components/Main';
import CoinList from './components/crypto/CoinList';
import CoinInfo from './components/crypto/CoinInfo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<CoinList />} />
          <Route path="/:slug" element={<CoinInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
