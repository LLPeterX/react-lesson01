export const required = (value) => {
  if(value) return undefined;
  return "Поле обязательно для заполнения";
};

export const maxLength20 = value => {
  if(value && value.length>10) return 'Длина текста больше 50 символов';
  return undefined;
};

export const maxLength = (textMaxLength) => (value) => {
  if(value && value.length > textMaxLength) return `Длина текста больше ${textMaxLength} символов`;
  return undefined;
};

  