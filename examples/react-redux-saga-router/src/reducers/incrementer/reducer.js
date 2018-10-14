const initialState = {
  value: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case '@@Incrementer/SUCCESS':
      return { ...state, value: state.value + 1 };
    default:
      return state;
  }
};
