 // event for add btn clicked
let addBtn = document.getElementById('add-new-item-btn');
addBtn.addEventListener('click',function(e){
  e.preventDefault()
  let addItemName = document.getElementById('addItemName').value;
  let addItemCategory = document.getElementById('addItemCategory').value;
  let addItemDesc = document.getElementById('addItemDesc').value;
  let addItemNeed = document.getElementById('addItemNeed').value;
  let addItemImage = document.getElementById('addItemImage').value;
  let addItemType = document.getElementById('addItemType').value;


  // form data
  const allFormData = {
    name: addItemName,
    category:addItemCategory,
    description: addItemDesc,
    image_url: addItemImage,
    likes: 0,
    views:0,
    type:addItemType,
    needs: addItemNeed.split(','),
    offers:[],
    date_published: new Date
  };


  postFormToDb(allFormData);
  
  

});


// Event to Edit item
function editItem(itemToEdit, editProduct){
  let editBtn = document.querySelector('#edit-item');
  editBtn.addEventListener('click',()=>{
    let modalEditBox = document.getElementById('modal-edit-id');
    let modalEditItem = document.createElement('div'); 
    modalEditItem.innerHTML=
    `
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="editModalLabel">Edit Item</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="mb-3">
                    <label for="editItemName" class="form-label">Name of Item</label>
                    <input type="text" value="${itemToEdit.name}" class="form-control" id="editItemName" aria-describedby="nameHelp">
                  </div>
                  <div class="mb-3">
                    <label for="editItemCategory" class="form-label">Category</label>
                    <select class="form-select"  id="editItemCategory" aria-label="Default select example">
                      <option value="${itemToEdit.category}" selected>${itemToEdit.category}</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Home">Home</option>
                      <option value="Books">Books</option>
                      <option value="Services">Services</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="editItemDesc" class="form-label">Item Description</label>
                    <textarea class="form-control" id="editItemDesc" rows="3" placeholder="Eg: This item is very new but I really don't need it anymore">${itemToEdit.description}</textarea>
                  </div>
                  <div class="mb-3">
                    <label for="editItemType" class="form-label">Do you want to swap item or give away?</label>
                    <select class="form-select"  id="editItemType" aria-label="Default select example">
                      <option value="${itemToEdit.type}" selected>${itemToEdit.type}</option>
                      <option value="swap">Swap</option>
                      <option value="free">Give</option>
                    </select>
                  </div>
                  <div class="mb-3" id="edit-item-need-input-field">
                    <label for="editItemNeed" class="form-label">What do you want for this item?</label>
                    <textarea class="form-control" value="${itemToEdit.needs}" id="editItemNeed" rows="2" placeholder="Eg: Book,PS4,Bike,Phone,Any Item">${itemToEdit.needs}</textarea>
                    <div id="editNeedHelp" class="form-text">Enter Items separated by ",". Eg. Book,Lamp,Watch</div>
                  </div> 
                  <div class="mb-3">
                    <label for="editItemImage" class="form-label">Item Image Url</label>
                    <input type="text" class="form-control" value="${itemToEdit.image_url}" id="editItemImage" aria-describedby="imageHelp">
                    <div id="editImageHelp" class="form-text">Enter the full url to the image of the item.</div>
                  </div>
                  <button type="submit" class="btn btn-dark" id="edit-new-item-btn">Edit Item Now</button>
                </form>
              </div>
            </div>
    `;
    modalEditBox.innerHTML = '';
    modalEditBox.append(modalEditItem);
    addEditToDb(itemToEdit, editProduct);
  })
}




