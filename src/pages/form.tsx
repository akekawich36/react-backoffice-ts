import App from "@/components";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";

const form = () => {
  const methods = useForm({
    defaultValues: {
      role: "",
    },
  });
  return (
    <>
      <App.MainCard title="testtest">
        <App.Form.FormProvider
          methods={methods}
          onSubmit={methods.handleSubmit((record) => {
            console.log(record);
          })}
          layout="row"
        >
          <Grid container spacing={2}>
            <Grid size={6}>
              <App.Form.TextField
                name="firstName"
                label="Firstname"
                isRequired
              />
            </Grid>

            <Grid size={6}>
              <App.Form.TextField name="lastName" label="Lastname" isRequired />
            </Grid>

            <Grid size={6}>
              <App.Form.Select
                name="role"
                label="Role"
                isRequired
                options={[
                  { value: "admin", label: "Administrator" },
                  { value: "editor", label: "Editor" },
                ]}
              />
            </Grid>

            <Grid size={6}>
              <App.Form.Radio
                name="gender"
                label="Gender"
                isRequired
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
              />
            </Grid>

            <Grid size={6}>
              <App.Form.CheckBoxGroup
                name="interests"
                label="Interests"
                isRequired
                options={[
                  { id: "tech", label: "Technology" },
                  { id: "sports", label: "Sports" },
                  { id: "art", label: "Art" },
                  { id: "music", label: "Music" },
                ]}
              />
            </Grid>

            <Grid size={6}>
              <App.Form.Autocomplete
                name="country"
                label="Country"
                isRequired
                options={[
                  { code: "US", label: "United States", phone: "1" },
                  { code: "GB", label: "United Kingdom", phone: "44" },
                ]}
              />
            </Grid>

            <Grid size={6}>
              <App.Form.CheckBox
                name="agreesToTerms"
                label="I agree to the terms and conditions"
                isRequired
              />
            </Grid>
          </Grid>
        </App.Form.FormProvider>
      </App.MainCard>
    </>
  );
};

export default form;
