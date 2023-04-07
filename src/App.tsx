import React, { useState } from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import './App.css';
import EthProvider from './wallets/ethereum/EthProvider';
import SolProvider from './wallets/solana/SolProvider';
import CreateGrantForm from './components/CreateGrantForm';
import CreateRecruitDecisionForm from './components/CreateRecruitDecisionForm';

function App() {
  const [key, setKey] = useState("new-grant");

  return (
    <div className="App">
      <Container className="pb-4">
        <Tabs id="controlled-tab" onSelect={(e:string|null) => {
          if (e!== null){
            setKey(e)
          }}
        } className="mb-3" activeKey={key}>
          <Tab eventKey="intro" title="0. Intro">
            <h2>Intro to the DASH</h2>
            <p>Making decision together is an important activity for human being, but for thousands of years decisions are made behind closed door, lack data to make changes and it almost always costly to change any decision making process.</p>
            <p>DASH is a collection of on-chain program on Solana help anyone to build their community's decision making process on blockchain.
            DASH would make group decision making process <b>transparent</b>, <b>automated</b> with both web2 & web3 actions and easier to <b>iterate and improve</b></p>
            <img width="100%" src='./images/architecture.png' alt='architecture' />
            <div style={{width:"100%", textAlign:"center"}}>DASH architecture</div>
          </Tab>
          <Tab eventKey="new-grant" title="1. [Sample] Public funding">
            <CreateGrantForm />
          </Tab>
          <Tab eventKey="new-recruit" title="2. [Sample] Recruit">
            <CreateRecruitDecisionForm />
          </Tab>
          <Tab eventKey="solana-voter" title="3. Vote with SOL">
            <p>You can vote using your Solana private key. In the future we would support token & NFT voting</p>
            <SolProvider onAccountChange={(params:any) => {
            }}>
            </SolProvider>
          </Tab>
          <Tab eventKey="ethereum-voter" title="4. Vote with ETH">
            <p>You can vote using your EVM-compatible private key. In the future we would support token & NFT voting</p>
            <EthProvider onAccountChange={(params:any) => {
            }}>
            </EthProvider>
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}

export default App;
