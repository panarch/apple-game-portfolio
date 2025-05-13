import Image from "next/image";
import styles from "./orientationguide.module.css";

export default function OrientationGuide() {
  return (
    <div className={styles.guide}>
      <div className={styles.content}>
        <Image
          className={styles.image}
          src="/logo.png"
          width={192}
          height={192}
          alt="orientation guide icon"
        />
        <h2>Rotate your device to portrait to play.</h2>
      </div>
    </div>
  );
}
