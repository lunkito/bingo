function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Team = function Team(name, logoURL) {
  _classCallCheck(this, Team);

  this.name = name, this.logoURL = logoURL, this.goal, this.goalAgainst, this.totalGoals = 0, this.totalGoalsAgainst = 0, this.points = 0;
};

var dom = {
  match_button: document.querySelector(".match_button"),
  match_result: document.querySelector(".match_result"),
  journey_button: document.querySelector(".journey_button"),
  journey_result: document.querySelector(".journey_result"),
  season: document.querySelector(".season tbody"),
  season_button: document.querySelector(".season_button")
};

var teamNameList = ['F.C. Barcelona', 'Real Madrid', 'Valencia C.F.', 'Atlético de Madrid', 'Real Betis', 'Villarreal C.F.', 'Sevilla F.C.', 'Getafe C.F.', 'Girona F.C.', 'Celta de Vigo', 'S.D. Eibar', 'Real Sociedad', 'Athletic de Bilbao', 'C.D. Leganés', 'Deportivo Alavés', 'Espanyol C.F.', 'Levante U.D.', 'R.C. Deportivo', 'U.D. Las Palmas', 'Málaga C.F.'];
var teamLogoList = ['http://elmiradorespagnol.free.fr/futbol/original/Barcelona.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Real%20Madrid.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Valencia.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Atletico%20de%20Madrid.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Betis.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Villarreal.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Sevilla.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Getafe.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Girona.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Celta.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Eibar.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Real%20Sociedad.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Athletic%20Bilbao.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Leganes.png', 'http://elmiradorespagnol.free.fr/futbol/original/Alaves.png', 'http://elmiradorespagnol.free.fr/futbol/original/Espanol.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Levante.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Deportivo%20de%20la%20Coruna.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Las%20Palmas.gif', 'http://elmiradorespagnol.free.fr/futbol/original/Malaga.gif'];

// Para que se emparejen aleatoriamente los equipos, creo copia de la lista, la mezclo y QUITO equipos de 2 en 2.
// Eso me traera problemas mas alante
var teamList = [];
var teamListCopy = [];

var createTeamList = function createTeamList() {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = teamNameList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {if (window.CP.shouldStopExecution(1)){break;}
      var teamName = _step.value;

      teamList.push(new Team(teamName, ""));
    }
window.CP.exitedLoop(1);

  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  for (var teamLogoIndex in teamLogoList) {if (window.CP.shouldStopExecution(2)){break;}
    teamList[teamLogoIndex].logoURL = teamLogoList[teamLogoIndex];
  }
window.CP.exitedLoop(2);

};
createTeamList();

var createTeamListCopy = function createTeamListCopy() {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = teamList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {if (window.CP.shouldStopExecution(3)){break;}
      var team = _step2.value;

      teamListCopy.push(new Team(team.name, team.logoURL));
    }
window.CP.exitedLoop(3);

  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  teamListCopy = _.shuffle(teamListCopy);
};
createTeamListCopy();

// Aleatorio tipo gauss
var randn_bm = function randn_bm() {
  var u = 0,
      v = 0;
  while (u === 0) {if (window.CP.shouldStopExecution(4)){break;}
    u = Math.random();
  }
window.CP.exitedLoop(4);
while (v === 0) {if (window.CP.shouldStopExecution(5)){break;}
    v = Math.random();
  }
window.CP.exitedLoop(5);
return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
};

