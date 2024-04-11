import { useForm } from "react-hook-form";
import { useCallback, useState, useEffect } from "react";
import { useTheme, Box, styled, Grid, Typography } from "@mui/material";

import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";

import { useNotification } from "hooks/useNotifaction";
import { defaultValues, subscribeSchema } from "../../libs/subscribeSchema";
import useMedia from "../../hooks/useMedia";
import { SUBSCRIBERS } from "../../apis";
import axios from "../../axios.config";
import Input from "../Input/Input";
import { Image } from "../../HOC";
import Link from "../Link";

export default function FooterContent({ setting }) {
  const { isSmDown, isMdUp } = useMedia();
  const theme = useTheme();

  const [isSuccess, setIsSuccess] = useState(false);

  const {
    setLoadingNoti,
    enqueueSnackbarWithSuccess,
    enqueueSnackbarWithError,
  } = useNotification();

  const { handleSubmit, reset, control } = useForm({
    defaultValues,
    resolver: subscribeSchema,
  });

  useEffect(() => {
    let timer;

    if (isSuccess) {
      timer = setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isSuccess]);

  const onSubmit = useCallback(async (data) => {
    try {
      setLoadingNoti(true);
      await axios.post(`${SUBSCRIBERS}`, data);

      reset(defaultValues, {
        keepDirty: false,
      });

      setIsSuccess(true);
      enqueueSnackbarWithSuccess("Đăng ký thành công");
    } catch (err) {
      setIsSuccess(true);

      enqueueSnackbarWithError(err);
    } finally {
      setLoadingNoti(false);
    }
  });

  if (setting == undefined) {
    return null;
  }

  const {
    company_name,
    address,
    tax_code,
    hotline,
    email,
    title_column_1,
    title_column_2,
    title_column_3,
    link_in_column_1,
    link_in_column_2,
    logo_footer,
  } = setting;

  return (
    <Wrapper container sx={{ marginBottom: isMdUp ? 0 : 0 }} rowSpacing={3}>
      <Grid item xs={12} md={1}>
        <Image
          {...{
            src: logo_footer,
            width: isMdUp ? "100%" : "80px",
            height: isMdUp ? "50px" : "70px",
            objectFit: "contain",
            alt: "logo footer",
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={2}>
        <Box>
          <Title variant="body2_bold" sx={[isSmDown && { marginBottom: 3 }]}>
            {title_column_1}
          </Title>
          {link_in_column_1.map((item, index) => {
            return (
              <Link key={index} href={item.value.link || "/"}>
                <Content
                  variant="caption1"
                  sx={{
                    transition: "all 0.5s",
                    "&:hover": {
                      color: theme.palette.primary.light,
                    },
                  }}
                >
                  {item.value.title}
                </Content>
              </Link>
            );
          })}
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} md={2}>
        <Box>
          <Title variant="body2_bold">{title_column_2}</Title>
          {link_in_column_2.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.value.link || "/"}
                sx={{
                  display: "block",
                }}
              >
                <Content
                  variant="caption1"
                  sx={{
                    transition: "all 0.5s",
                    "&:hover": {
                      color: theme.palette.primary.light,
                    },
                  }}
                >
                  {item.value.title}
                </Content>
              </Link>
            );
          })}
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Box>
          <Title variant="body2_bold">{title_column_3}</Title>
          <Content variant="caption1">{company_name}</Content>

          <Content
            variant="caption1"
            sx={{ marginBottom: "0.5rem !important" }}
          >
            {address}
          </Content>

          <Content variant="caption1">MST: {tax_code}</Content>

          <Link href={"tel:" + hotline}>
            <Content
              variant="caption1"
              sx={{
                transition: "all 0.5s",
                "&:hover": {
                  color: theme.palette.primary.light,
                },
              }}
            >
              SĐT: {hotline}
            </Content>
          </Link>

          <Link href={"mailto:" + email}>
            <Content
              variant="caption1"
              sx={{
                transition: "all 0.5s",
                "&:hover": {
                  color: theme.palette.primary.light,
                },
              }}
            >
              Email: {email}
            </Content>
          </Link>
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Box>
          <Title variant="body2_bold">Đăng ký nhận tin</Title>
          <Content variant="caption1">
            Đăng ký với chúng tôi để nhận ưu đãi mỗi ngày.
          </Content>
          <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...{
                control,
                name: "email",
                FormControlProps: {
                  variant: "outlined",
                },
                InputProps: {
                  placeholder: "Nhập email",
                  endAdornment: (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        zIndex: 1,
                        borderRadius: "50%",
                        padding: 0.5,
                        backgroundColor: "secondary.main",
                        transition: "0.3s",
                        ["&:hover"]: {
                          opacity: 0.75,
                        },
                      }}
                      onClick={handleSubmit(onSubmit)}
                    >
                      <ArrowRightAltOutlinedIcon
                        sx={{
                          color: "common.white",
                        }}
                      />
                    </Box>
                  ),
                },
              }}
            />

            {/* <Fade
              in={isSuccess}
              timeout={{
                enter: 500,
                exit: 500,
              }}
              onExited={() => {
                setMessage("");
              }}
            >
              <Alert
                icon={false}
                sx={{
                  "& .MuiAlert-message": {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 0,
                    color:
                      message.severity === "success"
                        ? "success.main"
                        : "error.main",
                  },
                }}
              >
                {message.content}
              </Alert>
            </Fade> */}
          </Box>
        </Box>
      </Grid>
    </Wrapper>
  );
}
const Wrapper = styled(Grid)(({ theme }) => {
  return {
    "& .MuiGrid-item": {
      paddingLeft: "1.5rem",
      [theme.breakpoints.down("sm")]: {
        paddingLeft: 0,
      },
    },

    [theme.breakpoints.up("md")]: {
      "& .MuiGrid-item:first-of-type": {
        paddingLeft: 0,
      },
    },
  };
});

const Title = styled(Typography)(({ theme }) => {
  return {
    display: "block",
    marginBottom: 24,
    [theme.breakpoints.up("md")]: {
      color: theme.palette.common.black,
      marginBottom: "1.5rem",
    },
  };
});

const Content = styled(Typography)(({ theme }) => {
  return {
    color: theme.palette.common.neutral2,
    marginBottom: 8,
    display: "block",
  };
});
