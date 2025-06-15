import {
  FormControlLabel,
  FormControl,
  FormHelperText,
  Checkbox as CheckBoxInput,
} from "@mui/material";
import { Controller, FieldValues, Path } from "react-hook-form";
import { useFormContext } from "../../Context/FormProvider";

interface CheckboxProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  isRequired?: boolean;
}
export const CheckBox = <T extends FieldValues>({
  name,
  label,
  isRequired,
}: CheckboxProps<T>) => {
  const { methods } = useFormContext();
  return (
    <Controller
      name={name}
      control={methods?.control}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={!!error} component="fieldset">
          <FormControlLabel
            control={
              <CheckBoxInput {...field} checked={field.value || false} />
            }
            label={
              <>
                {label}
                {isRequired && (
                  <span style={{ color: "#d32f2f", marginLeft: "2px" }}>*</span>
                )}
              </>
            }
          />
          {error && (
            <FormHelperText sx={{ ml: 0 }}>{error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};
