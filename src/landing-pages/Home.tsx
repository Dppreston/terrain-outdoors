import BannerFull from "../banner-components/BannerFull";
import {
  homeBannerData,
  standardBannerData,
} from "../banner-components/BannerStatic";
import StandardBanner from "../banner-components/StandardBanner";
import PromoGrid from "../promo-components/PromoGrid";
import { promoData } from "../promo-components/PromoStatic";

const Home = () => {
  return (
    <>
      {homeBannerData
        .filter((el) => el.id === 1)
        .map((data) => (
          <BannerFull bannerFullProps={data} key={data.id} />
        ))}

      {promoData
        .filter((el) => el.id === 1)
        .map((data) => (
          <PromoGrid
            type={data.id}
            title={data.title}
            key={data.id}
            format={data.format}
          />
        ))}

      {standardBannerData
        .filter((el) => el.identifier === "ss__baits")
        .map((data) => (
          <StandardBanner bannerProps={data} key={data.id} />
        ))}
      {promoData
        .filter((el) => el.id === 2)
        .map((data) => (
          <PromoGrid
            type={data.id}
            title={data.title}
            key={data.id}
            format={data.format}
          />
        ))}
      {standardBannerData
        .filter((el) => el.identifier === "ss__rods")
        .map((data) => (
          <StandardBanner bannerProps={data} key={data.id} />
        ))}
      {promoData
        .filter((el) => el.id === 3)
        .map((data) => (
          <PromoGrid
            type={data.id}
            title={data.title}
            key={data.id}
            format={data.format}
          />
        ))}
      {standardBannerData
        .filter((el) => el.identifier === "create__account")
        .map((data) => (
          <StandardBanner bannerProps={data} key={data.id} />
        ))}
    </>
  );
};
export default Home;
