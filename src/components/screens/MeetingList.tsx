/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteMeeting, getMeetings } from "../../service/meeting.service";
import { Button } from "../ui/Button";
import { Pencil, Plus, Trash } from "lucide-react";
import Heading from "../custom/heading/Heading";
import type { Meeting } from "../../types/meeting";
import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "../ui/Modal";
import toast from "react-hot-toast";

export default function MeetingList({
  onSelect,
}: {
  onSelect: (meeting: Meeting | null) => void;
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<{
    _id: string;
    title: string;
  } | null>(null);

  const {
    data: meetings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["meetings"],
    queryFn: getMeetings,
    retry: false,
  });

  const queryClient = useQueryClient();

  const { mutate: deleteMeetingMutation, isPending } = useMutation({
    mutationFn: deleteMeeting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meetings"] });
      setIsDeleteModalOpen(null);
      toast.success("Meeting deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response.data?.error?.message || "Something went wrong");
    },
  });

  if (isLoading)
    return (
      <div className="w-full mt-8 flex items-center justify-center">
        Loading ...
      </div>
    );
  if (error)
    return (
      <div className="w-full mt-8 flex items-center justify-center text-red-500 p-3 rounded-xl bg-red-50">
        Error: {error.message}
      </div>
    );

  return (
    <>
      <div className="w-full mt-8 ">
        <div className="w-full flex items-center justify-between">
          <Heading variant="h1">Meeting List</Heading>
          <Button
            size="lg"
            variant="primary"
            onClick={() => {
              document
                .getElementById("add-meeting-form")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Create Meeting <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="w-full overflow-y-auto h-[calc(100vh-30rem)]">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 ">
            {meetings && meetings?.data?.length > 0 ? (
              meetings.data.map((meeting) => (
                <div
                  key={meeting._id}
                  className="w-full flex  p-4 flex-col gap-y-2 bg-white rounded-xl shadow border border-gray-100"
                >
                  <div className="w-full flex items-center justify-between">
                    <div className="flex flex-col gap-y-1">
                      <h2 className="text-base font-semibold">
                        {meeting.title}
                      </h2>
                      <p className="text-xs text-gray-500">
                        {meeting.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="primary"
                        onClick={() => {
                          onSelect(meeting);
                          document
                            .getElementById("add-meeting-form")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        <Pencil className="w-2 h-2" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        className="text-white "
                        onClick={() => {
                          setIsDeleteModalOpen({
                            _id: meeting._id,
                            title: meeting.title,
                          });
                        }}
                      >
                        <Trash className="w-2 h-2" />
                      </Button>
                    </div>
                  </div>
                  <hr />
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-gray-500">
                        From:{" "}
                        {new Date(meeting.time.start_time).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        To: {new Date(meeting.time.end_time).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full flex items-center justify-center">
                <p className="text-gray-500">No meetings found</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        isOpen={isDeleteModalOpen !== null}
        onClose={() => setIsDeleteModalOpen(null)}
      >
        <ModalHeader>
          <ModalTitle>Delete Meeting</ModalTitle>
        </ModalHeader>
        <ModalBody className="pt-3">
          <div className="text-sm text-gray-500 flex flex-col gap-y-2">
            Are you sure you want to delete this meeting? <br />
            <strong className="py-2 px-2 rounded-md bg-gray-100 max-w-fit">
              {isDeleteModalOpen?.title}
            </strong>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            className="w-full border-red-500 text-red-500 hover:bg-red-100 hover:text-red-500"
            onClick={() => setIsDeleteModalOpen(null)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => {
              if (isDeleteModalOpen?._id) {
                deleteMeetingMutation(isDeleteModalOpen?._id);
              }
            }}
            isLoading={isPending}
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
