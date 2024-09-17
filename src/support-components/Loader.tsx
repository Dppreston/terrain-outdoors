import loader from "../assets/terrainloader.gif";

const Loader = () => {
  return (
    <>
      <div className="loader__wrapper">
        <div className="loader__blur"></div>
        <img src={loader} alt="loader" id="loader" />
      </div>
    </>
  );
};
export default Loader;
