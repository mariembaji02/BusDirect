//affichage des inforamtions d'un boxes
const container = document.querySelector(".countainer-Box");
const NexSiege = document.querySelector(".Siege");
const nom = document.querySelector("#NomModifier");
const Boxes = document.querySelectorAll(".box");
const message = document.querySelector(".message");
const messageModifier = document.querySelector(".messageModifier");
const formModifier = document.querySelector(".EditForm");
const selectModifier = document.getElementById("newSeat");
const form = document.querySelector(".Ajouter-form");
const nomPassager = document.getElementById("NomModifier");
const NewPassager = document.getElementById("NouveauNom");
const NewSiege = document.getElementById("newSeat");
const Reservations = [];



form.addEventListener("submit", function (e) {
  e.preventDefault();
  RemplirSelectEdit();
  
});

function Ajouter() {
  let nomPasseger = form.querySelector(".nomPasseger").value.trim(); //input
  let siegeAjouter = form.querySelector(".Siege").value.trim(); //select
  let placeDisponible = document.getElementById("plcDispo");
  let chiffreAffaire = Number(
    document.getElementById("chiffreAffaire").textContent,
  );

 

             if (nomPasseger === "") {
                        message.classList.remove("valid");
                        message.classList.add("error");
                        message.innerHTML = "Remplir le nom";
                      } 
             else if (Trouver(nomPasseger)) {
                        console.log("here");
                        message.classList.remove("valid");
                        message.classList.add("error");
                        message.innerHTML =   "Ce passager deja Existe";
                      } 
                      
  
             else if (siegeAjouter === "chose") {
                    console.log("champ siege est vide");
                    let dispoPlace = Dispo();
                    if (dispoPlace === undefined) {
                      console.log("le train est complet");
                    } else {
                      // console.log("le siege et :", dispoPlace);

                      Boxes.forEach(function (siege) {
                    //recherche sur les boxes
                    let siegeBox = siege.querySelector(".siege").textContent.trim();
                    if (dispoPlace === siegeBox) {
                      let nom = siege.querySelector(".nom");
                      let option = form.querySelector(
                        '.Siege option[value="' + dispoPlace + '"]',
                      );
                      nom.textContent = nomPasseger;
                      Reservations.push({
                        siegeNum: Number(dispoPlace),
                        Pesrsonne: nomPasseger,
                      });
                      let placesReserver = Reservations.length;
                      placeDisponible.innerHTML = 20 - placesReserver;
                      chiffreAffaire += 80;
                      document.getElementById("chiffreAffaire").innerHTML = chiffreAffaire;

                      siege.classList.remove("disponible");
                      siege.classList.add("reserver");
                      option.style.display = "none";
                      document.querySelector(".nomPasseger").value = "";
                      form.querySelector(".Siege").value = "chose";
                      //affichage de message
                      message.classList.remove("error");
                      message.classList.add("valid");
                      message.innerHTML =   "Reservation bien Enregistrer";

                      Remplir();
                    }
                  });
                }
              } 
              else {
              //message validation

              Boxes.forEach(function (siege) {
                //recherche sur les boxes
                let siegeBox = siege.querySelector(".siege").textContent.trim();
                if (siegeAjouter === siegeBox) {
                  let nom = siege.querySelector(".nom");
                  let option = form.querySelector(
                    '.Siege option[value="' + siegeAjouter + '"]',
                  );
                  nom.textContent = nomPasseger;
                  Reservations.push({
                    siegeNum: Number(siegeAjouter),
                    Pesrsonne: nomPasseger,
                  });
                  let placesReserver = Reservations.length;
                  placeDisponible.innerHTML = 20 - placesReserver;
                  chiffreAffaire += 80;
                  document.getElementById("chiffreAffaire").innerHTML = chiffreAffaire;
                  siege.classList.remove("disponible");
                  siege.classList.add("reserver");
                  option.style.display = "none";

                  document.querySelector(".nomPasseger").value = "";
                  form.querySelector(".Siege").value = "chose";

                  //affichage de message
                  message.classList.remove("error");
                  message.classList.add("valid");
                  message.innerHTML ="Reservation bien Enregistrer" ;
                  // console.log("le squope de ajouter ");
                  Remplir();
                }
              });
            }

            message.style.display = "block";
}

