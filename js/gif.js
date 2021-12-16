const rp = require('request-promise');
document.getElementsByClassName("gameOver")[0].addEventListener("click", get_url)
remark = ""
function get_url() {
    if (score < 150) {
        remark = "loser"
    }
    else if (score >= 150 && score < 400) {
        remark = "average"
    }
    else if (score >= 400 && score < 800) {
        remark = "excellent"
    }
    else {
        remark = "legendary"
    }
    const options = {
        url: "https://api.giphy.com/v1/gifs/search?offset=0&type=gifs&explore=false&q=" + remark+ "&api_key=L8eXbxrbPETZxlvgXN9kIEzQ55Df04v0",
        json: true
    }
    rp(options)
        .then((data) => {
            i = Math.round(Math.random() * (data.data.length - 1))
            url = data.data[i].embed_url
            gameOver(url)
        })
        .catch((err) => {
            console.log(err);
        });
}
