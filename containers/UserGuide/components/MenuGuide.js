import useSWR from "swr";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { TreeItem, TreeView } from "@mui/lab";
import { Box, Typography, styled } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { PAGES } from "apis";
import { transformUrl } from "libs";
import { renderBody } from "utils/getSeoObject";

export default function MenuGuide({ data }) {
  const router = useRouter();

  const { id, title } = data;

  const { data: resData } = useSWR(() => {
    return transformUrl(PAGES, {
      fields: "*",
      type: "guide.GuideDetailPage",
      child_of: id,
    });
  });

  const renderItem = useMemo(() => {
    if (resData == undefined) return;
    return resData.items.map((el) => {
      if (el.meta.slug === router.query.slug) {
        return (
          <TreeHeadItem
            nodeId={el.title}
            label={el.title}
            className="headItem"
            key={el.id}
          >
            {renderBody(el.sections, router)}
          </TreeHeadItem>
        );
      }
      return (
        <TreeItem
          key={el.id}
          onClick={() => {
            router.push(`/huong-dan-su-dung/${el.meta.slug}`);
          }}
          nodeId={el.title}
          label={el.title}
        />
      );
    });
  }, [resData, router.query.slug]);

  return (
    <Wrapper>
      <Title>{title}</Title>

      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        // sx={{ height: 540, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        {renderItem}
        {/* <DemoNha props={resData} /> */}
      </TreeView>
    </Wrapper>
  );
}

const Wrapper = styled(Box)(({ theme }) => {
  return {
    "& .MuiTreeView-root": {
      "& .MuiTreeItem-content": {
        flexDirection: "row-reverse",
      },

      "& .MuiTreeItem-label": {
        fontSize: "1rem",
      },

      "& .headItem": {
        // color: "red",
      },
      "& .MuiCollapse-wrapperInner": {
        borderLeft: `1px solid ${theme.palette.common.black}`,
      },
    },
  };
});

const Title = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.h5,
    marginBottom: "1rem",
  };
});

const TreeHeadItem = styled(TreeItem)(({ theme }) => {
  return {
    "& .Mui-expanded .MuiTreeItem-label": {
      color: "red !important",
    },
  };
});
