import {
    regextTotalArray,
    regexNameArray,
    regexEmailArray
} from './regex.js'
import {
    userData
} from './userdata.js'

/********************************* 페이지1 ***********************************/

//정규식 
const regexTestName = regexNameArray[0].regex;
const regexTest00 = regextTotalArray[0].regex;
const regexTest01 = regextTotalArray[1].regex;
const regexTest02 = regextTotalArray[2].regex;
const regexTestEmailBefore = regexEmailArray[0].regex;
const regexTestEmailAfter = regexEmailArray[1].regex;
//체크의 기준이되는 정규식을 checkRegex 배열에 저장 후 반복문으로 체크 (적용x 후에 적용)
//const checkRegex = [regexTest00,regexTest01,regexTest02];
//약관 동의 전체 감싸는 form
const termsArea = document.getElementById('terms_area');
//전부 체크
const termsAllChkBtn = document.getElementById('terms_all_chk');
//이용약관동의 체크
const termsChk01Btn = document.getElementById('terms_chk_01');
//개인정보 수집 체크
const termsChk02Btn = document.getElementById('terms_chk_02');
//전체 체크를 제외한 체크버튼
const termsClass = document.querySelectorAll('.terms_chk');
//경고 문구
const cautionChk = document.getElementById('caution');


//경고 문구 상태 변수
let cautionState;

//실행 이벤트 
termsAllChkBtn.addEventListener('click', termsAllChk);
termsChk01Btn.addEventListener('click', termsClick);
termsChk02Btn.addEventListener('click', termsClick);

//약관 체크 동작 함수 
function termsAllChk() {
    if (termsAllChkBtn.checked) { //순서 -> click -> termsAllChkBtn.check = true -> 이벤트핸들러(함수동작전달) 
        for (let i = 0; i < termsClass.length; i++) {
            termsClass[i].checked = true;
        }
    } else {
        for (let i = 0; i < termsClass.length; i++) {
            termsClass[i].checked = false;
        }
    }
}

//하나라도 체크해제시 전부체크 해제 / 두개 체크시 올 체크
function termsClick() {
    for (let i = 0; i < termsClass.length; i++) {
        //2개다 true가 되면 전체 약관동의도 true되게함.
        let termsClassValue = Array.from(termsClass).every((value) => {
            return value.checked;
        });
        if (termsClassValue) {
            termsAllChkBtn.checked = true;
        }
        //하나라도 false되면 전체 약관동의 false
        if (!(termsClass[i].checked)) {
            termsAllChkBtn.checked = false;
        }
        console.log(termsClassValue);
    }
}

//경고 문구 토글 함수
function toggleCation() {
    if (!cautionState) {
        cautionChk.style.display = 'block';
    } else if (cautionState) {
        cautionChk.style.display = 'none';
    }
}


/********************************* 페이지2 ***********************************/

//필수 입력 요소들
const necessaryInput = document.querySelectorAll('.necessary_text');
//경고 혹은 안내메시지들
const guideMessage = document.querySelectorAll('.guide_message');
//페이지2 경고 문구 팝업
const popUpToggleBtn = document.querySelector('.caution_pop_up_ex');
//이름 입력창
const userName = document.getElementById('user_name');
//아이디 입력창
const userId = document.getElementById('user_id');
//비밀번호 입력창
const userPw = document.getElementById('user_pw');
//비밀번호 확인 입력창
const userPwReChk = document.getElementById('user_pw_chk');
//이메일 입력창 중 도메인 넣는부분(뒷부분)
const userEmailAfter = document.getElementById('user_email_last');
//이메일 입력창 중 도메인 넣는부분 선택창
const userEmailSelected = document.getElementById('user_email_last_select');
//비밀번호 보이기 버튼
const userPwShowBtn = document.getElementById('pw_view_btn');
//아이디 체크
const userIdChkBtn = document.getElementById('user_id_chk');
//pw상태체크
let pwToggleState;
//아이디 confirm 상태 
let idConfirm;
//팝업 클릭시 
popUpToggleBtn.addEventListener('click', function () {
    this.classList.remove('pop_up_on');
})
//input 전체 순환
for (let i = 0; i < necessaryInput.length; i++) {
    necessaryInput[i].addEventListener('keyup', valueChecks);
    necessaryInput[i].addEventListener('blur', valueChecks);
}
//중복확인체크 , 아이디의 경우 버튼을 통해 체크
userIdChkBtn.addEventListener('click', userIdCheck);
//pw보이기 체크
userPwShowBtn.addEventListener('click', userPwShow);
//pw가 가려졌을때 캡스락이 눌러졌는지 체크
userPw.addEventListener('keyup', (event) => {
    let CapsLock = event.getModifierState('CapsLock');
    let guideMessageArea = userPw.parentNode.lastElementChild;
    if (!pwToggleState && CapsLock && userPw.value.length > 0) {
        guideMessageArea.textContent = 'Caps Lock을 꺼주세요!'
    }
});
//이메일 도메인부분 선택해서 넣었을떄 
userEmailSelected.addEventListener('change', emailSelected);

