import React, { ChangeEvent, ReactNode } from "react";
import Image from "next/image";
import styles from "./BaseInput.module.scss";

type InputProps = {
  value: string;
  type: string;
  placeholder: string;
  error?: string;
  isRequired: boolean;
  disabled: boolean;
  icon?: string;
  label?: string;
  children?: ReactNode;
  onInputChange: (newValue: string) => void;
  onBlurClick?: () => void;
};

export default function BaseInput({
  value,
  placeholder,
  type,
  error,
  isRequired,
  disabled,
  icon,
  label,
  children,
  onInputChange,
  onBlurClick,
}: InputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onInputChange(event.target.value);
  };

  return (
    <>
      <div className={styles.baseInputWrapper}>
        {label && <p className={styles.baseInputLabel}>{label}</p>}
        <div className={styles.baseInput}>
          <input
            value={value}
            type={type}
            className={`${styles.input} ${icon ? styles.inputIcon : ""} ${error ? styles.errorInput : ""}`}
            placeholder={placeholder}
            required={isRequired}
            disabled={disabled}
            onChange={handleChange}
            onBlur={onBlurClick}
          />
          {icon && (
            <Image className={styles.iconLeft} src={`/icons/${icon}.svg`} alt={`${icon}`} width={25} height={25} />
          )}
          {children && <div className={styles.childrenButton}>{children}</div>}
        </div>
        {error && (
          <div className={styles.errors}>
            <p>{error}</p>
          </div>
        )}
      </div>
    </>
  );
}
