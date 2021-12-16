// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var ytplayer;


    function onYouTubeIframeAPIReady() {
        ytplayer = new YT.Player('mobile_player', {
            width: '0%',
            videoId: "CaZXdZGZfb0",
            playerVars: { 'autoplay': 0, 'playsinline': 1 },
            events: {
                'onReady': onPlayerReady
            }
        });
    }
    function onPlayerReady(event) {
        load(get_id())
    }
    function seek(dur) {
        ytplayer.seekTo(dur)
    }
    function play() {
        ytplayer.playVideo()
    }
    function pause() {
        ytplayer.pauseVideo()
    }
    function load(id) {
        ytplayer.loadVideoById(id, 5, "large")
        pause()
        seek(60)
    }

