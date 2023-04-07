import { FC, useState } from "react"
import axios from 'axios';
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import VoteMachineForm from "./votemachine/VoteMachineForm";
import VoteMachineVoteResult from "./votemachine/VoteMachineVoteResult";

const SERVER_URL = "http://localhost:8080"

type AccountProps = {
  provider: string,
  identity?: string
}

type VoteResult = {
  [propKey: string]: number
}

type HistorialVote = {
  name: string,
  vote: VoteResult
}

const VoteForm : FC<AccountProps> = (account?) => {
  const defaultVote : VoteResult = {}
  const defaultHistoricalData : HistorialVote[] = []
  const [mission, setMission] = useState({
    mission_id: "",
    mission_name: "",
    mission_description: "",
    current: "",
    choices: [],
    vote_machine_type: "",
    current_vote_result: defaultVote,
    all_history_data: defaultHistoricalData
  })
  const [inputMissionId, setInputMissionId] = useState("")
  const [voteStatus, setVoteStatus] = useState(0)
  const [voteMessage, setVoteMessage] = useState('')
  let choices : number[] = [0]
  const setChoices = (newChoices: number[]) => {
    choices = newChoices
  }

  const handleMissionIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMissionId(event.target.value)
  }

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault()
    loadMissionDetail(inputMissionId)
  }

  const loadMissionDetail = (mission_id:string) => {
    axios.get(SERVER_URL+"/show?id=" + mission_id).then((res) => {
      setMission(res.data)   
    }).catch((e) => {
      alert(e.message)
    })
  }

  const handleSubmitVote = (e:React.MouseEvent) => {
    e.preventDefault()
    const body = {
      missionId: mission.mission_id,
      who: account?.provider+"."+account?.identity,
      options: choices
    }
    axios.post(SERVER_URL+"/vote", body).then((res) => {
      const resp = res.data
      loadMissionDetail(mission.mission_id)
      if (resp.status === true){
        setVoteStatus(1)
      }else{
        setVoteStatus(2)
        setVoteMessage(resp.message)
      }
    }).catch((e) => {
      alert(e.message)
    })
  }

  if (account?.identity === undefined){
    // return empty if no account has connected
    return <div></div>
  }
  return (
    <Container className="vote-form">
      <Row>
        <h2>Workflow info</h2>
      </Row>
      <Form className="mb-5">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Workflow Id</Form.Label>
          <Form.Control type="text" placeholder="Some mission id, e.g: RSuWDeGDCVqrazht" 
            value={inputMissionId} onChange={handleMissionIdChange} />
        </Form.Group>
        <Button onClick={handleSubmit}>Load Mission</Button>
      </Form>
      <Row>
        <Col sm={12} lg={6} >
          <Row>
            <h2>Cast your voice</h2>
            <div>{account.identity}</div>
          </Row>
          <div>
            <Row className="mb-3">
              <Col sm={12} md={12} lg={12} >
                {mission.current}
              </Col>
            </Row>
            {mission.choices ? 
            <div>
              <VoteMachineForm type={mission.vote_machine_type} choices={mission.choices} setChoices={setChoices} />
              <Row className="mb-3">
                <Button onClick={handleSubmitVote}>Vote</Button>
              </Row>
            </div>
            : null}
            <Row className="mt-3">
              {voteStatus === 0 ? null : 
                voteStatus === 1 ? 
                  <Alert variant='success' onClose={() => {setVoteStatus(0)}} dismissible>Vote success</Alert> 
                : <Alert variant='danger' onClose={() => {setVoteStatus(0)}} dismissible>Vote failed</Alert>}
            </Row>
          </div>
        </Col>
        <Col sm={12} md={6} lg={6} >
          {mission.mission_id ? 
            <div>
              <Row>
                <Col sm={12} md={12} lg={12} >
                  <h4>{mission.mission_name}</h4>
                  <div>{mission.mission_description}</div>
                  <hr/>
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={12} lg={12} >
                  <div>{mission.all_history_data?
                  mission.all_history_data.map((data:HistorialVote, index:number) => {
                    return <span key={index}>
                      {data.name} &gt; &nbsp;
                    </span>
                  })
                  :null}</div>
                  <h4>{mission.current}</h4>
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={12} lg={12} >
                {mission.choices ?
                  <VoteMachineVoteResult type={mission.vote_machine_type} voteResult={mission.current_vote_result} choices={mission.choices} />
                  : null}
                {voteMessage? <div>{voteMessage}</div> : null}
                </Col>
              </Row>
            </div>
          : null}
        </Col>
      </Row>
    </Container>
  )
}

export default VoteForm