var newMatch = function newMatch() {
  if (teamListCopy.length == 0) createTeamListCopy();

  // Aqui empieza la chapuza. La informacion del partido va para el original pero el nombre pa que los partidos no se repitan a la copia
  // Aprovecho que las variables de objetos son por referencia para modificar el original.
  var team1 = teamListCopy.pop();
  var team2 = teamListCopy.pop();

  // Como en c# linq devuelve un Ienumerable, js devuelve un array -> pop pa sacar el objeto equipo
  var team1Original = teamList.filter(function (team) {
    return team.name == team1.name;
  }).pop();
  var team2Original = teamList.filter(function (team) {
    return team.name == team2.name;
  }).pop();
  var goal1 = Math.round(Math.abs(randn_bm()));
  var goal2 = Math.round(Math.abs(randn_bm()));

  team1Original.goal = goal1;
  team2Original.goal = goal2;
  // team1Original.goalAgainst = goal2
  // team2Original.goalAgainst = goal1
  team1Original.totalGoals += goal1;
  team2Original.totalGoals += goal2;
  team1Original.totalGoalsAgainst += goal2;
  team2Original.totalGoalsAgainst += goal1;

  if (team1Original.goal == team2Original.goal) {
    team1Original.points += 1;
    team2Original.points += 1;
  }
  if (team1Original.goal > team2Original.goal) team1Original.points += 3;
  if (team1Original.goal < team2Original.goal) team2Original.points += 3;

  return [team1Original, team2Original];
};

var newJourney = function newJourney() {
  var total = [];
  for (var i = 0; i < 10; i++) {if (window.CP.shouldStopExecution(6)){break;}
    total.push(newMatch());
  }
window.CP.exitedLoop(6);
return total;
};

var appendMatch = function appendMatch() {
  var teams = newMatch();

  dom.match_result.innerHTML = "<img src=\"" + teams[0].logoURL + "\"> " + teams[0].name + " " + teams[0].goal + " -\n  " + teams[1].goal + " " + teams[1].name + " <img src=\"" + teams[1].logoURL + "\">";
};

var appendJourneySeason = function appendJourneySeason() {
  // newMatch devuelve [{team}, {team}]. newJourney llama a newMatch y devuelve [[{team}, {team}],[{team}, {team}]...]
  var twoTeamsArray = newJourney();
  var teamsArray = [];
  dom.journey_result.innerHTML = null;

  // Separar parejas de equipos
  for (var i = 0; i < twoTeamsArray.length; i++) {if (window.CP.shouldStopExecution(7)){break;}
    teamsArray.push(twoTeamsArray[i][0]);
    teamsArray.push(twoTeamsArray[i][1]);
  }
window.CP.exitedLoop(7);


  // appendJourney
  for (var _i = 0; _i < teamList.length; _i = _i + 2) {if (window.CP.shouldStopExecution(8)){break;}
    var teamLeft = "<img src=\"" + teamsArray[_i].logoURL + "\"> " + teamsArray[_i].name + " " + teamsArray[_i].goal;
    var teamRight = " - " + teamsArray[_i + 1].goal + " " + teamsArray[_i + 1].name + " <img src=\"" + teamsArray[_i + 1].logoURL + "\"><br>";

    dom.journey_result.innerHTML += teamLeft + teamRight;
  }
window.CP.exitedLoop(8);


  // appendSeason
  teamsArray = _.orderBy(teamsArray, ['points', 'totalGoals', 'totalGoalsAgainst'], ["desc", "desc", "asc"]);
  var tbody = "";
  for (var teamIndex in teamsArray) {if (window.CP.shouldStopExecution(9)){break;}
    var tr = "<tr>\n      <td>" + (1 + Number(teamIndex)) + "</td>\n      <td>" + teamsArray[teamIndex].name + "</td>\n      <td>" + teamsArray[teamIndex].points + "</td>\n      <td>" + teamsArray[teamIndex].totalGoals + "</td>\n      <td>" + teamsArray[teamIndex].totalGoalsAgainst + "</td>\n    </tr>";
    tbody += tr;
  }
window.CP.exitedLoop(9);

  dom.season.innerHTML = tbody;
};

var resetSeason = function resetSeason() {
  // reset lista original
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = teamList[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {if (window.CP.shouldStopExecution(10)){break;}
      var team = _step3.value;

      team.goal = 0;
      team.totalGoals = 0;
      team.points = 0;
    }
window.CP.exitedLoop(10);

  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  dom.journey_result.innerHTML = "";
  dom.match_result.innerHTML = "";
  dom.season.innerHTML = "";
};

dom.match_button.addEventListener('click', appendMatch);
dom.journey_button.addEventListener('click', appendJourneySeason);
dom.season_button.addEventListener('click', resetSeason);
