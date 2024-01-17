import clsx from "clsx";
import styles from "styles/GhostButton.module.scss";

export default function GhostButton({ children, className, active, ...rest }) {
  return (
    <button
      className={clsx(styles.btn, { [styles.btnActive]: active }, className)}
      {...rest}
    >
      {children}
    </button>
  );
}
