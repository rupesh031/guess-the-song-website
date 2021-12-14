 burger=document.querySelector(".burger")
 navbar=document.querySelector(".navbar")
 navlist=document.querySelector(".navlist")
 rightnav=document.querySelector(".rightnav")
bottom=document.querySelector(".bottom")

burger.addEventListener('click',()=>{
    burger.classList.toggle('correction')
    navbar.classList.toggle('nav_h')  ;  
    navlist.classList.toggle('vclass');
    rightnav.classList.toggle('vclass');
   
})