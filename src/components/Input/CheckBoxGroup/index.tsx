import {
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
  Stack,
  Grid,
  Box,
  Checkbox as CheckBoxInput,
} from "@mui/material";
import { Controller, FieldValues, Path } from "react-hook-form";
import { useFormContext } from "../../Context/FormProvider";

interface CheckboxGroupProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  options: { id: string; label: string }[];
  isRequired?: boolean;
}
export const CheckBoxGroup = <T extends FieldValues>({
  name,
  label,
  options,
  isRequired,
}: CheckboxGroupProps<T>) => {
  const { methods, layout } = useFormContext();

  return (
    <Controller
      name={name}
      control={methods.control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth component="fieldset" error={!!error}>
          <Grid container spacing={0.5}>
            <Grid size={{ lg: layout === "row" ? 3 : 12, md: 12, xs: 12 }}>
              {label && (
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
              )}
            </Grid>

            <Grid size={{ lg: layout === "row" ? 9 : 12, md: 12, xs: 12 }}>
              <Box
                sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
              >
                {options.map((option) => (
                  <FormControlLabel
                    key={option.id}
                    control={
                      <CheckBoxInput
                        checked={field.value?.includes(option.id)}
                        onChange={() => {
                          const newValues = field.value?.includes(option.id)
                            ? field.value.filter((v: string) => v !== option.id)
                            : [...(field.value || []), option.id];
                          field.onChange(newValues);
                        }}
                      />
                    }
                    label={option.label}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
