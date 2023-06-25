import React from "react";
import "./Category.css";

function Category() {
  const categories = [
    {
      name: "Electronics",
      image: "https://thumbs.dreamstime.com/b/many-used-modern-electronic-gadgets-use-white-floor-reuse-recycle-concept-top-view-153892434.jpg",
    },
    {
      name: "Home Appliances",
      image: "https://wallpaperaccess.com/full/6424672.jpg",
    },
    {
      name: "Beauty Porducts",
      image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXR5JTIwcHJvZHVjdHN8ZW58MHx8MHx8&w=1000&q=80",
    },
    {
      name: "Sports",
      image: "https://media.istockphoto.com/id/1136317339/photo/sports-equipment-on-floor.jpg?s=612x612&w=0&k=20&c=-aI8u_Se89IC-HJZYH724ei5z-bIcSvRW6qUwyMtRyE=",
    },
    {
      name: "Books and Educations",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa2haG_cWwld3hbL0IfToYQ-NJndG6Wsj06A&usqp=CAU",
    },
    {
      name: "Grocery",
      image: "https://5.imimg.com/data5/SELLER/Default/2021/3/KO/QG/XG/3922575/all-grocery-items-500x500.jpg",
    },
  ];

  return (
    <div className="Category">
      <h1>Categories</h1>
      <div className="categoryContainer">
        {categories.map((category, index) => (
          <div key={index} className="category">
            <img src={category.image} alt={category.name} width={"300px"} />
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
