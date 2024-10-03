import NavBar from "./NavBar";
import logo from "../../assets/logo.png";
const Header = () => {
  return (
    <header className="lg:col-span-full lg:p-4 bg-white flex items-center justify-between">
      <div className="bg-customSteelblue lg:w-28 lg:h-28 lg:rounded-3xl flex  ">
        <img src={logo} className="object-cover lg:w-28 lg:h-28" alt="" />
      </div>

      <NavBar />
    </header>
  );
};

export default Header;
