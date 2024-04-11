import { Container } from "@mui/material";
import { Fragment } from "react";

import Banner from "./components/Banner";
import Blog from "./components/Blog";

const BlogList = ({ blogDetail, blogCategories, blogList, tags, ...props }) => {
  return (
    <Fragment>
      <Banner blogList={blogList?.items?.[0]} />
      <Container maxWidth="lg">
        {/* <Blog blogDetail={blogDetail} tags={tags} blogCategory={blogCategories} /> */}
        <Blog />
      </Container>
    </Fragment>
  );
};

export default BlogList;
