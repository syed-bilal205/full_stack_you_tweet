/* eslint-disable react/prop-types */
import { Navbar, Footer } from "../components";
const Container = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container  mx-auto max-w-full">{children}</div>
      <Footer />
    </>
  );
};

export default Container;
