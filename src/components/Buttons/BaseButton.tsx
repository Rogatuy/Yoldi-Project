import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./BaseButton.module.scss";

type BaseButtonProps = {
  view: "button" | "link";
  text?: string;
  type?: "button" | "submit" | "reset";
  icon?: string;
  href?: string;
  disabled?: boolean;
  color?: "primary" | "secondary" | "transparent";
  option?: "large" | "small" | "square";
  onClick?: () => void;
};

export default function BaseButton({
  view,
  text,
  type = "button",
  href,
  icon,
  color = "primary",
  option = "large",
  disabled = false,
  onClick,
}: BaseButtonProps) {
  return (
    <>
      {view === "button" && (
        <button
          type={type}
          className={`${styles.base} ${icon ? styles.icon : ""} ${styles[`${color}`]} ${styles[`${option}`]}`}
          disabled={disabled}
          onClick={onClick}
        >
          {icon && <Image src={`/icons/${icon}.svg`} alt="icon" width={25} height={25} />}
          {text}
        </button>
      )}

      {view === "link" && href && (
        <Link href={href} className={`${styles.base} ${styles[`${color}`]} ${styles[`${option}`]}`}>
          {text}
        </Link>
      )}
    </>
  );
}
