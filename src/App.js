import React, { memo } from 'react';

import Footer from './component/Footer';
import Header from './component/Header';
import ListCars from './component/ListCars/ListCars';
import Login from './component/Login';
import Signin from './component/Signin';
import SingleCars from './component/SingleCars';
import NotFound from './component/NotFound';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './scss/fonts.scss';
import './scss/global.scss';

const App = memo(() => {
  return (
    <Router>
      <div className="containtApp">
        <Header />
        <div className="containerRoot">
          <Switch>
            <Route path="/" exact component={ListCars} />
            <Route path="/car" exact component={ListCars} />
            <Route path="/login" exact component={Login} />
            <Route path="/signin" exact component={Signin} />
            <Route path="/car/:idCars" exact component={SingleCars} />
            <Route path="/404" exact component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
});

export default App;
