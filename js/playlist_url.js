
random_play=["PLhe7ZaTbaX31XdXP15c8xqp50TMsSpUfz"]
trending=["PLhe7ZaTbaX30M9e-9ywv7AfixgJ8PCIHJ"]
hip_hop=["PLhe7ZaTbaX31TnzOVudJeVh74SjPwG0lw"]
edm=["PLhe7ZaTbaX31muH99sXtjGXbNUZMgEpzU"]
lesser=["PLhe7ZaTbaX33oPhzgnXiqmQiK7D0D1TA4"]
old=["PLhe7ZaTbaX33nROVs_nZmjoSw3z6k0Sx4"]
band=["PLhe7ZaTbaX30jVweyDcnKeeBsVk4E6w7E"]
var mode_url="";
try{
    document.getElementById("edm").addEventListener("click",assign_url.bind(null,"edm"),false)
document.getElementById("old").addEventListener("click",assign_url.bind(null,"old"),false)
document.getElementById("band").addEventListener("click",assign_url.bind(null,"band"),false)
document.getElementById("trend").addEventListener("click",assign_url.bind(null,"trend"),false)
document.getElementById("less").addEventListener("click",assign_url.bind(null,"less"),false)
document.getElementById("hop").addEventListener("click",assign_url.bind(null,"hop"),false)
document.getElementById("random").addEventListener("click",assign_url.bind(null,"random"),false)

}
catch(err)
{
    console.log(err)
}



function assign_url(mode)
{
    console.log(mode)
    if (mode=="edm")
    {
        mode_url=edm[Math.round(Math.random()*(edm.length-1))]
    }
    if (mode=="old")
    {
        mode_url=old[Math.round(Math.random()*(old.length-1))]
    }
    if (mode=="trend")
    {
        mode_url=trending[Math.round(Math.random()*(trending.length-1))]
    }
    if (mode=="hop")
    {
        mode_url=hip_hop[Math.round(Math.random()*(hip_hop.length-1))]
    }
    if (mode=="less")
    {
        mode_url=lesser[Math.round(Math.random()*(lesser.length-1))]
    }
    if(mode=="random")
    {
        mode_url=random_play[Math.round(Math.random()*(random_play.length-1))]
    }
    if (mode=="band")
    {
        mode_url=band[Math.round(Math.random()*(band.length-1))]
    }
    localStorage.setItem("url",mode_url);
    console.log(mode_url)
}
 
