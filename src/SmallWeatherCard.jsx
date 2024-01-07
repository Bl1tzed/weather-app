import styles from "scss/SmallWeatherCard.module.scss";

export default function SmallWeatherCard({
  header,
  subHeader,
  icon,
  title,
  bottomLeft,
  bottomRight,
}) {
  return (
    <div className={styles.main + " column"}>
      <div className={styles.location}>{header}</div>
      <div className={styles.subHeader + " opacity-medium"}>{subHeader}</div>
      <div className={styles.iconBox}>
        <img className="icon-img glow" src={icon} alt="Weather Icon" />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.bottomLeft + " opacity-medium"}>{bottomLeft}</div>
      <div className={styles.bottomRight + " opacity-medium"}>
        {bottomRight}
      </div>
    </div>
  );
}
