import { Controller } from "react-hook-form";

import InputBase from "./InputBase";

const TextInput = ({
  control,
  name,
  FormControlProps,
  FormLabelProps,
  InputProps,
  FormHelperTextProps,
}) => {
  if (control) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <InputBase
              {...{
                FormControlProps,
                FormLabelProps,
                FormHelperTextProps: {
                  ...FormHelperTextProps,
                  ...(error && {
                    children: error.message,
                    error: !!error,
                  }),
                },
                InputProps: {
                  ...InputProps,
                  onChange,
                  value,
                },
              }}
            />
          );
        }}
      />
    );
  } else {
    return (
      <InputBase
        {...{
          FormControlProps,
          FormHelperTextProps,
          FormLabelProps,
          InputProps,
        }}
      />
    );
  }
};

export default TextInput;
