var player_stat = false
var start = false
var sec = 0;
level = 1
var ab;
var art_link;
var songready = false;
var data1;
const format = (...args) => args.shift().replace(/%([jsd])/g, x => x === '%j' ? JSON.stringify(args.shift()) : args.shift())
document.getElementById("next-btn").disabled = true;
score = 0
history = []
var videoid;


$(document).ready(function () {

  var key = "AIzaSyDr-RcaHQlkvIR7VvSjY54sAuOysRqQVaE";
  var playlistId = 'PLhe7ZaTbaX3042cw6qed-jro00UW1FSYh';
  var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';


  var options = {
    part: 'snippet',
    key: key,
    maxResults: 40,
    playlistId: playlistId
  }

  loadVids();

  function loadVids() {
    $.getJSON(URL, options, function (data) {
      var id = data.items[0].snippet.resourceId.videoId;
      //mainVid(id);
      setPlayer(data)
      //resultsLoop(data);
    });
  }

  function mainVid(id) {
    $('#video').html(`
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      `);
  }


  function resultsLoop(data) {

    $.each(data.items, function (i, item) {

      var thumb = item.snippet.thumbnails.medium.url;
      var title = item.snippet.title;
      var desc = item.snippet.description.substring(0, 100);
      var vid = item.snippet.resourceId.videoId;


      $('main').append(`
            <article class="item" data-key="${vid}">

              <img src="${thumb}" alt="" class="thumb">
              <div class="details">
                <h4>${title}</h4>
                <p>${desc}</p>
              </div>

            </article>
          `);
    });
  }

  // CLICK EVENT
  $('main').on('click', 'article', function () {
    var id = $(this).attr('data-key');
    mainVid(id);
  });


});

async function setPlayer(data) {
  data1 = data
  not_history = false
  var i = Math.round(Math.random() * (data.items.length - 1))
  len = history.length
  j = 0
  while (j < len - 1) {
    if (history[j] == i) {
      i = Math.round(Math.random() * (data.items.length - 1))
      j = -1
    }
    j++
  }
  history[history.length] = i
  var item = data.items[i]
  thumb = item.snippet.thumbnails.medium.url;
  title = item.snippet.title;
  art_link = thumb
  ab = title
  videoid=item.snippet.resourceId.videoId
  songready = true;
  if (level!=1)
  {
    load(videoid)
  }
}


function play_pause(i = 0) {
  /*var Player = document.getElementById('video_player');
  var playY;
  console.log(Player.src)*/
  if (player_stat) {
    player_stat = false
    document.getElementById('playbtn').src = '../images/icons8-play-64.png'
    /*x = Player.src.slice(0, -27);
    Player.src = x;
    console.log(Player.src)*/
    start = false;
    pause()
    if (i == 0)
      timer()
  }
  else {
    player_stat = true
    document.getElementById('playbtn').src = '../images/icons8-pause-60.png'
    var dur = (sec + 40);
    if (sec != 0)
      dur -= 2
    /*Player.src += '&autoplay=1&mute=0&start=' + dur.toString()
    console.log(Player.src)*/
    start = true;
    seek(dur+2)
    play()
    if (i == 0)
      timer()
  }

}
var source;
//audio
function audio(id) {
  /*audio_el=document.getElementById("mp3");
  audio_el.src="https://www.youtube.com/watch?v="+id
  audio_el.play()
  */
  /*console.log(id)
  var video_el = document.getElementById("video_player");
  video_el.src = "https://www.youtube.com/embed/" + id + "?enablejsapi=1&&origin=http://127.0.0.1:5500";*/

}

function timer() {
  if (start && (player_stat)) {

    curr_time = document.getElementsByClassName("current-time")[0]
    if (sec <= 9)
      curr_time.innerHTML = "00:0" + sec.toString()
    else
      curr_time.innerHTML = "00:" + sec.toString()
    dur_slider = document.getElementById("dur")
    dur_slider.value = ((sec - 1) / 10) * 100
    if (sec > 10) {
      
      sec = 0
      start = false
      player_stat = true
      play_pause()
    }
    sec += 1
    setTimeout("timer()", 1000)

  }
}
function seekTo() {
  dur_slider = document.getElementById("dur")
  dur_slider.value = Math.round(dur_slider.value)
  sec = Math.round((dur_slider.value / 100) * 10);
  seek(60+sec)
  /*console.log(sec)
  play_pause(1)
  play_pause(1)*/
}

function songname() {
  return title;
}

function next_level() {
  level++
  if (level == 5) {
    document.getElementById("next-btn").classList.add("gameOver");
    sc = document.createElement("script")
    sc.setAttribute("src", "js/gif_b.js")
    document.body.appendChild(sc)
  }
  if (level <= 5) {
    document.getElementById("level").innerHTML = "LEVEL: " + level.toString()
    setPlayer(data1)
    sec = 0
    start = false
    player_stat = true
    dur_slider = document.getElementById("dur")
    dur_slider.value = 0
    curr_time = document.getElementsByClassName("current-time")[0]
    curr_time.innerHTML = "00:00"
    input_field = document.getElementById("Input_title")
    input_field.value = ""
    img = document.getElementById("art")
    img.src = "";
    document.getElementById("track-title").innerHTML = "Track Title"
    play_pause()
    document.getElementById("next-btn").disabled = true;
    document.getElementById("chk-btn").disabled = false;
  }

}
document.getElementById("next-btn").addEventListener("click", next_level)
if (level >= 10) {
  //Game over page
}
document.getElementById("chk-btn").addEventListener("click", getScore)
function getScore() {
  document.getElementById("chk-btn").disabled = true;
  img = document.getElementById("art")
  img.src = thumb;
  document.getElementById("track-title").innerHTML = ab;
 
  input_title = document.getElementById("Input_title").value + "-"
  input_title = input_title.split("-")
 
  document.getElementById("next-btn").disabled = false;

  if (ab.toLowerCase().indexOf((input_title[0].trim().toLowerCase())) >= 0 && input_title[0] != "")
    score += 50
  if (ab.toLowerCase().indexOf(input_title[1].trim().toLowerCase()) >= 0 && input_title[1] != "")
    score += 50
 
  document.getElementById("score").innerText = "Score: " + score.toString()

}

function gameOver(url) {
  content = document.getElementsByClassName("hide")[0]
  content.style.display = 'none'
  var div1 = document.createElement("div");
  div1.setAttribute('class', 'track-name');
  div1.innerHTML = "Game Over";
  style_div(div1)
  var div2 = document.createElement("div");
  div2.setAttribute('class', 'track-name');
  div2.innerHTML = "Your Score: " + score.toString();
  style_div(div2)
  var div3 = document.createElement("div");
  div3.setAttribute('id', 'gif');
  var img = document.createElement("iframe");
  img.src = url
  img.height = "330px"
  img.width = "440px"
  img.frameBorder = "0"
  div3.style.width = "420px"
  div3.style.height = "315px"
  div3.style.border = "none"
  div3.style.alignSelf = "center"
  div3.style.margin = "15px 0px"

  document.getElementById("main").appendChild(div1);
  document.getElementById("main").appendChild(div2);
  document.getElementById("main").appendChild(div3);
  document.getElementById("gif").appendChild(img);
}

function style_div(div1) {
  div1.style.color = "white";
  div1.style.fontSize = "50px"
  div1.style.fontFamily = "serif"
  div1.style.textAlign = "center"
  div1.style.margin = "20px 0px"
}

function get_id()
{
  return videoid;
}