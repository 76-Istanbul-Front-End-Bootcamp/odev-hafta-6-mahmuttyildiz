const $modalElement = document.createElement("div");
$modalElement.setAttribute("id", "modalcontainer");
document.body.appendChild($modalElement);

window.mockApiUrl = "https://5ff576bd941eaf0017f36cf7.mockapi.io/pets/";


window.removePet = (id) => {
  fetch(`${window.mockApiUrl}${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  }).then(() => {
    window.location.reload();
  });
};


async function fetchPets() {
  const response = await fetch(window.mockApiUrl);
  const pets = await response.json();

  window.openPetDetail = (id) => {
    const pet = pets.find((pet) => Number(pet.id) === id);

    const petModalHTML = `
         <div class="modal fade" id="exampleModal${pet.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true"
         role="dialog">
         <div class="modal-dialog" role="document">
         <div class="modal-content">
         <div class="modal-header">
           <h5 class="modal-title" id="exampleModalLabel">Detay</h5>
           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         <div class="modal-body">
         <div class="container">
           <div class="row">
               <div class="d-flex flex-column align-items-center">
                <div class="col mb-3"><img src=${pet.image} alt="doggy"></div>
                <div class="col mb-3"><h5>İsim: ${pet.name}</h5></div>
                <div class="col mb-3"><h5>Açıklama: ${pet.description}</h5></div>
   
               </div>
           </div>
         <div class="modal-footer">
         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
       </div>
       
         </div>
     </div>
       <div class="modal-backdrop fade show" id="backdrop" style="display: none;"></div>
       `;

    document.querySelector("#modalcontainer").innerHTML = petModalHTML;
    $(`#exampleModal${id}`).modal("show");
  };
}

fetchPets();







//Alternative Way

/*window.openPetDetail = (id) => {
  fetch(`${window.mockApiUrl}${id}`)
    .then((resp) => resp.json())
    .then((data) => {
      const petModalHtml = generateDetailModal(data);
      const bodySelector = document.querySelector("body");
      bodySelector.innerHTML += petModalHtml;
      $(`#exampleModal${id}`).modal("show");
    });
};
*/

/*window.generateDetailModal = (pet) => {
  return `<div class="modal fade" id="exampleModal${pet.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Detay</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div class="container">
        <div class="row">
            <div class="d-flex flex-column align-items-center">
             <div class="col mb-3"><img src=${pet.image} alt="doggy"></div>
             <div class="col mb-3"><h5>İsim: ${pet.name}</h5></div>
             <div class="col mb-3"><h5>Açıklama: ${pet.description}</h5></div>

            </div>
        </div>
      <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>

    </div>
  </div>
</div>`;
};
*/