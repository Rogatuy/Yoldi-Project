import React, { ChangeEvent } from "react";
import styles from "./SlugInput.module.scss";

type SlugInputProps = {
  value: string;
  error: string;
  disabled: boolean;
  onInputChange: (newValue: string) => void;
};

export default function SlugInput({ value, error, disabled, onInputChange }: SlugInputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onInputChange(event.target.value);
  };

  return (
    <div className={styles.slugInputWrapper}>
      <p className={styles.slugInputLabel}>Адрес профиля</p>
      <div className={styles.slugInput}>
        <div className={styles.example}>
          <p>example.com/</p>
        </div>
        <input
          value={value}
          type="text"
          className={`${styles.input} ${error ? styles.errorInput : ""}`}
          placeholder="Введите адрес профиля"
          required={true}
          disabled={disabled}
          onChange={handleChange}
        />
      </div>
      {error && (
        <div className={styles.errors}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
