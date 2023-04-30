import Layout from "../components/Layout";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { polygonMumbai, polygon } from "wagmi/chains";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

export default function MyApp({ Component, pageProps }) {
  console.log("client", client);
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
        <ApolloProvider client={client}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
