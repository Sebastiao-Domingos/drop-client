import { ComponentProps, SetStateAction } from "react";
import { InputOTP, InputOTPSlot } from "../ui/input-otp";

interface GroupInputsProps extends ComponentProps<"div"> {
  setValue: (value: SetStateAction<string>) => void;
}

function GroupInputs({
  setValue,
  className = "",
  ...others
}: GroupInputsProps) {
  return (
    <div className="w-full flex justify-center items-center">
      <InputOTP maxLength={6} onChange={setValue}>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTP>
    </div>
  );
}

export { GroupInputs };
