import { useRef, useState } from "react";

type SortProps = {
  productLength: number;
  selection: (value: number, selectedPage?: number) => void;
  page: number;
};

const sortOptions: { id: number; title: string }[] = [
  {
    id: 1,
    title: "Reset",
  },
  {
    id: 2,
    title: "price high-low",
  },
  {
    id: 3,
    title: "price low-high",
  },
  {
    id: 4,
    title: "top rated",
  },
];

const ProductSort = ({ productLength, selection, page }: SortProps) => {
  const [active, setActive] = useState<boolean>(false);
  const [currentSelectionText, setCurrentSelectionText] =
    useState<string>("Sort Products");
  const sdRef = useRef<any>();

  window.addEventListener("mousedown", (e) => {
    if (sdRef.current != undefined) {
      if (active && !sdRef.current.contains(e.target)) {
        setActive(false);
      }
    }
  });

  return (
    <>
      <div className="sort__container">
        <h3>Showing {productLength} Items</h3>
        <div className="sort__button--wrapper">
          <button
            id="sort__dropdown--button"
            onClick={() => {
              setActive(!false);
            }}
          >
            {currentSelectionText}
            <i
              className={
                active == false
                  ? "fa-solid fa-chevron-right"
                  : "fa-solid fa-chevron-down"
              }
            ></i>
          </button>
          {active == !false ? (
            <div className="sort__dropdown--wrapper" ref={sdRef}>
              {sortOptions.map((data) => (
                <button
                  id="sort__option"
                  key={data.id}
                  onClick={() => {
                    selection(data.id, page);
                    setCurrentSelectionText(
                      sortOptions.indexOf(data) != 0
                        ? data.title
                        : "Sort Products"
                    ),
                      setActive(false);
                  }}
                >
                  {data.title}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};
export default ProductSort;
