import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  styled,
  Stack,
} from "@mui/material";
import { Button } from "../../components";
import { useRouter } from "next/router";
import ReaderHTML from "../ReaderHTML";

const BlogCard = ({ id, title, thumbnail, date, content, ...props }) => {
  const router = useRouter();

  const converDate = new Date({ date }).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardMedia component={"img"} image={thumbnail} height={"200"} alt="" />
      <CardContent>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <SubHeader variant="body2" color="text.secondary">
            {converDate}
          </SubHeader>
        </Stack>
        <Title gutterBottom variant="h5" component="div">
          {title}
        </Title>
        <ReaderHTML content={content} />
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            router.push(`${router.pathname}/${id}`);
          }}
          title={"Read More"}
          isBackground={false}
        />
      </CardActions>
    </Card>
  );
};

export default BlogCard;

const Title = styled(Typography)(({ theme }) => {
  return {};
});

const Description = styled(Typography)(({ theme }) => {
  return {};
});

const SubHeader = styled(Typography)(({ theme }) => {
  return {};
});
