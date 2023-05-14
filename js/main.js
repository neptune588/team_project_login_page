//best product
import bestProductList from './data.js';

const bestProductFrame = document.querySelector('.best_product > .product_frame');
const productUl01 = document.querySelector('.p_l_01');
const productUl02 = document.querySelector('.p_l_02');

for (let i = 0; i < bestProductList.length; i++) {
    //요소 추가
    let addBestLi = document.createElement('li');
    let bestLiInA = document.createElement('a');
    let bestLiInImg = document.createElement('img');
    let bestLiTextModel = document.createElement('span'); 
    let bestLiTextName = document.createElement('span'); 

    //span에 들어가는 text
    let bestLiTextModelText = document.createTextNode(bestProductList[i].modelName);
    let bestLiTextNameText = document.createTextNode(bestProductList[i].name);

    //이미지 속성 변경
    bestLiInImg.setAttribute('src', bestProductList[i].src);
    
    //삽입 명령어
    bestLiTextModel.appendChild(bestLiTextModelText);
    bestLiTextName.appendChild(bestLiTextNameText);
    bestLiInA.appendChild(bestLiInImg);
    bestLiInA.appendChild(bestLiTextModel);
    bestLiInA.appendChild(bestLiTextName);
    addBestLi.appendChild(bestLiInA);

    if(i < (bestProductList.length / 2)) {
        productUl01.appendChild(addBestLi);
    } else if (i >= (bestProductList.length / 2)) {
        productUl02.appendChild(addBestLi);
    }

    //클래스 주기

    bestLiInA.setAttribute('href', '#!');
    addBestLi.setAttribute('class', 'Best_product_list');
}

//best box_arrow_animation 
const prevBtn = document.querySelector('.btn01');
const nextBtn = document.querySelector('.btn02');
let bestLi = document.querySelectorAll('.Best_product_list');

//ul width 추출
let UlWidth = productUl01.offsetWidth;

//상태변수
let leftMove = false;

//left move 

prevBtn.addEventListener('click', function(){
    if (!leftMove) {
        bestProductFrame.style.left = (UlWidth * -1) + 'px';
        leftMove = true;
    } else if(leftMove) {
        leftMoved();
    }

});


function leftMoved ($Frame, $moveUl, $moveUlSiblings) {
    $Frame.style.left = (UlWidth * -1) + 'px';
/*     $Frame.animate([{
        left: 0,
    }], 500); */

    //$moveUl.parentNode.insertBefore($moveUl, $moveUlSiblings.nextSibling);
}
