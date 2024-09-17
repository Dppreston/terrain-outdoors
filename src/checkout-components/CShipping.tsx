import { useEffect, useState } from "react";
import { buttonData } from "../functional-components/FuncStatic";
import Button from "../functional-components/Button";
import { CheckOutProps } from "../landing-pages/Checkout";

let shippingBase;

const shippingOptions: { id: number; title: string; price: number }[] = [
  {
    id: 1,
    title: "standard (5-7 days)",
    price: 0,
  },
  {
    id: 2,
    title: "expedited (3-4 days)",
    price: 5,
  },
  {
    id: 3,
    title: "hurried (1-2 days)",
    price: 15,
  },
];

const CShipping = ({ address, receive }: CheckOutProps) => {
  const [selected, setSelected] = useState<number>(0);
  address != undefined ? (shippingBase = address[0][0] + address[0][1]) : 0;

  const handleNext = () => {
    const option = shippingOptions.find((el) => el.id === selected);
    receive(2, option!);
  };

  return (
    <>
      <div className="checkout__component--wrapper shipping">
        {address != undefined ? (
          <div className="shipping__upper">
            <div className="shipping__info--container">
              <h3>Current Address</h3>
              <span>
                <h4>{address[0]}</h4>{" "}
                {address[1] != "null" ? <h4>{address[1]}</h4> : null}
              </span>

              <h4>
                {address[2]}, {address[3]}
              </h4>
              <h4>{address[4]}</h4>
            </div>

            <div className="cost__container">
              <h3>Shipping Option</h3>
              {shippingOptions.map((data) => (
                <div className="shipping__option" key={data.id}>
                  <input
                    type="checkbox"
                    checked={data.id === selected ? !false : false}
                    onChange={() => {
                      setSelected(data.id);
                    }}
                  />
                  <p>{data.title}</p>

                  <p key={data.id}>${data.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <h3>Please fill out the information section</h3>
        )}
        <div className="shipping__lower">
          {buttonData
            .filter((el) => el.identifier === "checkout__next")
            .map((data) => (
              <Button
                buttonProps={data}
                key={data.id}
                individualInactive={selected != 0 ? !false : false}
                individualAction={handleNext}
              />
            ))}
        </div>
      </div>
    </>
  );
};
export default CShipping;
