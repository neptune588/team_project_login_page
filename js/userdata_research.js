import {
    userData
} from './userdata.js';

const userIDSearchTab = document.getElementById('id_search_tab');
const userPWSearchTab = document.getElementById('pw_search_tab');
const searchBtn = document.querySelectorAll('.search_btn');

const tabs = document.querySelectorAll('.tab');
//팝업
const popUpParent = document.getElementById('pop_up_ex');
const userNameBar = document.getElementById('name_bar');
const userEmailBar = document.getElementById('email_bar');
const userIDBar = document.getElementById('id_bar');
const userBirthBar = document.getElementById('birth_bar');

const notSearchPopUp = document.getElementById('pop_up_03');

let tabState = false;

//console.log(valueChecks().userNameSearch);

/* function valueIndexChecks() {   
    let SomeResult = valueChecks();
    if(!(userNameSearch === userEmailSearch))

} */

//순환
/* dataInput.forEach((input) => {
    //공백체크
    input.addEventListener('blur', spaceChk);
}) */

/* function spaceChk() {
    //이벤트 일어난 인풋
    let eventTarget = this;
    //해당 인풋 인덱스 추출
    let eventTargetIndex = Array.from(dataInput).indexOf(eventTarget);
    if (!this.value) {
        falseOn(eventTarget, guideMessage[eventTargetIndex]);
    } else {
        falseReset(eventTarget, guideMessage[eventTargetIndex]);
    }
} */

/* function chks02(index) {
    let thisInput = dataInput[index];
}

function chks03(index) {
    let thisInput = dataInput[index];
}

function chks04(index) {
    let thisInput = dataInput[index];
}  */

/* //스타일
function falseOn(object, guideMessage) {
    guideMessage.textContent = '값을 입력 해주세요!'
    guideMessage.style.color = 'red';
    object.classList.add('false_on');
}
//스타일 리셋
function falseReset(object, guideMessage) {
    guideMessage.textContent = ''
    object.classList.remove('false_on');
} */

//조건 맞는지 체크

userIDSearchTab.addEventListener('click', () => {
    return tabNumber = 1;
});
userPWSearchTab.addEventListener('click', () => {
    return tabNumber = 2;
});


if(tabNumber === 1) {
    searchBtn.addEventListener('click', search01);
} else if(tabNumber === 2) {
    searchBtn.addEventListener('click', search02);
}

function search01 () {

}
function search02 () {

}

/* function valueChecks() {
    let valueCheck01 = userData.some((array) => {
        return array.userName === userNameBar.value;
    });
    let valueCheck02 = userData.some((array) => {
        return array.userEmail === userEmailBar.value;
    });
    let valueCheck03 = userData.some((array) => {
        return array.userIDInfo === userIDBar.value;
    });
    let valueCheck04 = userData.some((array) => {
        return array.userEmail === userBirthBar.value;
    });

    //비교한 value값들 객체형식으로 반환
    return {
        userNameSearch : valueCheck01,
        userEmailSearch : valueCheck02,
        userIDSearch : valueCheck03,
        userBirthSearch : valueCheck04,
    }
}  */