import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useController } from "react-hook-form";

import { Button, Stack, Typography, useTheme } from "@mui/material";

import get from "lodash/get";

import AttachFileIcon from "@mui/icons-material/AttachFile";

const Upload = ({ control, name, setError, clearErrors, formSubtitle }) => {
  const theme = useTheme();
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const onDrop = useCallback(function (acceptedFiles, rejectedFiles) {
    if (rejectedFiles.length > 0) {
      const code = get(rejectedFiles, "[0].errors.[0].code");
      const errMessage = get(rejectedFiles, "[0].errors.[0].message");

      setError("files", {
        message: errMessage,
      });

      return;
    } else {
      clearErrors("files");
      onChange(acceptedFiles);
    }
  }, []);

  const { getInputProps } = useDropzone({
    accept: ".doc, .docx, .pdf",
    onDrop,
    maxSize: 20000000,
    multiple: true,
  });

  return (
    <Stack
      direction="column"
      spacing={1}
      alignItems="flex-start"
      marginBottom={2}
    >
      <Stack direction="column" alignItems="flex-start" spacing={2}>
        <Typography component={"label"} htmlFor={name}>
          <input id={name} {...getInputProps()} />
          <Button
            variant="outlined"
            component="span"
            sx={{
              color: "common.neutral2",
              borderColor: "common.neutral2",
              borderWidth: 2,
              ["&:hover"]: {
                borderWidth: 2,
                borderColor: "transparent",
              },
            }}
            color="secondary"
            startIcon={<AttachFileIcon />}
          >
            <span>Tệp đính kèm</span>
          </Button>
        </Typography>

        {Array.isArray(value) &&
          value.map((el) => {
            return (
              <Typography
                sx={{
                  fontSize: 12,
                }}
                key={el.name}
              >
                {el.name}
              </Typography>
            );
          })}
      </Stack>

      <Typography
        sx={{
          color: theme.palette.common.neutral3,
          paddingY: 1,
        }}
        variant="caption2"
      >
        {formSubtitle}
      </Typography>
      {!!error && (
        <Typography
          sx={{
            paddingY: 1,
            color: "error.main",
          }}
          variant="caption2"
        >
          {error.message}
        </Typography>
      )}
    </Stack>
  );
};

export default Upload;
