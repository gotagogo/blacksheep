document.addEventListener('DOMContentLoaded',()=>{
  const id=new URLSearchParams(location.search).get('id'); const item=getItems().find(i=>i.id===id); const root=document.getElementById('detailRoot');
  if(!item){root.innerHTML='<section class="panel"><h1>找不到物品</h1><p><a href="index.html">返回全部物品</a></p></section>'; return;}
  document.title=`${item.title} | Black Sheep`;
  const imgs=(item.images&&item.images.length?item.images:[placeholderSvg(item.title)]).map(src=>`<img src='${src}' alt='${item.title}'>`).join('');
  root.innerHTML=`<section class='gallery'>${imgs}</section><section class='panel detail-info'><p class='eyebrow'>${item.brand||'未填品牌'}</p><h1>${item.title}</h1><div class='price'>${money(item.price)}</div><p>${item.summary||''}</p><dl><dt>品牌</dt><dd>${item.brand||'-'}</dd><dt>大小</dt><dd>${item.size||'-'}</dd><dt>適用性別</dt><dd>${item.gender||'-'}</dd><dt>狀態</dt><dd>${item.condition||'-'}</dd></dl><a class='button' href='mailto:info@blacksheep.co.nz?subject=${encodeURIComponent('查詢 '+item.title)}'>查詢這件物品</a></section>`;
});
