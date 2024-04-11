import axios from "axios";

import { PAGES, PARTNER_DETAIL, PARTNER_LIST } from "../apis";
import Partner from "../containers/Partner/Partner";

const PartnerPage = ({ ...props }) => {
  return <Partner {...props} />;
};

export default PartnerPage;

export async function getServerSideProps({ params, query }) {
  try {
    const urls = [
      `${PAGES}?type=${PARTNER_LIST}&fields=*`,
      `${PAGES}?type=${PARTNER_DETAIL}&fields=*`,
    ];

    const resList = await Promise.all(
      urls.map((url) =>
        axios.get(url).then(({ data }) => {
          return data;
        })
      )
    );

    return {
      props: {
        initPartnerPage: resList[0],
        initPartnerDetailList: resList[1],
      },
    };
  } catch {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
}
