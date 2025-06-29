import { Button } from "../../ui/Button";
import useAuth from "../../../hooks/useAuth";
import {
  useAppKit,
  useAppKitAccount,
  useDisconnect,
} from "@reown/appkit/react";

import { LogOut } from "lucide-react";

export default function AppHeader() {
  const { logout } = useAuth();
  const { open } = useAppKit();
  const { disconnect } = useDisconnect();
  const { address , isConnected } = useAppKitAccount();

  const handleOpenAccount = () => {
    if (isConnected) {
      open({ view: "Account" });
    } else {
      open({ view: "Connect" });
    }
  };

  const formatAddress = (addr: string | undefined) => {
    if (!addr) return "Connect Wallet";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleLogout = async () => {
    await disconnect({});
    logout();
  };

  return (
    <header className="w-full p-6 mt-4 sticky top-0 z-50 bg-white rounded-xl shadow border-gray-100">
      <div className="w-full flex items-center justify-between">
        <span className="text-xl font-bold">Meeting</span>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleOpenAccount}
            size="sm"
            variant="outline"
            aria-label="Open wallet account"
          >
            {formatAddress(address)}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-xs text-blue-500"
            aria-label="User account"
            onClick={handleLogout}
          >
            Logout <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
