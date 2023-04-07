import { FC } from "react";

const SingleChoiceRaceToMax = "SingleChoiceRaceToMax"
const MultipleChoiceRaceToMax = "MultipleChoiceRaceToMax"

type VoteResult = {
  [propKey: string]: number
}

type Props = {
  type: string,
  voteResult: VoteResult,
  choices: object[]
}

const VoteMachineVoteResult: FC<Props> = ({type, voteResult, choices}) => {
  const isSingleChoiceRaceToMax : boolean = type === SingleChoiceRaceToMax
  const isMultipleChoiceRaceToMax : boolean = type === MultipleChoiceRaceToMax
  return (
    isSingleChoiceRaceToMax === true ? <SingleChoiceRaceToMaxVoteResult voteResult={voteResult} choices={choices} /> : 
      isMultipleChoiceRaceToMax === true ? <MultipleChoiceRaceToMaxVoteResult voteResult={voteResult} choices={choices} /> : null
  )
}

type VoteResultProps = {
  voteResult: VoteResult,
  choices: object[]
}

const SingleChoiceRaceToMaxVoteResult: FC<VoteResultProps> = ({voteResult, choices}) => {
  return (
    <div>
      {
        Object.keys(voteResult).map((key:string, index:number) => {
          const value = voteResult[key]
          return <div key={key}>"{String(choices[parseInt(key)])}" got {value} vote(s)</div>
        })
      }
    </div>
  )
}

type TitleWithDesc = {
  title: string,
  description: string
}

type MultipleChoiceRaceToMaxFormProps = {
  voteResult: VoteResult,
  choices: TitleWithDesc[],
}

const MultipleChoiceRaceToMaxVoteResult: FC<VoteResultProps> = (params) => {
  const {voteResult, choices} =  params as MultipleChoiceRaceToMaxFormProps
  return (
    <div>
      {choices.map((choice:TitleWithDesc, index:number) => {
        return <div key={index}>"{choice.title}" got {voteResult[index] || 0} vote(s)</div> 
      })}
    </div>
  )
}

export default VoteMachineVoteResult