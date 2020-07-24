const cases = {
  INCREMENT_COUNTER: state => ({
    count: state.count + 1,
  }),
};

const reducer = (state, action) => {
  return cases[action.type](state);
};

export default reducer;
