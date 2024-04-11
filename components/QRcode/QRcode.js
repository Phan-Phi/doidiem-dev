import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { QR_CUSTOMER } from "../../apis";
import { Box, Stack } from "@mui/material";
import { Image } from "../../HOC";

const URL = `${process.env.NEXT_PUBLIC_DOMAIN_URL}${QR_CUSTOMER}`;

const ALT = "QRCode";

const SIZE = "120px";

const HEIGHT = "35px";

const QRcode = () => {
  const [src, setSrc] = useState("");

  useEffect(() => {
    QRCode.toDataURL(URL).then(setSrc);
  }, []);

  return (
    <Stack
      spacing={2}
      sx={{
        alignItems: {
          xs: "center",
          lg: "flex-end",
        },
      }}
    >
      <Image src={"/apple.svg"} height={HEIGHT} width={SIZE} alt={"ICON APPLE"} />
      <Image src={"/google.svg"} height={HEIGHT} width={SIZE} alt={"ICON GOOGLE"} />
      <Box
        sx={{
          pointerEvents: "none",
        }}
      >
        <img src={src} width={SIZE} height={SIZE} alt={ALT} />
      </Box>
    </Stack>
  );
};

export default QRcode;
