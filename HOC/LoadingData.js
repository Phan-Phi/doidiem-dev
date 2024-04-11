import { LoadingFail, Loading2 } from "../components";
import { Container } from "@mui/material";

const LoadingData = ({ data, error, children, ...props }) => {
  if (error) {
    return (
      <Container>
        <LoadingFail />
      </Container>
    );
  }

  if (data === undefined) {
    return <Loading2 />;
  }

  return children({ data, ...props });
};

export default LoadingData;
