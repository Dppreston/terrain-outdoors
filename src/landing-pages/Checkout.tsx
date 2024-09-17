import { useContext, useEffect, useState } from "react";
import { GlobalContext, UserContext } from "../App";
import CartPreview from "../account-components/CartPreview";
import CInformation from "../checkout-components/CInformation";
import CShipping from "../checkout-components/CShipping";
import CPayment from "../checkout-components/CPayment";
import axios from "axios";
import Loader from "../support-components/Loader";

const CDOptions: { id: number; title: string }[] = [
  {
    id: 1,
    title: "Information",
  },
  { id: 2, title: "Shipping" },
  {
    id: 3,
    title: "Payment",
  },
  {
    id: 4,
    title: "Success",
  },
];

export type CheckOutProps = {
  enteredInfo?: {
    [key: string]: string | undefined;
    first: string;
    last: string;
    email: string;
    address: string;
    apt: string;
    city: string;
    state: string;
    zip: string;
  };
  receive: (id: number, value: object) => void;
  address?: string[] | any;
};

// type CartDataFinal =  {
//   cartData
// }

const checkoutInfoStructure: { id: number; data: object | undefined }[] = [
  {
    id: 1,
    data: undefined,
  },
  {
    id: 2,
    data: undefined,
  },
  {
    id: 3,
    data: undefined,
  },
];

let shippingAddress = new Array();
let checkoutInfoFinal = new Array();

const Checkout = () => {
  const { setLoading, loading, userData } =
    useContext<GlobalContext>(UserContext);
  const [active, setActive] = useState<number>(1);
  const [cartDataFinal, setCartDataFinal] =
    useState<{ _id: string; price: number; quan: string }[]>();
  const [total, setTotal] = useState<number>();
  const [cartEmpty, setCartEmpty] = useState<boolean>(false);

  //recieve info from components

  const recieveInfo = (id: number, value: object) => {
    //init shipping address && checkout info

    shippingAddress = [];
    checkoutInfoFinal = [];

    //init checkout final Array

    const checkoutTemp = Object.entries(checkoutInfoStructure);

    for (let i = 0; i < checkoutTemp.length; i++) {
      if (checkoutTemp[i][1].id === id) {
        checkoutTemp[i][1].data = value;

        const checkoutFinal = Object.fromEntries(checkoutTemp);
        checkoutInfoFinal.push(checkoutFinal);
      }
    }

    //setShipping data

    shippingAddress.push(
      checkoutInfoFinal[0][0].data.address,
      checkoutInfoFinal[0][0].data.apt,
      checkoutInfoFinal[0][0].data.city,
      checkoutInfoFinal[0][0].data.state,
      checkoutInfoFinal[0][0].data.zip
    );

    // set actives

    if (
      checkoutInfoFinal[0][0].data != undefined &&
      checkoutInfoFinal[0][1].data === undefined
    ) {
      setActive(2);
    } else {
      setActive(3);
    }

    //trigger order submit

    if (
      checkoutInfoFinal[0][0].data != undefined &&
      checkoutInfoFinal[0][1].data != undefined &&
      checkoutInfoFinal[0][2].data != undefined
    ) {
      submitOrder();
    }
  };

  //retrieve cart

  const retrieveCart = (
    data:
      | {
          data: Array<{ _id: string; price: number; quan: string }>;
          total: number;
        }
      | undefined
  ) => {
    if (data != undefined) {
      setCartDataFinal(data.data);
      setTotal(data.total);
    }
  };

  const submitOrder = async () => {
    setLoading(6);
    const res = await axios.post(
      `/orders?submitOrder=true&info=${JSON.stringify(
        checkoutInfoFinal[0][0].data
      )}&shipping=${JSON.stringify(
        checkoutInfoFinal[0][1].data
      )}&payment=${JSON.stringify(
        checkoutInfoFinal[0][2].data
      )}&cart=${JSON.stringify(cartDataFinal)}&total=${total}`
    );
    if (res.data === true) {
      setTimeout(() => {
        setLoading(0);
        setActive(4);
        clearCart();

        setTimeout(() => {
          window.navigation({ singlePath: "home" });
        }, 500);
      }, 1000);
    }
  };

  const clearCart = async () => {
    if (userData !== undefined) {
      await axios.put(`/users?clearCart=true&userId=${userData._id}`);
    } else {
      localStorage.clear();
    }
  };

  const handleEmptyCart = (res: boolean) => {
    setCartEmpty(res);
  };

  return (
    <>
      {loading === 6 ? <Loader /> : null}
      {cartEmpty === false ? (
        <div className="cart__page--wrapper">
          <div className="checkout__process--wrapper">
            <h6>Checkout</h6>
            {CDOptions.map((data) => (
              <div className="checkout__dropdown--wrapper" key={data.id}>
                <button
                  id="checkout__dropdown--btn"
                  style={
                    active === data.id
                      ? { background: "var(--accent-blue)", color: "var(--bg)" }
                      : { background: "var(--blur-bg)", opacity: ".5" }
                  }
                  onClick={() => {
                    if (
                      data.id === 2 &&
                      checkoutInfoFinal[0][0].data != undefined
                    ) {
                      setActive(2);
                    } else if (
                      data.id === 3 &&
                      checkoutInfoFinal[0][1].data != undefined
                    ) {
                      setActive(3);
                    } else {
                      setActive(1);
                    }
                  }}
                >
                  <h6
                    style={
                      active === data.id ? { color: "var(--bg)" } : undefined
                    }
                  >
                    {data.title}
                  </h6>
                  <i
                    className={
                      active === data.id
                        ? "fa-solid fa-chevron-down"
                        : "fa-solid fa-chevron-right"
                    }
                    style={
                      active === data.id ? { color: "var(--bg)" } : undefined
                    }
                  ></i>
                </button>
                {active === data.id ? (
                  <div className="checkout__dropdown">
                    {data.id === 1 ? (
                      <CInformation
                        receive={recieveInfo}
                        enteredInfo={
                          checkoutInfoFinal[0] != undefined
                            ? checkoutInfoFinal[0][0].data
                            : undefined
                        }
                      />
                    ) : null}
                    {active === 2 ? (
                      <CShipping
                        receive={recieveInfo}
                        address={
                          shippingAddress.length != 0
                            ? shippingAddress
                            : undefined
                        }
                      />
                    ) : null}
                    {active === 3 ? <CPayment receive={recieveInfo} /> : null}
                    {active === 4 ? (
                      <div className="order__success">
                        <h6>Thank you for your order!</h6>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <div className="cart__summary--wrapper">
            <h6>Cart</h6>
            <CartPreview
              shipping={
                checkoutInfoFinal[0] != undefined &&
                checkoutInfoFinal[0][1] != undefined
                  ? checkoutInfoFinal[0][1].data
                  : undefined
              }
              retrieveCart={retrieveCart}
              emptyCart={handleEmptyCart}
              checkoutTrigger={true}
            />
          </div>
        </div>
      ) : (
        <div className="checkout__empty--wrapper">
          <h6>Your cart is empty</h6>
          <i className="fa-solid fa-0"></i>
          <h3>Get out there and get shopping</h3>
        </div>
      )}
    </>
  );
};
export default Checkout;
