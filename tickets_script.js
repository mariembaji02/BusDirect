const container=document.querySelector(".countainer_Tickets");
const Reservations=[]
const inp=document.querySelector(".search");
//remplir reservation from lacol storage 
 let data=JSON.parse(localStorage.getItem("reservations")|| "[]")
 Reservations.push(...data)
 let count=document.querySelector(".cout-ticket");
 count.textContent=Reservations.length;
//  console.log(data);
// console.log(container);



 //remplir le container by data from array

 container.innerHTML=Reservations.map((ticket,index)=>{
    return `<div class="ticket rounded-xl border-1 border-[rgba(142,125,37,0.911)] shadow-sm shadow-[rgba(160,142,53,0.52)] p-3 h-60 w-70 lg:w-70">
                <p class="flex justify-center mb-2"><img src="images/ticket-icon.svg" alt="ticket-icon" class="w-10"></p>
                <table class="table_tickets">
                  <tr>
                    <td class="name">ticket:</td>
                    <td class="value">${index+1}</td>
                  </tr>
                  <tr>
                    <td class="name">Passager:</td>
                    <td class="value nom">${ticket.Pesrsonne}</td>
                  </tr>
                  <tr>
                    <td class="name">Siege:</td>
                    <td class="value">${ticket.siegeNum}</td>
                  </tr>
                  <tr>
                    <td class="name">Trajet:</td>
                    <td class="value">Safi → Marrakech </td>
                  </tr>
                </table>
               
              </div>`
 }
   
 ).join("");

 let tickets=document.querySelectorAll(".ticket");
     tickets.forEach(ticket=>{
      let nom=ticket.querySelector(".nom");

      console.log(nom.textContent)
      
     })



// 