import { get } from "lodash";
import find from "lodash/find";
import { useMeasure } from "react-use";
import { Box, Grid, Fade } from "@mui/material";
import { useCallback, useMemo, useState, Fragment, useEffect } from "react";

import {
  BannerTop,
  CardBrand,
  LineTitle,
  TabPanel,
  Tabs,
  Pagination,
  Container,
  SEO,
} from "../../components";

import { Image } from "../../HOC";
import { useMedia } from "../../hooks";
import { PARTNER_LIMIT } from "../../constants";
import { getSeoObject } from "utils/getSeoObject";

const BANNER_RATIO_ON_DESKTOP = 400 / 1120;
const BANNER_RATIO_ON_MOBILE = 140 / 310;

const Partner = ({ initData }) => {
  const [partnerMeta, partnerListing] = initData;

  const [ref, { width }] = useMeasure();
  const { isSmUp, isSmDown, isMdDown } = useMedia();
  const [currentTab, setCurrentTab] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isActive, setIsActive] = useState(false);

  const [animationState, setAnimationState] = useState(true);

  const animationHandler = useCallback(() => {
    setAnimationState(false);

    const timer = setTimeout(() => {
      setAnimationState(true);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const partnerData = partnerListing?.items;
  const metadata = partnerMeta?.items?.[0];
  const thumbnailOfAll = metadata?.["all_category_thumbnail"];
  const banner = metadata?.["banner"];
  const title = metadata?.["title"];
  const metaSeo = get(metadata, "meta");

  useEffect(() => {
    const tabs = document.getElementsByClassName("MuiTabScrollButton-root");

    if (tabs.length > 0) {
      setIsActive(true);
    }
  });

  const tranformedPartnerData = useMemo(() => {
    const flatPartnerData = [];

    partnerData.forEach((partnerEl) => {
      partnerEl.partners.forEach((el) => {
        flatPartnerData.push({
          partnerId: partnerEl.id,
          ...el,
        });
      });
    });

    return flatPartnerData;
  }, [partnerData]);

  const renderTabPanel = useMemo(() => {
    // FORMULA: OFFSET = (PAGE - 1) * LIMIT
    // FORMULA PAGE = (OFFSET / LIMIT) + 1

    if (isSmUp) {
      return (
        <Fragment>
          <TabPanel index={-1} value={currentTab}>
            <Box
              sx={{
                marginBottom: 10,
                overflow: "hidden",
              }}
            >
              <Image
                {...{
                  src: thumbnailOfAll,
                  width: "100%",
                  height: width * BANNER_RATIO_ON_DESKTOP,
                  objectFit: "cover",
                }}
              />
            </Box>

            <Grid container spacing={4}>
              {tranformedPartnerData.map((el, idx) => {
                return (
                  <Grid
                    onClick={() => {
                      const link = el.link;

                      if (link) {
                        window.open(link, "_blank");
                      }
                    }}
                    item
                    key={idx}
                    xs={12}
                    sm={6}
                    md={3}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <CardBrand data={el} />
                  </Grid>
                );
              })}
            </Grid>
          </TabPanel>

          {partnerData.map((item, index) => {
            const partnerItemList = item.partners;
            return (
              <TabPanel key={index} value={currentTab} index={item.id}>
                <Box
                  sx={{
                    marginBottom: 10,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    {...{
                      src: item.thumbnail,
                      width: "100%",
                      height: width * BANNER_RATIO_ON_DESKTOP,
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Grid container spacing={4}>
                  {partnerItemList.map((el, idx) => {
                    return (
                      <Grid
                        onClick={() => {
                          const link = el.link;

                          if (link) {
                            window.open(link, "_blank");
                          }
                        }}
                        item
                        key={idx}
                        xs={12}
                        sm={6}
                        md={3}
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        <CardBrand data={el} />
                      </Grid>
                    );
                  })}
                </Grid>
              </TabPanel>
            );
          })}
        </Fragment>
      );
    } else {
      const offset = (currentPage - 1) * PARTNER_LIMIT;

      let selectedData;
      let thumbnail = thumbnailOfAll;

      if (currentTab == -1) {
        selectedData = tranformedPartnerData;
      } else {
        const partnerItem = find(partnerData, { id: currentTab });

        if (partnerItem) {
          selectedData = partnerItem.partners;
          thumbnail = partnerItem.thumbnail;
        }
      }

      if (selectedData) {
        const data = selectedData.slice(offset, offset + PARTNER_LIMIT);

        return (
          <TabPanel value={currentTab} index={currentTab}>
            <Box
              sx={{
                marginBottom: 10,
                overflow: "hidden",
              }}
            >
              <Image
                {...{
                  src: thumbnail,
                  width: "100%",
                  height: width * BANNER_RATIO_ON_MOBILE,
                  objectFit: "cover",
                }}
              />
            </Box>

            <Grid container spacing={4}>
              {data.map((el, idx) => {
                return (
                  <Grid
                    onClick={() => {
                      const link = el.link;

                      if (link) {
                        window.open(link, "_blank");
                      }
                    }}
                    item
                    key={idx}
                    xs={12}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <CardBrand data={el} />
                  </Grid>
                );
              })}
            </Grid>
          </TabPanel>
        );
      }

      return null;
    }
  }, [
    currentTab,
    partnerData,
    tranformedPartnerData,
    width,
    isSmUp,
    currentPage,
  ]);

  const renderPagination = useMemo(() => {
    if (isSmUp) {
      return null;
    }

    let selectedData;

    if (currentTab == -1) {
      selectedData = tranformedPartnerData;
    } else {
      const partnerItem = find(partnerData, { id: currentTab });

      if (partnerItem) {
        selectedData = partnerItem.partners;
      }
    }

    return (
      <Pagination
        data={selectedData}
        currentPage={currentPage}
        onChange={(_, newPage) => {
          animationHandler();
          setCurrentPage(newPage);
        }}
      />
    );
  }, [currentPage, isSmUp, currentTab, partnerData, tranformedPartnerData]);

  const renderTabs = useMemo(() => {
    const mutatedPartnerData = [{ id: -1, title: "Tất cả" }, ...partnerData];

    return (
      <Tabs
        value={currentTab}
        changeTab={(event, newValue) => {
          animationHandler();
          setCurrentTab(newValue);
        }}
        data={mutatedPartnerData}
        isActive={isActive}
      />
    );
  }, [partnerData, currentTab, isActive]);

  return (
    <Box
      sx={[
        {
          paddingBottom: 10,
        },
        isSmDown && {
          paddingBottom: 3,
        },
      ]}
    >
      <SEO {...getSeoObject(metaSeo)} />

      <BannerTop imageSrc={banner} />

      <Container
        maxWidth="lg"
        sx={[
          {
            paddingBottom: 5,
          },
        ]}
        ref={ref}
      >
        <Grid item xs={12}>
          <Box
            sx={[
              {
                paddingTop: 5,
                paddingBottom: 5,
              },
            ]}
          >
            <LineTitle type="center" titleData={title} />
          </Box>
        </Grid>

        <Grid item xs={12}>
          {renderTabs}

          <Fade
            in={animationState}
            timeout={{
              enter: 500,
            }}
          >
            <Box>{renderTabPanel}</Box>
          </Fade>

          <Box>{renderPagination}</Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default Partner;
