export default (state=[], action) => {
  switch (action.type) {
    case "FETCH_DRINKS":
      return action.payload.data
    default:
      return state
  }
}
