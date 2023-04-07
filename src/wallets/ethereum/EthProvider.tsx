import React, {MouseEvent} from 'react';
import { InjectedConnector } from "@wagmi/core"
import { useAccount, useDisconnect,useConnect, createClient, WagmiConfig } from "wagmi"
import { getDefaultProvider } from 'ethers';
import VoteForm from '../../components/VoteForm';

type ProviderProps = {
  children?: React.ReactNode,
  onAccountChange?: (params: any) => void
}

const EthProvider: React.FC<ProviderProps> = ({onAccountChange, children}) => {
  const client = createClient({
    autoConnect: false,
    provider: getDefaultProvider()
  })
  
  return (
    <WagmiConfig client={client}>
      <div>
        <Profile onAccountChange={onAccountChange}>
          {children}
        </Profile>
      </div>
    </WagmiConfig>
  )
}

const Profile: React.FC<ProviderProps> = ({onAccountChange, children}) => {
  const {address, isConnected} = useAccount()
  const {connect} = useConnect({
    connector: new InjectedConnector(),
  })
  const {disconnect} = useDisconnect()
  const disconnectHandler = (e:MouseEvent): void =>{
    e.preventDefault()
    disconnect()
  }
  const connectHandler = (e:MouseEvent): void =>{
    e.preventDefault()
    connect()
  }
  if (isConnected === true && onAccountChange !== undefined) {
    onAccountChange({provider: 'ethereum', address: address})
  }
  return (
    <div>
      <div>
        {isConnected ?
          <div>
            <button className='btn-eth' onClick={disconnectHandler}>Disconnect {shortenAddress(address)}</button>
          </div>
          : <button className='btn-eth' onClick={connectHandler}>Connect Metamask</button>}
      </div>
      <div>
        <VoteForm provider='ETH' identity={address} />
      </div>
      {children}
    </div>
  ) 
}

const shortenAddress = (address?: string): string => {
  if (address === undefined) {
    return ''
  }
  return address.slice(0, 4) + '...' + address.slice(-4)
}

export default EthProvider