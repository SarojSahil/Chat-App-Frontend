import QueryProvider from "@/app/provider/QueryProvider";
import AppRouter from "@/app/router/AppRouter";

const App = () => {

  return (
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  );
}

export default App;