export const TestObjectEmptiness = (thisObject) => {
  for (var props in thisObject) {
    if(thisObject.hasOwnProperty(props)) {
      return false;
    }
  }
  return JSON.stringify(thisObject) === JSON.stringify({})
};
