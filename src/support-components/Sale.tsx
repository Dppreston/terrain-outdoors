type SaleProps = {
  pfinal?: [boolean, number];
};

const Sale = ({ pfinal }: SaleProps) => {
  return (
    <>
      <div
        className="product__sale"
        style={pfinal! ? { position: "unset" } : undefined}
      >
        <h6>SALE</h6>
      </div>
    </>
  );
};
export default Sale;
