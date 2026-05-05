import QueryProvider from "@/app/provider/QueryProvider";
import AppRouter from "@/app/router/AppRouter";
import { ToastContainer } from "react-toastify";

const App = () => {

  return (
    <QueryProvider>
      <AppRouter />
      <ToastContainer
        draggable={true}
        hideProgressBar={true}
        stacked={true}
        theme="light"
      />
    </QueryProvider>
  );
}

export default App;
