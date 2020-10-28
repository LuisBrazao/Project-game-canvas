function getScores() {
    let individualScore = JSON.parse(localStorage.getItem('score'));
    let sortedList = individualScore.score.sort((a, b) => {
        if (a[3] - b[3] === 0) {
            return a[2] - b[2];
        } else {
            return a[3] - b[3];
        }
    })
    console.log(sortedList);
    for (let i = 0; i < sortedList.length; i++) {
        let name = sortedList[i][0];
        let level = sortedList[i][1];
        let time = millisToMinutesAndSeconds(sortedList[i][2]);
        let coins = sortedList[i][3];
        let newRow = document.createElement("tr");
        newRow.innerHTML = `<th scope="row">${name}</th><td>${level}</td><td>${time}</td><td>${coins}</td>`;
        document.querySelector("tbody").appendChild(newRow);

    }
}

function addScore(name, level, time, coins) {
    if (localStorage.getItem('score') === null) {
        let newScore = [name, level, time, coins];
        let individualScore = {
            score: [newScore]
        };
        localStorage.setItem("score", JSON.stringify(individualScore));
    } else {
        let newScore = [name, level, time, coins];
        let individualScore = JSON.parse(localStorage.getItem('score'));
        individualScore.score.push(newScore);
        localStorage.clear();
        localStorage.setItem("score", JSON.stringify(individualScore));
    }

}

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }