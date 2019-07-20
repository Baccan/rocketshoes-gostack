import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';

class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('products');

    // Para evitar que a tela renderize várias vezes por executar funções, o ideal é realizar a formação do conteúdo antes de exibi-lo para economizar recursos.
    // Desta forma:
    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data });
  }

  handleAddproduct = id => {
    const { addToCartRequest } = this.props;

    addToCartRequest(id);

    // Caso isso seja feito (redirecionar rota), o javascript por padrão não aguarda a resposta da request realizada pelo saga.
    // Colocar um await na frente de addToCartRequest() também não irá funcionar pois o dispara uma action com objeto do javascript.
    // A navegação deve ser feita dentro do saga, e não dentro do componente.
    // this.props.history.push('/cart');
  };

  render() {
    const { products } = this.state;
    const { amount } = this.props;

    return (
      <ProductList>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>

            <button
              type="button"
              onClick={() => this.handleAddproduct(product.id)}
            >
              <div>
                <MdAddShoppingCart size={16} color="#FFF" />{' '}
                {amount[product.id] || 0}
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
});

// Converte actions do redux em props do componente
const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  // null pois não existe o mapStateToProps neste componente
  // null,
  mapStateToProps,
  mapDispatchToProps
)(Home);
