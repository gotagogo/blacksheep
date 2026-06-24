function render(){
  const grid=document.getElementById('itemsGrid'); const empty=document.getElementById('emptyState');
  const q=(document.getElementById('search').value||'').toLowerCase(); const gf=document.getElementById('genderFilter').value;
  const items=getItems().filter(i=>{
    const text=[i.title,i.brand,i.summary,i.size,i.gender,i.condition].join(' ').toLowerCase();
    return (!q || text.includes(q)) && (!gf || i.gender===gf);
  });
  grid.innerHTML=items.map(i=>`<article class='card'><a href='item.html?id=${encodeURIComponent(i.id)}'><img src='${firstImage(i)}' alt='${i.title}'><div class='card-body'><div class='badge'>${i.brand||'未填品牌'}</div><h2>${i.title}</h2><p>${i.summary||''}</p><div class='meta'><span>${money(i.price)}</span><span>${i.size||'大小未填'}</span><span>${i.gender||'中性'}</span></div></div></a></article>`).join('');
  empty.classList.toggle('hidden', items.length!==0);
}
document.addEventListener('DOMContentLoaded',()=>{document.getElementById('search').addEventListener('input',render);document.getElementById('genderFilter').addEventListener('change',render);render();});
