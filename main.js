document.addEventListener('DOMContentLoaded', function(){
 // event for add btn clicked
let addBtn = document.getElementById('add-new-item-btn');
addBtn.addEventListener('click', addBtnClicked);
});

// click category to filter
let categoryBtn = document.querySelectorAll(".item-filter");
categoryBtn.forEach(catBtn => catBtn.addEventListener('click',filterBtnClicked))
// categoryBtn.addEventListener('click',alert("Hello")); 

function filterBtnClicked(e){
  // e.preventDefault();

  let clickedCategory = e.target.textContent;
  console.log(e.target.textContent);
  
}



// let addName = document.getElementById('addItemName');
  // let addItemCategory = document.getElementById('addItemCategory');
  // let addItemDesc = document.getElementById('addItemDesc');
  // let addItemType = document.getElementById('addItemType');
  // let addItemNeed = document.getElementById('addItemNeed');
  // let addItemImage = document.getElementById('addItemImage');

// What to do when add btn is clicked
function addBtnClicked(e){
  e.preventDefault();
  postFormToDb();
}
console.log(new Date);

// form data
const allFormData = {
  name: document.getElementById('addItemName').value,
  category:document.getElementById('addItemCategory').value,
  description: document.getElementById('addItemDesc').value,
  image_url: document.getElementById('addItemImage').value,
  likes: 0,
  views:0,
  needs: document.getElementById('addItemNeed').value.split(','),
  date_published: new Date
};

// post data object
const postAllData = {
  method:"POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify(
    {
      name: document.getElementById('addItemName').value,
      category:document.getElementById('addItemCategory').value,
      description: document.getElementById('addItemDesc').value,
      image_url: document.getElementById('addItemImage').value,
      likes: 0,
      views:0,
      needs: document.getElementById('addItemNeed').value.split(','),
      date_published: new Date
    }
  ),
}

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
                  <div class="card-like-btn m-2">
                    <i class="fa-regular fa-heart"></i>
                    ${input.likes}
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
  ` 
  productList.appendChild(product);
  applyNeeds(input);  
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
function postFormToDb(){
  fetch('http://localhost:3000/swaps', postAllData)
  .then(response=>console.log(response.json()))
}

getAllData();