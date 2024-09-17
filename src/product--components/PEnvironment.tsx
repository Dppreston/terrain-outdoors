import { useParams } from "react-router-dom";
import SideMenu from "./SideMenu";
import ProductGrid from "./ProductGrid";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import ProductSort from "./ProductSort";
import { GlobalContext, UserContext } from "../App";
import Loader from "../support-components/Loader";

type Product = {
  _id: string;
  brand: string;
  category: string;
  color: string;
  desc: string;
  previewImg: string;
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
  sale: [boolean, number];
}[];

type FilterOptions = {
  brand: string;
  color: string;
}[];

let filtersArray = new Array();

const PEnvironment = () => {
  const { setLoading, loading } = useContext<GlobalContext>(UserContext);
  const { sub } = useParams();
  const [productData, setProductData] = useState<Product>();
  const [filterOptions, setFilterOptions] = useState<FilterOptions>();
  const [sideFilterdata, setSideFilterData] =
    useState<{ _id: string; brand: string; color: string }[]>();
  const [pageLength, setPageLength] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const topRef = useRef<any>();

  //init PD

  const initPD = async (selectedPage?: number, sortOption?: number) => {
    setLoading(5);
    try {
      const res = await axios.get(
        `/products?pEnv=true&sub=${sub}&selectedPage=${selectedPage}&sortSelection=${sortOption}`
      );

      setTimeout(() => {
        setLoading(0);
        setProductData(res.data[0]);
        setSideFilterData(res.data[1]);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  //filter PD

  const filteredPD = async (selectedPage?: number) => {
    setLoading(5);
    const res = await axios.get(
      `/products?filterProducts=true&filters=${JSON.stringify(
        filtersArray
      )}&sub=${sub}&selectedPage=${selectedPage}`
    );
    if (res.data.length > 0) {
      setTimeout(() => {
        setLoading(0);
        setProductData(res.data);
      }, 1000);
    } else if (filtersArray.length > 0) {
      setProductData(undefined);
    } else {
      initPD(1);
    }
  };

  //init filters for side menu

  const initFilter = () => {
    if (sideFilterdata != undefined && filtersArray.length === 0) {
      setFilterOptions(
        sideFilterdata.flatMap((data) => [
          {
            brand: data.brand,
            color: data.color,
          },
        ])
      );
    }
  };

  //handle selected filters

  const selectedFilters = (val: { title: string; option: string }) => {
    const check = filtersArray.find((el) => el.option == val.option);
    let index = filtersArray.indexOf(val);

    if (check === undefined) {
      filtersArray.push(val);
    } else {
      filtersArray.splice(index, 1);
    }
    filteredPD();
  };

  //handle sort

  const sortSelection = async (value: number) => {
    if (value === 1) {
      setCurrentPage(1);
      initPD(1);
      filtersArray.forEach((el) => filtersArray.splice(el));
    } else {
      if (filtersArray.length === 0) {
        setCurrentPage(1);
        initPD(1, value);
      } else {
        const res = await axios.get(
          `/products?productSort=true&sortSelection=${value}&productData=${JSON.stringify(
            productData
          )}`
        );
        setProductData(res.data[0]);
      }
    }
  };

  //product page counter

  const initPages = () => {
    const productLength = sideFilterdata!?.length;
    const pages =
      filtersArray.length === 0
        ? Math.ceil(productLength / 6)
        : Math.ceil(filtersArray.length / 6);
    setPageLength(pages);
  };

  //page numbers

  const pageNumberIcon = Array.from({ length: pageLength! }, (_, index) => (
    <div className="page__selector" key={index}>
      <button
        onClick={() => {
          topRef.current.scrollIntoView();
          if (filtersArray.length === 0) {
            initPD(index + 1);
            setCurrentPage(index + 1);
          } else {
            filteredPD(index + 1);
          }
        }}
        style={
          index + 1 === currentPage
            ? { background: "var(--accent-blue)", color: "var(--bg" }
            : undefined
        }
      >
        {index + 1}
      </button>
    </div>
  ));

  useEffect(() => {
    initPD(1);
  }, [sub]);

  useEffect(() => {
    if (productData != undefined) {
      initFilter();
      initPages();
    }
  }, [productData]);

  return (
    <>
      <div
        className="scroll__ref--container"
        style={{
          position: "absolute",
          top: "0",
        }}
        ref={topRef}
      ></div>
      <div className="p__env--wrapper">
        <SideMenu
          filterProps={filterOptions}
          selectedFilters={selectedFilters}
          filterActiveValues={filtersArray}
        />

        <div className="product__grid--wrapper">
          <div className="pg__upper">
            <h6>{sub}</h6>
            <h3>{sideFilterdata?.length} Products</h3>
          </div>

          <ProductSort
            productLength={productData!?.length > 0 ? productData!?.length : 0}
            selection={sortSelection}
            page={currentPage}
          />

          <ProductGrid gridProps={productData} />

          <div className="p__env--page--selector">
            <h5>Page</h5>
            {pageNumberIcon}
          </div>
          {loading === 5 ? <Loader /> : null}
        </div>
      </div>
    </>
  );
};

export default PEnvironment;
