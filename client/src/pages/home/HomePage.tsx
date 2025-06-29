import { useState } from "react";
import AddMeeting from "../../components/screens/AddMeeting";
import MeetingList from "../../components/screens/MeetingList";
import type { Meeting } from "../../types/meeting";

export default function HomePage() {
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  return (
    <div className="w-full">
      <MeetingList onSelect={setSelectedMeeting} />
      <AddMeeting defaultData={selectedMeeting} />
    </div>
  );
}
