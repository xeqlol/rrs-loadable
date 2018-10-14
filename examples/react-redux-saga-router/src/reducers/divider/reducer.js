const initialState = {
  value: 1000
};

export default (state = initialState, action) => {
  switch (action.type) {
    case '@@Divider/DIVIDE':
      return { ...state, value: state.value / 2 };
    default:
      return state;
  }
};
