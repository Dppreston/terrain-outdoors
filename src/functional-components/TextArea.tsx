import { useState } from "react";
import InputCounter from "./InputCounter";

type TAProps = {
  taProps: {
    id: number;
    placeholder?: string;
    label?: string;
    required?: boolean;
    limit?: number;
  };
  func?: Function;
  multipleValues?: (value: { label: string; value: string }) => void;
};

const TextArea = ({ taProps, multipleValues }: TAProps) => {
  const [count, setCount] = useState<number>(0);
  return (
    <>
      {taProps.label ? (
        <div className="input__main--label text__area--label">
          <span>
            <h5>{taProps.label}</h5>
            {taProps.required != undefined ? "*" : null}
          </span>
          <textarea
            key={taProps.id}
            className="input__main text__area--main"
            onChange={(e) => {
              setCount(e.currentTarget.value.length);
              multipleValues != undefined
                ? multipleValues!({
                    label: taProps.label!,
                    value: e.currentTarget.value!,
                  })
                : null;
            }}
            maxLength={taProps.limit ? taProps.limit : undefined}
          />
          {taProps.limit ? (
            <InputCounter limit={taProps.limit} count={count} />
          ) : null}
        </div>
      ) : null}
    </>
  );
};
export default TextArea;
