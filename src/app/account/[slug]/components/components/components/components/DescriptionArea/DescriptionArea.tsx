import React, { ChangeEvent } from "react";
import styles from "./DescriptionArea.module.scss";

type DescriptionAreaProps = {
  value: string;
  error: string;
  disabled: boolean;
  onAreaChange: (newValue: string) => void;
};

export default function DescriptionArea({ value, error, disabled, onAreaChange }: DescriptionAreaProps) {
  const MAX_LENGTH_VALUE = 1000;

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onAreaChange(event.target.value);
  };

  return (
    <div className={styles.descriptionAreaWrapper}>
      <p className={`${styles.counter} ${error ? styles.errorCounter : ""}`}>
        {value.length} / {MAX_LENGTH_VALUE}
      </p>
      <p className={styles.descriptionAreaLabel}>Описание</p>
      <textarea
        value={value}
        className={`${styles.textarea} ${error ? styles.errorTextarea : ""}`}
        placeholder="Добавьте описание"
        required={false}
        disabled={disabled}
        onChange={handleChange}
      />
      {error && (
        <div className={styles.errors}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
