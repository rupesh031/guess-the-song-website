const axios = require("axios");
const rp = require('request-promise');
const cheerio = require('cheerio');
const { slice } = require("cheerio/lib/api/traversing");
document.getElementById("chk-btn").addEventListener('click', call_lyrics)
score=0
function call_lyrics() {
    document.getElementById("chk-btn").disabled=true
    song = songname()
    if (song) {
        getlyrics(song)

    }
}

    function getlyrics(song) {
        var url1;
        song = song.replace("[", "(")
        song = song.replace("ft.", "(")
        song = song.replace(",", " ")
        song = song.replace("%", " percent")
        i = song.indexOf("(")
        if (i >= 0)
            song = song.slice(0, i)
        arr = song.split("-")
        length = arr.length;
        if (length >= 2) {
            song = arr[1] + arr[0]
        }

        console.log(song)

        const options = {
            url: 'https://shielded-chamber-55758.herokuapp.com/https://genius.com/api/search/multi?per_page=3&q=' + song,
            json: true
        }

        rp(options)
            .then((data) => {
                let userData = [];
                console.log(data)
                url1 = data.response.sections[1].hits[0].result.url
                axios.get("https://shielded-chamber-55758.herokuapp.com/"+url1)
                    .then((response) => {
                        const html = response.data;
                        const $ = cheerio.load(html);
                        const a = $("#lyrics-root-pin-spacer")
                        l = a.text()
                        format_lyrics(l)
                    })
                    //handling error
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((err) => {
                console.log(err);
            });

    }

    function format_lyrics(lyrics)
     {
        len=lyrics.length
        i=0
        while(i<lyrics.length-1)
        {
            if (lyrics.charAt(i)=="," || lyrics.charAt(i)=="?")
            {
                console.log("comma")
                lyrics=lyrics.slice(0,i)+lyrics.slice(i+1,lyrics.length)
                i--
            }
            if(lyrics.charAt(i)=="\'")
            {
                short=lyrics.charAt(i+1)
                console.log(short)
                to_skip=1
                long=" word"
                if (short=="m")
                {
                    long=" am"
                    to_skip=2
                }
                if (short=="s")
                {
                    long=" is"
                    to_skip=2
                }   

                if(short=="v")
                {
                    long=" have"
                    to_skip=3
                }
                    
                if(short=="l")
                {
                    long=" will"
                    to_skip=3
                }
                if (short=="r")
                {
                    long="are"
                    to_skip=2
                }
                if (short==" ")
                    long=""

               /* if (short="t")
                {
                    long=" not"
                    lyrics=lyrics.slice(0,i-1)+lyrics.slice(i,lyrics.length)
                    i--
                    to_skip=1
                }*/
                lyrics=lyrics.slice(0,i)+long+lyrics.slice(i+to_skip,lyrics.length)

            }
            if ((lyrics.charAt(i)==lyrics.charAt(i).toLowerCase()) && (lyrics.charAt(i+1)==lyrics.charAt(i+1).toUpperCase()) && lyrics.charAt(i)!=" " && lyrics.charAt(i+1)!=" "&& lyrics.charAt(i)!="\'" && lyrics.charAt(i+1)!="\'")
            {
            lyrics=lyrics.slice(0,i+1)+" "+lyrics.slice(i+1,lyrics.length)
            }
            i++;
        }
        lyrics=lyrics.toLowerCase()
        console.log(lyrics)
        input_field=document.getElementById("Input_Lyrics")
        input_lyrics=(input_field.value+".").toLowerCase()
        input_list=input_lyrics.split(".")
        i=0
        len=input_list.length
        while(i<len-1 && input_list[i]!="")
        {
            if (lyrics.indexOf(input_list[i])>=0 && input_list[i].split(" ").length>6 && input_list[i]!="")
            {
                score+=input_list[i].split(" ").length*20
            }
            else
            {
                list=input_list[i].split(" ")
                c=0
                x=0
                f=0
                max=0
                while (x>=0)
                {   c=0
                    x=lyrics.indexOf(list[0],x+1)
                    if(x<0)
                    {
                        if(f==0)
                        {
                            c--
                        }
                        
                    break
                    }
                    else
                    {
                        y=x
                        f=1
                        for(let j=0;j<list.length;j++)
                        {
                            if (list[j]==lyrics.slice(y,lyrics.indexOf(" ",y+1)))
                            {
                                y=lyrics.indexOf(" ",y+1)+1
                                c++
                            }
                        }
                        if (c>max)
                        {
                            max=c
                        }

                    }
                }
             score=score+20*max
            }
            i++
        }
        document.getElementById("score").innerHTML="Score: "+score
        document.getElementById("next-btn").disabled = false;
    }
    
