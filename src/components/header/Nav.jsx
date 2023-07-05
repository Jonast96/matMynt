import logo from "../../..//public/icons/logo_transparent.png";

function Nav() {
  return (
    <>
      <div className="bg-white  flex place-items-center">
        <img className="w-16" src={logo} alt="" />
        <h1 className="font-bold text-2xl text-primary">MatMynt 1.0</h1>
      </div>
    </>
  );
}
export default Nav;
