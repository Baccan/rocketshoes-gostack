import React from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
import { useSelector } from 'react-redux';

import { MdShoppingBasket } from 'react-icons/md';

import { Container, Cart } from './styles';

import logo from '../../assets/images/logo.svg';

// function Header({ cartSize }) {
export default function Header() {
  // console.log(cart);

  const cartSize = useSelector(state => state.cart.length )

  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Rocketshoes" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>{cartSize}</span>
        </div>
        <MdShoppingBasket size={36} color="#fff" />
      </Cart>
    </Container>
  );
}

// state é o estado completo do redux
// export default connect(state => ({
//   // cartSize: state.cart.length,
// }))(Header);
