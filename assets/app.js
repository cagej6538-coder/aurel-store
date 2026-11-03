const products = [
 {id:1,name:"The Form Oversized Tee",category:"fashion",type:"APPAREL",price:28500,tag:"AUREL PICK",image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",desc:"A heavyweight everyday tee with a relaxed silhouette, considered proportions and a soft premium hand-feel."},
 {id:2,name:"Studio Runner 02",category:"fashion",type:"FOOTWEAR",price:89500,tag:"NEW ARRIVAL",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",desc:"A versatile statement runner built for everyday movement. Cushioned comfort meets a clean, confident profile."},
 {id:3,name:"Sonic Wireless Headphones",category:"tech",type:"AUDIO",price:125000,tag:"BESTSELLER",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",desc:"Immersive sound in a refined, lightweight design. Your soundtrack, wherever the day takes you."},
 {id:4,name:"Everyday Carry Tote",category:"accessories",type:"ACCESSORIES",price:32000,tag:"AUREL PICK",image:"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85",desc:"A quietly useful carryall with room for the essentials and a little more. Designed to go everywhere."},
 {id:5,name:"Arc Minimal Watch",category:"accessories",type:"ACCESSORIES",price:74000,tag:"LIMITED EDIT",image:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85",desc:"A clean dial, balanced proportions and an understated finish make this a piece for every day."},
 {id:6,name:"Object One Table Light",category:"living",type:"HOME OBJECTS",price:68000,tag:"DESIGN FIND",image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85",desc:"Warm light, sculptural lines and a beautifully simple form. A small detail that changes a room."},
 {id:7,name:"Pocket Sound Speaker",category:"tech",type:"TECHNOLOGY",price:56000,tag:"GOOD SOUND",image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85",desc:"Big character in a compact package. Bring your favourite sound from room to room."},
 {id:8,name:"The Weekend Layer",category:"fashion",type:"APPAREL",price:61500,tag:"JUST IN",image:"https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",desc:"An easy layer for changing plans and cooler evenings. Relaxed, versatile and made to be worn often."}
];
const naira = n => "₦" + n.toLocaleString("en-NG");
let activeFilter="all", searchTerm="", sortMode="featured", cart=JSON.parse(localStorage.getItem("aurel-cart")||"[]"), wishlist=JSON.parse(localStorage.getItem("aurel-wishlist")||"[]");
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
function toast(message){const el=$("#toast");el.textContent=message;el.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),2300)}
function save(){localStorage.setItem("aurel-cart",JSON.stringify(cart));localStorage.setItem("aurel-wishlist",JSON.stringify(wishlist))}
function renderProducts(){
 let list=products.filter(p=>(activeFilter==="all"||p.category===activeFilter)&&(p.name+" "+p.type+" "+p.category).toLowerCase().includes(searchTerm.toLowerCase()));
 if(sortMode==="low")list.sort((a,b)=>a.price-b.price);if(sortMode==="high")list.sort((a,b)=>b.price-a.price);if(sortMode==="name")list.sort((a,b)=>a.name.localeCompare(b.name));
 $("#productGrid").innerHTML=list.map((p,i)=>`<article class="product-card" style="animation-delay:${i*55}ms"><div class="product-media"><img loading="lazy" src="${p.image}" alt="${p.name}"><span class="product-tag">${p.tag}</span><div class="product-actions"><button class="round-action ${wishlist.includes(p.id)?"selected":""}" data-wish="${p.id}" aria-label="Add ${p.name} to wishlist">${wishlist.includes(p.id)?"♥":"♡"}</button></div><button class="quick-view" data-quick="${p.id}">QUICK VIEW +</button></div><div class="product-info"><div class="product-meta"><span>${p.type}</span><span>0${p.id} / 08</span></div><h3 class="product-name">${p.name}</h3><div class="product-bottom"><span class="product-price">${naira(p.price)}</span><button class="add-small" data-add="${p.id}">ADD TO BAG +</button></div></div></article>`).join("");
 $("#resultsLabel").textContent=`Showing ${list.length} ${list.length===1?"piece":"pieces"}`;$("#emptyState").hidden=list.length!==0;
}
function renderCart(){
 const count=cart.reduce((s,x)=>s+x.qty,0),total=cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0);
 $("#cartCount").textContent=count;$("#drawerCount").textContent=`(${count})`;$("#cartSubtotal").textContent=naira(total);$("#cartItems").innerHTML=cart.map(x=>{const p=products.find(p=>p.id===x.id);return `<div class="cart-line"><img src="${p.image}" alt="${p.name}"><div><h4>${p.name}</h4><p>${naira(p.price)}</p><div class="qty-controls"><button data-qty="${p.id}" data-delta="-1">−</button><span>${x.qty}</span><button data-qty="${p.id}" data-delta="1">+</button></div></div><div><div class="cart-line-price">${naira(p.price*x.qty)}</div><button class="remove-line" data-remove="${p.id}" aria-label="Remove ${p.name}">×</button></div></div>`}).join("");
 $("#cartEmpty").style.display=count?"none":"block";$("#drawerBottom").style.display=count?"block":"none";
 $("#wishCount").textContent=wishlist.length;
}
function addToCart(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});save();renderCart();toast("Added to your bag. Good choice.");}
function toggleWish(id){wishlist=wishlist.includes(id)?wishlist.filter(x=>x!==id):[...wishlist,id];save();renderProducts();renderCart();toast(wishlist.includes(id)?"Saved to your wishlist.":"Removed from wishlist.");}
function openCart(){$("#cartDrawer").classList.add("open");$("#drawerBackdrop").classList.add("open");document.body.style.overflow="hidden"}
function closeCart(){$("#cartDrawer").classList.remove("open");$("#drawerBackdrop").classList.remove("open");document.body.style.overflow=""}
function openQuick(id){const p=products.find(x=>x.id===id);$("#quickContent").innerHTML=`<div class="quick-layout"><img src="${p.image}" alt="${p.name}"><div><div class="eyebrow dark-eyebrow">${p.type} / AUREL EDIT</div><h3>${p.name}</h3><p>${p.desc}</p><div class="product-price">${naira(p.price)}</div><button class="btn btn-dark" data-add="${p.id}">Add to bag <span>↗</span></button></div></div>`;$("#modalBackdrop").classList.add("open");document.body.style.overflow="hidden"}
function closeQuick(){$("#modalBackdrop").classList.remove("open");document.body.style.overflow=""}
document.addEventListener("click",e=>{
 const add=e.target.closest("[data-add]");if(add){addToCart(Number(add.dataset.add));if($("#modalBackdrop").classList.contains("open"))closeQuick()}
 const wish=e.target.closest("[data-wish]");if(wish)toggleWish(Number(wish.dataset.wish));
 const quick=e.target.closest("[data-quick]");if(quick)openQuick(Number(quick.dataset.quick));
 const qty=e.target.closest("[data-qty]");if(qty){const item=cart.find(x=>x.id===Number(qty.dataset.qty));item.qty+=Number(qty.dataset.delta);if(item.qty<=0)cart=cart.filter(x=>x!==item);save();renderCart()}
 const rem=e.target.closest("[data-remove]");if(rem){cart=cart.filter(x=>x.id!==Number(rem.dataset.remove));save();renderCart()}
 const cat=e.target.closest("[data-category]");if(cat){activeFilter=cat.dataset.category;$$(".filter-chip").forEach(x=>x.classList.toggle("active",x.dataset.filter===activeFilter));$("#shop").scrollIntoView({behavior:"smooth"});renderProducts()}
 const filter=e.target.closest("[data-filter]");if(filter){activeFilter=filter.dataset.filter;$$(".filter-chip").forEach(x=>x.classList.toggle("active",x===filter));renderProducts()}
});
$("#cartOpen").addEventListener("click",openCart);$("#cartClose").addEventListener("click",closeCart);$("#drawerBackdrop").addEventListener("click",closeCart);$("#continueShopping").addEventListener("click",closeCart);
$("#modalClose").addEventListener("click",closeQuick);$("#modalBackdrop").addEventListener("click",e=>{if(e.target===$("#modalBackdrop"))closeQuick()});
$("#productSearch").addEventListener("input",e=>{searchTerm=e.target.value;renderProducts()});$("#sortProducts").addEventListener("change",e=>{sortMode=e.target.value;renderProducts()});
$("#resetFilters").addEventListener("click",()=>{activeFilter="all";searchTerm="";$("#productSearch").value="";$$(".filter-chip").forEach(x=>x.classList.toggle("active",x.dataset.filter==="all"));renderProducts()});
$("#mobileMenu").addEventListener("click",()=>$(".main-nav").classList.toggle("open"));$$(".main-nav a").forEach(a=>a.addEventListener("click",()=>{$(".main-nav").classList.remove("open");activeFilter=a.dataset.nav;$$(".filter-chip").forEach(x=>x.classList.toggle("active",x.dataset.filter===activeFilter));renderProducts()}));
$("#searchOverlay").classList.remove("open");$(".search-open").addEventListener("click",()=>{$("#searchOverlay").classList.add("open");$("#overlaySearch").focus()});$("#searchClose").addEventListener("click",()=>$("#searchOverlay").classList.remove("open"));$("#overlaySearch").addEventListener("input",e=>{$("#productSearch").value=e.target.value;searchTerm=e.target.value;renderProducts()});$("#overlaySearch").addEventListener("keydown",e=>{if(e.key==="Enter"){$("#searchOverlay").classList.remove("open");$("#shop").scrollIntoView({behavior:"smooth"})}});
$(".wishlist-open").addEventListener("click",()=>{activeFilter="all";searchTerm="";$("#productSearch").value="";renderProducts();$("#shop").scrollIntoView({behavior:"smooth"});toast(wishlist.length?`You have ${wishlist.length} saved ${wishlist.length===1?"find":"finds"}. Tap the hearts to review them.`:"Your wishlist is waiting for its first find.")});
$("#checkoutBtn").addEventListener("click",()=>{toast("Checkout preview only — connect a payment provider to accept real orders.");});
$("#newsletterForm").addEventListener("submit",e=>{e.preventDefault();$("#newsletterMessage").textContent="You're on the list. Watch this space.";$("#newsletterEmail").value="";toast("Thanks for joining the AUREL letter.")});
$$(".main-nav a").forEach(a=>a.addEventListener("click",()=>{$$(".main-nav a").forEach(x=>x.classList.remove("active"));a.classList.add("active")}));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}}),{threshold:.12});$$(".reveal").forEach(el=>observer.observe(el));
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeCart();closeQuick();$("#searchOverlay").classList.remove("open")}});
renderProducts();renderCart();
