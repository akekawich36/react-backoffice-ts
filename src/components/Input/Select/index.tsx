import {
  FormControl,
  FormLabel,
  FormHelperText,
  Select as SelectInput,
  MenuItem,
  Typography,
  Stack,
  Grid,
} from "@mui/material";
import { Controller, FieldValues, Path } from "react-hook-form";
import { useFormContext } from "../../Context/FormProvider";

interface SelectProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  options: { value: string; label: string }[];
  isRequired?: boolean;
}
export const Select = <T extends FieldValues>({
  name,
  label,
  options,
  isRequired,
}: SelectProps<T>) => {
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
                  <FormLabel id={`${name}-label`}>
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
              <SelectInput
                {...field}
                labelId={`${name}-label`}
                id={name}
                displayEmpty
                fullWidth
              >
                <MenuItem value="" disabled>
                  <Typography>
                    Please Select a {label?.toLowerCase()}
                  </Typography>
                </MenuItem>
                {(options || []).map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </SelectInput>
            </Grid>
          </Grid>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
