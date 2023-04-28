import Layout from "../components/Layout";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { polygonMumbai, polygon } from "wagmi/chains";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

export default function MyApp({ Component, pageProps }) {
  const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;
  const projectId = process.env.CLOUD_WALLET_PROJECT_ID;

  const { chains, provider } = configureChains(
    [polygonMumbai, polygon],
    [infuraProvider({ apiKey: infuraId }), publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "web3rsvp",
    projectId,
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