//아이디 중복체크
function userIdCheck() {
    let guideMessageArea = userId.parentNode.lastElementChild;
    let IDMoutainChk = userData.some((array) => {
        return array.userIDInfo === userId.value;
    });
    console.log(IDMoutainChk) //true나오면 중복;
    if (!(userId.value)) {
        falseOn(userId, guideMessageArea);
        guideMessageArea.textContent = '입력값을 입력 혹은 선택해주세요!';
    } else if (!(regexTest02.test(userId.value))) {
        falseOn(userId, guideMessageArea);
        guideMessageArea.textContent = '유효하지 않은 입력입니다. (특수문자 _는 한번만 가능, 영어 소문자 또는 숫자 특수문자_ 조합 가능, 6~15자)'
    } else if (IDMoutainChk) {
        falseOn(userId, guideMessageArea);
        guideMessageArea.textContent = '중복된 아이디입니다!'
    } else {
        trueOn(userId, guideMessageArea);
        guideMessageArea.textContent = '알맞은 양식입니다!';
        //userId전달
        idConfirm = true;
    }
}

//패스워드 보이기/끄기 
function userPwShow() {
    if (!pwToggleState) {
        userPw.setAttribute('type', 'text');
        userPwReChk.setAttribute('type', 'text');
    } else {
        userPw.setAttribute('type', 'password');
        userPwReChk.setAttribute('type', 'password');
    }
    pwShowOnOff();
}

//패스워드 보이기/끄기 아이콘 on/off
function pwShowOnOff() {
    if (!pwToggleState) {
        userPwShowBtn.classList.add('pw_on');
        pwToggleState = true;
    } else {
        userPwShowBtn.classList.remove('pw_on');
        pwToggleState = false;
    }
}

//이메일 뒷자리(도메인영역) 셀렉트로 선택했을때(선택영역)
function emailSelected() {
    let selectedValue = userEmailSelected.options[userEmailSelected.selectedIndex];
    let guideMessageArea = this.parentNode.lastElementChild;
    if (!selectedValue.value) {
        userEmailAfter.removeAttribute('disabled');
        //직접입력을 선택했을때는 이메인 도메인 입력창 활성화 
    } else {
        userEmailAfter.value = selectedValue.innerText;
        userEmailAfter.setAttribute('disabled', 'true');
        trueOn(userEmailAfter, guideMessageArea);
        guideMessageArea.textContent = '알맞은 양식입니다!'
        //그외 선택을 했을때는 이메일 도메인 입력창에 선택한 옵션의 텍스트값이 전달/입력창 비활성화
    }
}

//1. 공백체크 -> 공백아니면 이후 조건들 체크
function valueChecks() {
    let eventTarget = this; //blur 이벤트 발동한 객체
    //배열로 전환 후 indexof로 지금 해당하는 그것의 인덱스 번호 추출
    let eventTargetIndex = Array.from(necessaryInput).indexOf(eventTarget);
    //해당하는 요소 마지막 요소인 가이드문구 요소
    let guideMessageArea = this.parentNode.lastElementChild;
    if (!(this.value)) {
        falseOn(eventTarget, guideMessageArea); //해당 인덱스 요소의 밸류가 공백이면 false 추가 함수로
        guideMessageArea.textContent = '입력값을 입력 혹은 선택해주세요!';
    } else {
        indexSearch(eventTargetIndex);
    } //공백이 아니면 다른 조건 체크하기 위해 indexSearch실행
}

//공백이 아닐때 각각의 인덱스 번호에 해당하는 조건식함수들 호출
function indexSearch(index) {
    switch (index) {
        case 0: {
            valueCheck01(index);
            break;
        }
        case 2: {
            valueCheck02(index);
            break;
        }
        case 1:
        case 3: {
            valueCheck03(index);
            break;
        }
        case 4: {
            valueCheck04(index);
            break;
        }
        case 5: {
            valueCheck05(index);
            break;
        }
        case 6: {
            valueCheck06(index);
            break;
        }
        case 7: {
            valueCheck07(index);
            break;
        }
        case 8: {
            valueCheck08(index);
            break;
        }
        case 9: {
            valueCheck09(index);
            break;
        }

    }
}

