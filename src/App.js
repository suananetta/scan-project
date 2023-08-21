import { HashRouter, Route, Routes} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import './App.css';

import Header from './components/Header/Header'
import PrivatRoutes from './components/_routes/privateRoutes';
import LoginPage from './components/Main/LoginPage/LoginPage'
import SearchPage from './components/Main/SearchPage/SearchPage';
import ResultPage from './components/Main/ResultPage/ResultPage';
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'
import { logout } from './components/_redux/features/userSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if(localStorage.getItem('token')) {
      let expire = JSON.parse(localStorage.getItem('token')).expire;
      let expireDate = new Date(expire);
      let currentDate = new Date();

      if(currentDate > expireDate) {
        dispatch(logout());
      }
    }
  }, [])

  return (
    <HashRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Main/>}></Route>
          <Route path='/loginPage' element={<LoginPage/>}></Route>
          <Route element={<PrivatRoutes/>}>
            <Route path='/searchPage' element={<SearchPage/>}></Route>
            <Route path='/resultPage' element={<ResultPage/>}></Route>
          </Route>
        </Routes>
        <Footer/>
    </HashRouter>
  );
}

export default App;