// render data on page
function showDataOnPage(input, inputOffers){
  let productList = document.getElementById('product-list');
  let product = document.createElement('div');
  product.classList.add('col-md-4','mb-4','mt-2'); 
  let inputType = ``;
  if(input.type ==="free"){
    inputType =`<span class="btn btn-success btn-sm">Free</span>`;
  };

  // Offer Count on product
  let offerCount;
  let offerCounts = inputOffers.reduce((c, { offerFor: key }) => (c[key] = (c[key] || 0) + 1, c), {});
  console.log(typeof offerCounts, offerCounts,input.id, offerCounts[input.id]);

  if(isNaN(offerCounts[input.id])){
    offerCount = ``;
  } else if(offerCounts[input.id] === 1){
    offerCount = `<span class="py-1 px-2">${offerCounts[input.id]} Offer</span>`;
  } else if(offerCounts[input.id] > 1){
    offerCount = `<span class="py-1 px-2">${offerCounts[input.id]} Offers</span>`;
    console.log(offerCount)
  }
  
  console.log(typeof inputOffers, inputOffers);
  product.innerHTML = 
  `
            <div class="card" style="width: 100%;">
              <div class="card-top-header">
                <div class="card-dark-layer">
                  <small class="m-2">
                  ${inputType}</small>
                  <div>
                    <div class="card-view-btn m-2 .like-countr">
                      <i class="fa-regular fa-eye"></i>
                      <span id="spanView">${input.views}</span>
                    </div>
                    <div class="card-like-btn m-2 .like-countr" id="like-counter">
                      <i class="fa-regular fa-heart"></i>
                      <span id="spanLike">${input.likes}</span>
                    </div>
                  </div>
                  
                </div>
                <img src="${input.image_url}" class="card-img-top item-image" alt="...">
              </div>
              <div class="card-body">
                <div class="card-body-header">
                  <div class="card-body-name">
                    <h5 class="card-title item-name" data-bs-toggle="modal" data-bs-target="#viewItem">${input.name}</h5>
                    <small>
                    ${offerCount}</small>
                  </div>
                  <div class="card-body-button">
                    <a class="btn btn-swap" id="offer-btn" data-bs-toggle="modal" data-bs-target="#offerModal"><i class="fa fa-arrow-right-arrow-left"></i> Make an Offer</a>
                  </div>
                </div>
                <div class="card-body-footer mt-2">
                  <ul class="item-needs">
                    <span>Swap with:</span>
                    
                  </ul>
                </div>
              </div>
            </div>
  ` ;
// view product
  product.querySelector('.item-name').addEventListener('click', ()=>{
    // console.log(input.id)
    input.views++;
    product.querySelector('#spanView').textContent = input.views;
    addViewToDb(input);
    let modalBox = document.getElementById('modal-get-id');
    let modalItem = document.createElement('div'); 
    modalItem.innerHTML = 
          `
            <div class="modal-content">
              <div class="modal-header d-block p-0">
                <div class="pt-2 pe-2 text-end">
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="p-3" id="modal-top">
                  <h4 class="modal-title" id="viewModalTitle">${input.name}</h4>
                  <button type="button" class="btn btn-info" id="edit-item" data-bs-target="#editModal" data-bs-toggle="modal" data-bs-dismiss="modal"><i class="fa-solid fa-pen-to-square"> </i> Edit Item</button>
                </div>
                
              </div>
              <div class="modal-body">
                <div class="container-fluid p-0">
                  <div class="row">
                    <div class="col-md-7">
                      <div class="modal-image">
                        <img class="modal-item-image" src="${input.image_url}" alt="">
                      </div>
                    </div>
                    <div class="col-md-5">
                      <div class="modal-text-section">
                        <div class="modal-desc">
                          <small>Category: 
                          ${input.category}</small> <br>
                          <small><i class="mb-3 fa-solid fa-eye"></i>
                          ${input.views} views</small>
                          <h6 class="modal-item-desc">${input.description}</h6>
                        </div>
                        <div class="modal-need mt-5">
                          <h6>What I need for this item:</h6>
                          <ul class="modal-item-needs">
                          </ul>
                        </div>
                        <div class="modal-button">
                          <div class="card-body-button">
                            <a href="#" class="btn btn-swap"><i class="fa fa-arrow-right-arrow-left"></i> Make an Offer</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="accordion mt-3" id="accordionExample">
                      <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <h6 class="m-0">View Offers</h6>
                          </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                          <div class="accordion-body p-0">
                            <ul class="offer-group p-0">
                              <li class="offers-list p-2 m-2">
                                
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    `
    modalBox.innerHTML = '';

    // Add Offers to Modal View
    offerModalBox =  modalItem.querySelector('.offer-group');
    
    inputOffers.forEach((inputOffer1=>{
      if(inputOffer1.offerFor === input.id){
        offerModalItem = document.createElement('li');
        offerModalItem.classList.add('offers-list', 'p-2', 'm-2')
        offerModalItem.innerHTML =
        `
            <div class="row">
              <div class="col-4">
                <div class="offer-modal-image-container">
                  <img class="offer-modal-item-image" src="${inputOffer1.offerImage}">
                </div>
              </div>
              <div class="col-8">
                <div class="offer-modal-title">
                  <h6>${inputOffer1.offerName}</h6>
                  <div>
                    <button class="btn-sm btn-danger"><i class="fa-solid fa-xmark"> </i> Decline</button>
                    <button class="btn-sm btn-success"><i class="fa-solid fa-check"> </i> Accept</button>
                  </div>
                </div>
              </div>
            </div>
        `
        offerModalBox.appendChild(offerModalItem);
      }
    }))
    

    modalBox.append(modalItem);
    applyNeedsForView(input.needs)
    editItem(input, product);

  })

  // like an item
  product.querySelector("#like-counter").addEventListener('click',()=>{
    input.likes++;
    product.querySelector("#like-counter i").classList="fa-solid fa-heart"
    product.querySelector("#like-counter i").style.color = "red";
    product.querySelector('#spanLike').textContent = input.likes;
    addLikeCounterToDb(input);
  })

  // Offer button Clicked
  product.querySelector('#offer-btn').addEventListener('click',()=>{
    // let offerModalBox = document.getElementById('modal-offer-id');
    // let offerModalItem = document.createElement('div'); 
    // offerModalItem.innerHTML = `

    // `

    document.getElementById('offer-item-btn').addEventListener('click', (e)=>{
      e.preventDefault();
      let offerName = document.getElementById('offerItemName').value;
      let offerDesc = document.getElementById('offerItemDesc').value;
      let offerImage = document.getElementById('offerItemImage').value;
      
      const allOfferData = {
        offerName: offerName,
        offerDesc: offerDesc,
        offerImage: offerImage,
        offerFor: input.id,
        offerDate: new Date
      }

      postOffersToDb(allOfferData);
      
    })

  })

  productList.appendChild(product);
  applyNeeds(input.needs); 

  
}

