import axios from "axios";
import { FC, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";

const createGrantApplication = (title: string, description: string): object => {
  return {
    "name" : title,
    "description": description,
    "start": "start",
    "checkpoints": [
      {
        "id": "start",
        "name": "As community member (anyone with SOL address), do you approve this?",
        "data": {
          "options": [
              "Yes",
              "No"
          ],
          "max":3
        },
        "children":[
          "start_council",
          "start_no"
        ],
        "vote_machine_type": "SingleChoiceRaceToMax"
      },
      {
        "id": "start_council",
        "name": "As council (council NFT holder), do you think this project will contribute to the ecosystem?",
        "data": {
          "options": [
              "Yes",
              "No"
          ],
          "max":3
        },
        "children": [
          "start_council_tech",
          "start_council_no"
        ],
        "vote_machine_type": "SingleChoiceRaceToMax"
      },
      {
        "id": "start_no",
        "name": "Sorry, community reject this grant",
        "is_output": true
      },
      {
        "id": "start_council_tech",
        "name": "As technical counselor (NFT technical counselor holder), do you think this project can deliver and how do you think about the cost?",
        "data": {
          "options": [
              "Yes, and cost is fair",
              "Yes, but let's make some chances. The cost is a bit high.",
              "No, it is not feasible to implement this Grant Application"
          ],
          "max":3
        },
        "children": [
          "start_council_tech_Yes_fair",
          "start_council",
          "start_council_tech_No"
        ],
        "vote_machine_type": "SingleChoiceRaceToMax"
      },
      {
          "id": "start_council_no",
          "name": "Sorry, the council dont see your project can contribute to the ecosystem",
          "is_output": true
      },
      {
        "id": "start_council_tech_Yes_fair",
        "name": "Awesome, your prosposal is granted!",
        "is_output": true
      },
      {
        "id": "start_council_tech_No",
        "name": "Hey, your proposal is not feasible.",
        "is_output": true
      }
    ]
  }
}

const CreateGrantForm : FC = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [latestMissionId, setLatestMissionId] = useState("")

  const handleSubmit = (e: React.MouseEvent) => {
    if (title === "" || description === "") {
      alert("missing title and | or description")
      return;
    }
    e.preventDefault()
    const grantApplication = createGrantApplication(title, description)
    axios.post(process.env.REACT_APP_SERVER_BASE+"/create", grantApplication).then((res) => {
      setLatestMissionId(res.data.id)
    }).catch((e) => {
      alert(e.message)
    })
  }

  return (
    <div>
      <Row>
        <Col sm={12} md={7} lg={7}>
          <img src="./images/public_fund.png" alt="A sample public fund process" width="100%" />
        </Col>
        <Col sm={12} md={5} lg={5}  className="pt-3" >
          <h2>Demo explain</h2>
          <p>This demo simulate a selection process similar to that of Grant or Investment process from a Foundation or an Investment DAO.</p>
          <p>The picture on the left hand side shows the steps (3 steps) for an application to go through and who’s responsible to vote in each steps.</p>
          <p>In this demo, the steps is pre-defined (workflow). In the working version, users will be able to create their own workflow.</p>
          <h3>This Demo shows:</h3>
          <ul>
            <li>Once a consensus is reached at each step, the mission automatically move to the next steps.</li>
            <li>Web3 wallets and Web2 emails can both be use to vote on a misison.</li>
          </ul>
        </Col>
      </Row>
      
      <h1>Start the Demo</h1>
      <p>The Demo start by submitting a new application into the workflow (we call this: start a new mission).</p>
      <p>To start, enter the Title and the Description and click Submit.</p>
      <ul>
        <li>A Mission ID is generated: copy this ID.</li>
        <li>Now go to tab 3, 4 or 5 depends on which type of authentication you want to use. (you can use all 3 to simulate different people voting)</li>
      </ul>
      <Row className="mb-3">
        <Col sm={12} md={12} lg={12} >
          <Form.Group className="mt-1">
            <Form.Label className="mb-1">Title</Form.Label>
            <Form.Control type="text" placeholder="E.g: Build a SDK for the Solana blockchain, write a deepdive on Solana Defi, etc." 
                value={title} onChange={(e) => {
                  setTitle(e.target.value)
                }} />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={12} md={12} lg={12} >
          <Form.Group className="mt-1">
            <Form.Label className="mb-1">Description</Form.Label>
            <Form.Control type="text" placeholder="Why my application is superb and why I should be awarded the grant?" 
                value={description} onChange={(e) => {
                  setDescription(e.target.value)
                }} />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={12} md={12} lg={12} >
        <div>
          <h4>We will build a 3 round voting with Community -&gt; Council team -&gt; Tech advisor team.</h4>
        </div>
        <div>Note: To win a round, you need at least 3 "Yes". After submit, take the <b>Workflow Id</b> and go to Vote tab to see how vote works.</div>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={12} md={12} lg={12} >
          <Button onClick={handleSubmit}>Submit</Button>
        </Col>
      </Row>
      {latestMissionId !== "" ? 
        <Alert variant="success">Workflow ID: {latestMissionId}</Alert>: null}
    </div>
  )
}

export default CreateGrantForm