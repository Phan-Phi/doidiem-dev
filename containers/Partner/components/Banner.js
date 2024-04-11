import React from "react";

import { Image } from "../../../HOC";

const Banner = ({ data }) => {
  return <Image src={data.banner} width="100%" height="400px" objectFit="cover" />;
};

export default Banner;
