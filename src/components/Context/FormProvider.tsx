import { createContext, useContext, FormHTMLAttributes } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { styled, Paper, Stack, Button } from "@mui/material";

const Form = styled("form")<FormHTMLAttributes<HTMLFormElement>>();

interface FormContextType<T extends FieldValues> {
  methods: UseFormReturn<T>;
  layout: "row" | "column";
}

const FormContext = createContext<FormContextType<any> | null>(null);

export const useFormContext = <T extends FieldValues>(): FormContextType<T> => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

interface FormProviderProps<T extends FieldValues> {
  children: React.ReactNode;
  methods: UseFormReturn<T>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isShowAction?: boolean;
  layout?: "row" | "column";
}
export const FormProvider = <T extends FieldValues>({
  children,
  methods,
  onSubmit,
  isShowAction = true,
  layout = "column",
}: FormProviderProps<T>) => {
  return (
    <FormContext.Provider value={{ methods, layout }}>
      <Form onSubmit={onSubmit}>
        <Stack spacing={2}>
          {children}

          {isShowAction && (
            <Paper
              sx={{
                position: "sticky",
                bottom: 0,
                zIndex: 50,
                padding: 2,
              }}
            >
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                {true && (
                  <Button variant="outlined" onClick={() => {}}>
                    ละทิ้ง
                  </Button>
                )}
                <Button type="submit">บันทึก</Button>
              </Stack>
            </Paper>
          )}
        </Stack>
      </Form>
    </FormContext.Provider>
  );
};
