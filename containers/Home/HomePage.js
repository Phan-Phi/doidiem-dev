import { get } from "lodash";
import { Box } from "@mui/material";

import AboutExchangePoint from "./components/AboutExchangePoint";
import CustomerBenefit from "./components/CustomerBenefit";
import StoreBenefit from "./components/StoreBenefit";
import { getSeoObject } from "utils/getSeoObject";
import TopBanner from "./components/TopBanner";
import Featured from "./components/Featured";
import Brand from "./components/Brand";
import News from "./components/News";
import SEO from "components/SEO";
import BannerContent from "components/Banner/BannerContent";
import BenefitPartner from "./components/BenefitPartner";
import WhyDoiDiem from "./components/WhyDoiDiem";

const HomePage = ({ initData }) => {
  const [homeData, blogHome, brandHome] = initData;

  const metaData = homeData.items?.[0];
  const blogHomeData = blogHome.items;
  const brandHomeData = brandHome.items;
  const metaSeo = get(metaData, "meta");

  return (
    <Box>
      <SEO {...getSeoObject(metaSeo)} />
      <TopBanner data={metaData} />

      {/* TODO:  Feature Request #60*/}
      {/* <AboutExchangePoint data={metaData} /> */}

      <StoreBenefit data={metaData} />
      <Brand data={metaData} brandHomeData={brandHomeData} />

      <CustomerBenefit data={metaData} />

      {/* <WhyDoiDiem /> */}
      {/* <BenefitPartner /> */}
      <Featured data={metaData} />

      <News data={metaData} blogHomeData={blogHomeData} />
      {/* <BannerContent /> */}
    </Box>
  );
};

export default HomePage;
