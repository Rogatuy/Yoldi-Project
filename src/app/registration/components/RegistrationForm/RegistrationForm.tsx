"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BaseInput from "@/components/Inputs/BaseInput";
import BaseButton from "@/components/Buttons/BaseButton";
import { getError, emailRules, nameRules, passwordRules } from "@/utils/validation";
import useSignUp from "@/hooks/useSignUp";
import { useAuthState } from "@/context/AuthState";
import styles from "./RegistrationForm.module.scss";

export default function RegistrationForm() {
  const router = useRouter();
  const [nameValue, setNameValue] = useState<string>("");
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const { authKey, updateKey } = useAuthState();
  const { data, isMutating, trigger } = useSignUp();

  const handleNameChange = (newValue: string) => {
    setNameValue(newValue);
    setNameError("");
  };

  const handleEmailChange = (newValue: string) => {
    setEmailValue(newValue);
    setEmailError("");
  };

  const handlePasswordChange = (newValue: string) => {
    setPasswordValue(newValue);
    setPasswordError("");
  };

  const validate = () => {
    const newErrorName = getError(nameValue, nameRules);
    const newErrorEmail = getError(emailValue, emailRules);
    const newErrorPassword = getError(passwordValue, passwordRules);

    setNameError(newErrorName);
    setEmailError(newErrorEmail);
    setPasswordError(newErrorPassword);

    return newErrorName === "" && newErrorEmail === "" && newErrorPassword === "";
  };

  useEffect(() => {
    if (authKey) {
      router.push("/");
    }
  }, [authKey, router]);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (validate()) {
      const response = await trigger({ name: nameValue, email: emailValue, password: passwordValue });

      if (response && "value" in response) {
        updateKey(response.value);
      }
    }
  };

  return (
    <form className={styles.registrationForm} onSubmit={handleSubmit}>
      <div className={styles.inputs}>
        <BaseInput
          value={nameValue}
          onInputChange={handleNameChange}
          type="text"
          placeholder="Имя"
          error={nameError}
          isRequired={true}
          disabled={isMutating}
          icon="user"
        />
        <BaseInput
          value={emailValue}
          onInputChange={handleEmailChange}
          type="text"
          placeholder="E-mail"
          error={emailError}
          isRequired={true}
          disabled={isMutating}
          icon="mail"
        />
        <BaseInput
          value={passwordValue}
          onInputChange={handlePasswordChange}
          type={isPasswordShow ? "text" : "password"}
          placeholder="Пароль"
          error={passwordError}
          isRequired={true}
          disabled={isMutating}
          icon="lock"
        >
          <BaseButton
            view="button"
            type="button"
            color="transparent"
            option="square"
            disabled={isMutating}
            icon={passwordValue !== "" ? "eye-black" : "eye-gray"}
            onClick={() => setIsPasswordShow(!isPasswordShow)}
          />
        </BaseInput>
      </div>
      <div className={styles.sendBlock}>
        <BaseButton
          view="button"
          type="submit"
          color="primary"
          option="large"
          text={isMutating ? "Загрузка..." : "Создать аккаунт"}
          disabled={nameValue === "" || emailValue === "" || passwordValue === "" || isMutating}
        />
        {!isMutating && data && "error" in data && <p style={{ color: "red" }}>{data.error}</p>}
      </div>
    </form>
  );
}
