import produce from 'immer';

export default function cart(state = [], action) {
  // console.log(state);
  // action é a a ação que foi disparada

  // state é o estado anterior a alteração do state

  switch (action.type) {
    case 'ADD_TO_CART':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.product.id);

        if (productIndex >= 0) {
          draft[productIndex].amount += 1;
        } else {
          draft.push({ ...action.product, amount: 1 });
        }
      });

    // COM IMUTABILIDADE (sem a lib immer)
    // return [
    //   ...state,
    //   {
    //     ...action.product,
    //     amount: 1,
    //   },
    // ];
    case 'REMOVE_FROM_CART':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });
    default:
      return state;
  }
}