//이름 체크
function valueCheck01(index) {
    //문자열과 정규식은 자료형(타입)이 다르기 떄문에 바로 비교를 하면 안되고
    //test메서드를 통해 밸류를 체크
    let thisInputIndex = necessaryInput[index];
    let guideMessageArea = thisInputIndex.parentNode.lastElementChild;
    if (!(regexTestName.test(thisInputIndex.value))) {
        falseOn(thisInputIndex, guideMessageArea);
        guideMessageArea.textContent = '이름은 한글만 가능합니다.(최대 8자) 또한 초성 입력은 안됩니다.'
    } else {
        trueOn(thisInputIndex, guideMessageArea);
        guideMessageArea.textContent = '알맞은 양식입니다!'
    }
}

//생년월일 중에 생년 체크
function valueCheck02(index) {
    let thisInputIndex = necessaryInput[index];
    let guideMessageArea = thisInputIndex.parentNode.lastElementChild;
    //value값은 항상 문자열이기떄문에 숫자비교를할떄는 숫자로 형변환 후 비교 
    if (!(regexTest00.test(parseInt(thisInputIndex.value)))) {
        falseOn(thisInputIndex, guideMessageArea);
        guideMessageArea.textContent = '유효한 년도가 아닙니다 (1900~2100까지 가능)'
    } else {
        trueOn(thisInputIndex, guideMessageArea);
        guideMessageArea.textContent = '알맞은 양식입니다!'
    }
}

//성별/ 생년월일중 월 체크
function valueCheck03(index) {
    let thisInputIndex = necessaryInput[index];
    let guideMessageArea = thisInputIndex.parentNode.lastElementChild;
    if (!(thisInputIndex.value)) {
        falseOn(thisInputIndex, guideMessageArea);
    } else {
        trueOn(thisInputIndex, guideMessageArea);
        guideMessageArea.textContent = '알맞은 양식입니다!'
    }
}

//생년월일 중에 일 체크
function valueCheck04(index) {
    let thisInputIndex = necessaryInput[index];
    let guideMessageArea = thisInputIndex.parentNode.lastElementChild;
    if (!(regexTest01.test(parseInt(thisInputIndex.value)))) {
        falseOn(thisInputIndex, guideMessageArea);
        guideMessageArea.textContent = '유효한 입력이 아닙니다 (1일~31일까지 가능)'
    } else {
        trueOn(thisInputIndex, guideMessageArea);
        guideMessageArea.textContent = '알맞은 양식입니다!'
    }
}

//공백아닐때 false제거 (아이디칸만)
function valueCheck05(index) {
    let thisInputIndex = necessaryInput[index];
    falseTrueReset(thisInputIndex);
}

//비밀번호 체크 
function valueCheck06(index) {
    let thisInputIndex = necessaryInput[index];
    let guideMessageArea = thisInputIndex.parentNode.lastElementChild;
    if (!(regexTest02.test(thisInputIndex.value))) {
        falseOn(thisInputIndex, guideMessageArea);
        guideMessageArea.textContent = '유효하지 않은 입력입니다. (특수문자 _는 한번만 가능, 영어 소문자 또는 숫자 특수문자_ 조합 가능, 6~15자)'
    } else {
        trueOn(thisInputIndex, guideMessageArea);
        guideMessageArea.textContent = '알맞은 양식입니다!'
    }
}

//비밀번호 재확인 
function valueCheck07(index) {
    let thisInputIndex = necessaryInput[index];
    let guideMessageArea = thisInputIndex.parentNode.lastElementChild;
    //비밀번호칸에 유효한 값이 들어갔는지 체크
    let pwInputClassChk = userPw.classList.contains('trueOn');
    let userPwValue = userPw.value
    //console.log(userPwValue);
    if (!pwInputClassChk && (userPwValue !== thisInputIndex.value)) {
        falseOn(thisInputIndex, guideMessageArea);
        guideMessageArea.textContent = '비밀번호가 일치하지 않습니다.'
    } else {
        trueOn(thisInputIndex, guideMessageArea);
        guideMessageArea.textContent = '비밀번호가 일치합니다!'
    }
}

//이메일 골뱅이 앞부분 체크
function valueCheck08(index) {
    let thisInputIndex = necessaryInput[index];
    let guideMessageArea = thisInputIndex.parentNode.lastElementChild;
    if (!regexTestEmailBefore.test(thisInputIndex.value)) {
        falseOn(thisInputIndex, guideMessageArea);
        guideMessageArea.textContent = '유효하지 않은 입력입니다. (특수문자 _는 한번만 가능, 영어 소문자 또는 숫자 특수문자_ 조합 가능, 2~12자)'
    } else {
        trueOn(thisInputIndex, guideMessageArea);
        guideMessageArea.textContent = '알맞은 양식입니다!'
    }
}

