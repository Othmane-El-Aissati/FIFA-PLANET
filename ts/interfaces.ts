// Required user information to register 
interface IUser {
    name :string,
    password :string,
    email :string,
    travel :string,
    score :number,
}

interface IClubs{
    id :number,
    name :string,
    league :number
}

interface ILeague{
    id: number,
    name: string
}

interface ICombo{
    club: string,
    clubLeague: number,
    league: string,
    leagueId: number
}

interface ICurrentUser{
    name: string,
    travel: string
}

interface ILeagueReturnType{
    correctPosition :number,
    chosenClubName : string,
    anwsers : string[]
}

export{IUser, IClubs, ILeague, ICombo, ICurrentUser, ILeagueReturnType};