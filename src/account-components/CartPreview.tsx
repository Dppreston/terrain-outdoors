import { useContext, useEffect, useState } from "react";
import { GlobalContext, UserContext } from "../App";
import { buttonData } from "../functional-components/FuncStatic";
import Button from "../functional-components/Button";
import axios from "axios";
import CWItemTile from "./CWItemTile";

type CartData = {
  _id: string;
  price: number;
  previewImg: string;
  title: string;
  quantity: number;
}[];

type ShippingProps = {
  shipping?: {
    id: number;
    title: string;
    price: number;
  };
  retrieveCart?: (data: any) => void;
  emptyCart?: (res: boolean) => void;
  checkoutTrigger?: boolean;
  cRef?: React.MutableRefObject<any>;
};
let sum = 0;
const CartPreview = ({
  shipping,
  retrieveCart,
  emptyCart,
  checkoutTrigger,
  cRef,
}: ShippingProps) => {
  const { userData, setLoading } = useContext<GlobalContext>(UserContext);
  const [cartData, setCartData] = useState<CartData>();

  //init cart

  const initCart = async () => {
    if (userData != undefined) {
      let cartIds = userData.cart.flatMap((data) => data.productId);
      let cartQuan = userData.cart.flatMap((data) => data.quantity);

      const res = await axios.get(
        `/products?initCart=true&productId=${cartIds}&quantity=${cartQuan}`
      );
      if (res.data.length > 0) {
        setCartData(res.data);
        calcTotal(res.data);
      } else {
        setCartData(undefined);
        emptyCart != undefined ? emptyCart(!false) : null;
      }
    } else {
      let localCartData = JSON.parse(localStorage.getItem("cart")!);
      if (localCartData != null) {
        let cartIds = localCartData.flatMap(
          (data: { productId: string }) => data.productId
        );
        let cartQuan = localCartData.flatMap(
          (data: { quan: number }) => data.quan
        );
        const res = await axios.get(
          `/products?initCart=true&productId=${cartIds}&quantity=${cartQuan}`
        );

        if (res.data.length > 0) {
          setLoading(0);
          setCartData(res.data);
          calcTotal(res.data);
        } else {
          setCartData(undefined);
        }
      }
    }
  };

  const calcTotal = (data: { price: number; quantity: number }[]) => {
    sum = 0;
    let totals = data.flatMap((data) => data.price * data.quantity);

    for (let i = 0; i < data.length; i++) {
      sum += totals[i];
    }
  };

  // //subtotal

  const removeItem = async (productId: string) => {
    if (userData != undefined) {
      setLoading(3);
      const res = await axios.put(
        `/users?removeCart=true&productId=${productId}&userId=${userData._id}`
      );
      if (res.data === !false) {
        setTimeout(() => {
          setLoading(0);
          retrieveCart!(undefined);
        }, 1000);
      }
    } else {
      window.deleteLCI(productId);
      setTimeout(() => {
        initCart();
      }, 1000);
    }
  };

  //recieve and update quan

  const recieveQuantity = async (value: number, productId?: string) => {
    if (userData != undefined) {
      setLoading(3);
      const res = await axios.put(
        `/users?updateQuan=true&quantity=${value}&userId=${userData._id}&productId=${productId}`
      );
      if (res.data === !false) {
        setTimeout(() => {
          setLoading(0);
        }, 1000);
      }
    } else {
      window.updateLocalCartQuan([value, productId]);
      setTimeout(() => {
        setLoading(0);
        initCart();
      }, 1000);
    }
  };

  useEffect(() => {
    initCart();
  }, [userData]);

  useEffect(() => {
    let orderCartData = new Array();
    if (shipping != undefined && cartData != undefined) {
      orderCartData = [];
      for (let i = 0; i < cartData?.length; i++) {
        orderCartData.push({
          _id: cartData[i]._id,
          price: cartData[i].price,
          quan: cartData[i].quantity,
        });
      }

      retrieveCart!({
        data: orderCartData,
        total: (sum + sum * 0.06 + shipping.price).toFixed(2),
      });
    }
  }, [shipping]);

  return (
    <>
      <div className="cart__preview--wrapper" ref={cRef ? cRef : null}>
        <h3 className="cp__title">Your Cart</h3>
        {cartData != undefined && cartData.length > 0 ? (
          <div className="cp__inner">
            <div className="cp__inner--items--wrapper">
              {cartData != undefined
                ? cartData?.map((data) => (
                    <CWItemTile
                      key={data._id}
                      itemData={data}
                      receiveFunction={recieveQuantity}
                      actionFunction={removeItem}
                    />
                  ))
                : null}
            </div>

            <div className="subtotal__container">
              <span>
                <h3>Shipping</h3>
                {shipping != undefined && shipping.price === 0 ? (
                  <h4>Free Shipping</h4>
                ) : shipping != undefined && shipping.price != 0 ? (
                  <h3>${shipping.price.toFixed(2)}</h3>
                ) : (
                  <h4>Calculated at checkout</h4>
                )}
              </span>
              <span>
                <h3>Tax</h3>
                <h3>${(sum * 0.06).toFixed(2)}</h3>
              </span>
              <span>
                {shipping === undefined ? <h3>SubTotal</h3> : <h3>Total</h3>}

                <h3>
                  $
                  {shipping == undefined
                    ? (sum + sum * 0.06).toFixed(2)
                    : (sum + sum * 0.06 + shipping.price).toFixed(2)}
                </h3>
              </span>
              {!checkoutTrigger
                ? buttonData
                    .filter((el) => el.identifier == "checkout")
                    .map((data) => (
                      <Button
                        buttonProps={data}
                        key={data.id}
                        individualAction={window.navigation}
                        individualOptions={{ singlePath: "checkout" }}
                      />
                    ))
                : null}
            </div>
          </div>
        ) : (
          <div className="empty__cart">
            <h2>Your cart is empty</h2>
            <i className="fa-regular fa-face-sad-tear"></i>
            <h4>Get out there and get shopping!</h4>
          </div>
        )}
      </div>
    </>
  );
};
export default CartPreview;
