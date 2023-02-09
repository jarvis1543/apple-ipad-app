// import를 할 경우 html 안에 js를 가져오는 곳에 속성을 넣어줘야함 ( type="module" )
import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'

// 장바구니
const basketStarterEl = document.querySelector('header .basket-starter');
const basketEl = basketStarterEl.querySelector('.basket');

basketStarterEl.addEventListener('click', (event) => {
  event.stopPropagation();
  if(basketEl.classList.contains('show')){
    hideBasket();
  }else{
    showBasket();
  }
});
window.addEventListener('click', (event) => {
  hideBasket();
});
basketEl.addEventListener('click', (event) => {
  event.stopPropagation();
});

function showBasket() {
  basketEl.classList.add('show');
}
function hideBasket() {
  basketEl.classList.remove('show');
}

// const htmlEl = document.querySelector('html');
const headerEl = document.querySelector('header');
// ... 전개연산자
// querySelectorAll을 통해 얻은 값들을 전개연산자를 통해 해체됨
// 해체된 값들을 배열로 저장
// 전개연산자를 이용한 얕은 복사 (shallow copy)
const headerMenuEls = [...document.querySelectorAll('ul.menu > li')];
const searchWrapEl = headerEl.querySelector('.search-wrap');
const searchStarterEl = headerEl.querySelector('.search-starter');
const searchCloserEl = searchWrapEl.querySelector('.search-closer');
const searchShadowEl = searchWrapEl.querySelector('.shadow');
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')];
const searchInputEl = searchWrapEl.querySelector('input');

searchStarterEl.addEventListener('click', showSearch);
searchCloserEl.addEventListener('click', hideSearch);
searchShadowEl.addEventListener('click', () => {
  hideSearch();
});

function showSearch() {
  headerEl.classList.add('searching');
  // htmlEl.classList.add('fixed');
  document.documentElement.classList.add('fixed');
  headerMenuEls.reverse().forEach( (el, i) => {
    el.style.transitionDelay = i * 0.4 / headerMenuEls.length + 's';
  });
  searchDelayEls.forEach( (el, i) => {
    el.style.transitionDelay = i * 0.4 / searchDelayEls.length + 's';
  });
  // visibility 때문에 1초 뒤에 포커스
  setTimeout(() => {
    searchInputEl.value = '';
    searchInputEl.focus();
  }, 600);
}

function hideSearch() {
  headerEl.classList.remove('searching');
  // htmlEl.classList.remove('fixed');
  document.documentElement.classList.remove('fixed');
  headerMenuEls.reverse().forEach( (el, i) => {
    el.style.transitionDelay = i * 0.4 / headerMenuEls.length + 's';
  });
  searchDelayEls.reverse().forEach( (el, i) => {
    el.style.transitionDelay = i * 0.4 / searchDelayEls.length + 's';
  });
  searchDelayEls.reverse();
}

// 요소의 가시성 관찰
const io = new IntersectionObserver(entries => {
  entries.forEach( el => {
    // 안보일 때
    if(!el.isIntersecting){
      el.target.classList.remove('show');
      return;
    }
    el.target.classList.add('show');
  });
});

const infoEls = document.querySelectorAll('.info');
infoEls.forEach( el => {
  io.observe(el);
});

// 비디오 재생
const video = document.querySelector('.stage video');
const play = document.querySelector('.stage .controller--play');
const pause = document.querySelector('.stage .controller--pause');
play.addEventListener('click', () => {
  video.play();
  pause.classList.remove('hide');
  play.classList.add('hide');
});
pause.addEventListener('click', () => {
  video.pause();
  pause.classList.add('hide');
  play.classList.remove('hide');
});

// 당신에게 맞는 iPad는? 랜더링
// 아이패드 데이터 import는 최상단에 적어야함
const itemsEl = document.querySelector('section.compare .items');
ipads.forEach( ipad => {
  const itemEl = document.createElement('div');
  let colorEls = '';
  // const price = '₩'+ipad.price.toLocaleString('ko-KR')+'부터'; // toLocaleString('en-US') 미국 돈으로 표시
  ipad.colors.forEach( color => {
    colorEls += /* html */ `
      <li style="background-color: ${color}"></li>`;
  });
  itemEl.classList.add('item');
  itemEl.innerHTML = /* html */  `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorEls}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString('ko-KR')}부터</p>
    <button class="btn">구입하기</button>
    <a href="javascript:void(0)" class="link">더 알아보기</a>
  `;

  itemsEl.append(itemEl);
});

// navigations
const navigationEl = document.querySelector('footer .navigations');
navigations.forEach( nav => {
  const mapEl = document.createElement('div');
  mapEl.classList.add('map');
  let mapList = '';
  nav.maps.forEach( map => {
    mapList += /* html */ `
      <li>
        <a href="${map.url}">${map.name}</a>
      </li>
    `;
  });

  mapEl.innerHTML = /* html */ `
    <h3>
      <span class="text">${nav.title}</span>
    </h3>
    <ul>
        ${mapList}
    </ul>
  `;
  navigationEl.append(mapEl);
});

const thisYear = document.querySelector('span.this-year');
thisYear.innerText = new Date().getFullYear();