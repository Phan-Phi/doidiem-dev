import React from "react";
import { PAGES, types } from "../../apis";
import FAQ from "../../containers/Faq/Faq";
import { prefetchData, transformUrl } from "../../libs";

export default function PageFAQ({ ...props }) {
  return <FAQ {...props} />;
}

export async function getServerSideProps({ params }) {
  try {
    const urls = [
      transformUrl(PAGES, {
        type: types.faqListingPage,
        fields: "*",
      }),
      transformUrl(PAGES, {
        type: types.faqDetailPage,
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
