const state = {
  filter: "",
  items: [],
  cart: []
};
const data =
{
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.75,
      type: "vegetable"
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.69,
      type: "fruit"
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.24,
      type: "fruit"
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 1.02,
      type: "fruit"
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.17,
      type: "fruit"
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.80,
      type: "vegetable"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 1.82,
      type: "fruit"
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 2.05,
      type: "fruit"
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.34,
      type: "vegetable"
    }
  ]
}
const imgPath = "./assets/icons/";
const imgPath2 = "../assets/icons/";
const imgType = ".svg";

const shopUl = document.querySelector(".store--item-list");
const cartUl = document.querySelector(".cart--item-list");



function setstate(updatedState) {
  Object.keys(updatedState).forEach((prop) => {
    state[prop] = updatedState[prop];
  });
 
  rander();
}

function rander() {

  randerCartItems();
  randerFilterShopItems();
  

}

function randerCartItems() {

  const total = document.querySelector(".total-number");

  let calculateTotal = 0;
  cartUl.innerHTML = "";
  total.innerHTML = 0;
  const items = state.cart;

  items.forEach(item => {
    if (item.quantity > 0) {
      createCartElement(item);
    }
    const findPrice = state.items.find(e => e.name === item.name)
    calculateTotal += (item.quantity * findPrice.price);

  });
  total.innerHTML = Number(calculateTotal.toFixed(2));
}
function createCartElement(item) {
  const addItemToCartLi = document.createElement("li");
  cartUl.appendChild(addItemToCartLi);

  const img = document.createElement("img");
  img.setAttribute("class", "cart--item-icon");
  const shopItem = state.items.find(itemInShop => itemInShop.name === item.name);
  img.src = imgPath + shopItem.id + imgType;
  addItemToCartLi.appendChild(img);

  const p = document.createElement("p");
  p.innerHTML = item.name;
  addItemToCartLi.appendChild(p);

  const removeButton = document.createElement("button");
  removeButton.setAttribute("class", "quantity-btn");
  removeButton.classList.add("remove-btn");
  removeButton.classList.add("center");
  const removeId = "remove-" + item.name;
  removeButton.setAttribute("id", removeId);
  removeButton.innerHTML = "-";
  addItemToCartLi.appendChild(removeButton);
  listenToRemoveITem(removeButton);


  const span = document.createElement("span");
  span.setAttribute("class", "quantity-text");
  span.classList.add("center");
  span.innerHTML = item.quantity;
  addItemToCartLi.appendChild(span);

  const addButton = document.createElement("button");
  addButton.setAttribute("class", "quantity-btn");
  addButton.classList.add("add-btn");
  addButton.classList.add("center");
  const addId = "add-" + item.name;
  addButton.setAttribute("id", addId);
  addButton.innerHTML = "+";
  addItemToCartLi.appendChild(addButton);

  listenToAddItem(addButton);
}
function init() {

  listenToFilterList();
  // const result = await firstFunction()
  listenToReorderItemList();
}
function createShopElement(item) {
  //append allow you to add multiple elements append(...objects)
  const showShopItemsLi = document.createElement("li");
  shopUl.appendChild(showShopItemsLi);

  const imgWrap = document.createElement("div");
  imgWrap.setAttribute("class", "store--item-icon");
  showShopItemsLi.appendChild(imgWrap);

  const img = document.createElement("img");
  img.src = imgPath + item.id + imgType;
  img.alt = item.name;
  imgWrap.appendChild(img);

  const p = document.createElement("p");
  p.innerHTML = item.price + " £";
  showShopItemsLi.appendChild(p);

  const button = document.createElement("button");
  //add secondlist class button.classList.add(item.name);
  button.setAttribute("class", "addItem");
  button.setAttribute("id", item.name);
  button.innerHTML = "Add to cart";
  showShopItemsLi.appendChild(button);//this will make every button has eventhandler
  listenToAddItems(button);
}
function listenToFilterList() {
//do not unnessary create hard copy of object 
/* the 1.problem : the object was created at the time function was called so eventhough the state updated but the function get call before
  so it still take the old state. 
*/
  const fruits = document.querySelector("#fruit");
  const vegs = document.querySelector("#vegetable");
  const originalItems = JSON.parse(JSON.stringify(data.items));
  const selectBoth =["vegetablefruit","fruitvegetable"];

  fruits.addEventListener("input", function (event) {
    if (event.target.checked) {
    
      const updateFilter = state.filter
      state.filter = updateFilter + event.target.id;

      if (state.filter === selectBoth[0]||state.filter === selectBoth[1]) {
        console.log('current state:', state.filter);
        state.filter = "";
        state.items = originalItems;
        setstate(state);
      } else {
        state.items = state.items.filter(function (item) {
          return item.type === event.target.id;
        });
        setstate(state);
      }

    }
  });

  vegs.addEventListener("input", function (event) {
    if (event.target.checked) {
    
      const updateFilter = state.filter
      state.filter = updateFilter + event.target.id;

      if (state.filter === selectBoth[0]||state.filter === selectBoth[1]) {
        console.log('current state:', state.filter);
        state.filter = "";
        state.items = originalItems;
        setstate(state);
      } else {
        state.items = state.items.filter(function (item) {
          return item.type === event.target.id;
        });
        setstate(state);
      }
    }
  });

  if (state.filter==="") {
 
    //setstate(originalState);
    state.items = originalItems;
    setstate(state);
  }

}

