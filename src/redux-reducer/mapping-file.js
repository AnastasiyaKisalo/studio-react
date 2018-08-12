import { _actionDisplaySearchResults } from "./reducer-action.js";

export const MapDispatchToProps = (dispatchFunction) => {
  return {
    startSearchProcess: (apiResponse, searchType, searchText) => {
      dispatchFunction(_actionDisplaySearchResults(
        {
          searchResults: apiResponse,
          searchType: searchType,
          queryText: searchText
        }
      ));
    }
  }
};

export const MapStateToProps = (thisReduxStateObject) => {
  return thisReduxStateObject;
};