function getDataToView(dataID){
  fetch(`http://localhost:3000/swaps/${dataID}`)
  .then(resp=>resp.json())
  .then(res=>{
    console.log(res)
  })
}

// Add likes count to database
function addLikeCounterToDb(likeData){
  fetch(`http://localhost:3000/swaps/${likeData.id}`, {
    method:"PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(
      likeData
    ),
  })
  .then(response=>response.json())
  // .then(data=>console.log(data))
}

// Add Edit to database
function addEditToDb(editedData, editedProduct){
  
  let addEditBtn=document.querySelector('#edit-new-item-btn');
  addEditBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    console.log(editedData)
    let editItemName = document.getElementById('editItemName').value;
    let editItemCategory = document.getElementById('editItemCategory').value;
    let editItemDesc = document.getElementById('editItemDesc').value;
    let editItemNeed = document.getElementById('editItemNeed').value;
    let editItemImage = document.getElementById('editItemImage').value;
    let editItemType = document.getElementById('editItemType').value;
    


    // form data
    const allEditedData = {
      name: editItemName,
      category:editItemCategory,
      description: editItemDesc,
      image_url: editItemImage,
      likes: editedData.likes,
      views:editedData.views,
      type:editItemType,
      needs: editItemNeed.split(','),
      date_published: new Date
    };

    fetch(`http://localhost:3000/swaps/${editedData.id}`, {
        method:"PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(
          allEditedData
        ),
      })
    .then(response=>response.json())
    .then(finalResult=>{
      let inputType2 = ``;
      if(finalResult.type ==="free"){
        inputType2 =`<span class="btn btn-success btn-sm">Free</span>`;
      };
      editedProduct.querySelector('.card-dark-layer').innerHTML = inputType2;
      editedProduct.querySelector('.item-image').src = finalResult.image_url;
      editedProduct.querySelector('.item-name').textContent = finalResult.name;
      // Add need edited need
      editedNeedUl = editedProduct.querySelector('.item-needs');
      editedNeedUl.innerHTML = '<span>Needs:</span>';
      finalResult.needs.forEach(editedNeed=>{
        let editedNeedList = document.createElement('li');
        editedNeedList.classList.add('item-need-list');
        editedNeedList.textContent = editedNeed;
        editedNeedUl.appendChild(editedNeedList);
      })
    })



  })
  
}

// Add View to DB
function addViewToDb(viewData){
  fetch(`http://localhost:3000/swaps/${viewData.id}`, {
    method:"PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(
      viewData
    ),
  })
  .then(response=>response.json())
  // .then(data=>console.log(data))
}

// Apply needs to card
function applyNeeds(dataForNeed){
  dataForNeed.forEach(itemNeed=>{
    let needList = document.createElement('li');
    let needLists = document.querySelectorAll('.item-needs');
    needList.classList.add('item-need-list');
    // loop through needs section and add needs from database
    needLists.forEach(
      need1=>{
        needList.textContent = itemNeed;
        need1.appendChild(needList);

      }
    )
  });
  
    
}

// Apply needs to view card
function applyNeedsForView(viewNeed){
  viewNeed.forEach(itemModalNeed=>{
    let modalNeedList = document.createElement('li');
    let modalNeedLists = document.querySelectorAll('.modal-item-needs');
    modalNeedList.classList.add('modal-item-need-list');
    // loop through needs section and add needs from database
    modalNeedLists.forEach(
      need2=>{
        modalNeedList.textContent = itemModalNeed;
        need2.appendChild(modalNeedList);

      }
    )
  });
  
    
}

// get all data
function getAllData(){
  fetch("http://localhost:3000/swaps")
  .then(resp=>resp.json())
  .then(swapData=>swapData.forEach(data => {

    fetch("http://localhost:3000/offers")
    .then(resp=>resp.json())
    .then(oferData=>{
      console.log(oferData.length)
      console.log(oferData)
      showDataOnPage(data, oferData)
    
    }
    )
    // showDataOnPage(data)
    // console.log(data)
  })
  )
  
  // .then(viewItemInModal())
  // ;
}

// Post all data
  function postFormToDb(allFormData){
  fetch('http://localhost:3000/swaps', {
    method:"POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(
      allFormData
    ),
  })
  .then(response=>response.json())
  .then(data=>console.log(data))
}

// post All offers to DB
function postOffersToDb(allOffersFormData){
  fetch(`http://localhost:3000/offers`, {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(
          allOffersFormData
        ),
      })
      .then(response=>response.json())
      .then(results=>console.log(results))
}

getAllData();