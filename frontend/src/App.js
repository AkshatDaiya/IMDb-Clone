import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Shows from './components/user/Shows'
import ShowDetails from './components/user/ShowDetails';
import ContextApi from './ContextApi'
import Login from './components/Login';
import Reg from './components/Reg';
import AKSHAtLogin from './components/AKSHAtLogin';
import EmailActivation from './components/EmailActivation';
import WatchList from './components/user/WatchList';
import ForgotPass from './components/user/ForgotPass';

function App() {
  const [singleDataID, setSingleDataID] = useState('')
  const [emailActivationId, setEmailActivationId] = useState('')
  const [addFav, setAddFav] = useState(JSON.parse(localStorage.getItem('addFav')))
  useEffect(() => {
    localStorage.setItem('addFav', JSON.stringify(addFav))
  }, [addFav])

  return (
    <Router>
      <ContextApi.Provider value={{ addFav, setAddFav, singleDataID, setSingleDataID, emailActivationId, setEmailActivationId }}>
        <Routes>
          <Route path='/' element={<Shows />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/aLogin' element={<AKSHAtLogin />}></Route>
          <Route path='/reg' element={<Reg />}></Route>
          <Route path='/emailActivation' element={<EmailActivation />}></Route>
          <Route path='/showDetails' element={<ShowDetails />}></Route>
          <Route path='/watchlist' element={<WatchList />}></Route>
          <Route path='/forgotPass' element={<ForgotPass />}></Route>
        </Routes>
      </ContextApi.Provider>
    </Router>
  )
}

export default App;
