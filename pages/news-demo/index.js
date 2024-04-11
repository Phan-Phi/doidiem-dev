import React from "react";
import NewsDemo from "../../containers/NewsDemo/NewsDemo";
import { prefetchData, transformUrl } from "../../libs";
import { PAGES, types } from "../../apis";

export default function PageNews({ ...props }) {
  return <NewsDemo {...props} />;
}
export async function getServerSideProps({ params }) {
  try {
    const urls = [
      transformUrl(PAGES, {
        type: types.blogListingPage,
        fields: "*",
      }),
      transformUrl(PAGES, {
        type: types.blogCategoryPage,
        fields: "*",
      }),
    ];

    const { resList, fallback } = await prefetchData(urls);

    return {
      props: {
        initData: resList,
        fallback,
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
}
