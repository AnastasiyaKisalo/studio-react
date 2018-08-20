import React, { Component } from "react";
import { Row, Col, Clearfix } from "react-bootstrap";
import Pagination from "react-js-pagination";
import "./search-results.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import FormComponent from "../main-form-component/main-form.js";

//Redux State Handler With Mapping Requirements Starts Here;
import { connect } from "react-redux";
import { MapStateToProps, MapDispatchToProps } from "../../redux-reducer/mapping-file.js";

//Axios Import for API calls
import axios from "axios";
import apiSetupObject from "../../axios/axios-setup.js";

//Required Import for Loader Component;
import LoaderComponent from "../loading-component/loader.js";

//Import Requirements from Local Functionalities and Testings;
import {TestObjectEmptiness} from "../functionalities.js";


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

class SearchItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageClass: ["img-responsive", "center-block", "itemImage", "onLoading"]
    };

    this.imageRef = React.createRef();
    this.loadProfileImage = this.loadProfileImage.bind(this);
  };
  
  loadProfileImage() {
    const imageElement = this.imageRef.current,
          errorImageUrl = "./assets/icons/no-image-icon.png",
          imageUrl = this.props.profile_path || this.props.poster_path,
          baseUrl = "https://image.tmdb.org/t/p/w500";

    let tempImage = new Image();
    tempImage.setAttribute("src", baseUrl + imageUrl);
    tempImage.addEventListener("load", () => {
      imageElement.setAttribute("src", tempImage.getAttribute("src"));
      this.setState(($prevState, $nowProps) => {
        return {
          imageClass: ["img-responsive", "center-block"]
        }
      });
    });
    tempImage.addEventListener("error", () => {
      setTimeout(() => {
        imageElement.setAttribute("src", errorImageUrl);
      }, 1000);
    });
  };

  render() {
    let searchItemName = this.props.name || this.props.original_title,
        imageUrl = this.props.profile_path || this.props.poster_path,
        queryUrl = "?st=" + this.props.searchType + "&qid=" + this.props.id,
        baseUrl = "/" + this.props.searchType + "-bio",
        loaderImage = "./assets/icons/loading-img.png";

    return (
      <Col xs={6} sm={4} lg={3} className="searchItem">
        <Link to={baseUrl + queryUrl}>
          <div className="borderBoxContainer">
            <div className="imageContainer">
              <img ref={this.imageRef} src={loaderImage} className={this.state.imageClass.join(" ")} alt={name} title={name}/>
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

  componentDidMount() {
    this.loadProfileImage();
  };
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
          else if((thisIndex + 1) % 2 === 0 && (thisIndex + 1) % 3 === 0 && (thisIndex + 1) % 4 === 0){
            return (
              <WrapperObject key={searchKeyValue}>
                <SearchItem {...thisResultObject} searchType={searchType}/>
                <Clearfix></Clearfix>
              </WrapperObject>
            );
          }
          else if((thisIndex + 1) % 2 === 0 && (thisIndex + 1) % 4 === 0) {
            return (
              <WrapperObject key={searchKeyValue}>
                <SearchItem {...thisResultObject} searchType={searchType}/>
                <Clearfix visibleXsBlock visibleLgBlock></Clearfix>
              </WrapperObject>
            )
          }
          else if((thisIndex + 1) % 2 === 0 && (thisIndex + 1) % 3 === 0) {
            return (
              <WrapperObject key={searchKeyValue}>
                <SearchItem {...thisResultObject} searchType={searchType}/>
                <div className="clearfix hidden-lg"></div>
              </WrapperObject>
            )
          }
          else if((thisIndex + 1) % 4 === 0) {
            return (
            <WrapperObject key={searchKeyValue}>
              <SearchItem {...thisResultObject} searchType={searchType}/>
              <Clearfix visibleMdBlock visibleLgBlock></Clearfix>
            </WrapperObject>
            );
          }
          else if((thisIndex + 1) % 3 === 0) {
            return (
            <WrapperObject key={searchKeyValue}>
              <SearchItem {...thisResultObject} searchType={searchType}/>
              <Clearfix visibleSmBlock visibleMdBlock></Clearfix>
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
};

const SearchResultsListing = ({searchListingResults, searchType, paginationChangeHandler, activePageNumber}) => {
  let totalResults = searchListingResults.total_results,
      resultsArray = searchListingResults.results,
      totalPages = searchListingResults.total_pages;

  return (
    <div className="resultsListingParent">
      <Row className="show-grid">
        <Col xs={12} sm={6} md={4} className="searchTopLevelSegment heading">
          <header>
            <h2>Search Results</h2>
            <p>We've found {totalResults} entities that match <br className="hidden-xs hidden-sm"/>your search query</p>
          </header>
        </Col>
        <Col xs={12} className="searchTopLevelSegment content">
          <Row className="show-grid">
            <SearchItemComponent resultsArray={resultsArray} searchType={searchType}/>
          </Row>
          <div className="paginationContainer text-center">
            {
              totalPages > 1 &&
              <Pagination onChange={paginationChangeHandler} 
                activePage={Number(activePageNumber)} 
                totalItemsCount={totalResults} 
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
      isBuilding: true,
      paginationActivePage: null,
      searchListingResults: null,
      searchType: null
    };

    this.resultsListingSetup = {};
    this.paginationHandleChange = this.paginationHandleChange.bind(this);
    this.makeLocationQuerySplit = this.makeLocationQuerySplit.bind(this);
    this.performSearchApi = this.performSearchApi.bind(this);
    this.hideLoaderDiv = this.hideLoaderDiv.bind(this);
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

  hideLoaderDiv() {
    this.setState(($prevState, $nowProps) => {
      return {
        isBuilding: false
      }
    });
  };

  render() {
    let FinalRenderComponent,
        mainContainerClasses = ["outerBorder", "searchResultsPage", "positionRelative", "preventBodyScroll"],
        hasBeenBuilt = !this.state.isBuilding ? true : false;
    return (
      <div className={mainContainerClasses.join(" ")}>
        <LoaderComponent isBuilding={this.state.isBuilding}/>
        {
          !!this.state.searchListingResults ?
          <WrapperObject>
            {
              "results" in this.state.searchListingResults && this.state.searchListingResults.results.length > 0 ?
              <SearchResultsListing {...this.state} 
                paginationChangeHandler={this.paginationHandleChange} 
                activePageNumber={this.state.paginationActivePage}
              />
              :
              <WrapperObject>
                <NoResultsComponent />
                <FormComponent />
              </WrapperObject>
            }
          </WrapperObject>
          :
          <p>Shite!</p>
        }
      </div>
    );
  };

  componentDidMount() {
    let locationQuery = this.props.location.search,
        searchObject = this.makeLocationQuerySplit(locationQuery);
    this.performSearchApi(searchObject);
  };

  componentDidUpdate($oldProps, $oldState) {
    if(!!$oldState.isBuilding) {
      this.hideLoaderDiv();
    }
  };
}
export default withRouter(connect(MapStateToProps, MapDispatchToProps)(SearchResultsPage));
