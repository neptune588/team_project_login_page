import {
    userData
} from './userdata.js';




//전체 감싸는 FORM
const loginForm = document.getElementById('login_form');

//아이디 입력창
const userId = document.getElementById('user_id');
//비밀번호 입력창
const userPw = document.getElementById('user_pw');
//가이드멘트
const IDmessage = userId.parentNode.lastElementChild;
const PWmessage = userPw.parentNode.lastElementChild;

//비밀번호 숫자로 표시 ON/OFF 버튼
const showNBlockBtn = document.getElementById('pw_show_block_btn');

//비밀번호 표시 상태 변수
let pwShowState;
//아이디 저장 상태 변수
let IDRememberState;
//비밀번호 체크할때 아이디 체크봉인
let IDcheckComplete;
//아이디 저장 ON/OFF 버튼
const userIdRmBtn = document.getElementById('id_rm_chk');
//로그인하기 버튼
const userSignIn = document.getElementById('sign_in_chk');

//비밀번호 보기 버튼 눌렸을때
showNBlockBtn.addEventListener('click', userPwShow);
//로그인했을때 조건들 체크
userSignIn.addEventListener('click', allChks);
//빨간박스 초기화
userId.addEventListener('keyup', function () {
    falseReset(userId, IDmessage)
});
//함수로 바로전달하면 언디파인드 도출됨 함수 자체를 return 값으로 받자.
userPw.addEventListener('keyup', function () {
    falseReset(userPw, PWmessage)
});

//아이디 체크

//비밀번호 체크
function PWCheck(index) {
    if (userData[index].userPWInfo !== userPw.value) {
        PWmessage.textContent = '비밀번호가 일치하지 않습니다!';
        falseOn(userPw, PWmessage);
    } else {
        location.href = '../login_page/sign_up.html';
    }
}

//비밀번호 보이기
function userPwShow() {
    if (!pwShowState) {
        pwShowState = true;
        userPw.setAttribute('type', 'text');
    } else {
        pwShowState = false;
        userPw.setAttribute('type', 'password');
    }
}
//border_red //스타일주는 용도
function falseOn(object, objectsiblingLast) {
    objectsiblingLast.style.display = 'block';
    object.classList.add('false_on');
}
//타자 입력했을때 보더및 배경해제
function falseReset(object, objectsiblingLast) {
    objectsiblingLast.style.display = 'none';
    object.classList.remove('false_on');
}


/* //border_green //스타일주는 용도
function trueOn (object, objectsiblingLast) {
    objectsiblingLast.style.color = 'green';
    object.classList.remove('false_on');
    object.classList.add('true_on');
} */