import React from "react";
import { PAGES, types } from "../../apis";
import Partner from "../../containers/Partner/Partner";
import { prefetchData, transformUrl } from "../../libs";

export default function PagePartner({ ...props }) {
  return <Partner {...props} />;
}

export async function getServerSideProps({ params }) {
  try {
    const urls = [
      transformUrl(PAGES, {
        type: types.partnerListingPage,
        fields: "*",
      }),

      transformUrl(PAGES, {
        type: types.partnerDetailPage,
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
