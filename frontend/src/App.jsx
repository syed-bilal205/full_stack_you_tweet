import { Outlet } from "react-router-dom";
import Container from "./container/Container";

const App = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};
export default App;
