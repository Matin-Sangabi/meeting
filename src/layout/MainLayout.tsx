import { Outlet } from "react-router-dom";
import AppHeader from "../components/custom/hedaer/AppHeader";

export default function MainLayout() {
  return (
    <div className="w-full max-h-screen overflow-y-auto">
      <div className="w-full max-w-screen-2xl mx-auto px-4">
        {/* header */}
        <AppHeader />

        <div className="w-full h-full max-w-screen-2xl mx-auto px-4 pb-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