function Trouver(nom) {
  let Passager = Reservations.find((ticket) => {
    return ticket.Pesrsonne.trim().toLowerCase() === nom.trim().toLowerCase();
  });
  return Passager;
}
function Dispo() { 
  let place = Array.from(Boxes).find((Dispo) => {
    return Dispo.classList.contains("disponible");
  });
  if (place === undefined) {
    return undefined;
  } else {
    return place.textContent.trim();
  }
}
function Remplir() {
  let Nom_Select = document.getElementById("NomModifier");
  Nom_Select.replaceChildren();
  let option = document.createElement("option");
  option.value = "chose";
  option.textContent = "choisez un nouveau Passager";
  Nom_Select.append(option);
  Reservations.forEach((nom) => {
    let option = document.createElement("option");
    option.value = nom.Pesrsonne;
    option.textContent = nom.Pesrsonne;

    Nom_Select.append(option);
  });
}
function RemplirSelectEdit() {
   const DispoSiege = container.querySelectorAll(".box.disponible");
          
          selectModifier.replaceChildren();

          let option = document.createElement("option");
          option.value = "chose";
          option.textContent = "choisez un nouveau siege";
          selectModifier.append(option);

          DispoSiege.forEach((num) => {
            let sigeNum = num.querySelector(".siege").textContent.trim();
            let option = document.createElement("option");
            option.value = sigeNum;
            option.textContent = sigeNum;
            selectModifier.append(option);
          });

}

        formModifier.addEventListener("submit", (e) => {
          e.preventDefault();
          ModifierPassager();
        });
function ModifierPassager() {
  
                                    // 1. Vérifier le passager choisi
                      if (nomPassager.value === "chose") {
                         messageModifier.classList.remove("valid");
                         messageModifier.classList.add("error");
                         messageModifier.innerHTML ="Choisis un nom de passager" ;
                         messageModifier.style.display = "block";
                        return;
                      }

                      // 2. Chercher le passager dans Reservations
                      const index = Reservations.findIndex((ticket) => {
                        return ticket.Pesrsonne === nomPassager.value;
                      });

                      if (index === -1) {
                         messageModifier.classList.remove("valid");
                         messageModifier.classList.add("error");
                         messageModifier.innerHTML ="Ce passager n'existe pas" ;
                         messageModifier.style.display = "block";
                         return;
                      }

                      // 3. Vérifier si les deux champs sont vides
                      if (NewPassager.value.trim() === "" && NewSiege.value === "chose") {
                         messageModifier.classList.remove("valid");
                         messageModifier.classList.add("error");
                         messageModifier.innerHTML ="Les deux champs sont vides" ;
                         messageModifier.style.display = "block";
                         return;
                        
                      }

                      // 4. Si on veut changer le siège, vérifier qu'il est libre
                      if (NewSiege.value !== "chose") {

                        const siegeOccupe = Reservations.some((ticket) => {
                          return ticket.siegeNum === Number(NewSiege.value);
                        });

                        if (siegeOccupe) {
                           messageModifier.classList.remove("valid");
                           messageModifier.classList.add("error");
                           messageModifier.innerHTML ="Ce siège est déjà réservé" ;
                           messageModifier.style.display = "block";
                          return;
                        }
                      }

                      // 5. Modifier le nom si le champ n'est pas vide
                      if (NewPassager.value.trim() !== "") {
                        Reservations[index].Pesrsonne = NewPassager.value.trim();
                      }

                      // 6. Modifier le siège si un nouveau siège est choisi
                      if (NewSiege.value !== "chose") {
                        Reservations[index].siegeNum = Number(NewSiege.value);
                      }

                      // 7. Mettre à jour les boxes selon Reservations
                      Boxes.forEach((box) => {
                        //nombre de siege sur grid
                        const numero = Number(
                          box.querySelector(".siege").textContent.trim()
                        );
                        //nom de passager sur grid
                        const nomBox = box.querySelector(".nom");

                        const reservation = Reservations.find((ticket) => {
                          return ticket.siegeNum === numero;
                        });

                        if (reservation) {
                          nomBox.textContent = reservation.Pesrsonne;
                          box.classList.remove("disponible");
                          box.classList.add("reserver");
                        } else {
                          nomBox.textContent = "";
                          box.classList.remove("reserver");
                          box.classList.add("disponible");
                        }
                      });

                      // 8. Actualiser les listes
                      Remplir();
                      RemplirSelectEdit();

                      // 9. Vider les champs après modification
                      NewPassager.value = "";
                      NewSiege.value = "chose";
                      messageModifier.classList.remove("error");
                      messageModifier.classList.add("valid");
                      messageModifier.innerHTML ="Modification réussie" ;
                      messageModifier.style.display = "block";
                      console.log("table de reservation", Reservations);

                       
}
                    
                  //   get the data from grid
         
                 
                             
                          
                              
                  
                            
               
     
    
  

