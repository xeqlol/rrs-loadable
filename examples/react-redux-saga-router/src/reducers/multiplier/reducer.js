const initialState = {
  value: 1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case '@@Multiplier/SUCCESS':
      return { ...state, value: state.value * 2 };
    default:
      return state;
  }
};
