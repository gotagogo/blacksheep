const ADMIN_USER='admin';
const ADMIN_PASS='change-me-now';
function loggedIn(){return sessionStorage.getItem(ADMIN_KEY)==='1'}
function setPanels(){document.getElementById('loginPanel').classList.toggle('hidden',loggedIn());document.getElementById('adminPanel').classList.toggle('hidden',!loggedIn()); if(loggedIn()) renderAdmin();}
function fileToDataURL(file){return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=reject;r.readAsDataURL(file);});}
function resetForm(){document.getElementById('itemForm').reset();document.getElementById('itemId').value='';}
function renderAdmin(){
 const list=document.getElementById('adminList'); const items=getItems();
 list.innerHTML=items.map(i=>`<div class='admin-row'><img src='${firstImage(i)}' alt='${i.title}'><div><h3>${i.title}</h3><p>${i.brand||'-'} · ${money(i.price)} · ${i.size||'-'} · ${i.gender||'-'}</p></div><div class='row-actions'><button onclick="editItem('${i.id}')" class='secondary'>修改</button><button onclick="deleteItem('${i.id}')" class='danger'>刪除</button><a class='button small' href='item.html?id=${encodeURIComponent(i.id)}'>查看</a></div></div>`).join('') || '<p class="empty">暫時沒有物品。</p>';
}
window.editItem=function(id){const i=getItems().find(x=>x.id===id); if(!i)return; document.getElementById('itemId').value=i.id; ['title','brand','price','size','gender','condition','summary'].forEach(k=>document.getElementById(k).value=i[k]||''); scrollTo({top:0,behavior:'smooth'});}
window.deleteItem=function(id){if(!confirm('確定刪除這件物品？'))return; saveItems(getItems().filter(i=>i.id!==id)); renderAdmin();}
document.addEventListener('DOMContentLoaded',()=>{
 setPanels();
 document.getElementById('loginBtn').onclick=()=>{const u=document.getElementById('username').value;const p=document.getElementById('password').value;if(u===ADMIN_USER&&p===ADMIN_PASS){sessionStorage.setItem(ADMIN_KEY,'1');setPanels();}else alert('帳號或密碼錯誤');};
 document.getElementById('logoutBtn').onclick=()=>{sessionStorage.removeItem(ADMIN_KEY);setPanels();};
 document.getElementById('resetBtn').onclick=resetForm;
 document.getElementById('itemForm').addEventListener('submit',async e=>{e.preventDefault(); const items=getItems(); const oldId=document.getElementById('itemId').value; const files=[...document.getElementById('images').files]; const old=items.find(i=>i.id===oldId); const images=files.length?await Promise.all(files.map(fileToDataURL)):(old&&old.images)||[]; const title=document.getElementById('title').value.trim(); const item={id:oldId||slugify(title)+'-'+Date.now(), title, brand:brand.value.trim(), price:price.value, size:size.value.trim(), gender:gender.value, condition:condition.value, summary:summary.value.trim(), images}; const next=oldId?items.map(i=>i.id===oldId?item:i):[item,...items]; saveItems(next); resetForm(); renderAdmin(); alert('已儲存');});
 document.getElementById('exportBtn').onclick=()=>{const blob=new Blob([JSON.stringify(getItems(),null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='blacksheep-items.json'; a.click(); URL.revokeObjectURL(a.href);};
 document.getElementById('importInput').addEventListener('change',e=>{const f=e.target.files[0]; if(!f)return; const r=new FileReader(); r.onload=()=>{try{const data=JSON.parse(r.result); if(!Array.isArray(data))throw new Error(); saveItems(data); renderAdmin(); alert('已匯入');}catch(err){alert('JSON 格式錯誤');}}; r.readAsText(f);});
});
