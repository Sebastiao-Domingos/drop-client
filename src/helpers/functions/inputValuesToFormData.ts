import { isEmptyString } from "./isEmptyString";
import { isInvalidFile } from "./isInvalidFile";

function inputValuesToFormDataCreate(formValues: {
  [key: string]: string | FileList;
}) {
  const formData = new FormData();
  Object.entries(formValues).forEach((entry) => {
    const value = entry[1];

    if (typeof value !== "string") {
      const file = value.item(0);
      if (!isInvalidFile(file, "image"))
        formData.append(entry[0], value.item(0)!);
      else console.log("imagem inválida");
    } else {
      formData.append(entry[0], value);
    }
  });

  return formData;
}

function inputValuesToFormDataUpdate(formValues: {
  [key: string]: string | FileList;
}) {
  const formData = new FormData();
  Object.entries(formValues).forEach((entry) => {
    const value = entry[1];

    if (typeof value !== "string") {
      const file = value.item(0);
      if (!isInvalidFile(file, "image")) {
        formData.append(entry[0], value.item(0)!);
      } else {
        console.log("imagem inválida");
      }
    } else if (!isEmptyString(value)) {
      formData.append(entry[0], value.trim());
    }
  });

  return formData;
}

export { inputValuesToFormDataCreate, inputValuesToFormDataUpdate };
