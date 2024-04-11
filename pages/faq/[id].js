import { useRouter } from "next/router";
import React from "react";
import { PAGES, types } from "../../apis";
import FaqDetail from "../../containers/Faq/FaqDetail";
import { prefetchData, transformUrl } from "../../libs";
export default function PageFAQ({ ...props }) {
  return <FaqDetail {...props} />;
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
