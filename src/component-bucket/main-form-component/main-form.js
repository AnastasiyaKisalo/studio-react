import React, { Component } from "react";
import AnimateHeight from "react-animate-height";

//React Bootstrap Implementations and CSS Imports
import { Button, FormGroup, FormControl, Radio, Row, Col } from "react-bootstrap";
import "./main-form.css";

//Redux State Handler With Mapping Dispatch To Props;
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { MapDispatchToProps } from "../../redux-reducer/mapping-file.js";

const DropDownSelectBlock = ({buildProps, eventHandler, radioSelectedValue}) => {
  return (
    <Col xs={4} className="text-center selectBlock">
      <Radio name="filterGroup" value={buildProps.value} onChange={eventHandler} checked={buildProps.value === radioSelectedValue}>
        <div className="borderBoxContainer">
          <img src={buildProps.imageUrl} className="img-responsive center-block" alt={buildProps.altText} title={buildProps.altText}/>
          {buildProps.description}
        </div>
      </Radio>
    </Col>
  );
}

class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownHeight: 0,
      filterSelected: "movie",
      searchTextValue: "",
      searchHasError: false,
      loadVideoElement: false,
    };
    
    this.initiateDropDownAnimation = this.initiateDropDownAnimation.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleRadioSelectChange = this.handleRadioSelectChange.bind(this);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
    this.makeApiCallRequest = this.makeApiCallRequest.bind(this);
  };
  
  initiateDropDownAnimation(event) {
    this.setState(($prevState, $nowProps) => {
      return {
        dropDownHeight: "auto" 
      }
    });
  };

  handleSearchChange(event) {
    let thisTextValue = event.target.value;
    this.setState(($prevState, $nowProps) => {
      return {
        ...$prevState,
        searchTextValue: thisTextValue,
      }
    });
  };

  handleRadioSelectChange(event) {
    let thisSelected = event.target.value;
    console.log(thisSelected);
    this.setState(($prevState, $nowProps) => {
      return {
        filterSelected: thisSelected
      }
    });
  };

  makeApiCallRequest(queryText, searchType) {
    let locationQuery = "?qt=" + queryText + "&pn=1" + "&st=" + searchType;
    this.props.history.push("/search-results" + locationQuery);
  }

  formSubmitHandler(event) {
    event.preventDefault();
    const { searchTextValue, filterSelected } = this.state;
    if(searchTextValue === "") {
      this.setState(($prevState, $nowProps) => {
        return {
          searchHasError: true
        }
      });
    }
    else {
      this.setState(($prevState, $nowProps) => {
        return {
          searchHasError: false
        }
      }, () => {
        this.makeApiCallRequest(searchTextValue, filterSelected);
      });
    }
  };

  render() {
    let formSetupObject = {
        dropDownHeight: this.state.dropDownHeight,
        dropDownAnimateEvent: this.initiateDropDownAnimation,
        dropDownRadioValues: [
          {value: "movie", imageUrl: "./assets/icons/play-icon.svg", altText:"Movies", description: "Movie"},
          {value: "tv", imageUrl: "./assets/icons/tv-icon.svg", altText:"TV Shows", description: "TV"},
          {value: "person", imageUrl: "./assets/icons/star-icon.svg", altText:"People/Celebrities", description: "Person"}
        ],
        radioSelectedValue: this.state.filterSelected,
        radioChangeEvent: this.handleRadioSelectChange,
        inputChangeEvent: this.handleSearchChange,
        inputTextValue: this.state.searchTextValue,
        inputHasError: this.state.searchHasError,
        formSubmitEvent: this.formSubmitHandler
      },
      searchErrorClass = !formSetupObject.inputHasError ? "errorMessage hiddenTransform" : "errorMessage";

    return (
      <form className="form mainSearchForm" onSubmit={formSetupObject.formSubmitEvent}>
        <FormGroup className="positionRelative">
          <FormControl className="mainSearchInput mainFilterInput" value={formSetupObject.radioSelectedValue.split("-").join(" ")} disabled/>
          <span className="filterIcon" onClick={formSetupObject.dropDownAnimateEvent}>
            <img src="./assets/icons/filter-icon-white.svg" className="img-responsive" alt="Filter" title="Filter"/>
          </span>
          <span className="filterPreText">Filter By</span>
        </FormGroup>
        <AnimateHeight duration={500} height={formSetupObject.dropDownHeight}>
          <div className="dropDownFilterBlock">
            <Row className="show-grid">
              {
                formSetupObject.dropDownRadioValues.map((thisElement, thisIndex) => {
                  return <DropDownSelectBlock 
                            key={thisElement.altText} 
                            buildProps={thisElement} 
                            eventHandler={formSetupObject.radioChangeEvent}
                            radioSelectedValue={formSetupObject.radioSelectedValue}
                          />
                })
              }
            </Row>
          </div>
        </AnimateHeight>
        <FormGroup className="positionRelative">
          <FormControl placeholder="Example - The Lord Of The Rings" 
            className="mainSearchInput"
            value={formSetupObject.inputTextValue} 
            onChange={formSetupObject.inputChangeEvent}
          />
          <span className="filterPreText">
            <img src="./assets/icons/search-icon-blue.svg" className="img-responsive" alt="Search" title="Search"/>
          </span>
          <div className={searchErrorClass}>Please Enter Your Search</div>
        </FormGroup>
        <Button className="defaultButton" type="submit">
          Search
          <img src="./assets/icons/right-arrow-black.svg" className="img-responsive center-block" alt="Search" title="Search"/>
        </Button>
      </form>
    );
  }
};

export default withRouter(connect(null, MapDispatchToProps)(FormComponent));
