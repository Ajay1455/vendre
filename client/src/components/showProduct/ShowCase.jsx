import React, { useEffect, useLayoutEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import Glance from '../glance/Glance'
import './ShowCase.css'

  function ShowCase() {
    const [products, setProducts]=useState([]);
    useLayoutEffect(()=>{
      fetch('https://vendrebackend.vercel.app/server/products').then((res)=>{
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
