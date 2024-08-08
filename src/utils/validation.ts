type Rule = {
  rule: (value: string) => boolean;
  text: string;
};

type ValidationRules = Rule[];

export const getError = (value: string, rules: ValidationRules): string => {
  for (const { rule, text } of rules) {
    if (rule(value)) {
      return text;
    }
  }

  return "";
};

export const nameRules: ValidationRules = [
  {
    rule: (value: string) => value.length < 3,
    text: "Имя должно содержать минимум 3 символа",
  },
];

export const emailRules: ValidationRules = [
  {
    rule: (value: string) => !/.+@.+\..+/i.test(value),
    text: "Введите корректный email",
  },
];

export const passwordRules: ValidationRules = [
  {
    rule: (value: string) => !/^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*[^a-zA-Zа-яА-Я\d]).+$/.test(value),
    text: "Пароль должен содержать как минимум одну строчную букву, одну заглавную букву и один специальный символ",
  },
];

export const slugRules: ValidationRules = [
  {
    rule: (value: string) => value.length < 3,
    text: "Ссылка должна содержать минимум 3 символа",
  },
  {
    rule: (value: string) => value.length > 20,
    text: "Ссылка должна содержать максимум 20 символов",
  },
];

export const descriptionRules: ValidationRules = [
  {
    rule: (value: string) => value.length > 1000,
    text: "Описание не может содержать более 1000 символов",
  },
];
