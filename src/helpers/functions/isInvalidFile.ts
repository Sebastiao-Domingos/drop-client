function isInvalidFile(file: FormDataEntryValue | null, fileType: string) {
  return (
    file === null || !(file instanceof File) || !file.type.includes(fileType)
  );
}

export { isInvalidFile };
