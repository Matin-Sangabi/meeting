import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import toast from "react-hot-toast";

import FormProvider from "../../../provider/FormProvider";
import AppInput from "../../../components/custom/form/AppInput";
import { Button } from "../../../components/ui/Button";
import { requestWalletSignature } from "../../../lib/utils";
import { SIGN_MESSAGE_TEXT } from "../../../constants/constants";
import { useMutation } from "@tanstack/react-query";
import { loginService } from "../../../service/auth.service";
import type { LoginRequest } from "../../../types/auth";
import useAuth from "../../../hooks/useAuth";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  signature: yup.string().required(),
});

export default function LoginPage() {
  const [step, setStep] = useState<number>(1);
  const [isSigning, setIsSigning] = useState<boolean>(false);
  const { open } = useAppKit();

  const { address, isConnected, status } = useAppKitAccount();

  const defaultValues = {
    email: "",
    password: "",
    signature: "",
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const { login } = useAuth();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: loginService,
    onSuccess: (response) => {
      login(response);
    },
  });

  const onSubmit = async (data: LoginRequest) => {
    try {
      await mutateAsync(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  const handleConnect = () => {
    if (isConnected) {
      open({ view: "Account" });
    } else {
      open({ view: "Connect" });
    }
  };

  const handleRequestSignature = async () => {
    if (!address) return;

    setIsSigning(true);
    try {
      // Create message to sign
      const message = SIGN_MESSAGE_TEXT;

      // Request signature using utility function
      const signatureResult = await requestWalletSignature(message);

      setValue("signature", signatureResult);
      setStep(3);
    } catch (error) {
      console.error("Error signing message:", error);
      toast.error("Error signing message");
    } finally {
      setIsSigning(false);
    }
  };

  const handleNextStep = () => {
    if (isConnected && step === 1) {
      setStep(2);
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="w-full flex items-center justify-center max-w-lg mx-auto h-full">
        <div className="w-full p-8 rounded-3xl shadow border border-gray-100 bg-white ">
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full flex flex-col gap-4">
              <div className="w-full flex flex-col gap-2">
                {step === 1 ? (
                  <div className="w-full">
                    <Button
                      type="button"
                      variant="primary"
                      className="w-full !rounded-xl h-12"
                      size="lg"
                      isLoading={status === "connecting"}
                      onClick={handleConnect}
                    >
                      {isConnected
                        ? address?.slice(0, 6) + "..." + address?.slice(-4)
                        : "Connect to wallet"}
                    </Button>
                    {isConnected && (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full mt-2 !rounded-xl h-12"
                        onClick={handleNextStep}
                      >
                        Continue
                      </Button>
                    )}
                  </div>
                ) : step === 2 ? (
                  <div className="w-full flex flex-col gap-4">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-2">
                        Sign Message
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Please sign the message to verify your wallet ownership
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>Message to sign:</strong> {SIGN_MESSAGE_TEXT}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="primary"
                      className="w-full !rounded-xl h-12"
                      onClick={handleRequestSignature}
                      disabled={isSigning}
                    >
                      {isSigning ? "Signing..." : "Sign Message"}
                    </Button>
                  </div>
                ) : (
                  // login form
                  <div className="w-full flex flex-col gap-4">
                    {errors && errors.signature && (
                      <div className="text-red-500 text-xs w-full bg-red-50 p-2 rounded-xl">
                        {errors.signature?.message}
                      </div>
                    )}
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold">Complete Login</h3>
                      <p className="text-gray-600 text-sm">
                        Wallet connected and message signed successfully
                      </p>
                    </div>
                    <AppInput
                      name="email"
                      label="Email"
                      type="email"
                      placeholder="Enter your email"
                    />
                    <AppInput
                      name="password"
                      label="Password"
                      type="password"
                      placeholder="Enter your password"
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full !rounded-xl h-12"
                      size="lg"
                      isLoading={isPending}
                    >
                      Login
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
