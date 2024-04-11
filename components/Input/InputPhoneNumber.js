import { forwardRef } from "react";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input/input";
import { TextField } from "@mui/material";

const InputPhoneNumber = ({ label, control, name }) => {
  if (!control || !name) {
    return null;
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <PhoneInput
            error={!!error}
            label={label}
            value={value}
            onChange={onChange}
            defaultCountry="VN"
            country="VN"
            inputComponent={TextFieldWithRef}
          />
        );
      }}
    />
  );
};

export default InputPhoneNumber;

const TextFieldWithRef = forwardRef((props, ref) => {
  return <TextField {...props} inputRef={ref} />;
});
