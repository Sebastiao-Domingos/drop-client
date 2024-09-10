export function isSecurePassword(password: string) {
  return /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,24}$/gm.test(
    password
  );
}
