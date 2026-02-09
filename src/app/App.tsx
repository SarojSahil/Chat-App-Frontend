import QueryProvider from "./provider/QueryProvider";
import { AuthProvider } from "./context/authContext/AuthContext";
import AppRouter from "./route/AppRouter";

const App = () => {

  return (
    <QueryProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </QueryProvider>
  );
}

export default App;