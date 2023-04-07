import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { ConnectionProvider, useWallet, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";
import VoteForm from "../../components/VoteForm";

require("@solana/wallet-adapter-react-ui/styles.css");

type Props = {
  children?: React.ReactNode,
  onAccountChange?: (params: any) => void
}

const SolProvider: React.FC<Props> = ({ children, onAccountChange }) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network])
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter()
    ],
    [network]
  )
  return (
    <div>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets}>
          <Profile onAccountChange={onAccountChange}>
            {children}
          </Profile>
        </WalletProvider>
      </ConnectionProvider>
      <div>{children}</div>
    </div>
  )
}

const Profile: React.FC<Props> = ({ children, onAccountChange }) => {
  const wallet = useWallet();
  useMemo(() => {
    if (wallet.connected === true && onAccountChange !== undefined) {
      onAccountChange({ provider: 'SOL', address: wallet.publicKey?.toBase58() })
    }
  }, [wallet, onAccountChange])
  
  return (
    <div style={{textAlign:"left"}}>
      <WalletModalProvider>
        <WalletMultiButton />
      </WalletModalProvider>
      <div>
        <VoteForm provider="SOL" identity={wallet.publicKey?.toBase58()} />
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}

export default SolProvider