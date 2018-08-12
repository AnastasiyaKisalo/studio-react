import React, { Component } from 'react';
import './App.css';

//Routes and Links Import Details Starts Here;
import { Switch, Route } from "react-router-dom";

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
  render() {
    return (
      <div>
        <WrapperObject>
          <Switch>
            <Route path="/" exact component={HomePage}/>
            <Route path="/search-results" component={SearchResultsPage}/>
            <Route path="/view-listings" component={AllListingPage} />
            <Route path="/person-bio" component={PersonBioPage} />
            <Route path="/tv-bio" component={TvBioPage} />
            <Route path="/movie-bio" component={MovieBioPage} />
          </Switch>
        </WrapperObject>
      </div>
    );
  }
}

export default App;

// Think about redirection or not found in case anything is not correct.
// Check if the name and id value on the url matches the celeb details.
// You can use URLSearchParams for sending the query url from the home page and then make the axios call from there
// Loading Process check.. keep a background image to show loading..
// Pagination done again with required query parameters to be passed to the search url
