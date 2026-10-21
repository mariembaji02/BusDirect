//affichage des inforamtions d'un boxes 
const container=document.querySelector(".countainer-Box");
const NexSiege=document.querySelector(".Siege");
const nom=document.querySelector("#NomModifier");
const Boxes=document.querySelectorAll(".box");
const message=document.querySelector(".message");

        //  Boxes.forEach(function(element){
        //    element.classList.add("Dipsonible");
        //  });
// container.addEventListener("click",function(e){
//    let box=e.target.closest(".box");
   
//    if(box)
//    {
//       let p=box.querySelector(".nom");
//     //   console.log(p.textContent);
//    }
// });

//ajouter un siege 
function Ajouter()
{
   const form =document.querySelector(".Ajouter-form");
   
    form.addEventListener("submit",function(e){
    e.preventDefault();
    let nomPasseger=form.querySelector(".nomPasseger").value;//input
    let siegeAjouter=form.querySelector(".Siege").value;//select
    let text;
    
      if(nomPasseger==="")
      {
           message.classList.remove("valid");
           message.classList.add("error");
            text="Remplir le nom";
            message.innerHTML=text;
      }
      else
      {
        //message validation
           
        
      
        Boxes.forEach(function(siege,index)//recherche sur les boxes 
        {
           let siegeBox=siege.querySelector(".siege").textContent;
            
            if(siegeAjouter===siegeBox)
            {
                message.classList.remove("error");
                message.classList.add("valid");
                text="Reservation bien Enregistrer";
                 message.innerHTML=text;
                let nom=siege.querySelector(".nom");
                let option=form.querySelector('.Siege option[value="'+siegeAjouter+'"]');
                nom.textContent=nomPasseger;
                
                option.style.display = "none"; 
                form.querySelector(".Siege").value="chose";
              
                //  console.log("index de box est :",index);
                //   console.log("siege de box est :",siegeBox);
            }
          
        })
       
      }
 
       message.style.display="block";
});
}




