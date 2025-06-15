import {
  FormControl,
  FormLabel,
  OutlinedInput,
  FormHelperText,
  Stack,
  Grid,
} from "@mui/material";
import { Controller, FieldValues, Path } from "react-hook-form";
import { useFormContext } from "../../Context/FormProvider";

interface TextFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  type?: string;
  isRequired?: boolean;
  disabled?: boolean;
  maxLength?: number;
}

export const TextField = <T extends FieldValues>({
  name,
  label,
  type = "text",
  isRequired,
  disabled = false,
  maxLength = 255,
}: TextFieldProps<T>) => {
  const { methods, layout } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={methods.control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <Grid container spacing={0.5}>
            {label && (
              <Grid size={{ lg: layout === "row" ? 3 : 12, md: 12, xs: 12 }}>
                <Stack justifyContent="center" sx={{ height: "100%" }}>
                  <FormLabel
                    htmlFor={name}
                    sx={{
                      display: "flex",
                      textAlign: { lg: layout === "row" ? "right" : "left" },
                    }}
                  >
                    {label}
                    {isRequired && (
                      <span style={{ color: "#d32f2f", marginLeft: "2px" }}>
                        *
                      </span>
                    )}
                  </FormLabel>
                </Stack>
              </Grid>
            )}

            <Grid size={{ lg: layout === "row" ? 9 : 12, md: 12, xs: 12 }}>
              <OutlinedInput
                fullWidth
                {...field}
                id={name}
                type={type}
                placeholder={
                  label
                    ? `Please Enter ${label?.toLowerCase()}`
                    : `Please Enter ${name.toLowerCase()}`
                }
                disabled={disabled}
                inputProps={{ maxLength }}
              />
            </Grid>
          </Grid>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
