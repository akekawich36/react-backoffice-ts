import {
  FormControl,
  FormLabel,
  FormHelperText,
  Radio as RadioInput,
  RadioGroup,
  FormControlLabel,
  Stack,
  Grid,
} from "@mui/material";
import { Controller, FieldValues, Path } from "react-hook-form";
import { useFormContext } from "../../Context/FormProvider";

interface RadioProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  options: { value: string; label: string }[];
  isRequired?: boolean;
  row?: boolean;
}

export const Radio = <T extends FieldValues>({
  name,
  label,
  options,
  isRequired,
  row = true,
}: RadioProps<T>) => {
  const { methods, layout } = useFormContext();
  return (
    <Controller
      name={name}
      control={methods.control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth component="fieldset" error={!!error}>
          <Grid container spacing={0.5}>
            {label && (
              <Grid size={{ lg: layout === "row" ? 3 : 12, md: 12, xs: 12 }}>
                <Stack justifyContent="center" sx={{ height: "100%" }}>
                  <FormLabel component="legend">
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
              <RadioGroup {...field} row={row} sx={{ flexGrow: 4 }}>
                {(options || []).map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<RadioInput />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            </Grid>
          </Grid>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
