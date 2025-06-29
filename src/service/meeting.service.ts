import type { Meeting, MeetingResponse } from "../types/meeting";
import http from "./httpRequest";

export const getMeetings = async () => {
  const response = await http.get<MeetingResponse>(`/meeting/all-meet`);
  return response.data;
};

export const createMeeting = async (meeting: Meeting) => {
  const response = await http.post(`/meeting/create-meet`, meeting);
  return response.data;
};

export const deleteMeeting = async (meetingId: string) => {
  const response = await http.delete(`/meeting/meet/${meetingId}`);
  return response.data;
};
