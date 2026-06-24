const STORAGE_KEY = 'blacksheep_items_v1';
const ADMIN_KEY = 'blacksheep_admin_logged_in';
const DEFAULT_ITEMS = [
  {
    id: 'libtech-gold-member-155',
    title: 'Lib Tech Gold Member 155',
    brand: 'Lib Tech',
    price: 400,
    size: '155cm',
    gender: '中性',
    condition: '正常使用痕跡',
    summary: '適合喜歡全山滑行與 carving 的 rider。二手品相，適合想用合理價格入手好板的人。',
    images: []
  },
  {
    id: 'burton-ak-swash-jacket-m',
    title: 'Burton AK Swash Jacket M',
    brand: 'Burton AK',
    price: 700,
    size: 'M',
    gender: '男',
    condition: '二手良好',
    summary: 'GORE-TEX 滑雪外套，適合雪場全天使用。剪裁俐落，機能性強。',
    images: []
  }
];
function slugify(text){return (text||'item').toString().trim().toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g,'-').replace(/^-+|-+$/g,'').slice(0,80) || `item-${Date.now()}`;}
function getItems(){const raw=localStorage.getItem(STORAGE_KEY); if(!raw){localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ITEMS)); return DEFAULT_ITEMS;} try{return JSON.parse(raw)||[]}catch(e){return []}}
function saveItems(items){localStorage.setItem(STORAGE_KEY, JSON.stringify(items));}
function money(n){return n ? `NZ$${Number(n).toLocaleString()}` : '價格洽詢';}
function placeholderSvg(title){const safe=encodeURIComponent(title||'Black Sheep'); return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 520'><rect width='800' height='520' rx='38' fill='%23f4efe7'/><circle cx='650' cy='120' r='74' fill='%23222222'/><text x='50%' y='45%' text-anchor='middle' font-size='72'>🐑</text><text x='50%' y='62%' text-anchor='middle' font-family='Arial' font-size='36' fill='%23222222'>${safe}</text></svg>`;}
function firstImage(item){return item.images && item.images.length ? item.images[0] : placeholderSvg(item.title);}
document.addEventListener('DOMContentLoaded',()=>{const y=document.getElementById('year'); if(y)y.textContent=new Date().getFullYear();});
