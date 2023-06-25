import React, { useEffect, useLayoutEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import Glance from '../glance/Glance'
import './ShowCase.css'

const data = [
    {
      id: 1,
      title: "₹Premium Quality Bag",
      price: "₹2500",
      image: "https://medium-images.asset.oyela.in/images/448e3ffb-b312-4143-8906-772264be14f6-1673520322060743-OIdkFm-50.webp",
    },
    {
      id: 2,
      title: "Half sleeve Shirt",
      price: "₹1999",
      image: "https://m.media-amazon.com/images/I/41K8J6J3fUL._AC._SR360,460.jpg",
    },
    {
      id: 3,
      title: "Black bell bottom pant",
      price: "₹1399",
      image: "http://cdn.shopify.com/s/files/1/0349/9969/7544/products/1_1_bf237a66-0ac4-4f34-b9fa-5a98eed85348.jpg?v=1648208224",
    },
    {
      id: 4,
      title: "Titan watch for men",
      price: "₹7995",
      image: "https://img.tatacliq.com/images/i8/437Wx649H/MP000000013257278_437Wx649H_202205261842581.jpeg",
    },
  ];

  function ShowCase() {
    const [products, setProducts]=useState([]);
    useLayoutEffect(()=>{
      fetch('/products').then((res)=>{
        return res.json();
      }).then((data)=>{
        setProducts(data);
      }).catch((error)=>{
        return(
          <h1>Facing some issue regarding database</h1>
        )
      })
    },[])

    return (
      <div className='ShowCaseStyle'> 
        <h1>Popular Products </h1>
          {products.slice(0,4).map((product) => (
        <NavLink to="/product" state={{ from: product }}>
          <Glance
            key={product._id}
            title={product.name}
            price={product.price}
            image={product.imageUrl}
            // onClick={() => handleProductClick(product.id)}
          />
        </NavLink>
            ))}
      </div>
    )
  }

  export default ShowCase