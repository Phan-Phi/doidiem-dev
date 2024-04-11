import React from "react";
import { PAGES, STORE_CATEGORIES, types } from "../../apis";
import Register from "../../containers/Register/Register";
import { prefetchData, transformUrl } from "../../libs";

export default function PageRegister({ ...props }) {
  return <Register {...props} />;
}

export async function getServerSideProps({ params }) {
  try {
    const urls = [
      transformUrl(PAGES, {
        type: types.contactPage,
        fields: "*",
      }),
      transformUrl(STORE_CATEGORIES, {}),
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
