const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35
    }
  ],
  cart:[]
};

const imgPath = "./assets/icons/";
const imgPath2 = "../assets/icons/";
const imgType = ".svg";

const shopUl = document.querySelector(".store--item-list");
const cartUl = document.querySelector(".cart--item-list");



function setstate(updatedState) {
  state['cart'] = updatedState;
  //console.log("state['cart'] ", state['cart']);
  rander();
}

function rander() {
  randerAllItems();

}
function randerAllItems() {
  const total = document.querySelector(".total-number");

  let calculateTotal =0;
  cartUl.innerHTML = "";
  total.innerHTML =0;
  const items = state.cart;
  items.forEach(item => {
    if (item.quantity > 0) {
      createCartElement(item);
    }
    const findPrice = state.items.find(e => e.name === item.name)
    calculateTotal+=(item.quantity *findPrice.price );

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
  console.log('img path: ', imgPath + shopItem.id + imgType);
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
  //listenToDecreaseCart
  listenToRemoveITem(removeButton);


  //<span class="quantity-text center">1</span>
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
  showShopItems();


}

function showShopItems() {
  const items = state.items;
  items.forEach(item => {

    const showShopItemsLi = document.createElement("li");
    shopUl.appendChild(showShopItemsLi);

    const imgWrap = document.createElement("div");
    imgWrap.setAttribute("class", "store--item-icon");
    showShopItemsLi.appendChild(imgWrap);

    const img = document.createElement("img");

    img.src = imgPath + item.id + imgType;
    img.alt = item.name;
    imgWrap.appendChild(img);

    const button = document.createElement("button");
    //add secondlist class button.classList.add(item.name);
    button.setAttribute("class", "addItem");
    button.setAttribute("id", item.name);
    button.innerHTML = "Add to cart";
    showShopItemsLi.appendChild(button);//this will make every button has eventhandler
    listenToAddItems(button);

  })
}
function addItem(itemName) {
  let match = false;
  const maxQuantity = 999;
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
function listenToAddItems(addItemButton) {
  addItemButton.addEventListener("click", function (event) {
    event.preventDefault();
    const itemName = event.target.id;
    const result = addItem(itemName);
    let updateItems = result.updateItems;

    if (!result.match) {
      updateItems.push({ name: itemName, quantity: 1 })
    }
    setstate(updateItems);
  })
}

function listenToAddItem(addButton) {
  console.log('Add button here', addButton);
  addButton.addEventListener("click", function (event) {
    event.preventDefault();
    const addId = event.target.id;
    const itemName = addId.replace('add-', "");

    const result = addItem(itemName);
    let updateItems = result.updateItems;
    setstate(updateItems);

  });
}
function listenToRemoveITem(removeButton) {
  console.log('removeButton here', removeButton);
  removeButton.addEventListener("click", function (event) {
    event.preventDefault();
    const removeId = event.target.id;
    const itemName = removeId.replace('remove-', "");
    const result = removeItem(itemName);
    let updateItems = result.updateItems;
    setstate(updateItems);
  });
}


init();