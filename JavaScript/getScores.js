localStorage.setItem('user', JSON.stringify(user));
let score = {
    score: [
        ["Luis", 1, "1:20"]
]
}



function getScore(){
    let individualScore = JSON.parse(localStorage.getItem('score'));
    for (let i = 0; i<individualScore.score.lenght;i++){
        let name = individualScore.score[i][0];
        let level = individualScore.score[i][1];
        let time = individualScore.score[i][2];
    }
}

function addScore(name, level, time){
    
}






