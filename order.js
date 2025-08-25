// --- Simple localStorage-backed cart helpers ---
const CART_KEY = "cart";

function getCart(){
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}

function setCart(arr){ localStorage.setItem(CART_KEY, JSON.stringify(arr)); }

function addToCart(item){
  const cart = getCart();
  const idx = cart.findIndex(it => it.id === item.id);
  if(idx >= 0){ cart[idx].qty += 1; }
  else { cart.push(item); }
  setCart(cart);
}

function changeQty(index, delta){
  const cart = getCart();
  if(!cart[index]) return;
  cart[index].qty += delta;
  if(cart[index].qty <= 0) cart.splice(index,1);
  setCart(cart);
}

function removeItem(index){
  const cart = getCart();
  cart.splice(index,1);
  setCart(cart);
}

function clearOrder(){
  localStorage.removeItem(CART_KEY);
  localStorage.removeItem("customer");
}

function updateCartCount(){
  const el = document.getElementById("cartCount");
  if(!el) return;
  const cart = getCart();
  const count = cart.reduce((s,it)=> s + it.qty, 0);
  el.textContent = count;
}
