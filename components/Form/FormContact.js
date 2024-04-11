import axios from "axios";
import Chance from "chance";
import NumberFormat from "react-number-format";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { mixed, object, string } from "yup";
import { useForm, Controller } from "react-hook-form";

import last from "lodash/last";

import { useState, useCallback, useEffect } from "react";
import {
  TextField,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

import {  SUBMISSIONS } from "../../apis";
import Upload from "./Upload";

import { Loading2 } from "../../components";

const URL = `${process.env.NEXT_PUBLIC_DOMAIN_URL}${SUBMISSIONS}`;

const validateSchema = object({
  store_name: string().required("Vui lòng không bỏ trống trường này"),
  presentator: string().required("Vui lòng không bỏ trống trường này"),
  email: string().email().required("Vui lòng không bỏ trống trường này"),
  branch: string().required("Vui lòng không bỏ trống trường này"),
  phone: string().required("Vui lòng không bỏ trống trường này"),
  files: mixed(),
});

const chance = new Chance();

const initState =
  process.env.NODE_ENV === "development"
    ? {
        store_name: chance.name({ full: true }),
        presentator: chance.name({ full: true }),
        category: null,
        email: chance.email(),
        bank_number: chance.integer({
          min: 1000000000000000,
          max: 1999999900000000,
        }),
        bank: chance.name({ full: true }),
        owner: chance.name({ full: true }),
        branch: chance.name({ full: true }),
        phone: `+8477${chance.integer({
          min: 1000000,
          max: 9999999,
        })}`,
        files: null,
        page: null,
      }
    : {
        store_name: chance.name({ full: true }),
        presentator: chance.name({ full: true }),
        category: null,
        email: chance.email(),
        bank_number: chance.integer({
          min: 1000000000000000,
          max: 1999999900000000,
        }),
        bank: chance.name({ full: true }),
        owner: chance.name({ full: true }),
        branch: chance.name({ full: true }),
        phone: `+8477${chance.integer({
          min: 1000000,
          max: 9999999,
        })}`,
        files: null,
        page: null,
      };

// {
//   store_name: "",
//   presentator: "",
//   category: null,
//   email: "",
//   bank_number: "",
//   bank: "",
//   owner: "",
//   branch: "",
//   phone: "+84",
//   files: "",
//   page: null,
// }

const ContactForm = ({ category = [], data, ...props }) => {
  const [defaultValues, setDefaultValues] = useState(initState);

  useEffect(() => {
    if (defaultValues.category === null) {
      const categoryId = last(category)?.["id"];

      setDefaultValues((prev) => {
        return {
          ...prev,
          category: categoryId,
        };
      });
    }
  }, [defaultValues, category]);

  useEffect(() => {
    if (defaultValues.page === null) {
      setDefaultValues((prev) => {
        return {
          ...prev,
          page: data.id,
        };
      });
    }
  }, [defaultValues, data]);

  if (defaultValues.category === null || defaultValues.page === null) {
    return <Loading2 />;
  }

  return (
    <TargetElement
      {...{
        category,
        data,
        defaultValues,
      }}
    />
  );
};

const TargetElement = ({ category, data, defaultValues }) => {
  const [loading, setLoading] = useState(false);
  const resolver = yupResolver(validateSchema);
  const [mutationObj, setMutationObj] = useState({});
  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    setValue,
  } = useForm({
    resolver: resolver,
    defaultValues,
  });

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = useCallback(
    (data) => {
      setLoading(!loading);

      const formData = new FormData();
      for (const key of Object.keys(data)) {
        formData.append(key, data[key]);
      }

      axios
        .post(URL, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          reset(defaultValues, {
            keepDirty: false,
          });

          if (typeof mutationObj.setFiles === "function") {
            mutationObj.setFiles([]);
          }

          enqueueSnackbar("Đăng ký thành công", {
            variant: "success",
          });
        })
        .catch((err) => {
          if (err.response) {
            enqueueSnackbar(err.response.data.message, {
              variant: "error",
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [mutationObj]
  );

  const passHandler = useCallback(
    ({ acceptedFiles, rejectedFiles, setFiles }) => {
      setMutationObj((prev) => {
        return {
          ...prev,
          setFiles,
        };
      });

      if (rejectedFiles.length > 0) {
        setError("files", {
          message: "Kích thước file vượt quá giới hạn cho phép",
        });

        return;
      } else {
        clearErrors("files");
      }

      setValue("files", acceptedFiles);
    },
    []
  );

  return (
    <Stack spacing={3}>
      <TextField
        fullWidth
        required={true}
        label="Tên quán / Thương hiệu"
        {...register("store_name")}
      />
      <TextField
        fullWidth
        required={true}
        label="Người đại diện"
        {...register("presentator")}
      />

      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="10">Categogy</InputLabel>
            <Select
              sx={{
                width: "100%",
              }}
              label="Categogy"
              defaultValue={1}
              fullWidth
              {...field}
            >
              {category?.map((el) => (
                <MenuItem key={el.id} value={el.id}>
                  {el.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        defaultValue={1}
      />
      <TextField
        required={true}
        fullWidth
        label="Email"
        id="3"
        {...register("email")}
      />

      <Controller
        {...{
          name: "bank_number",
          control,
          render: ({ field }) => {
            const { onChange, ...props } = field;

            return (
              <NumberFormat
                onValueChange={({ value }) => {
                  onChange(value);
                }}
                customInput={TextField}
                {...props}
                label="Số tài khoản ngân hàng"
                fullWidth
              />
            );
          },
        }}
      />

      <TextField fullWidth label="Bank" {...register("bank")} />
      <TextField fullWidth label="Chủ tài khoản" {...register("owner")} />
      <TextField
        required={true}
        fullWidth
        label="Chi nhánh"
        {...register("branch")}
      />
      <TextField
        required
        fullWidth
        label="Số điện thoại"
        {...register("phone")}
      />

      <Upload
        {...{
          control,
          name: "files",
          passHandler,
        }}
      />

      {/* <Captcha/> */}
      <LoadingButton
        onClick={handleSubmit(onSubmit)}
        loading={loading}
        variant="contained"
        sx={{
          paddingX: 10,
          backgroundColor: "#F7CC15",
        }}
      >
        Đăng ký
      </LoadingButton>
    </Stack>
  );
};

export default ContactForm;
