import React, { Component } from "react";
import { Row, Col, Clearfix } from "react-bootstrap";
import Pagination from "react-js-pagination";
import "./search-results.css";
import { Link } from "react-router-dom";

import FormComponent from "../main-form-component/main-form.js";

//Redux State Handler With Mapping Requirements Starts Here;
import { connect } from "react-redux";
import { MapStateToProps, MapDispatchToProps } from "../../redux-reducer/mapping-file.js";

//Axios Import for API calls
import axios from "axios";
import apiSetupObject from "../../axios/axios-setup.js";

const WrapperObject = (props) => {
  return props.children;
};

const NoResultsComponent = (props) => {
  return (
    <section className="nullResultsContainer positionRelative">
      <div className="borderBoxContainer">
        <header>
          <img src="./assets/icons/empty-tree-icon.svg" className="img-responsive center-block headerIcon" alt="No Results" title="No Results"/>
          <h1 className="text-center">No Results</h1>
        </header>
        <p className="text-center">Sorry, but nothing came up in the search. <br className="hidden-xs"/>May be you should give this another go?</p>
      </div>
    </section>
  );
};

const SearchItem = (thisResultObject) => {
  let searchItemName = thisResultObject.name || thisResultObject.original_title,
      imageUrl = thisResultObject.profile_path || thisResultObject.poster_path,
      queryUrl = "?qt=" + searchItemName.toLowerCase().split(" ").join("___") + "&st=" + thisResultObject.searchType + "&qid=" + thisResultObject.id,
      baseUrl = "/" + thisResultObject.searchType + "-bio";
  return (
    <Col xs={6} sm={4} className="searchItem">
      <Link to={baseUrl + queryUrl}>
        <div className="borderBoxContainer">
          <div className="imageContainer">
            <img src={`https://image.tmdb.org/t/p/w500` + imageUrl} className="img-responsive itemImage" alt={name} title={name}/>
          </div>
          <div className="itemName">
            <p>{searchItemName}</p>
          </div>
          <div className="footerContainer">
            <img src="./assets/icons/right-arrow-black.svg" className="img-responsive" alt="View Details" title="View Details"/>
          </div>
        </div>
      </Link>
    </Col>
  );
};

const SearchItemComponent = ({resultsArray, searchType}) => {
  return (
    <WrapperObject>
      {
        !!resultsArray &&
        resultsArray.map((thisResultObject, thisIndex) => {
          let searchKeyValue = (thisResultObject.name || thisResultObject.original_title) + thisIndex
          if((thisIndex + 1) === 2) {
            return (
              <WrapperObject key={searchKeyValue}>
                <SearchItem {...thisResultObject} searchType={searchType}/>
                <Clearfix visibleXsBlock></Clearfix>
              </WrapperObject>
            );
          }
          else if((thisIndex + 1) % 2 === 0 && (thisIndex + 1) % 3 ===0){
            return (
              <WrapperObject key={searchKeyValue}>
                <SearchItem {...thisResultObject} searchType={searchType}/>
                <Clearfix></Clearfix>
              </WrapperObject>
            );
          }
          else if((thisIndex + 1) % 3 === 0) {
            return (
            <WrapperObject key={searchKeyValue}>
              <SearchItem {...thisResultObject} searchType={searchType}/>
              <Clearfix visibleSmBlock visibleMdBlock visibleLgBlock></Clearfix>
            </WrapperObject>
            );
          }
          else if((thisIndex + 1) % 2 === 0) {
            return (
            <WrapperObject key={searchKeyValue}>
              <SearchItem {...thisResultObject} searchType={searchType}/>
              <Clearfix visibleXsBlock></Clearfix>
            </WrapperObject>
            );
          }
          else {
            return (
              <SearchItem {...thisResultObject} key={searchKeyValue} searchType={searchType}/>
            );
          }
        })
      }
    </WrapperObject>
  );
}

