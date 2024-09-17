import { buttonData } from "../functional-components/FuncStatic";
import Quantity from "../support-components/Quantity";
import Button from "../functional-components/Button";
import { useContext } from "react";
import { GlobalContext, UserContext } from "../App";
import Loader from "../support-components/Loader";
import missingPI from "../assets/missingpi.png";

type CWProps = {
  itemData?: {
    _id: string;
    price: number;
    previewImg: string;
    title: string;
    quantity?: number;
  };
  receiveFunction?: (value: number, productId?: string | undefined) => void;
  actionFunction?: Function;
};

const CWItemTile = ({ itemData, receiveFunction, actionFunction }: CWProps) => {
  const { loading } = useContext<GlobalContext>(UserContext);
  return (
    <>
      <div className="cart__item" key={itemData?._id}>
        <img
          src={itemData?.previewImg ? itemData?.previewImg : missingPI}
          id="cart__preview--img"
        />
        <div className="ci__content--container">
          <h4>{itemData?.title}</h4>
          <div className="cicc__lower">
            <h5>{itemData?.price}</h5>
            {receiveFunction != undefined ? (
              <Quantity
                value={receiveFunction}
                initialQuantity={itemData?.quantity}
                productId={itemData?._id}
              />
            ) : null}

            {buttonData
              .filter((el) => el.identifier === "cart__preview--remove")
              .map((btn) => (
                <Button
                  buttonProps={btn}
                  key={btn.id}
                  individualAction={actionFunction}
                  individualOptions={itemData?._id}
                />
              ))}
          </div>
        </div>
        {loading === 3 ? <Loader /> : null}
      </div>
    </>
  );
};
export default CWItemTile;
