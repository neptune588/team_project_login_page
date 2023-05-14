
//전체 감싸는 FORM
const loginForm = document.getElementById('login_form');

//아이디와 비밀번호 입력창
const userId = document.getElementById('user_id');
const userPw = document.getElementById('user_pw');

//비밀번호 숫자로 표시 ON/OFF 버튼
const showNBlockBtn = document.getElementById('pw_show_block_btn');

//아이디 저장 ON/OFF 버튼
const userIdRmBtn = document.getElementById('id_rm_chk');

//로그인하기 버튼
const userSignIn = document.getElementById('sign_in_chk');

/* userSignIn.addEventListener('click', loginChk);

function loginChk () {
    let userIdValue = userId.value;
    for(let i = 0; i<regexArray; i++) {
        if(regexArray[i].text(userIdValue && )) {

        }
    }
} */

//아이디 양식 기준
/* const regexOnlyEng = /^[a-z]{6,15}$/; 
const regexEngNSymbols = /^(?=.*[a-z])(?=.*[_])[a-z_!@#$%^&*()\-+=]{6,15}$/i; 
const regexOnlyNumber = /^\d{6,15}$/ 
const regexEngNNumber = /^[a-z0-9]{6,15}$/;
const regexEngNSymbolsNNumber = /^[a-z0-9_]{6,15}$/; */