import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import { formatPrice } from '../../../util/format';

import { addToCartSuccess, updateAmountSuccess } from './actions';

// * é uma funcionalidade do javascript chamada generator. É um async function, o babel transforma alguns assync functions para estes generators em alguns navegadores.

// Foi utilizado desta forma por ser mais poderoso que o async await. Ele pode realizar mais funções que o async não tem suporte.
function* addToCart({ id }) {
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    // console.tron.warn('ERRO');

    toast.error('Quantidade solicitada fora de estoque');
    return;
  }

  if (productExists) {
    // const amount = productExists.amount + 1;

    yield put(updateAmountSuccess(id, amount));
  } else {
    // yield = await
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(addToCartSuccess(data));
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  // const product = yield select(state => state.cart.find(p => p.id === id));

  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque');
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

export default all([
  // takeEvery() realiza a ações sempre que clicar no botão, independente da request terminar ou não
  // takeLatest() faz com que a chamada api seja realizada apenas no momento de pressionar o botão e enquanto a chamada esteja finalizada.
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
