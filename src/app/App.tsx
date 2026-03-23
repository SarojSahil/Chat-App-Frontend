import QueryProvider from "./provider/QueryProvider";
import AppRouter from "./route/AppRouter";

const App = () => {

  return (
    <QueryProvider>
        <AppRouter />
    </QueryProvider>
  );
}

export default App;