export default function cart(state = [], action) {
  console.log(state);
  // action é a a ação que foi disparada

  // state é o estado anterior a alteração do state

  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.product];
    default:
      return state;
  }
}
