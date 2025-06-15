import Axios from "@/utils/axios";

import MainCard from "./UI/MainCard";

import { FormProvider } from "./Context/FormProvider";
import InputField from "./Input";

const App = {
  axios: Axios,

  MainCard,

  Form: {
    FormProvider,
    ...InputField,
  },
};

export default App;