const SearchResultsListing = ({setupProps}) => {
  return (
    <div className="resultsListingParent">
      <Row className="show-grid">
        <Col xs={12} sm={6} md={4} className="searchTopLevelSegment heading">
          <header>
            <h2>Search Results</h2>
            <p>We've found {setupProps.totalResults} entities that match <br className="hidden-xs hidden-sm"/>your search query</p>
          </header>
        </Col>
        <Col xs={12} md={8} className="searchTopLevelSegment content">
          <Row className="show-grid">
            <SearchItemComponent resultsArray={setupProps.resultsArray} searchType={setupProps.searchType}/>
          </Row>
          <div className="paginationContainer text-center">
            {
              setupProps.totalPages > 1 &&
              <Pagination onChange={setupProps.paginationChangeHandler} 
                activePage={Number(setupProps.activePageNumber)} 
                totalItemsCount={setupProps.totalResults} 
                pageRangeDisplayed={3}
                itemsCountPerPage={20}
              />
            }
          </div>
        </Col>
      </Row>
    </div>
  );  
};

class SearchResultsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paginationActivePage: null,
      searchListingResults: null,
      searchType: null
    };

    this.paginationHandleChange = this.paginationHandleChange.bind(this);
    this.makeLocationQuerySplit = this.makeLocationQuerySplit.bind(this);
    this.performSearchApi = this.performSearchApi.bind(this);
  };

  paginationHandleChange(thisPageNumber) {
    let locationQuery = this.props.location.search,
        currentSearchParams = this.makeLocationQuerySplit(locationQuery);
    
    currentSearchParams.pn = thisPageNumber;
    let newQueryUrl = "?qt=" + currentSearchParams.qt + "&pn=" + currentSearchParams.pn + "&st=" + currentSearchParams.st;
    this.performSearchApi(currentSearchParams);
    this.props.history.push("/search-results" + newQueryUrl);
  };

  performSearchApi(thisSearchObject) {
    axios.get(apiSetupObject.baseUrl + "search/" + thisSearchObject.st, {
      params: {
        api_key: apiSetupObject.apiKey,
        query: thisSearchObject.qt.split("-").join(" "),
        page: thisSearchObject.pn,
        adult: false
      }
    })
    .then((apiResponse) => {
      if(apiResponse.status !== 200 && apiResponse.statusText !== "OK") {
        return apiResponse.statusText
      }
      return apiResponse.data;
    })
    .then((successResponse) => {
      this.setState(($prevState, $nowProps) => {
        return {
          searchListingResults: successResponse,
          paginationActivePage: thisSearchObject.pn,
          searchType: thisSearchObject.st
        }
      });
    })
    .catch((apiErrorStatusText) => {
      console.error("#-#-#- Error Response from request =>", apiErrorStatusText);
    });
  };

  makeLocationQuerySplit(locationQuery) {
    let searchObject = {};
    if("URLSearchParams" in window && "entries" in URLSearchParams.prototype) {
      let urlParams = new URLSearchParams(locationQuery).entries();
      for(let thisValuePair of urlParams) {
        searchObject[thisValuePair[0]] = thisValuePair[1];
      }
    }
    else {
      let locationQuerySplit = locationQuery.split("?")[1].split("&");
      for (var i = 0; i < locationQuerySplit.length; i++) {
        let thisValuePair = locationQuerySplit[i].split("=");
        searchObject[thisValuePair[0]] = thisValuePair[1];
      }
    }
    return searchObject;
  };

  render() {
    let resultsListingSetup = {
      activePageNumber: this.state.paginationActivePage,
      paginationChangeHandler: this.paginationHandleChange,
    };
    if(this.state.searchListingResults) {
      let {results: resultsArray, total_pages: totalPages, total_results: totalResults} = this.state.searchListingResults;
      if(!!resultsArray && !!totalPages && !!totalResults) {
        resultsListingSetup.resultsArray = resultsArray;
        resultsListingSetup.totalPages = totalPages;
        resultsListingSetup.totalResults = totalResults;
        resultsListingSetup.searchType = this.state.searchType
      }
    }

    return (
      <div className="outerBorder searchResultsPage">
        {
          !!resultsListingSetup.totalResults && resultsListingSetup.totalResults > 0 ?
          <SearchResultsListing setupProps={resultsListingSetup}/>
          :
          <WrapperObject>
            <NoResultsComponent />
            <FormComponent />
          </WrapperObject>
        }
      </div>
    );
  };

  componentDidMount() {
    let locationQuery = this.props.location.search,
        searchObject = this.makeLocationQuerySplit(locationQuery);
    this.performSearchApi(searchObject);
  }
}
export default connect(MapStateToProps, MapDispatchToProps)(SearchResultsPage);
