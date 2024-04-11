import DOMPurify from "isomorphic-dompurify";
import {
  Typography,
  Card,
  CardContent,
  Avatar,
  Divider,
  Stack,
  Box,
} from "@mui/material";
import Link from "../../../components/Link";

const PartnerDetailItem = ({ data }) => {
  if (data === null) {
    return null;
  }

  return (
    <Card
      sx={{
        backgroundColor: "rgb(248, 248, 248)",
        padding: 1.5,
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={3} alignItems="center">
          <Link href={data.link}>
            <Avatar
              src={data.image}
              sx={{
                width: 90,
                height: 90,
                cursor: "pointer",
              }}
            />
          </Link>
          <Box>
            <Typography>{data.name}</Typography>
            <Box
              sx={{
                "& p": {
                  marginY: 0,
                },
                "& span": {
                  color: "success.main",
                },
              }}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data.point_content),
              }}
            ></Box>
          </Box>
        </Stack>

        <Divider
          sx={{ height: "1px", marginY: 3, backgroundColor: "common.black" }}
        />
        <Typography>{data.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default PartnerDetailItem;

{
  /* <div
dangerouslySetInnerHTML={{
  __html: DOMPurify.sanitize(answer),
}}
></div> */
}
