import BackgroundGradient from "@/components/MainBackgroundGradient/backgroundGradient";
import BackgroundSparkle from "@/components/MainPageComponents/backgroundSparkles/backgroundSparkle";
import MainPageSVGS from "@/assets/svgs/mainPageSVGS/mainPageSVGS";
import styles from "./MainPage.module.css";
import WalletButton from "@/components/MainPageComponents/WalletButton/walletButton";
export default function Home() {
  return (
    <>
      <BackgroundSparkle />
      <div className={styles.mainPageContainer}>
        <div className={styles.mainPageSVG}>
          <MainPageSVGS />
        </div>
        <div className={styles.mainPageContent}>
          <h1 className={styles.headingText}>
            Blockchain <span style={{ color: "#e5aae6" }}>E-voting</span> System
          </h1>
          <WalletButton />
        </div>
      </div>
      <BackgroundGradient />
    </>
  );
}
