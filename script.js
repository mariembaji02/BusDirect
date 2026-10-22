//affichage des inforamtions d'un boxes 
const container=document.querySelector(".countainer-Box");
const NexSiege=document.querySelector(".Siege");
const nom=document.querySelector("#NomModifier");
const Boxes=document.querySelectorAll(".box");
const message=document.querySelector(".message");
const Reservations= [];
  //        Boxes.forEach(function(element){
  //          element.classList.add("Dipsonible");
  //        });
  //     container.addEventListener("click",function(e){
  //  let box=e.target.closest(".box");
   
  //  if(box)
  //  {
      // let p=box.querySelector(".nom");
    //   console.log(p.textContent);
  //  }
// });
//function recherch sur array Reservation 


  const form =document.querySelector(".Ajouter-form");
      form.addEventListener("submit",function(e){
      e.preventDefault();
       });
function Ajouter(){
  
    let nomPasseger=form.querySelector(".nomPasseger").value.trim();//input
    let siegeAjouter=form.querySelector(".Siege").value.trim();//select
    let placeDisponible=document.getElementById("plcDispo");
    let chiffreAffaire=Number(document.getElementById("chiffreAffaire").textContent);
    let text;
    
      if(nomPasseger===""){
           message.classList.remove("valid");
           message.classList.add("error");
            text="Remplir le nom";
            message.innerHTML=text;
      }
      else if(Trouver(nomPasseger)){
        console.log("here")
                message.classList.remove("valid");
                 message.classList.add("error");
                 text="Ce passager deja Existe";
                 message.innerHTML=text;
      }
      else if(siegeAjouter==="chose")
      {
         console.log("champ siege est vide")
         let dispoPlace=Dispo();
         if(dispoPlace===undefined)
         {
          console.log("le train est complet");
         }
         else
         {
         
          console.log("le siege et :",dispoPlace);

           Boxes.forEach(function(siege)//recherche sur les boxes 
           {
           let siegeBox=siege.querySelector(".siege").textContent.trim();
            if(dispoPlace===siegeBox)
            {
                  
                let nom=siege.querySelector(".nom");
                let option=form.querySelector('.Siege option[value="'+dispoPlace+'"]');
                nom.textContent=nomPasseger;
                Reservations.push({siegeNum:Number(dispoPlace),Pesrsonne:nomPasseger});
                let placesReserver=Reservations.length;
                placeDisponible.innerHTML=20-placesReserver;
                chiffreAffaire+=80;
                document.getElementById("chiffreAffaire").innerHTML=chiffreAffaire;
                
                siege.classList.remove("disponible");
                siege.classList.add("reserver");
                option.style.display = "none"; 
                document.querySelector(".nomPasseger").value="";
                form.querySelector(".Siege").value="chose";
                //affichage de message 
                 message.classList.remove("error");
                 message.classList.add("valid");
                 text="Reservation bien Enregistrer";
                 message.innerHTML=text;
                
            }
          
        })
        }
       }
      else{
        //message validation

        Boxes.forEach(function(siege)//recherche sur les boxes 
        {
           let siegeBox=siege.querySelector(".siege").textContent.trim();
            if(siegeAjouter===siegeBox)
            {
                  
                let nom=siege.querySelector(".nom");
                let option=form.querySelector('.Siege option[value="'+siegeAjouter+'"]');
                nom.textContent=nomPasseger;
                Reservations.push({siegeNum:Number(siegeAjouter),Pesrsonne:nomPasseger});
                let placesReserver=Reservations.length;
                 placeDisponible.innerHTML=20-placesReserver;
                chiffreAffaire+=80;
                document.getElementById("chiffreAffaire").innerHTML=chiffreAffaire;
                siege.classList.remove("disponible");
                siege.classList.add("reserver");
                option.style.display = "none"; 
                document.querySelector(".nomPasseger").value="";
                form.querySelector(".Siege").value="chose";
                //affichage de message 
                 message.classList.remove("error");
                 message.classList.add("valid");
                 text="Reservation bien Enregistrer";
                 message.innerHTML=text;
                console.log("le squope de ajouter ");
            }
          
        })
       
      }
 
       message.style.display="block";
        console.log("table de Reservation :",Reservations);

 
}

function Trouver(nom)
{
  
    let Passager=Reservations.find(ticket =>{
           return  ticket.Pesrsonne.trim().toLowerCase()===nom.trim().toLowerCase()
               
     }) 
     return Passager;

}
function Dispo()
{
   
     let place= Array.from(Boxes).find(Dispo =>{
        return  Dispo.classList.contains("disponible");
      })
      if(place===undefined)
      {
         return undefined;
      }
      else
      {
             return place.textContent.trim();
      }
      
  
}

