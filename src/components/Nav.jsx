import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarcode, faBars } from "@fortawesome/free-solid-svg-icons";

function Nav() {
  return (
    <nav className="p-5 bg-white flex justify-between">
      <div></div>
      <FontAwesomeIcon color="black" size="2xl" icon={faBarcode} />
      <FontAwesomeIcon color="black" size="2xl" icon={faBars} />
    </nav>
  );
}

export default Nav;
