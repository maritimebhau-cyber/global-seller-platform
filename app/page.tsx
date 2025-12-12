import HomeComponent from "./component/Home/Home";
import Navbar from "./component/NavBar/NavBar";
import Footer from "./component/Footer/Footer";

export default function HomePage() {
  return (
    <>
    <Navbar />
      <HomeComponent />
      <Footer/>
    </>
  );
}
 