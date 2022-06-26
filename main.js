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

  console.log(addItemType);


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
    date_published: new Date
  };


  postFormToDb(allFormData);
  
  

});

// function to validate form
// function formValidation(){
//   if(document.getElementById('addItemName').value === '')
// }

// click category to filter
// let categoryBtn = document.querySelectorAll(".item-filter");
// categoryBtn.forEach(catBtn => catBtn.addEventListener('click',filterBtnClicked))
// categoryBtn.addEventListener('click',alert("Hello")); 

// function filterBtnClicked(e){
//   // e.preventDefault();

//   let clickedCategory = e.target.textContent;
//   console.log(e.target.textContent);
  
// }



// render data on page
function showDataOnPage(input){
  let productList = document.getElementById('product-list');
  let product = document.createElement('div');
  product.classList.add('col-md-4','mb-4','mt-2'); 
  let inputType = ``;
  if(input.type ==="free"){
    inputType =`<span class="btn btn-success btn-sm">Free</span>`;
  };
  product.innerHTML = 
  `
            <div class="card" style="width: 100%;">
              <div class="card-top-header">
                <div class="card-dark-layer">
                  <small class="m-2">
                  ${inputType}</small>
                  <div class="card-like-btn m-2 .like-countr" id="like-counter">
                    <i class="fa-regular fa-heart"></i>
                    <span>${input.likes}</span>
                  </div>
                </div>
                <img src="${input.image_url}" class="card-img-top item-image" alt="...">
              </div>
              <div class="card-body">
                <div class="card-body-header">
                  <div class="card-body-name">
                    <h5 class="card-title item-name" data-bs-toggle="modal" data-bs-target="#viewItem">${input.name}</h5>
                    <small><i class="fa-solid fa-eye"></i>
                    <span>${input.views}</span> views</small>
                  </div>
                  <div class="card-body-button">
                    <a href="#" class="btn btn-swap"><i class="fa fa-arrow-right-arrow-left"></i> Make an Offer</a>
                  </div>
                </div>
                <div class="card-body-footer mt-2">
                  <ul class="item-needs">
                    Needs:
                    
                  </ul>
                </div>
              </div>
            </div>
  ` ;
// view product
  product.querySelector('.item-name').addEventListener('click', (e)=>{
    console.log(input.id)
    input.views++;
    product.querySelector('.card-body-name small span').textContent = input.views;
    addViewToDb(input);
    let modalBox = document.getElementById('modal-get-id');
    let modalItem = document.createElement('div'); 
    modalItem.innerHTML = `
            <div class="modal-content">
              <div class="modal-header d-block p-0">
                <div class="pt-2 pe-2 text-end">
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="p-3" id="modal-top">
                  <h4 class="modal-title" id="viewModalTitle">${input.name}</h4>
                  <button type="button" class="btn btn-info" data-bs-target="#exampleModal" data-bs-toggle="modal" data-bs-dismiss="modal"><i class="fa-solid fa-pen-to-square"> </i> Edit Item</button>
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
                            <li class="modal-item-need-list">first list</li>
                            <li class="modal-item-need-list">first list</li>
                            <li class="modal-item-need-list">first list</li>
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
                              <li class="offers-list p-2 m-2">offer1</li>
                              <li class="offers-list p-2 m-2">offer2</li>
                              <li class="offers-list p-2 m-2">offer3</li>
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
    modalBox.append(modalItem);
  })

  // like an item
  product.querySelector("#like-counter").addEventListener('click',()=>{
    input.likes++;
    product.querySelector("#like-counter i").classList="fa-solid fa-heart"
    product.querySelector("#like-counter i").style.color = "red";
    product.querySelector('#like-counter span').textContent = input.likes;
    addLikeCounterToDb(input);
  })

  productList.appendChild(product);
  applyNeeds(input); 
  
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
  dataForNeed.needs.forEach(itemNeed=>{
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
    // needLists.innerHTML=needList;
    // needLists.appendChild(needList);
  });
  
    
}

// get all data
function getAllData(){
  fetch("http://localhost:3000/swaps")
  .then(resp=>resp.json())
  .then(swapData=>swapData.forEach(data => {
    showDataOnPage(data)
    console.log(data)
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

getAllData();