import { subOptions } from "../nav-components/NavStatic";

type GridProps = {
  category?: string | undefined;
  sub?: string | undefined;
};

const CategoryGrid = ({ category }: GridProps) => {
  return (
    <>
      <div className="category__grid--wrapper">
        {subOptions
          .filter((el) => el.title === category)
          .map((data) =>
            data.block.map((data2) => (
              <button
                className="category__tile"
                key={data2.id}
                onClick={() => {
                  window.navigation({
                    navProps: {
                      master: "products",
                      category: category,
                      sub: data2.subTitle,
                    },
                  });
                }}
              >
                <img src={data2.img} alt="cat__img" id="category__img" />
                <div className="category__tile--text--wrapper">
                  <h6>{data2.subTitle}</h6>
                </div>
              </button>
            ))
          )}
      </div>
    </>
  );
};
export default CategoryGrid;
