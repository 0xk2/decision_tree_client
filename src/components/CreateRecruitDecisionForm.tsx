import { FC, useState } from "react";
import { Button, Form, Alert, Row, Col } from "react-bootstrap";
import axios from "axios";

const createRecruitDecision = (candidates:RecruitItem[]):object => {
  const firstRound = parseInt(candidates.length/2+"")
  return {
    "name" : "Let's pick a candidate",
    "start": "a",
    "checkpoints": [
      {
        "id": "a",
        "name": "Select 50% - "+firstRound+" over "+candidates.length+" options",
        "vote_machine_type": "MultipleChoiceRaceToMax",
        "data": {
          "options": candidates,
          "max": 3,
          "top": firstRound
        },
        "children":["b"]
      },
      {
        "id": "b",
        "name": "Select 1 over 3 options",
        "vote_machine_type": "MultipleChoiceRaceToMax",
        "data" : {
          "max": 3,
          "top": 1
        },
        "children":["c"]
      },
      {
          "id": "c",
          "name": "Annouce winner !",
          "is_output": true
      }
    ]
  }
}

type RecruitItemRender = {
  title: string,
  description: string,
  deleteFn: (event: React.MouseEvent) => void,
}

const Item = ({title, description, deleteFn}: RecruitItemRender) => {
  return (
    <div className="p-2 border mt-2" >
      <h4>{title} <Button variant="outline-danger" style={{float:"right"}} onClick={deleteFn}>Remove</Button></h4>
      <div>{description}</div>
    </div>
  )
}

type RecruitItem = {
  title: string,
  description: string,
}

const defaultRecruitItems = [
  {title: "Adrian Nguyen", description: "8-year experience in FPT. FPT MBA. IELTS 7.0."},
  {title: "Elly Wang", description: "3-year experience in Google. Stanford bachelor. IELTS 8.5."},
  {title: "Joe Buffet", description: "5-year experience in Kakao. KAIST bachelor. IELTS 7.5."},
  {title: "Amarina Suh", description: "4-year experience in Facebook. MIT bachelor. Native English."},
  {title: "John Kim", description: "4-year experience in Vietnamese government. Uni of Kent bachelor. IELTS 9.0."},
  {title: "Jack Touliver", description: "5-year-experience in Airbnb, Telegram. Uni of Michigan.Native English."},
]


const CreateRecruitDecisionForm : FC = () => {
  const [items, setItems] = useState(defaultRecruitItems as RecruitItem[])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [latestMissionId, setLatestMissionId] = useState("")

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    const grantApplication = createRecruitDecision(items)
    axios.post(process.env.REACT_APP_SERVER_BASE+"/create", grantApplication).then((res) => {
      setItems([])
      setLatestMissionId(res.data.id)
    }).catch((e) => {
      alert(e.message)
    })
  }

  return (
    <div>
      <Row>
        <Col sm={12} md={7} lg={7}>
          <img src="./images/hiring.png" alt="A sample public fund process" width="100%" />
        </Col>
        <Col sm={12} md={5} lg={5}  className="pt-3" >
          <h2>Demo explain</h2>
          <p>This demo simulate a selection process similar to that of a recruitment process where from a pool of candidates, the organisation narrow the options down to one eventual winner.</p>
          <p>The picture on the left hand side shows the steps (2 steps) for a candidate to go through and who is responsible to vote in each steps.</p>
          <p>In this demo, the steps is pre-defined (workflow). In the working version, users will be able to create their own workflow.</p>
          <p>This Demo shows:</p>
          <ul>
            <li>Once a consensus is reached at each step, the mission automatically move to the next steps.</li>
            <li>Web3 wallets and Web2 emails can both be use to vote on a misison.</li>
          </ul>
        </Col>
      </Row>
      <div>
        <Form.Label>
          <h3>Start the Demo &nbsp;
          <Button variant="outline-primary" onClick={() => {
            setItems(defaultRecruitItems)
            setTitle("")
            setDescription("")
          }}>Restart demo data</Button>
          </h3>
          <p>The Demo start by submitting a new application into the workflow (we call this: start a new mission).</p>
          <p>To start:</p>
          <ul>
            <li>Enter the Title and the Description to Add new candidate. We already created 6 candidates for you so you don’t need to do this steps if you don’t want to. However, depends on how many candidate in total at the beginning it will affect the number of winners in the 1st voting steps as it is define as 50% of all starting options.</li>
            <li>Click Submit when you done.</li>
            <li>A Mission ID is generated: copy this ID.</li>
            <li>Now go to tab 3, 4 or 5 depends on which type of authentication you want to use. (you can use all 3 to simulate different people voting)</li>
          </ul>
        </Form.Label>
        <Form.Group className="mt-2">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={title} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
          }} />
        </Form.Group>
        <Form.Group className="mt-2 mb-2">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" value={description} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
            setDescription(e.currentTarget.value)
          }} />
        </Form.Group>
        <Button onClick={() => {
          setItems([...items, {title, description}])
          setTitle("")
          setDescription("")
        }}>Add</Button>
      </div>
      <div className="mt-3">
        {items.map((item, index) => {
          return <Item key={index} title={item.title} description={item.description}
            deleteFn={(e) => {
              let newItems = [...items]
              newItems.splice(index, 1)
              setItems(newItems)
            }} />
        })}
      </div>
      <div className="mt-3 mb-3">
        <div>
          <h4>We will build a 2 round voting to select the 1 candidate from {items.length} candidates</h4>
        </div>
        <div>Note: we need at least 4 candidates to start this process. Whoever win 3 votes will be selected. After submit, take the Workflow Id and go to Vote tab to see how vote works.</div>
      </div>
      <div className="mt-3 mb-3">
        {items.length >= 4 ? <Button onClick={handleSubmit}>Submit</Button> : null}
      </div>
      <div className="mt-3 mb-3">
      {latestMissionId !== "" ? 
        <Alert variant="success">Workflow ID: {latestMissionId}</Alert>: null}
      </div>
    </div>
  )
}

export default CreateRecruitDecisionForm