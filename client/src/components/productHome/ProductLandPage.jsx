import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar'
import Slider from './slider/Slider'
import './ProductLandPage.css'
import Category from './category/Category'
import Footer from '../footer/Footer'
import ProductContainer from './productsContainer/ProductContainer'
import Products from './productsContainer/Products'
import { AuthContext } from '../../authContext/AuthContext'

function ProductLandPage({onAdd}) {

  const { user } = useContext(AuthContext);


  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (user !== null) {
      setIsLogin(true);
      setUserName(user.firstName);
    }
  }, [user]);

  return (

      <div>
        <Navbar isLogin={isLogin} user={userName} />
        <ProductContainer />
        <div className="LandPage">
          <Slider />
          <Category />
          <Products onAdd={onAdd} />
        </div>
        <Footer />
      </div>

  );
}

export default ProductLandPage