import { useEffect, useState } from "react";
import Button from "../functional-components/Button";
import { buttonData } from "../functional-components/FuncStatic";

const Quantity = (props: {
  value: (value: number, productId?: string) => void;
  initialQuantity?: number;
  productId?: string;
}) => {
  const [count, setCount] = useState<number>(
    props.initialQuantity ? props.initialQuantity : 1
  );

  useEffect(() => {
    if (props.initialQuantity) {
      props.value(count, props.productId);
    } else {
      props.value(count);
    }
  }, [count]);

  return (
    <>
      <div className="quantity__wrapper">
        {buttonData
          .filter((el) => el.identifier == "quantity-min")
          .map((data) => (
            <Button
              buttonProps={data}
              key={data.id}
              individualAction={setCount}
              individualOptions={data.id === 8 && count != 1 ? count - 1 : 1}
            />
          ))}
        <h1>{count}</h1>
        {buttonData
          .filter((el) => el.identifier == "quantity-max")
          .map((data) => (
            <Button
              buttonProps={data}
              key={data.id}
              individualAction={setCount}
              individualOptions={count + 1}
            />
          ))}
      </div>
    </>
  );
};
export default Quantity;
