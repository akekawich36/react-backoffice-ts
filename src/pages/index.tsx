import App from "@/components";

import { Button, Box } from "@mui/material";

const MainPage = () => {
  const testFetching = async () => {
    const res = await App.axios.get("/testing")
    console.log("🚀 ~ testFetching ~ res:", res)
  };

  return (
    <>
      <Box>
        <Button onClick={testFetching} variant="contained">Download</Button>
      </Box>
    </>
  );
};

export default MainPage;
