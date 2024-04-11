import {
  Box,
  Container,
  Grid,
  OutlinedInput,
  Pagination,
  PaginationItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIcon from "@mui/icons-material/Search";

import React, { useMemo } from "react";

import {
  BannerTop,
  CardItem,
  LineTitle,
  TabPanel,
  Tabs,
} from "../../components";

import { useState } from "react";
import { useCallback } from "react";
import { useParams } from "../../hooks";
import { NEWS_POST_LIMIT } from "../../constants";
import { PAGES, types } from "../../apis";
import useSWR from "swr";
import { transformUrl } from "../../libs";
import { useDebounce } from "react-use";

const objAllTabs = { id: -1, title: "Tất cả" };

export default function NewsDemo({ initData }) {
  const [listingPage, categoryPage] = initData;

  const [currentTab, setCurrentTab] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const [params, setParams] = useParams({
    initState: {
      limit: NEWS_POST_LIMIT,
    },
    excludeKeys: ["limit", "offset"],
    isScroll: false,
  });

  const { data: resData } = useSWR(() => {
    return transformUrl(PAGES, {
      type: types.blogDetailPage,
      fields: "*",
      ...params,
    });
  });

  const [, cancel] = useDebounce(
    () => {
      if (search === "") {
        setParams({
          search: undefined,
          offset: "0",
          tags: undefined,
        });
      } else {
        setParams({
          search: search,
          offset: "0",
          tags: undefined,
        });
      }
    },
    1000,
    [search]
  );

  const banner = listingPage?.items[0].banner;
  const title = listingPage?.items[0].title;

  const mergeTabs = useMemo(() => {
    if (categoryPage == undefined) {
      return null;
    }
    return [objAllTabs, ...categoryPage.items];
  }, []);

  const onChangeSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const handleChangeTabs = useCallback((e, value) => {
    setCurrentTab(value);

    if (value == -1) {
      setParams({
        offset: 0,
        child_of: undefined,
      });
    } else {
      setParams({
        offset: 0,
        child_of: value,
      });
    }
  }, []);

  const renderTabs = useMemo(() => {
    return (
      <Tabs value={currentTab} data={mergeTabs} changeTab={handleChangeTabs} />
    );
  }, [categoryPage, mergeTabs, currentTab]);

  const renderTabPanel = useMemo(() => {
    if (resData == undefined) {
      return null;
    }
    return mergeTabs.map((item, index) => {
      return (
        <TabPanel key={index} value={currentTab} index={item.id}>
          <Grid container spacing={5}>
            {resData.items.map((item, index) => {
              return (
                <Grid key={index} item xs={12} sm={6} md={3}>
                  <CardItem data={item} />
                </Grid>
              );
            })}
          </Grid>
        </TabPanel>
      );
    });
  }, [resData, mergeTabs]);

  const PaginationNews = useMemo(() => {
    if (resData == undefined) {
      return null;
    }
    return (
      <Pagination
        onChange={(e, value) => {
          setCurrentPage(value);
          setParams({
            offset: (value - 1) * NEWS_POST_LIMIT,
          });
        }}
        variant="outlined"
        shape="rounded"
        count={Math.ceil(resData.meta.total_count / 9)}
        renderItem={(item) => {
          if (item.type === "page") {
            return;
          }
          return (
            <PaginationItem
              components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          );
        }}
      />
    );
  }, [resData, currentPage]);

  return (
    <Box>
      <BannerTop imageSrc={banner} />
      <Container maxWidth="lg">
        <LineTitle titleData={title} type="center" />
        <Box>
          <OutlinedInput
            value={search}
            onChange={onChangeSearch}
            placeholder="Tìm kiếm"
            fullWidth
            endAdornment={<SearchIcon />}
          />
        </Box>
        {renderTabs}

        {renderTabPanel}
        {PaginationNews}
      </Container>
    </Box>
  );
}
