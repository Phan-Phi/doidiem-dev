import { PAGES, types } from "../../apis";
import News from "../../containers/News/News";
import { prefetchData, transformUrl } from "../../libs";

export default function PageNews({ ...props }) {
  return <News {...props} />;
}

export async function getServerSideProps({ params, query }) {
  try {
    const blogDetailPageUrl = transformUrl(PAGES, {
      type: types.blogDetailPage,
      fields: "*",
      ...query,
    });

    const urls = [
      transformUrl(PAGES, {
        type: types.blogListingPage,
        fields: "*",
      }),
      transformUrl(PAGES, {
        type: types.blogCategoryPage,
        fields: "*",
      }),
      transformUrl(PAGES, {
        type: types.blogDetailPage,
        fields: "*",
      }),
    ];

    const { resList, fallback } = await prefetchData(urls);

    if (query) {
      const blogDetailData = resList.pop();

      fallback[blogDetailPageUrl] = blogDetailData;
    }

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
