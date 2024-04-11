import React from "react";

import { Image } from "../../../HOC";

const Banner = ({ blogList }) => {
	return (
		<Image src={blogList.banner} width='100%' height='400px' objectFit='cover' />
	);
};

export default Banner;
