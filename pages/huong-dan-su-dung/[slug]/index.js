import { PAGES } from "apis";
import { prefetchData, transformUrl } from "libs";
import GuideListing from "containers/GuideListingPage/GuideListing";

export default function UserGuideDetailPage({ ...props }) {
  return <GuideListing {...props} />;
}

export async function getServerSideProps({ params }) {
  try {
    const { slug } = params;

    const urls = [
      transformUrl(PAGES, {
        type: "guide.GuideListingPage",
        fields: "*",
        slug,
      }),
    ];

    const { resList, fallback } = await prefetchData(urls);

    return {
      props: { initData: resList, fallback },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
}
