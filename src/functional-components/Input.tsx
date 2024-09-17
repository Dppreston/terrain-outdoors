import { useEffect, useRef, useState } from "react";
import InputCounter from "./InputCounter";
import { statesArray, yrs, months } from "../checkout-components/orderStatic";

type InputProps = {
  inputProps: {
    id: number;
    placeholder?: string;
    type: string;
    label: string;
    required?: boolean;
    limit?: number;
    noCounter?: boolean;
    additional?: string;
    dropdown?: boolean;
    dropdownIdentifier?: string;
  };
  func?: Function;
  multipleValues?: (value: { label: string; value: string }) => void;
  initialValue?: any;
};

const Input = ({
  inputProps,
  func,
  multipleValues,
  initialValue,
}: InputProps) => {
  const [count, setCount] = useState<number>(0);
  const [ddInit, setDDinit] = useState<string>("--");
  const [active, setActive] = useState<string>();
  const dR = useRef<any>();

  //close menu

  window.addEventListener("mousedown", (e) => {
    if (dR.current != null) {
      if (!dR.current.contains(e.target)) {
        setActive("");
      }
    }
  });

  useEffect(() => {
    setActive("");
  }, [ddInit]);

  return (
    <>
      {inputProps.label == "" ? (
        <input
          key={inputProps.id}
          type={inputProps.type}
          className="input__other"
          onChange={(e) => {
            func!(e.currentTarget.value);
          }}
        />
      ) : !inputProps.dropdown ? (
        <div className="input__main--label">
          <span className="label__top">
            <span>
              <h5>{inputProps.label}</h5>
              {inputProps.required != undefined ? "*" : null}
            </span>
            {inputProps.additional ? <p>{inputProps.additional}</p> : null}
          </span>
          <input
            key={inputProps.id}
            type={inputProps.type}
            className="input__main"
            maxLength={inputProps.limit ? inputProps.limit : undefined}
            defaultValue={initialValue != undefined ? initialValue : undefined}
            onChange={(e) => {
              setCount(e.currentTarget.value.length);
              multipleValues != undefined
                ? multipleValues!({
                    label: inputProps.label!,
                    value: e.currentTarget.value!,
                  })
                : null;
            }}
          />
          {inputProps.limit && !inputProps.noCounter ? (
            <InputCounter count={count} limit={inputProps.limit} />
          ) : null}
        </div>
      ) : (
        /// dropdown input ////
        <div className="input__main--label">
          <span className="label__top">
            <span>
              <h5>{inputProps.label}</h5>
              {inputProps.required != undefined ? "*" : null}
            </span>
            {inputProps.additional ? <p>{inputProps.additional}</p> : null}
          </span>
          <div
            id="dropdown__select--btn"
            onClick={() => {
              setActive(inputProps.label);
            }}
          >
            <h4>{ddInit}</h4>
            {inputProps.label === active ? (
              <div className="order__dropdown--wrapper" ref={dR}>
                {inputProps.dropdownIdentifier === "states"
                  ? statesArray.map((data: { abbrev: string }) => (
                      <button
                        key={data.abbrev}
                        onClick={(e) => {
                          setDDinit(e.currentTarget.textContent!);
                          setActive(undefined);
                          multipleValues != undefined
                            ? multipleValues!({
                                label: inputProps.label!,
                                value: e.currentTarget.textContent!,
                              })
                            : null;
                        }}
                      >
                        {data.abbrev}
                      </button>
                    ))
                  : inputProps.dropdownIdentifier === "months"
                  ? months.map((data) => (
                      <button
                        key={data}
                        onClick={(e) => {
                          setDDinit(e.currentTarget.textContent!);
                          setActive("");
                          multipleValues != undefined
                            ? multipleValues!({
                                label: inputProps.label!,
                                value: e.currentTarget.textContent!,
                              })
                            : null;
                        }}
                      >
                        {data}
                      </button>
                    ))
                  : inputProps.dropdownIdentifier === "years"
                  ? yrs.map((data) => (
                      <button
                        key={data}
                        onClick={(e) => {
                          setDDinit(e.currentTarget.textContent!);
                          setActive("");
                          multipleValues != undefined
                            ? multipleValues!({
                                label: inputProps.label!,
                                value: e.currentTarget.textContent!,
                              })
                            : null;
                        }}
                      >
                        {data}
                      </button>
                    ))
                  : null}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};
export default Input;
