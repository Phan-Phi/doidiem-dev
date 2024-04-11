import { useEffect, useMemo, useState } from "react";

import { useMedia } from "../../hooks";
import { Tab, Tabs as MuiTabs, useTheme } from "@mui/material";

const Tabs = ({ value, changeTab, data, isActive }) => {
  const theme = useTheme();
  const { isSmUp, isMdUp } = useMedia();

  if (!data) {
    return null;
  }

  const renderTab = useMemo(() => {
    return data.map((el) => {
      return (
        <Tab
          key={el.id}
          label={el.title}
          value={el.id}
          disableRipple
          sx={[
            {
              padding: "8px 16px",
              [theme.breakpoints.down("sm")]: {
                paddingLeft: 0,
                paddingRight: 0,
                "&:not(:first-of-type)": {
                  marginLeft: 2,
                },
              },
            },
            isSmUp && {
              minWidth: "20px",
            },
          ]}
        />
      );
    });
  }, [data, isSmUp]);

  if (isMdUp) {
    return (
      <MuiTabs
        value={value}
        scrollButtons="auto"
        onChange={changeTab}
        variant={isSmUp ? "scrollable" : "fullWidth"}
        sx={[
          {
            position: "relative",
            marginX: "auto",
            marginBottom: 5,
            overflowX: "scroll",
            gap: "5px",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          },
          {
            "& .Mui-selected": {
              color: `${theme.palette.common.white} !important`,
              backgroundColor: theme.palette.secondary.light,
              borderRadius: "5px",
            },
            "& button": {
              minWidth: "max-content",
              margin: "0 1rem",
            },
            "& .MuiTabs-flexContainer": {
              width: "100%",
              margin: "0 auto",
              justifyContent: isActive
                ? "flex-start !important"
                : "center !important",
            },
            "& .MuiTabScrollButton-root": {
              width: "20px",
            },
            // "& .button_left": {
            //   position: "absolute",
            //   left: "-3%",
            //   top: "50%",
            //   transform: "translateY(-50%)",
            // },
            // "& .button_right": {
            //   position: "absolute",
            //   right: "-3%",
            //   top: "50%",
            //   transform: "translateY(-50%)",
            // },

            "& .MuiTabs-scroller": {
              "&::-webkit-scrollbar": {
                display: "none",
              },
            },
          },
        ]}
      >
        {renderTab}
      </MuiTabs>
    );
  } else {
    return (
      <MuiTabs
        value={value}
        onChange={changeTab}
        variant={isSmUp ? "standard" : "fullWidth"}
        sx={{
          overflowX: "scroll",

          marginLeft: "auto",
          marginTop: 4,
          marginBottom: 4,
          display: "flex",
          "& .Mui-selected": {
            color: `${theme.palette.common.white} !important`,
            backgroundColor: theme.palette.secondary.light,
            borderRadius: "5px",
          },
          "& button": {
            minWidth: "max-content",
            padding: "0.5rem",
          },
          "& .MuiTabs-scroller": {
            overflowX: "scroll !important",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          },
        }}
      >
        {renderTab}
      </MuiTabs>
    );
  }
};

export default Tabs;
