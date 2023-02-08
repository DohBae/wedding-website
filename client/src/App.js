import React from 'react';
import { BroswerRouter as Router } from 'react-router-dom';
import Layout from './hocs/Layout';
import Home from './containers/Home';
import QnA from './containers/QnA';
import Registry from './containers/Registry';
import Rsvp from './containers/Rsvp';
import Schedule from './containers/Schedule';
import Travel from './containers/Travel';
import WeddingParty from './containers/WeddingParty';

function App() {
  return (
    <Router>
      <Layout>
        <Route path='/' component={Home} />
        <Route path='/qna' component={QnA} />
        <Route path='/registry' component={Registry} />
        <Route path='/rsvp' component={Rsvp} />
        <Route path='/schedule' component={Schedule} />
        <Route path='/travel' component={Travel} />
        <Route path='/weddingparty' component={WeddingParty} />
      </Layout>
    </Router>
  );
}

export default App;
