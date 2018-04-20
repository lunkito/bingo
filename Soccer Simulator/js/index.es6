class Team {
  constructor(name, logoURL){
    this.name = name,
    this.logoURL = logoURL,
    this.goal,
    this.goalAgainst,
    this.totalGoals = 0,
    this.totalGoalsAgainst = 0,
    this.points = 0
  }
}

let dom = {
  match_button: document.querySelector(".match_button"),
  match_result: document.querySelector(".match_result"),
  journey_button: document.querySelector(".journey_button"),
  journey_result: document.querySelector(".journey_result"),
  season: document.querySelector(".season tbody"),
  season_button: document.querySelector(".season_button")
}

let teamNameList = ['F.C. Barcelona', 'Real Madrid', 'Valencia C.F.', 'Atlético de Madrid', 'Real Betis', 'Villarreal C.F.', 'Sevilla F.C.', 'Getafe C.F.', 'Girona F.C.', 'Celta de Vigo', 'S.D. Eibar', 'Real Sociedad', 'Athletic de Bilbao', 'C.D. Leganés', 'Deportivo Alavés', 'Espanyol C.F.', 'Levante U.D.', 'R.C. Deportivo', 'U.D. Las Palmas', 'Málaga C.F.']
let teamLogoList = ['http://elmiradorespagnol.free.fr/futbol/original/Barcelona.gif',
'http://elmiradorespagnol.free.fr/futbol/original/Real%20Madrid.gif',
'http://elmiradorespagnol.free.fr/futbol/original/Valencia.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Atletico%20de%20Madrid.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Betis.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Villarreal.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Sevilla.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Getafe.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Girona.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Celta.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Eibar.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Real%20Sociedad.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Athletic%20Bilbao.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Leganes.png', 'http://elmiradorespagnol.free.fr/futbol/original/Alaves.png', 'http://elmiradorespagnol.free.fr/futbol/original/Espanol.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Levante.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Deportivo%20de%20la%20Coruna.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Las%20Palmas.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Malaga.gif'
]

// Para que se emparejen aleatoriamente los equipos, creo copia de la lista, la mezclo y QUITO equipos de 2 en 2.
// Eso me traera problemas mas alante
let teamList = []
let teamListCopy = []

let createTeamList = () => {
  for (const teamName of teamNameList) 
    teamList.push(new Team(teamName, ""))

  for (const teamLogoIndex in teamLogoList) 
    teamList[teamLogoIndex].logoURL = teamLogoList[teamLogoIndex]
}
createTeamList()

let createTeamListCopy = () => {
  for (const team  of teamList) 
    teamListCopy.push(new Team(team.name, team.logoURL))
  teamListCopy = _.shuffle(teamListCopy)
}
createTeamListCopy()

// Aleatorio tipo gauss
let randn_bm = () => {
    var u = 0, v = 0;
    while(u === 0) u = Math.random();
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

let newMatch = () => {
  if(teamListCopy.length == 0)
    createTeamListCopy()
  
  // Aqui empieza la chapuza. La informacion del partido va para el original pero el nombre pa que los partidos no se repitan a la copia
  // Aprovecho que las variables de objetos son por referencia para modificar el original.
  let team1 = teamListCopy.pop()
  let team2 = teamListCopy.pop()

  // Como en c# linq devuelve un Ienumerable, js devuelve un array -> pop pa sacar el objeto equipo
  let team1Original = teamList.filter(team => team.name == team1.name).pop() 
  let team2Original = teamList.filter(team => team.name == team2.name).pop()
  let goal1 = Math.round(Math.abs(randn_bm()))
  let goal2 = Math.round(Math.abs(randn_bm()))

  team1Original.goal = goal1
  team2Original.goal = goal2
  // team1Original.goalAgainst = goal2
  // team2Original.goalAgainst = goal1
  team1Original.totalGoals += goal1
  team2Original.totalGoals += goal2
  team1Original.totalGoalsAgainst += goal2
  team2Original.totalGoalsAgainst += goal1

  if (team1Original.goal == team2Original.goal) {
    team1Original.points += 1
    team2Original.points += 1    
  }
  if (team1Original.goal > team2Original.goal) 
    team1Original.points += 3
  if (team1Original.goal < team2Original.goal) 
    team2Original.points += 3

  return [team1Original, team2Original]
}

let newJourney = () => {
  let total = []
  for (var i = 0; i < 10; i++)
    total.push(newMatch())
  return total
}

let appendMatch = () =>  {
  let teams = newMatch()

  dom.match_result.innerHTML = `<img src="${teams[0].logoURL}"> ${teams[0].name} ${teams[0].goal} -
  ${teams[1].goal} ${teams[1].name} <img src="${teams[1].logoURL}">`
}

let appendJourneySeason = () => {
  // newMatch devuelve [{team}, {team}]. newJourney llama a newMatch y devuelve [[{team}, {team}],[{team}, {team}]...]
  let twoTeamsArray = newJourney()
  let teamsArray = []
  dom.journey_result.innerHTML = null
  
  // Separar parejas de equipos
  for (let i = 0; i < twoTeamsArray.length; i++) {
    teamsArray.push(twoTeamsArray[i][0])
    teamsArray.push(twoTeamsArray[i][1])    
  }

  // appendJourney
  for (let i = 0; i < teamList.length; i = i + 2) {
    let teamLeft = `<img src="${teamsArray[i].logoURL}"> ${teamsArray[i].name} ${teamsArray[i].goal}`
    let teamRight = ` - ${teamsArray[i+1].goal} ${teamsArray[i+1].name} <img src="${teamsArray[i+1].logoURL}"><br>`

    dom.journey_result.innerHTML += teamLeft + teamRight
  }

  // appendSeason
  teamsArray = _.orderBy(teamsArray, ['points', 'totalGoals', 'totalGoalsAgainst'], ["desc", "desc", "asc"])
  let tbody = ""
  for (const teamIndex in teamsArray) {
    let tr =
    `<tr>
      <td>${1 + Number(teamIndex)}</td>
      <td>${teamsArray[teamIndex].name}</td>
      <td>${teamsArray[teamIndex].points}</td>
      <td>${teamsArray[teamIndex].totalGoals}</td>
      <td>${teamsArray[teamIndex].totalGoalsAgainst}</td>
    </tr>`
    tbody += tr
  }
  dom.season.innerHTML = tbody
}

let resetSeason = () => {
  // reset lista original
  for (const team of teamList) {
    team.goal = 0
    team.totalGoals = 0
    team.points = 0
  }
  dom.journey_result.innerHTML = ""
  dom.match_result.innerHTML = ""
  dom.season.innerHTML = ""
}

dom.match_button.addEventListener('click', appendMatch)
dom.journey_button.addEventListener('click', appendJourneySeason)
dom.season_button.addEventListener('click', resetSeason)
