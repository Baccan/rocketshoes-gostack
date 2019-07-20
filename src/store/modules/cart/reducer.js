import produce from 'immer';

export default function cart(state = [], action) {
  // console.log(state);
  // action é a a ação que foi disparada

  // state é o estado anterior a alteração do state

  switch (action.type) {
    case '@cart/ADD_SUCCESS':
      return produce(state, draft => {
        const { product } = action;

        draft.push(product);

        // Sem Redux Saga:
        // const productIndex = draft.findIndex(p => p.id === action.product.id);

        // if (productIndex >= 0) {
        //   draft[productIndex].amount += 1;
        // } else {
        //   draft.push({ ...action.product, amount: 1 });
        // }
      });

    // COM IMUTABILIDADE (sem a lib immer)
    // return [
    //   ...state,
    //   {
    //     ...action.product,
    //     amount: 1,
    //   },
    // ];
    case '@cart/REMOVE':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });
    case '@cart/UPDATE_AMOUNT_SUCCESS': {
      // Esta verificação está sendo feita no saga
      // if (action.amount <= 0) {
      //   return state;
      // }

      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount);
        }
      });
    }
    default:
      return state;
  }
}
