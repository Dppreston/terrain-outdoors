import { useContext } from "react";
import Button from "../functional-components/Button";
import { GlobalContext, UserContext } from "../App";

type BannerProps = {
  bannerProps: {
    id: number;
    title: string;
    sub?: string;
    p?: string;
    identifier: string;
    img?: string;
    link: {
      navProps: {
        master: string;
        category?: string;
        sub?: string;
        product?: string;
      };
    };
    linkText: string;
    format: number;
    height: number;
    width: number;
  };
};

const StandardBanner = ({ bannerProps }: BannerProps) => {
  const { mediaTwo } = useContext<GlobalContext>(UserContext);
  let format = mediaTwo === false ? bannerProps.format : 2;
  return (
    <>
      <div
        className="standard__banner--wrapper"
        style={{
          background: bannerProps.img ? "intial" : "var(--accent-blue)",
          height: bannerProps.height === 1 ? "225px" : "450px",
          maxWidth: bannerProps.width === 1 ? "1200px" : "none",
          borderTop: bannerProps.width === 2 ? "var(--border)" : undefined,
          borderBottom: bannerProps.width === 2 ? "var(--border)" : undefined,
          border: bannerProps.width === 1 ? "var(--border)" : undefined,
        }}
        key={bannerProps.id}
      >
        {bannerProps.img ? <img id="sb__img" src={bannerProps.img} /> : null}
        <div
          className="sb__content--wrapper"
          style={
            format === 2
              ? {
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "25px",
                  textAlign: "center",
                }
              : format === 3
              ? { flexDirection: "row-reverse" }
              : undefined
          }
        >
          <div className="sb__text--container">
            {bannerProps.title ? <h6>{bannerProps.title}</h6> : null}
            {bannerProps.sub ? (
              <h4
                style={
                  bannerProps.img
                    ? { background: "var(--bg-opaq)" }
                    : { color: "var(--bg)" }
                }
              >
                {bannerProps.sub}
              </h4>
            ) : null}
            {bannerProps.p ? (
              <p
                style={
                  bannerProps.img
                    ? { background: "var(--bg-opaq)" }
                    : { color: "var(--bg)" }
                }
              >
                {bannerProps.p}
              </p>
            ) : null}
          </div>
          <Button
            buttonProps={{
              id: bannerProps.id,
              text: bannerProps.linkText,
              identifier: "#",
            }}
            individualAction={window.navigation}
            individualOptions={bannerProps.link}
          />
        </div>
      </div>
    </>
  );
};
export default StandardBanner;
