import React, { Component } from 'react';
import './App.css';

//Routes and Links Import Details Starts Here;
import { Switch, Route } from "react-router-dom";

import { NavbarComponent, NavigationComponent } from "./component-bucket/navigation/navigation.js";
import HomePage from "./component-bucket/home-page/home-page.js";
import SearchResultsPage from "./component-bucket/search-results/search-results.js";
import AllListingPage from "./component-bucket/all-listing-page/all-listing.js";
import PersonBioPage from "./component-bucket/person-bio/person-bio.js";
import TvBioPage from "./component-bucket/tv-bio/tv-bio.js";
import MovieBioPage from "./component-bucket/movie-bio/movie-bio.js";

const WrapperObject = (props) => {
  return props.children;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigationShow: false
    }

    this.handleMenuToggle = this.handleMenuToggle.bind(this);
  };

  handleMenuToggle() {
    this.setState(($prevState, $nowProps) => {
      return {
        navigationShow: !$prevState.navigationShow
      }
    });
  };

  render() {
    return (
      <WrapperObject>
        <WrapperObject>
          <nav>
            <NavbarComponent onClickHandler={this.handleMenuToggle}/>
            <NavigationComponent showNav={this.state.navigationShow} onClickHandler={this.handleMenuToggle}/>
          </nav>
        </WrapperObject>
        <Switch>
          <Route path="/" exact render={() => {return (<HomePage lockScrollStatus={this.state.navigationShow}/>)}}/>
          <Route path="/search-results" render={() => {return (<SearchResultsPage/>)}}/>
          <Route path="/view-listings" render={() => {return (<AllListingPage/>)}} />
          <Route path="/person-bio" render={() => {return (<PersonBioPage/>)}} />
          <Route path="/tv-bio" render={()=> {return (<TvBioPage/>)}} />
          <Route path="/movie-bio" render={() => {return (<MovieBioPage/>)}} />
        </Switch>
      </WrapperObject>
    );
  }
}

export default App;
