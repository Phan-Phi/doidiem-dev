import React from "react";
import Slider from "react-slick";
import CardBrand from "../Card/CardBrand";

const settings = {
  arrows: false,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function SlideBrand(data) {
  return (
    <Slider {...settings}>
      <CardBrand data={data} />
    </Slider>
  );
}
