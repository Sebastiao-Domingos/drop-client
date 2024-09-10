function isEmptyString(value: FormDataEntryValue | unknown) {
  return !(typeof value === "string") || value.trim().length === 0;
}

export { isEmptyString };
