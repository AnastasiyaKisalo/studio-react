const initialStateObject = {
  appName: "Studio React",
  searchListingResults: null,
  searchListingType: null
};

const displaySearchResults = "DISPLAY_SEARCH_RESULTS";

export const RootReducer = (thisStateObject = initialStateObject, thisActionObject) => {
  switch(thisActionObject.type) {
    case displaySearchResults:
      {
        return {
          ...thisStateObject,
          searchListingResults: thisActionObject.payload.searchResults,
          searchListingType: thisActionObject.payload.searchType,
          queryText: thisActionObject.payload.queryText
        }
      }

    default:
      {
        return thisStateObject;
      }
  }
};

export const _actionDisplaySearchResults = (thisObject) => {
  return {
    type: displaySearchResults,
    payload: thisObject
  }
};
