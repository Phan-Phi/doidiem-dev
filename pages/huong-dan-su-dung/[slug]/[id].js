import { PAGES } from "apis";
import GuideDetail from "containers/GuideDetailPage/GuideDetail";
import { prefetchData, transformUrl } from "libs";
import { useRouter } from "next/router";

export default function GuideDetailPage({ ...props }) {
  return <GuideDetail {...props} />;
}

export async function getServerSideProps({ params }) {
  try {
    const { slug, id } = params;

    const urls = [
      transformUrl(PAGES, {
        type: "guide.GuideDetailPage",
        fields: "*",
        slug: id,
      }),
    ];

    const { resList, fallback } = await prefetchData(urls);

    return {
      props: { initData: resList, fallback },
      // props: { name: "sadasdasd" },
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
