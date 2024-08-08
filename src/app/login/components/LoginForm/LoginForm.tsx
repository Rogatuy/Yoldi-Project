"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BaseInput from "@/components/Inputs/BaseInput";
import BaseButton from "@/components/Buttons/BaseButton";
import { getError, emailRules } from "@/utils/validation";
import useLogin from "@/hooks/useLogin";
import { useAuthState } from "@/context/AuthState";
import styles from "./LoginForm.module.scss";

export default function LoginForm() {
  const router = useRouter();
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const { authKey, updateKey } = useAuthState();
  const { data, isMutating, trigger } = useLogin();

  const handleEmailChange = (newValue: string) => {
    setEmailValue(newValue);
    setEmailError("");
  };

  const handlePasswordChange = (newValue: string) => {
    setPasswordValue(newValue);
  };

  const validate = () => {
    const newErrorEmail = getError(emailValue, emailRules);
    setEmailError(newErrorEmail);

    return newErrorEmail === "";
  };

  useEffect(() => {
    if (authKey) {
      router.push("/");
    }
  }, [authKey, router]);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (validate()) {
      const response = await trigger({ email: emailValue, password: passwordValue });

      if (response && "value" in response) {
        updateKey(response.value);
      }
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <div className={styles.inputs}>
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
          text={isMutating ? "Загрузка..." : "Войти"}
          disabled={emailValue === "" || passwordValue === "" || isMutating}
        />
        {!isMutating && data && "error" in data && <p style={{ color: "red" }}>{data.error}</p>}
      </div>
    </form>
  );
}
