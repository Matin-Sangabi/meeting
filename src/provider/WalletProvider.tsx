import { createAppKit } from "@reown/appkit/react";
import { useEffect, useState, type ReactNode } from "react";
import {
  networks,
  metadata,
  projectId,
  ethersAdapter,
} from "../config/walletConfig";

export default function WalletProvider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      createAppKit({
        adapters: [ethersAdapter],
        networks,
        metadata,
        projectId,
        themeMode: "light",
        features: {
          analytics: true,
        },
      });
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Don't render children until AppKit is initialized
  if (!isInitialized) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
}
