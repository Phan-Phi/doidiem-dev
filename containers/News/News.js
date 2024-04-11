import useSWR from "swr";

import { useRouter } from "next/router";
import { useDebounce } from "react-use";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Container, Fade, Grid, OutlinedInput } from "@mui/material";

import trim from "lodash/trim";

import SearchIcon from "@mui/icons-material/Search";

import { NEWS_POST_LIMIT } from "../../constants";

import {
  BannerTop,
  LineTitle,
  Tabs,
  TabPanel,
  Pagination,
  CardItem,
  SEO,
} from "../../components";

import { transformUrl } from "../../libs";
import { PAGES, types } from "../../apis";

import { useParams, useMedia } from "../../hooks";
import { getSeoObject } from "utils/getSeoObject";
import { get } from "lodash";

const customTab = {
  id: -1,
  title: "Tất cả",
};

export default function News({ initData }) {
  const router = useRouter();
  const [metadaPage, listingCategory] = initData;
  const metaSeo = get(metadaPage, "items[0].meta");

  const { isMdDown, isSmDown } = useMedia();
  const [animationState, setAnimationState] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState(-1);
  const [searchText, setSearchText] = useState("");

  const [params, setParams] = useParams({
    initState: {
      limit: NEWS_POST_LIMIT,
    },
    excludeKeys: ["limit", "offset"],
    isScroll: false,
  });

  const [, cancel] = useDebounce(
    () => {
      setCurrentPage(1);

      if (searchText === "") {
        setParams({
          search: undefined,
          offset: "0",
          tags: undefined,
        });

        return;
      }

      setParams({
        search: trim(searchText),
        offset: "0",
        tags: undefined,
      });
    },
    500,
    [searchText]
  );

  useEffect(() => {
    cancel();
  }, []);

  const { data: listingBlogPost } = useSWR(() => {
    return transformUrl(PAGES, {
      type: types.blogDetailPage,
      fields: "*",
      ...params,
    });
  });

  const animationHandler = useCallback(() => {
    setAnimationState(false);

    const timer = setTimeout(() => {
      setAnimationState(true);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const onChangeSearchTextHandler = useCallback((e) => {
    const value = e.target.value;

    setSearchText(value);
  }, []);

  const onChangePageHandler = useCallback((page) => {
    setCurrentPage(page);

    const offset = (page - 1) * NEWS_POST_LIMIT;

    setParams({
      offset,
    });
  }, []);

  const changeTabHandler = useCallback((event, newValue) => {
    animationHandler();
    onChangePageHandler(newValue);
    setCurrentTab(newValue);

    setCurrentPage(1);

    if (newValue === -1) {
      setParams({
        child_of: undefined,
        offset: 0,
        tags: undefined,
      });
    } else {
      setParams({
        child_of: newValue,
        offset: 0,
        tags: undefined,
      });
    }
  }, []);

  const goToNewsDetail = useCallback((id) => {
    router.push(`${router.pathname}/${id}`);
  }, []);

  const mutatedListingCategory = useMemo(() => {
    if (listingCategory == undefined) {
      return;
    }

    return [customTab, ...listingCategory.items];
  }, [listingCategory]);

  const renderTabs = useMemo(() => {
    if (mutatedListingCategory == undefined) {
      return;
    }

    return (
      <Tabs
        value={currentTab}
        changeTab={changeTabHandler}
        data={mutatedListingCategory}
      />
    );
  }, [mutatedListingCategory, currentTab]);

  const renderTabPanel = useMemo(() => {
    if (listingBlogPost == undefined) {
      return null;
    }

    // FORMULA: OFFSET = (PAGE - 1) * LIMIT
    // FORMULA PAGE = (OFFSET / LIMIT) + 1

    return mutatedListingCategory.map((item, index) => {
      return (
        <TabPanel key={index} value={currentTab} index={item.id}>
          <Grid container columnSpacing={8} rowSpacing={4}>
            {listingBlogPost.items.map((el, i) => {
              return (
                <Grid
                  onClick={() => {
                    goToNewsDetail(el.id);
                  }}
                  item
                  key={i}
                  xs={12}
                  sm={6}
                  md={4}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <CardItem data={el} />
                </Grid>
              );
            })}
          </Grid>
        </TabPanel>
      );
    });
  }, [currentTab, currentPage, listingBlogPost]);

  const renderPagination = useMemo(() => {
    if (listingBlogPost == undefined) {
      return null;
    }

    return (
      <Pagination
        limit={NEWS_POST_LIMIT}
        data={{
          length: listingBlogPost.meta.total_count,
        }}
        currentPage={currentPage}
        onChange={(_, newPage) => {
          onChangePageHandler(newPage);
          animationHandler();
        }}
      />
    );
  }, [currentPage, listingBlogPost]);

  return (
    <Box>
      <SEO {...getSeoObject(metaSeo)} />

      <BannerTop imageSrc={metadaPage.items[0].banner} />

      <Container
        maxWidth="lg"
        sx={[
          {
            paddingBottom: 10,
          },
          isMdDown && {
            paddingBottom: 6,
          },
        ]}
      >
        <Grid container>
          <Grid item xs={12}>
            <Box
              sx={[
                {
                  paddingTop: 5,
                  paddingBottom: 5,
                },
              ]}
            >
              <LineTitle titleData={metadaPage.items[0].title} type="center" />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box marginBottom={isSmDown ? 0 : 5}>
              <OutlinedInput
                value={searchText}
                onChange={onChangeSearchTextHandler}
                placeholder="Tìm kiếm"
                fullWidth
                endAdornment={<SearchIcon />}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            {renderTabs}
          </Grid>

          <Grid item xs={12}>
            <Fade
              in={animationState}
              timeout={{
                enter: 500,
              }}
            >
              <Box>{renderTabPanel}</Box>
            </Fade>
          </Grid>

          <Grid item xs={12}>
            {renderPagination}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
