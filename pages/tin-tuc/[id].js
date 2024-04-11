import { PAGES } from "../../apis";
import NewsDetail from "../../containers/News/NewsDetail";
import { prefetchData, transformUrl } from "../../libs";

export default function PageNews({ ...props }) {
  return <NewsDetail {...props} />;
}

export async function getServerSideProps({ params }) {
  try {
    const { id } = params;

    const urls = [transformUrl(`${PAGES}${id}`)];

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
