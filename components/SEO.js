import { NextSeo } from "next-seo";

const SEO = (props) => {
  const { title, description, image, locale } = props;

  const headTitle =
    title == undefined
      ? undefined
      : `${title} ĐỔI ĐIỂM - Tích điểm, trừ điểm trên mọi giao dịch`;

  return (
    <NextSeo
      title={headTitle || "ĐỔI ĐIỂM - Tích điểm, trừ điểm trên mọi giao dịch"}
      description={
        description ||
        "Ứng dụng tích điểm, đổi ưu đãi tuyệt vời tại Việt Nam. Tải ngay để ăn uống và mua sắm thả ga cùng với ứng dụng Đổi Điểm."
      }
      openGraph={{
        title: headTitle || "ĐỔI ĐIỂM - Tích điểm, trừ điểm trên mọi giao dịch",
        description:
          description ||
          "Ứng dụng tích điểm, đổi ưu đãi tuyệt vời tại Việt Nam. Tải ngay để ăn uống và mua sắm thả ga cùng với ứng dụng Đổi Điểm.",
        site_name: "ĐỔI ĐIỂM - Tích điểm, trừ điểm trên mọi giao dịch",
        locale: locale ?? "vi",
        images: [
          {
            url: image || "/og_image.png",
            alt: headTitle,
            type: "image/jpeg",
          },
        ],
      }}
      additionalLinkTags={[
        {
          rel: "icon",
          href: "/fav.png",
        },
        {
          rel: "apple-touch-icon",
          href: "/fav.png",
        },
      ]}
    />
  );
};

export default SEO;
