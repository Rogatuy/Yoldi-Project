"use client";

import React, { useState } from "react";
import useUpdate from "@/hooks/useUpdate";
import { useRouter } from "next/navigation";
import useGetProfile from "@/hooks/useGetProfile";
import { getError, nameRules, slugRules, descriptionRules } from "@/utils/validation";
import DescriptionArea from "./components/DescriptionArea/DescriptionArea";
import SlugInput from "./components/SlugInput/SlugInput";
import BaseButton from "@/components/Buttons/BaseButton";
import BaseInput from "@/components/Inputs/BaseInput";
import styles from "./UserForm.module.scss";

type UserFormProps = {
  nameProfile: string;
  slugProfile: string;
  descriptionProfile: string;
  closeModal: () => void;
};

export default function UserForm({ nameProfile, slugProfile, descriptionProfile, closeModal }: UserFormProps) {
  const router = useRouter();

  const [name, setName] = useState<string>(nameProfile);
  const [slug, setSlug] = useState<string>(slugProfile);
  const [description, setDescription] = useState<string>(descriptionProfile);
  const [nameError, setNameError] = useState<string>("");
  const [slugError, setSlugError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");

  const { data: update, isMutating: isMutatingUpdate, trigger } = useUpdate();

  const { mutate } = useGetProfile();

  const handleNameChange = (newValue: string) => {
    setName(newValue);
    setNameError("");
  };

  const handleSlugChange = (newValue: string) => {
    setSlug(newValue);
    setSlugError("");
  };

  const handleDescriptionChange = (newValue: string) => {
    setDescription(newValue);
    setDescriptionError("");
  };

  const validate = () => {
    const nameErrorUpdate = getError(name, nameRules);
    const slugErrorUpdate = getError(slug, slugRules);
    const descriptionErrorUpdate = getError(description, descriptionRules);

    setNameError(nameErrorUpdate);
    setSlugError(slugErrorUpdate);
    setDescriptionError(descriptionErrorUpdate);

    return nameErrorUpdate === "" && slugErrorUpdate === "" && descriptionErrorUpdate === "";
  };

  const onSaveClick = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (validate()) {
      const response = await trigger({ name, slug, description });

      if (response && "slug" in response) {
        mutate();

        if (response.slug !== slugProfile) {
          router.push(`/account/${response.slug}`);
        }

        if (response.slug === slugProfile) {
          closeModal();
        }
      }
    }
  };

  return (
    <form className={styles.formInputs} onSubmit={onSaveClick}>
      <BaseInput
        label="Имя"
        value={name}
        onInputChange={handleNameChange}
        type="text"
        placeholder="Имя"
        error={nameError}
        isRequired={true}
        disabled={false}
      />
      <SlugInput value={slug} error={slugError} disabled={false} onInputChange={handleSlugChange} />
      <DescriptionArea
        value={description}
        error={descriptionError}
        disabled={false}
        onAreaChange={handleDescriptionChange}
      />
      <div className={styles.formButtons}>
        <BaseButton view="button" type="button" color="secondary" option="large" text="Отмена" onClick={closeModal} />
        <BaseButton color="primary" option="large" view="button" type="submit" text="Сохранить" />
      </div>
      {!isMutatingUpdate && update && "error" in update && <p style={{ color: "red" }}>{update.error}</p>}
    </form>
  );
}
