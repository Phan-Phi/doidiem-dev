import { PAGES, types } from "../apis";
import { PolicyPage } from "../containers/Policy";
import { prefetchData, transformUrl } from "../libs";

const Policy = ({ ...props }) => {
  return <PolicyPage {...props} />;
};

export default Policy;

export async function getServerSideProps({ params }) {
  try {
    const urls = [
      transformUrl(PAGES, {
        type: types.policyPage,
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