//이메일 뒷자리 부분 체크(직접입력하는 영역)
function valueCheck09(index) {
    let thisInputIndex = necessaryInput[index];
    let guideMessageArea = thisInputIndex.parentNode.lastElementChild;
    if (!regexTestEmailAfter.test(thisInputIndex.value)) {
        falseOn(thisInputIndex, guideMessageArea);
        guideMessageArea.textContent = '유효하지 않은 입력입니다. (영어 소문자와 숫자, .만 입력 가능, .은 두번까지만)'
    } else {
        trueOn(thisInputIndex, guideMessageArea);
        guideMessageArea.textContent = '알맞은 양식입니다!'
    }
}

//border_red //스타일주는 용도
function falseOn(object, objectsiblingLast) {
    objectsiblingLast.style.color = 'red';
    object.classList.remove('true_on');
    object.classList.add('false_on');
}

//border_green //스타일주는 용도
function trueOn(object, objectsiblingLast) {
    objectsiblingLast.style.color = 'green';
    object.classList.remove('false_on');
    object.classList.add('true_on');
}

//border_reset 
function falseTrueReset(object) {
    object.classList.remove('false_on');
    object.classList.remove('true_on');
}

/********************************* 페이지3 ***********************************/
const IdNTitleMent = document.getElementById('id_n_title_ment');
const titleMent = document.getElementById('title_ment');

//가입한 아이디 표기
function IdValueLoad() {
    if (idConfirm) {
        let newP = document.createElement('p');
        newP.textContent = userId.value;
        IdNTitleMent.insertBefore(newP, titleMent);
    }
}

/********************************* 페이지 공통 ***********************************/

//페이지에 따라 상단 효과
const stepCircle = document.querySelectorAll('.circle');
const stepText = document.querySelectorAll('.text');
//페이지 버튼
const prevPageBtn = document.getElementById('prev_btn');
const nextPageBtn = document.getElementById('next_btn');
const showPage = document.querySelectorAll('.page');
const loginPageInBtn = document.getElementById('login_page_in_btn');
//prev,next 클릭 이벤트
nextPageBtn.addEventListener('click', showNextPage);
prevPageBtn.addEventListener('click', showPrevPage);

//page count 
let pageCount = 0;

//동작함수
function showNextPage() {
    if (pageCount === 0) {
        pageCheck01();

    } else if (pageCount === 1) {
        pageCheck02();
    }
    if (pageCount === 2) {
        prevPageBtn.style.display = 'none';
        nextPageBtn.style.display = 'none';
        loginPageInBtn.classList.add('login_page_in_btn_on');
        IdValueLoad();

        //초기화
        for (let i = 0; i < necessaryInput.length; i++) {
            necessaryInput[i].value = '';
        }
    }
}

function showPrevPage() {
    if (pageCount === 0) {
        location.href = '../login_page/login.html';
    }
    if (pageCount === 1) {
        pageCount--;

        pageOn();

        //초기화
        for (let i = 0; i < necessaryInput.length; i++) {
            necessaryInput[i].value = '';
        }
    }
}

function pageCheck01() {
    if (!(termsAllChkBtn.checked)) { //약관동의 안됐을경우
        cautionState = false;
        toggleCation();
    } else {
        pageCount++;

        //약관 동의 체크 
        termsAllChkBtn.checked = false;
        termsAllChk();

        //경고 문구
        cautionState = true;
        toggleCation();

        pageOn();
    }
}

function pageCheck02() {
    let necessaryInputChk01 = Array.from(necessaryInput).every((event) => {
        return event.value;
    });
    let necessaryInputChk02 = Array.from(necessaryInput).every((event) => {
        return event.classList.contains('true_on');
    });
    //모든 원소가 조건을 만족하면 true, 하나라도 만족하지 않으면 false를 반환한다.
    //해당 배열안에 있는 값들이 조건을 "모두" 통과해야만 true를 반환해준다.
    if (!(necessaryInputChk01 && necessaryInputChk02) ) {
        //necessaryInputChk, necessaryInputChk02 가 false라는 뜻은 해당 조건 하나도 만족 못했다는 말. 
        //pop_up 관련
        popUpToggleBtn.classList.add('pop_up_on');
    } else {
        pageCount++;

        pageOn();
    }
}

function pageOn() {
    for (let i = 0; i < showPage.length; i++) {
        showPage[i].classList.remove('page_on');
        stepCircle[i].classList.remove('step_on');
        stepText[i].classList.remove('text_step_on');
    }

    showPage[pageCount].classList.add('page_on');
    stepCircle[pageCount].classList.add('step_on');
    stepText[pageCount].classList.add('text_step_on');

    if (pageCount === 1) {
        //페이지 1됐을때 포커스 할당 
        userName.focus();
    }
    //console.log(pageCount);
}

/* function allValueTrue () {
    for(let i = 0; i < necessaryInput.length; i++) {
        necessaryInput[i].classList.contains('trueOn');
    }
} */