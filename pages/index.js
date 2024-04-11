import { HomePage } from "../containers";
import { HOME_PAGE, PAGES, PARTNER, BLOG_DETAIL } from "../apis";

import { transformUrl, prefetchData } from "../libs";

const Home = ({ ...props }) => {
  return <HomePage {...props} />;
};

export default Home;

export async function getServerSideProps({ params }) {
  try {
    const urls = [
      transformUrl(PAGES, {
        type: HOME_PAGE,
        fields: "*",
      }),
      transformUrl(PAGES, {
        type: BLOG_DETAIL,
        fields: "*",
        is_on_homepage: true,
        limit: 3,
      }),
      transformUrl(PARTNER, {
        fields: "*",
        is_on_homepage: true,
        limit: 9,
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

// export default function UserGuideDetailPage({ ...props }) {
//   return <UserGuide2 {...props} />;
// }

// export async function getServerSideProps({ params }) {
//   try {
//     const { slug } = params;

//     const urls = [
//       transformUrl(PAGES, { type: "guide.GuideDetailPage", fields: "*", slug }),
//     ];

//     const { resList, fallback } = await prefetchData(urls);

//     return {
//       props: { initData: resList, fallback },
//     };
//   } catch (err) {
//     return {
//       redirect: {
//         destination: "/404",
//         permanent: false,
//       },
//     };
//   }
// }
