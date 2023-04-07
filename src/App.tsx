import React, { useState } from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import './App.css';
import EthProvider from './provider/ethereum/EthProvider';
import SolProvider from './provider/solana/SolProvider';
import CreateGrantForm from './components/CreateGrantForm';
import CreateRecruitDecisionForm from './components/CreateRecruitDecisionForm';
import GoogleProvider from './provider/google/GoogleProvider';

function App() {
  const [key, setKey] = useState("intro");

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
            <p>Making decision together is an important activity for human being, but for thousands of years decisions are made behind closed door, lack data to make changes and it is almost always too costly to change any decision making process.</p>
            <p>DASH is a collection of on-chain program on Solana help anyone to build their community's decision making process on blockchain.
            DASH would make group decision making process <b>transparent</b>, <b>automated</b> with both web2 & web3 actions and easier to <b>iterate and improve</b>. DASH provides following functions:</p>
            <ol>
              <li>Creator can build a Directed Graph with each Node has a Proposal with its own set of rule for voting and condition for moving to the next Node</li>
              <li>All data will be stored securely on Solana blockchain</li>
              <li>Thanks to Solana tech, creators can fund all voter activity to enable a gas-free user experience</li>
              <li>Thus, users can vote using almost any web2 or web3 identity (ed2559 & secpk251 private key) without paying gas fee</li>
              <li>DASH emits events after each user interaction, enable automated actions such as: post a tweet or send an email</li>
              <li>DASH provides Adapters on many blockchains to enable web3 action to be trigger once a Node is reached</li>
            </ol>
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
          <Tab eventKey="Google-voter" title="5. Vote with Google Account">
            <p>You can vote using your Google account.</p>
            <GoogleProvider></GoogleProvider>
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}

export default App;
