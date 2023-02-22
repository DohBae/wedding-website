import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PgLayout from './hocs/Layout';
import Home from './containers/Home';
import QnA from './containers/QnA';
import Registry from './containers/Registry';
import Rsvp from './containers/Rsvp';
import Schedule from './containers/Schedule';
import Travel from './containers/Travel';
import WeddingParty from './containers/WeddingParty';

import './sass/main.scss'

function App() {
  return (
    <Router>
      <PgLayout>
        <Routes>
        <Route path='/' exact element={ <Home/> } />
        <Route path='/qna' element={ <QnA/> } />
        <Route path='/registry' element={ <Registry/> } />
        <Route path='/rsvp' element={ <Rsvp/> } />
        <Route path='/schedule' element={ <Schedule/> } />
        <Route path='/travel' element={ <Travel/> } />
        <Route path='/weddingparty' element={ <WeddingParty/> } />
        </Routes>
      </PgLayout>
    </Router>
  );
}

export default App;
