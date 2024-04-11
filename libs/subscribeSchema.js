import { string, object } from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

export const subscribeSchema = yupResolver(
  object().shape({
    email: string("Vui lòng nhập nội dung")
      .required("Trường này được yêu cầu")
      .email("Vui lòng nhập đúng định dạng email"),
  })
);

export const defaultValues = {
  email: "",
};
