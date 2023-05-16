import {
    userData
} from './userdata.js';

//탭
const IDTab = document.getElementById('id_search_tab');
const PWTab = document.getElementById('pw_search_tab');

//탭 순환 용도
const tabs = document.querySelectorAll('.tab');

//아이디 찾기 메뉴/ 비번 찾기 메뉴
const menu01 = document.getElementById('menu01');
const menu02 = document.getElementById('menu02');

//찾기 버튼
const searchBtn = document.getElementById('search_btn');

//팝업
const popUpParent = document.getElementById('pop_up_ex');
const IDResultPopUp = document.getElementById('pop_up_01');
const PWResultPopUp = document.getElementById('pop_up_02');
//조건x시 띄우는 팝업
const notSearchPopUp = document.getElementById('pop_up_03');

//팝업 순환 용도
const popUpList = document.querySelectorAll('.pop_up');

//확인 버튼
const closeBtn = document.querySelectorAll('.confirm_btn_design');

//이름 표시
const userNameShow = document.getElementById('user_name_show');
const userIDShow = document.getElementById('user_id_show');
const userPWShow = document.getElementById('user_pw_show');

//필수 입력 창
const NameBar = document.getElementById('name_bar');
const EmailBar = document.getElementById('email_bar');
const IDBar = document.getElementById('id_bar');
const BirthBar = document.getElementById('birth_bar');

//인풋 입력 창 --> 초기화 용도
const allInput = document.querySelectorAll('.bar_style');

searchBtn.addEventListener('click', allChks);
for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', tabChks);
}
for (let i = 0; i < closeBtn.length; i++) {
    closeBtn[i].addEventListener('click', function () {
        let eventTarget = this;
        //클로즈(확인)버튼의 .length와 pop의 .length및 순서 같으므로 인덱스 일치화 가능
        let eventTargetIndex = Array.from(closeBtn).indexOf(eventTarget);
        //console.log(eventTarget);
        classRemove(popUpParent, 'pop_up_on');
        classRemove(popUpList[eventTargetIndex], 'pop_up_on');
        //확인 입력시 입력창 내용 초기화
        valueClear();
    });
}

function tabChks() {
    if (this === IDTab) {
        classAdd(IDTab, 'tab_on');
        classAdd(menu01, 'menu_on');
        classRemove(PWTab, 'tab_on');
        classRemove(menu02, 'menu_on');
    }
    if (this === PWTab) {
        classAdd(PWTab, 'tab_on');
        classAdd(menu02, 'menu_on');
        classRemove(IDTab, 'tab_on');
        classRemove(menu01, 'menu_on');
    }
}

function allChks() {
    let classChks01 = IDTab.classList.contains('tab_on');
    let classChks02 = menu01.classList.contains('menu_on');
    if (classChks01 && classChks02) {
        chk01();
    } else {
        chk02();
    }
}

