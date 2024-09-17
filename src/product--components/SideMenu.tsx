import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext, UserContext } from "../App";

type FilterProps = {
  filterProps:
    | {
        brand: string;
        color: string;
        quan?: number;
      }[]
    | any;
  selectedFilters: (val: { title: string; option: string }) => void;
  filterActiveValues: { title: string; option: string }[];
};

const SideMenu = ({
  filterProps,
  selectedFilters,
  filterActiveValues,
}: FilterProps) => {
  const { mediaTwo } = useContext<GlobalContext>(UserContext);
  const options = new Array();
  const [dropdownActive, setDropdownActive] = useState<{ title: string }>();
  const [mobileDropdownActive, setMobileDropdownActive] =
    useState<boolean>(false);
  const keys =
    filterProps != undefined
      ? filterProps.map((data: FilterProps) => Object.keys(data))
      : false;
  const dropdownRef = useRef<any>(null);
  const mDR = useRef<any>(null);

  //handle closing dropdown

  window.addEventListener("click", (e) => {
    if (dropdownRef.current != null) {
      if (!dropdownRef.current?.contains(e.target)) {
        setDropdownActive(undefined);
      }
    }

    // if (mDR.current != null && mobileDropdownActive === !false) {
    //   if (!mDR.current?.contains(e.target)) {
    //     setMobileDropdownActive(false);
    //   }
    // }
  });

  //refactor array for options
  if (filterProps != undefined && keys != false) {
    for (let i = 0; i < keys[0].length; i++) {
      options.push({
        title: keys[0][i],
        options: filterProps.flatMap((data: any) => data[keys[0][i]]),
      });
    }
  }

  return (
    <>
      <div className="side__menu--wrapper" ref={dropdownRef}>
        <div className="active__filters--wrapper">
          <div className="af__top">
            <h6>Filter by</h6>
            {mediaTwo === !false ? (
              <button
                id="mobile__filter--dropdown--btn"
                onClick={() =>
                  mobileDropdownActive === !false
                    ? setMobileDropdownActive(false)
                    : setMobileDropdownActive(!false)
                }
              >
                {mobileDropdownActive === false ? (
                  <i className="fa-solid fa-chevron-right"></i>
                ) : (
                  <i className="fa-solid fa-chevron-down"></i>
                )}
              </button>
            ) : null}
          </div>
          {mediaTwo === false || mobileDropdownActive === !false ? (
            <div className="filter__dropdown--wrapper" ref={mDR}>
              <div className="af__bottom">
                {filterActiveValues.length > 0
                  ? filterActiveValues.map((data) => (
                      <div className="filter__tile" key={data.option}>
                        <button
                          className="fa-solid fa-xmark"
                          onClick={() => {
                            selectedFilters(data);
                            setDropdownActive(undefined);
                          }}
                        ></button>
                        <h5>{data.option}</h5>
                      </div>
                    ))
                  : null}
              </div>

              {keys != false
                ? keys[0].map((titles: string) => (
                    <div className="filter__block--wrapper" key={titles}>
                      <button
                        className="filter__block--button"
                        onClick={() => {
                          if (dropdownActive?.title != titles) {
                            setDropdownActive({ title: titles });
                          } else {
                            setDropdownActive(undefined);
                          }
                        }}
                      >
                        <h3>{titles}</h3>
                        {dropdownActive?.title != titles ? (
                          <i className="fa-solid fa-chevron-right"></i>
                        ) : (
                          <i className="fa-solid fa-chevron-down"></i>
                        )}
                      </button>
                      {dropdownActive?.title == titles ? (
                        <div className="filter__block--dropdown">
                          {options
                            .filter((el) => el.title == dropdownActive.title)
                            .map((data) =>
                              data.options
                                .filter(
                                  (item: string, pos: number) =>
                                    data.options.indexOf(item) == pos
                                )
                                .map((el: string) => (
                                  <div className="filter__option" key={el}>
                                    <input
                                      type="checkbox"
                                      defaultChecked={
                                        filterActiveValues.length > 0 &&
                                        filterActiveValues.find((test) =>
                                          test.option.includes(el)
                                        )
                                          ? true
                                          : false
                                      }
                                      onChange={() =>
                                        selectedFilters({
                                          title: titles,
                                          option: el,
                                        })
                                      }
                                    />
                                    <h4>{el}</h4>
                                  </div>
                                ))
                            )}
                        </div>
                      ) : null}
                    </div>
                  ))
                : null}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};
export default SideMenu;
