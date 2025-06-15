import {
  FormControl,
  FormLabel,
  FormHelperText,
  Stack,
  Grid,
  Autocomplete as AutocompleteInput,
  TextField,
} from "@mui/material";
import { Controller, FieldValues, Path } from "react-hook-form";
import { useFormContext } from "../../Context/FormProvider";

interface AutocompleteProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  options: readonly { label: string; [key: string]: any }[];
  isRequired?: boolean;
}

export const Autocomplete = <T extends FieldValues>({
  name,
  label,
  options,
  isRequired,
}: AutocompleteProps<T>) => {
  const { methods, layout } = useFormContext();
  return (
    <Controller
      name={name}
      control={methods?.control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <Grid container spacing={0.5}>
            <Grid size={{ lg: layout === "row" ? 3 : 12, md: 12, xs: 12 }}>
              <Stack justifyContent="center" sx={{ height: "100%" }}>
                <FormLabel htmlFor={name}>
                  {label}
                  {isRequired && (
                    <span style={{ color: "#d32f2f", marginLeft: "2px" }}>
                      *
                    </span>
                  )}
                </FormLabel>
              </Stack>
            </Grid>
            <Grid size={{ lg: layout === "row" ? 9 : 12, md: 12, xs: 12 }}>
              <AutocompleteInput<{ label: string; [key: string]: any }>
                options={options}
                getOptionLabel={(option) => option.label || ""}
                isOptionEqualToValue={(option, val) =>
                  option.label === val.label
                }
                value={value}
                onChange={(_, newValue) => onChange(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!error}
                    placeholder={`Select ${label?.toLowerCase()}`}
                  />
                )}
              />
            </Grid>
          </Grid>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
