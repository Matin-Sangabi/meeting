import { mainnet, arbitrum, sepolia } from "@reown/appkit/networks";
import type { AppKitNetwork } from "@reown/appkit/networks";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";

export const projectId = import.meta.env.VITE_APPKIT_PROJECT_ID;

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

export const networks = [mainnet, arbitrum, sepolia] as [
  AppKitNetwork,
  ...AppKitNetwork[]
];

export const ethersAdapter = new EthersAdapter();
 