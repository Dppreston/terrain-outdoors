import { useContext, useState } from "react";
import { buttonData } from "../functional-components/FuncStatic";
import Button from "../functional-components/Button";
import { GlobalContext, UserContext } from "../App";

const EnlargedImg = (imgs: { imgs: string[] | undefined }) => {
  const { setEnlargedPI } = useContext<GlobalContext>(UserContext);
  const [currentImg, setCurrentImg] = useState<number>(0);

  return (
    <>
      <div className="blur__wrapper">
        {buttonData
          .filter((el) => el.identifier === "cancel")
          .map((data) => (
            <Button
              buttonProps={data}
              key={data.id}
              individualAction={setEnlargedPI}
              individualOptions={undefined}
            />
          ))}
        <div className="ei__wrapper">
          <button
            style={
              imgs.imgs!.length == 1
                ? { opacity: ".5", pointerEvents: "none" }
                : undefined
            }
            onClick={() =>
              currentImg != 0 ? setCurrentImg(currentImg - 1) : null
            }
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <div className="ei__img--wrapper">
            <img src={imgs.imgs![currentImg]} alt="ei__image" id="ei__img" />
          </div>
          <button
            style={
              imgs.imgs!.length == 1
                ? { opacity: ".5", pointerEvents: "none" }
                : undefined
            }
            onClick={() =>
              currentImg != imgs.imgs!.length
                ? setCurrentImg(currentImg + 1)
                : null
            }
          >
            {" "}
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </>
  );
};
export default EnlargedImg;