//아이디 찾기
function chk01() {
    //객체 속성은 속성 그 자체로 전달이 안되기 때문에 문자열의 형태로 전달
    //해당 value가 모듈에 포함되어있는지 some으로 검사 -> 검사한값 객체형태로 반환
    let dataSearch01 = dataChecks('userName', NameBar);
    let dataSearch02 = dataChecks('userEmail', EmailBar);

    /*     let returnData01 = {
            property : dataCheck01, 
        }  의 형태로 된다는 것 */

    let returnDataName = dataSearch01.property;
    let returnDataEmail = dataSearch02.property;

    //해당 value가 모듈에 있는 속성과 일치하면 그 값이 존재하는 인덱스값 반환
    //해당하는 속성의 값과 value가 맞지 않으면 -1 반환
    //(배열안 객체를 인덱스 순서대로 순회하면서 값을 발견하기만 하면 해당하는 인덱스의 숫자 반환, 숫자 반환이 -1 이라는 말은 결국 값이 없다는 말과도 같아진다.)
    //즉 -1 라는뜻은 some으로 찾은 결과가 없다는 말과도 같기 떄문에
    //따라서 -1 === -1이 되어도 some 중 하나 혹은 둘이 false가 되어서 조건식 통과X
    let returnDataIndex01 = dataIndexChecks('userName', NameBar);
    let returnDataIndex02 = dataIndexChecks('userEmail', EmailBar);

    let DataIndex01 = returnDataIndex01.property; //인덱스 넘버
    let DataIndex02 = returnDataIndex02.property; //인덱스 넘버

    if (returnDataName && returnDataEmail && DataIndex01 === DataIndex02) {
        classAdd(popUpParent, 'pop_up_on');
        classAdd(IDResultPopUp, 'pop_up_on');
        textInner(userNameShow, NameBar.value);
        textInner(userIDShow, userData[DataIndex01].userIDInfo);
        //userIdshow에 배열 userData[dataindex01] 즉 입력한 이름과 같은 인덱스 객체안에
        //있는 유저 아이디를 가져와라. 
        //console.log(userData[DataIndex01].userIDInfo);
    } else {
        //console.log('조건x');
        classAdd(popUpParent, 'pop_up_on');
        classAdd(notSearchPopUp, 'pop_up_on');
    }
}

//비밀번호 찾기
function chk02() {
    //''문자열의 형태로 비교하려는 속성을 넣어  ['']를 통해 비교한다.
    //속성명에 '' "" 가 들어가면 []안에 해당 문자열을 넣어준다.
    let dataSearch01 = dataChecks('userIDInfo', IDBar);
    let dataSearch02 = dataChecks('userBirth', BirthBar);

    let returnDataName = dataSearch01.property;
    let returnDataEmail = dataSearch02.property;

    let returnDataIndex01 = dataIndexChecks('userIDInfo', IDBar);
    let returnDataIndex02 = dataIndexChecks('userBirth', BirthBar);

    let DataIndex01 = returnDataIndex01.property; //인덱스 넘버
    let DataIndex02 = returnDataIndex02.property; //인덱스 넘버

    if (returnDataName && returnDataEmail && DataIndex01 === DataIndex02) {
        classAdd(popUpParent, 'pop_up_on');
        classAdd(PWResultPopUp, 'pop_up_on');
        textInner(userPWShow, userData[DataIndex01].userPWInfo);
    } else {
        classAdd(popUpParent, 'pop_up_on');
        classAdd(notSearchPopUp, 'pop_up_on');
    }
}

//밸류와 모듈 데이터 속성값 비교, boolean값 반환 (true / false)
function dataChecks(property, input) {
    //문자열의 형태로 되어있는 속성은 [] 대괄호안에 넣어서 표기 ex: ['food'] 
    let dataCheck01 = userData.some((event) => {
        return event[property] === input.value;
    }); //맞으면 true반환
    return {
        property: dataCheck01, //true or false 반환 (some 조건 안맞으면 false)
    }
}

//밸류와 모듈 데이터 속성값을 비교, 값이 있으면 그 값이 있는 인덱스 넘버 반환
//없을시 -1 , === some false 
function dataIndexChecks(property, input) {
    let dataIndexCheck01 = userData.findIndex((event) => {
        return event[property] === input.value;
    });

    return {
        property: dataIndexCheck01,
        //밸류값이 모듈에 존재하면 그 값이 존재하는 모듈의 인덱스 반환
        //반환x시 -1 즉 값이 없다는말 
    }
}

//클래스 생성 함수 
function classAdd(element, className) {
    element.classList.add(className);
}

//클래스 제거 함수
function classRemove(element, className) {
    element.classList.remove(className);
}

//텍스트 생성 함수
function textInner(element, text) {
    element.textContent = `${text}`; //변수값을 문자열로 표현하기 위해 
}

//밸류 초기화
function valueClear() {
    allInput.forEach((event) => {
        event.value = '';
    })
}