/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Heading from "../custom/heading/Heading";
import type { Meeting } from "../../types/meeting";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../provider/FormProvider";
import AppInput from "../custom/form/AppInput";
import AppTextArea from "../custom/form/AppTextArea";
import { Button } from "../ui/Button";
import { createMeeting } from "../../service/meeting.service";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  start_time: yup.string().optional().nullable(),
  end_time: yup.string().optional().nullable(),
});

export default function AddMeeting({
  defaultData,
}: {
  defaultData?: Meeting | null;
}) {
  console.log(defaultData);

  const defaultValues = useMemo(
    () => ({
      title: defaultData?.title || "",
      description: defaultData?.description || "",
      start_time: defaultData?.time.start_time
        ? new Date(defaultData?.time.start_time).toISOString().slice(0, 16)
        : "",
      end_time: defaultData?.time.end_time
        ? new Date(defaultData?.time.end_time).toISOString().slice(0, 16)
        : "",
    }),
    [defaultData]
  );

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema) as any,
  });

  const { handleSubmit, reset } = methods;

  // Reset form when defaultData changes
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const queryClient = useQueryClient();

  const { mutate: createMeet, isPending } = useMutation({
    mutationFn: createMeeting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meetings"] });
      toast.success("Meeting created successfully");
      reset();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const onSubmit = (data: any) => {
    const formData = {
      ...data,
      start_time: data?.start_time ? new Date(data?.start_time) : null,
      end_time: data?.end_time ? new Date(data?.end_time) : null,
    };
    createMeet(formData);
  };

  return (
    <div
      className="w-full mt-8 border-t border-gray-400 pt-4"
      id="add-meeting-form"
    >
      <div className="w-full flex items-center justify-between">
        <Heading variant="h1">Add Meeting</Heading>
      </div>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col gap-y-4 mt-4">
          <AppInput name="title" label="Title" />
          <AppTextArea name="description" label="Description" />
          <div className="w-full flex items-center justify-between gap-x-4">
            <AppInput
              name="start_time"
              label="Start Time"
              type="datetime-local"
              classNames={{
                grandContainer: "w-full",
              }}
            />
            <AppInput
              name="end_time"
              label="End Time"
              type="datetime-local"
              classNames={{
                grandContainer: "w-full",
              }}
            />
          </div>
          <Button isLoading={isPending} type="submit" className="h-12">
            Add Meeting
          </Button>
        </div>
      </FormProvider>
    </div>
  );
}
