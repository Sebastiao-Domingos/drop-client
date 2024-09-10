import parsePhoneNumber from "libphonenumber-js";

function formatPhoneNumber(phone: string) {
  phone = phone.startsWith("+", 0) ? phone : "+" + phone;
  const parsedNumber = parsePhoneNumber(phone);
  return parsedNumber?.formatInternational();
}

export { formatPhoneNumber };
