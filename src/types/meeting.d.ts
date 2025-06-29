export interface CreateMeetingRequest {
  title: string;
  description: string;
  start_time?: string;
  end_time?: string;
}

export interface Meeting {
  time: {
    start_time: string;
    end_time: string;
  };
  _id: string;
  userId: {
    _id: string;
    email: string;
    walletAddress: string;
  };
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface MeetingResponse {
  data: Meeting[];
}
