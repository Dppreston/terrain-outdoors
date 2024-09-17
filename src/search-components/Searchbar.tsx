import Input from "../functional-components/Input";
import { inputData } from "../functional-components/FuncStatic";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import SearchDropdown from "./SearchDropdown";
import { GlobalContext, UserContext } from "../App";

type SP = {
  _id: string;
  brand: string;
  category: string;
  color: string;
  desc: string;
  previewImg: string[];
  price: string;
  specific: string;
  sub: string;
  title: string;
  reviews: [
    {
      id: string;
      rating: number;
      content: string;
      user: string;
    }
  ];
  sale: [boolean, any];
}[];

type MobileSP = {
  searchActive?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Searchbar = ({ searchActive }: MobileSP) => {
  const [productData, setProductData] = useState<SP>();
  const [active, setActive] = useState<boolean>(false);
  const [existingSD, setExistingSD] = useState<string>();
  const ddRef = useRef<any>();
  const { mediaTwo } = useContext<GlobalContext>(UserContext);

  //handle search

  const handleSearch = async (searchData: string, load?: boolean) => {
    setExistingSD(searchData);
    if (searchData != "") {
      const res = await axios.get(
        `/products?search=true&searchContent=${searchData}&currLength=${productData?.length}&load=${load}`
      );

      setProductData(res.data);
      setActive(!false);
    } else {
      setProductData(undefined);
      setActive(false);
    }
  };

  //load more products

  const handleLoadTrigger = async (res: boolean) => {
    if (res === true) {
      handleSearch(existingSD!, res);
    } else {
      return;
    }
  };

  return (
    <>
      <div className="searchbar__wrapper">
        <div className="searchbar">
          <div className="searchbar__left">
            <i className="fa-solid fa-search"></i>
          </div>
          <div className="searchbar__right">
            {inputData
              .filter((el) => el.identifier == "searchbar")
              .map((data) => (
                <Input inputProps={data} func={handleSearch} key={data.id} />
              ))}
          </div>
        </div>
        {productData != undefined &&
        productData?.length > 0 &&
        active === !false ? (
          <SearchDropdown
            productData={productData}
            ddRef={ddRef}
            loadTrigger={handleLoadTrigger}
            setActive={setActive}
          />
        ) : null}
        {mediaTwo === !false ? (
          <button
            className="fa-solid fa-xmark mobile__search--right"
            onClick={() => {
              searchActive!(false);
            }}
          ></button>
        ) : null}
      </div>
    </>
  );
};
export default Searchbar;
