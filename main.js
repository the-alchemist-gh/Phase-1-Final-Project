 // event for add btn clicked
let addBtn = document.getElementById('add-new-item-btn');
addBtn.addEventListener('click',function(e){
  e.preventDefault()
  let addItemName = document.getElementById('addItemName').value;
  let addItemCategory = document.getElementById('addItemCategory').value;
  let addItemDesc = document.getElementById('addItemDesc').value;
  let addItemNeed = document.getElementById('addItemNeed').value;
  let addItemImage = document.getElementById('addItemImage').value;



  // form data
  const allFormData = {
    name: addItemName,
    category:addItemCategory,
    description: addItemDesc,
    image_url: addItemImage,
    likes: 0,
    views:0,
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
                  <div class="card-like-btn m-2" id="like-counter">
                    <i class="fa-regular fa-heart"></i>
                    <span>${input.likes}</span>
                  </div>
                </div>
                <img src="${input.image_url}" class="card-img-top item-image" alt="...">
              </div>
              
              <div class="card-body">
                <div class="card-body-header">
                  <div class="card-body-name">
                    <h5 class="card-title item-name">${input.name}</h5>
                    <small><i class="fa-solid fa-eye"></i>
                    ${input.views} views</small>
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

  product.querySelector("#like-counter").addEventListener('click',()=>{
    input.likes++;
    product.querySelector("#like-counter i").classList="fa-solid fa-heart"
    product.querySelector("#like-counter i").style.color = "red";
    product.querySelector('span').textContent = input.likes;
    addLikeCounterToDb(input);
  })

  productList.appendChild(product);
  applyNeeds(input);  
}


// Add likes count to database
function addLikeCounterToDb(){
  
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
  } ))
  
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