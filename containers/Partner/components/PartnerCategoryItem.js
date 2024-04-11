import { Typography, Stack } from "@mui/material";

import { Image } from "../../../HOC";

const DUMB_IMAGE = "/faq.png";

const PartnerCategoryItem = ({ data, ...props }) => {
  return (
    <Stack justifyContent="center" alignItems="center" {...props}>
      <Image width="90px" height={"90px"} src={data.thumbnail || DUMB_IMAGE} objectFit="cover" />
      <Typography>{data.title}</Typography>
    </Stack>
  );
};

export default PartnerCategoryItem;
