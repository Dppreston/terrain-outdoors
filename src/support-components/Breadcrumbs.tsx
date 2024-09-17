type BreadcrumbProps = {
  params: (string | null)[];
};

const Breadcrumbs = ({ params }: BreadcrumbProps) => {
  const breadcumbsNavigation = (data: string) => {
    const pos = params.indexOf(data);

    if (pos == 0) {
      window.navigation({
        navProps: {
          master: "products",
          category: params[pos],
        },
      });
    }

    if (pos == 1) {
      window.navigation({
        navProps: {
          master: "products",
          category: params[0],
          sub: params[1],
        },
      });
    }
    if (pos == 2) {
      window.navigation({
        navProps: {
          master: "products",
          category: params[0],
          sub: params[1],
          specific: params[2],
        },
      });
    }
  };
  return (
    <div className="breadcrumbs">
      {params
        .filter((el) => el != null)
        .map((data) => (
          <button key={data} onClick={() => breadcumbsNavigation(data)}>
            <h5>
              {data} <i className="fa-solid fa-chevron-right"></i>
            </h5>
          </button>
        ))}
    </div>
  );
};
export default Breadcrumbs;
