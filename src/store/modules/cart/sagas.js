import { call, put, all, takeLatest } from 'redux-saga/effects';

import api from '../../../services/api';

import { addToCartSuccess } from './actions';

// * é uma funcionalidade do javascript chamada generator. É um async function, o babel transforma alguns assync functions para estes generators em alguns navegadores.

// Foi utilizado desta forma por ser mais poderoso que o async await. Ele pode realizar mais funções que o async não tem suporte.
function* addToCart({ id }) {
  // yield = await
  const response = yield call(api.get, `/products/${id}`);

  yield put(addToCartSuccess(response.data));
}

export default all([
  // takeEvery() realiza a ações sempre que clicar no botão, independente da request terminar ou não
  // takeLatest() faz com que a chamada api seja realizada apenas no momento de pressionar o botão e enquanto a chamada esteja finalizada.
  takeLatest('@cart/ADD_REQUEST', addToCart),
]);