function listenToReorderItemList() {

  const ascending = document.querySelector("#ascending");
  const descending = document.querySelector("#descending");
  let updateState = state;//JSON.parse(JSON.stringify(state));

  //.sort((a,b) => a-b)

  ascending.addEventListener("input", function (event) {
    updateState.name = "ascending"; ;
    if (event.target.checked) {

      const ascItems = state.items.sort(function (a, b) {
        return a.price - b.price;
      });
      updateState.items = ascItems;
      setstate(updateState);
    }
  });

  descending.addEventListener("input", function (event) {
    updateState.name = "descending"; ;
    if (event.target.checked) {

      const ascItems = state.items.sort(function (a, b) {
        return a.price - b.price;
      });
      const dscItems = ascItems.reverse();
      updateState.items = dscItems;
      setstate(updateState);
    }
  });

}

function randerFilterShopItems() {
  shopUl.innerHTML = "";
  const items = state.items;

  items.forEach(item => {

    createShopElement(item);

  });
}
function addItem(itemName) {
  let match = false;
  const maxQuantity = 999;
  //thiis will return the array of cart if the same item it should update quality rather than added a list
  let updateItems = state.cart.map(function (item) {

    if (item.name === itemName) {
      match = true;

      item.quantity = item.quantity + 1;
      return item;

    } else {
      return item;
    }

  });
  return { updateItems: updateItems, match: match }
}
function removeItem(itemName) {
  let match = false;
  const minQuantity = 0;
  let updateItems = state.cart.map(function (item) {

    if (item.name === itemName) {
      match = true;
      if (item.quantity > minQuantity) {
        item.quantity = item.quantity - 1;
      }
      return item;

    } else {
      return item;
    }

  });
  return { updateItems: updateItems, match: match }
}
//for button in the shopUl list 
function listenToAddItems(addItemButton) {
  addItemButton.addEventListener("click", function (event) {
    event.preventDefault();
    const itemName = event.target.id;
    const result = addItem(itemName);
    let updateItems = result.updateItems;

    if (!result.match) {
      updateItems.push({ name: itemName, quantity: 1 })
    }
    
    setstate({ cart: updateItems });
  })
}
function listenToAddItem(addButton) {
  addButton.addEventListener("click", function (event) {
    event.preventDefault();
    const addId = event.target.id;
    const itemName = addId.replace('add-', "");
    const result = addItem(itemName);
    let updateItems = result.updateItems;
   
    setstate({ cart: updateItems });

  });
}
function listenToRemoveITem(removeButton) {
  removeButton.addEventListener("click", function (event) {
    event.preventDefault();
    const removeId = event.target.id;
    const itemName = removeId.replace('remove-', "");
    const result = removeItem(itemName);
    let updateItems = result.updateItems;
   
    setstate({ cart: updateItems });
  });
}


init();