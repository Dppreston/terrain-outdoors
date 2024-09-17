import logo from "../assets/terrain-new.png";

const Footer = () => {
  return (
    <>
      <div className="footer__wrapper">
        <div className="footer__inner">
          <img src={logo} alt="terain--logo" />
          <span>
            <i className="fa-regular fa-copyright"></i>
            <p> 2024 Terrain Outdoors. All rights reserved.</p>
          </span>
        </div>
      </div>
    </>
  );
};
export default Footer;
