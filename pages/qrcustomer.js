import { useEffect } from "react";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { UAParser } from "ua-parser-js";

const QrCustomerPage = () => {
  const router = useRouter();

  useEffect(() => {
    const parser = new UAParser();
    const { name: OSName } = parser.getOS();
    const { type: deviceType } = parser.getDevice();

    const validDeviceList = ["mobile", "tablet"];
    const validOSList = ["Android", "Android-x86", "iOS"];

    if (!validDeviceList.includes(deviceType)) return router.replace("/");
    if (!validOSList.includes(OSName)) return router.replace("/");

    if (OSName === "iOS") {
      window.location.href = process.env.NEXT_PUBLIC_CUSTOMER_APP_STORE;
    } else {
      window.location.href = process.env.NEXT_PUBLIC_CUSTOMER_CH_PLAY;
    }
  }, []);

  return <Fragment />;
};

export async function getServerSideProps({ req }) {
  return { props: {} };
}

export default QrCustomerPage;
