import React from "react";
import ParticleCursor from "../components/ParticleCursor";
import HeroSlider from "../components/HeroSlider";
import EssentialStyling from "../components/EssentialStyling";
import RainCollection from "../components/RainCollection";
import FashionCategories from "../components/FashionCategories";
import HotSellers from "../components/HotSellers";
import Newsletter from "../components/Newsletter";



const Homepage = () => {
  const products = [
    {
      name: "MEN LEATHER JACKET",
      price: 370,
      originalPrice: 500,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
      tag: "NEW"
    },
    {
      name: "CARGO MEN'S WIDE JEANS",
      price: 220,
      originalPrice: 250,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80"
    },
    {
      name: "MEN'S CASUAL BLAZE",
      price: 180,
      originalPrice: 200,
      image: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=500&q=80"
    },
    {
      name: "WOMEN'S RAINCOAT",
      price: 400,
      originalPrice: 500,
      image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500&q=80"
    },
    {
      name: "COTTON MESH SHIRT",
      price: 400,
      originalPrice: 600,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80"
    },
    {
      name: "RELAXED GREEN MEN'S SHIRT",
      price: 500,
      image: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=500&q=80"
    }
  ];

  const categories = [
    { name: "JEANS & TROUSERS", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80" },
    { name: "ACTIVEWEAR & SPORTSWEAR", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80" },
    { name: "SWEATERS & HOODIES", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80" },
    { name: "SKIRTS & SHORTS", image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500&q=80" }
  ];

  return (
    <div className="bg-white">
      <ParticleCursor />
      <HeroSlider />
      <EssentialStyling products={products} />
      <RainCollection />
      <FashionCategories categories={categories} />
      <HotSellers products={products} />
      <Newsletter />
    </div>
  );
};

export default Homepage;