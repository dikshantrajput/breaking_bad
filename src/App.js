import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Header from './components/Header'
import Characters from './components/Characters'
import SingleCharacter from './components/SingleCharacter'
import NotFound from './components/NotFound'
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header/>
        <Switch>
          <Route exact path="/">
            <Characters/>
          </Route>
          <Route exact path="/:id/:name">
            <SingleCharacter/>
          </Route>
          <Route>
            <NotFound/>
          </Route>
        </Switch>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
