import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const categories = [
  {
    cover: "./images/burger.jpg",
    name: "this is name",
    places: "number of places",
  },
  {
    cover: "./images/burger.jpg",
    name: "this is 2",
    places: "number of 2",
  },
  {
    cover: "./images/burger.jpg",
    name: "this is 3",
    places: "number of 3",
  },
  {
    cover: "./images/burger.jpg",
    name: "this is 4",
    places: "number of 4",
  },
  {
    cover: "./images/burger.jpg",
    name: "this is 5",
    places: "number of 5",
  },
  {
    cover: "./images/burger.jpg",
    name: "this is 6",
    places: "number of 6",
  },
  {
    cover: "./images/burger.jpg",
    name: "this is 7",
    places: "number of 7",
  },
  {
    cover: "./images/burger.jpg",
    name: "this is 8",
    places: "number of 8",
  },
];

const category = categories.map((item) => {
  return (
    <div className="category--main-item">
      <img src={item.cover} alt="category logo" />
      <h4>{item.name}</h4>
      <p>{item.places}</p>
    </div>
  );
});

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 8,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

export default function Category() {
  return (
    <Carousel infinite focusOnSelect="true" responsive={responsive}>
      {category}
    </Carousel>
  );
}
