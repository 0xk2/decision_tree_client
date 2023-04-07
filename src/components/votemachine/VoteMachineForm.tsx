import { FC, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

const SingleChoiceRaceToMax = "SingleChoiceRaceToMax"
const MultipleChoiceRaceToMax = "MultipleChoiceRaceToMax"

type Props = {
  type: string,
  choices: object[],
  setChoices: Function
}

const VoteMachineForm : FC<Props> = ({type, choices, setChoices}) => {
  const isSingleChoiceRaceToMax : boolean = type === SingleChoiceRaceToMax
  const isMultipleChoiceRaceToMax : boolean = type === MultipleChoiceRaceToMax
  return (
    isSingleChoiceRaceToMax === true ? <SingleChoiceRaceToMaxForm choices={choices} setChoices={setChoices} /> : 
      isMultipleChoiceRaceToMax === true ? <MultipleChoiceRaceToMaxForm choices={choices} setChoices={setChoices} /> : null
  )
}

type FormProps = {
  choices: object[],
  setChoices: Function
}

const SingleChoiceRaceToMaxForm: FC<FormProps> = ({choices, setChoices}) => {
  const [inputVote, setInputVote] = useState(0)
  const handleVoteChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setInputVote(parseInt(e.target.value))
    setChoices([parseInt(e.target.value)])
  }
  return (
    <div>
      <Row className="mb-3">
        <Col sm={12} md={12} lg={12} >
          <Form.Select value={inputVote} aria-label="Default select example" onChange={handleVoteChange}>
            {choices.map((key:object, index:number) => {
              return <option key={index} value={index}>{String(key)}</option>
            })}
          </Form.Select>
        </Col>
      </Row>
    </div>
  )
}

type TitleWithDesc = {
  title: string,
  description: string
}

type MultipleChoiceRaceToMaxFormProps = {
  choices: TitleWithDesc[],
  setChoices: Function
}

const MultipleChoiceRaceToMaxForm: FC<FormProps> = (params) => {
  const {choices, setChoices} =  params as MultipleChoiceRaceToMaxFormProps
  const [inputVote, setInputVote] = useState([] as string[])

  const handleVoteChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    let arr = [].slice.call(e.target.selectedOptions).map((option:HTMLOptionElement) => {
      return String(option.value)
    })
    setInputVote(arr)
    setChoices(arr.map((key:string) => {return parseInt(key)}))
  }
  return (
    <div>
      <Row className="mb-3">
        <Col sm={12} md={12} lg={12} >
          <Form.Select value={inputVote} multiple={true} aria-label="Default select example" onChange={handleVoteChange}>
            {choices.map((key:TitleWithDesc, index:number) => {
              return <option key={index} value={index}>{String(key.title)}</option>
            })}
          </Form.Select>
        </Col>
      </Row>
    </div>
  )
}



export default VoteMachineForm