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
      <Container>
        <Tabs id="controlled-tab" onSelect={(e:string|null) => {
          if (e!== null){
            setKey(e)
          }}
        } className="mb-3" activeKey={key}>
          <Tab eventKey="intro" title="Intro">
            <h1>Intro to the DEMO</h1>
            <div>This is a demo to show how we can use Blockchain to create Decision Tree | Directed Graph</div>
          </Tab>
          <Tab eventKey="solana-voter" title="Vote with SOL">
            <SolProvider onAccountChange={(params:any) => {
            }}>
            </SolProvider>
          </Tab>
          <Tab eventKey="ethereum-voter" title="Vote with ETH">
            <EthProvider onAccountChange={(params:any) => {
            }}>
            </EthProvider>
          </Tab>
          <Tab eventKey="new-grant" title="New Grant">
            <CreateGrantForm />
          </Tab>
          <Tab eventKey="new-recruit" title="New Recruit">
            <CreateRecruitDecisionForm />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}

export default App;
