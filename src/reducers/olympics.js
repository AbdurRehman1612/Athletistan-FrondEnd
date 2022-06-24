

const olympicsReducer = (sportsname = [], action) => {
  switch (action.type) {
    case 'getsportsname':
     return action.payload

     default:
         return sportsname
  }
};

export default olympicsReducer;