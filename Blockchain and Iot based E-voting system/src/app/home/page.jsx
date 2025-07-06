import BackgroundGradient from "@/components/MainBackgroundGradient/backgroundGradient";
import HomePageSVGS from "@/assets/svgs/homePageSVGS/homePageSVGS";
import styles from "./HomePage.module.css";
export default function HomePage() {
  return (
    <>
      <div className={styles.homePageContainer}>
        <div className={styles.homePageSVGContainer}>
          {" "}
          <HomePageSVGS />
        </div>
        <div className={styles.homePageTextContainer}>
          <h1 className={styles.homePageText}>
            <span style={{ color: "#37474f" }}>
              Welcome<span style={{ color: "#ba68c8" }}>!</span> to{" "}
            </span>
            E-Voting
          </h1>
        </div>
      </div>
      <BackgroundGradient />
    </>
  );
}
