import useSWR from "swr";
import queryString from "query-string";

import { useUpdateEffect } from "react-use";
import { useCallback, useState, useEffect } from "react";

import {
  Box,
  Grid,
  Pagination,
  styled,
  Typography,
  Stack,
} from "@mui/material";

import unset from "lodash/unset";

import { BLOG_DETAIL, PAGES } from "../../../apis";
import { LoadingData } from "../../../HOC";
import { useParams } from "../../../hooks";

import { Loading2, BlogItem } from "../../../components";

import TagList from "./TagList";
import SearchBar from "./SearchBar";
import Category from "./Category";

const BlogList = ({ blogDetail, blogCategory, tags, ...props }) => {
  const blogCategories = blogCategory?.items;
  const [data, setData] = useState(blogDetail?.items);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [minHeight, setMinHeight] = useState(0);
  const [initState, setInitState] = useState(false);

  const [url, setUrl] = useState(PAGES);

  const { data: resData, error } = useSWR(
    useCallback(() => {
      return url;
    }, [])
  );

  const [params, setParams, isReady] = useParams({
    initState: {
      limit: 6,
      offset: 0,
      fields: "*",
      type: BLOG_DETAIL,
    },
    callback: (params) => {
      if (params.search === null) {
        unset(params, "search");
      }

      setUrl(`${PAGES}?${queryString.stringify(params)}`);
    },
    excludeKeys: ["type", "fields"],
  });

  useUpdateEffect(() => {
    if (initState) {
      return;
    }

    const { tags, child_of } = params;

    if (tags) {
      setSelectedTag(tags);
    }

    if (child_of) {
      setSelectedCategory(child_of);
    }

    setInitState(true);
  }, [params, initState]);

  useEffect(() => {
    setData(resData?.items);
  }, [resData]);

  const minHeightHandler = useCallback((data) => {
    setMinHeight((prev) => {
      if (isNaN(data)) {
        return prev;
      }
      return Math.max(prev, data);
    });
  }, []);

  const selectTagHandler = useCallback((data) => {
    return () => {
      setSelectedTag((prev) => {
        if (data === prev) {
          setParams({
            tags: undefined,
            child_of: undefined,
            offset: 0,
          });

          return null;
        }

        setParams({
          tags: data,
          child_of: undefined,
          offset: 0,
        });

        return data;
      });
    };
  }, []);

  const selectCategoryHandler = useCallback((data) => {
    setSelectedCategory((prev) => {
      if (data === prev) {
        setParams({
          child_of: undefined,
          tags: undefined,
          offset: 0,
        });

        return null;
      }

      setParams({
        child_of: data,
        tags: undefined,
        offset: 0,
      });

      return data;
    });
  }, []);

  const searchHandler = useCallback((data) => {
    let search = data;

    if (data === "") {
      search = undefined;
    }

    setParams({
      search,
      tags: undefined,
      child_of: undefined,
    });
  }, []);

  if (!isReady) {
    return <Loading2 />;
  }

  return (
    <Wrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={9}>
          <Grid container spacing={3}>
            <LoadingData data={data} error={error}>
              {({ data }) => {
                return data.map((el) => {
                  return (
                    <Grid item xs={12} md={6} key={el.id}>
                      <BlogItem
                        {...{
                          minHeight,
                          setMinHeight: minHeightHandler,
                          ...el,
                        }}
                      />
                    </Grid>
                  );
                });
              }}
            </LoadingData>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              paddingTop: 5,
            }}
          >
            <Pagination
              shape="rounded"
              count={Math.ceil(resData?.meta?.total_count / 6) || 0}
              variant="outlined"
              size="large"
              onChange={(_, page) => {
                setParams({
                  offset: (page - 1) * 6,
                });
              }}
              page={Number(params.offset) / Number(params.limit) + 1}
            />
          </Box>
        </Grid>

        <Grid item xs={12} lg={3}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <SearchBar
                searchHandler={searchHandler}
                initState={params.search || null}
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={2} width="100%" marginLeft={0}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    paddingLeft: "0px !important",
                  }}
                >
                  <Typography variant="title2">Category</Typography>
                </Grid>

                {blogCategories.map((el) => {
                  return (
                    <Grid
                      sx={{
                        paddingLeft: "0px !important",
                      }}
                      item
                      xs={6}
                      sm={4}
                      lg={12}
                      key={el.id}
                    >
                      <Category
                        data={el}
                        selectCategoryHandler={selectCategoryHandler}
                        selectedItem={selectedCategory}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={2}>
                <Typography variant="title2">Popular Tag</Typography>
                <TagList
                  selectTagHandler={selectTagHandler}
                  selectedItem={selectedTag}
                  {...tags}
                />
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default BlogList;

// styled sheet
const Wrapper = styled(Box)(({ theme }) => {
  return {
    paddingTop: 60,
    paddingBottom: 60,
  };
});
