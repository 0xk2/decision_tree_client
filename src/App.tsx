import React, { useState } from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import './App.css';
import EthProvider from './provider/ethereum/EthProvider';
import SolProvider from './provider/solana/SolProvider';
import CreateGrantForm from './components/CreateGrantForm';
import CreateRecruitDecisionForm from './components/CreateRecruitDecisionForm';
import GoogleProvider from './provider/google/GoogleProvider';

const VoteIntro = () => {
  return (
    <div>
      <p style={{fontWeight:"700"}}>To start voting:</p>
      <ul>
        <li>Connect your wallet or Email</li>
        <li>Paste the Mission ID you have and hit Load Mission</li>
        <li>On the left side of the screen you will see the option you can choose to vote with. On the right side is the information of the mission you created, once you cast a vote it will also show how many people has vote in the options.</li>
        <li>Cast your vote, in this demo, we don not limit the amount of time an user can vote. A winning option will need at least 3 vote, so you will need to cast multiple vote for the workflow to proceed.</li>
        <li>To fully understand the demo, you should at least use 2 out of 3 Voting tab (tab 3, 4, 5) so that you can visually see different users from different chains and across web 2 and 3 can vote on a same mission.</li>
      </ul>
    </div>
  )
}

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
            <h3>TLDR; Please  go to either tab 1 or tab 2 to start the Demo.</h3>
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
            <p>TLDR; You can vote using your Solana private key. In the future we would support token & NFT voting</p>
            <VoteIntro />
            <SolProvider onAccountChange={(params:any) => {
            }}>
            </SolProvider>
          </Tab>
          <Tab eventKey="ethereum-voter" title="4. Vote with ETH">
            <p>TLDR; You can vote using your EVM-compatible private key. In the future we would support token & NFT voting</p>
            <VoteIntro />
            <EthProvider onAccountChange={(params:any) => {
            }}>
            </EthProvider>
          </Tab>
          <Tab eventKey="Google-voter" title="5. Vote with Google Account">
            <p>TLDR; You can vote using your Google account.</p>
            <VoteIntro />
            <GoogleProvider></GoogleProvider>
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}

export default App;
