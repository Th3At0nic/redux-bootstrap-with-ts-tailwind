const logger = (state) => (next) => (action) => {
  console.log(state.getState());
  console.log(action);
  next(action);
};

export default logger;
