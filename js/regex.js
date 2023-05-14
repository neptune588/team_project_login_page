//정규식 배열
const regextTotalArray = [
    {
        id : 'regexOnlyNumber04length',
        regex : /^(19\d\d|20\d\d|2100)$/ //숫자1900~2100까지 4자리숫자만
    },
    {
        id : 'regexOnlyNumber02length',
        regex : /^(0?[1-9]|[1-2][0-9]|3[0-1])$/ //01~09까지는 한자릿수도 가능 이후부턴 두자리만 가능
    },
    {
        id : 'regexEngNSymbolsNNumber',
        regex :/^(?!.*[_].*[_])[a-z0-9_]{6,15}$/ //영어 소문자 ok 숫자 ok 특수문자_ 만가능, _ _ 두개올수없음 
    }
    
]

const regexNameArray = [
    {
        id : 'regexKor',
        regex :/^[가-힣]{2,8}$/
    },
    {
        id : 'regexSymbols',
        regex :/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    }
]

const regexEmailArray = [
    {
        id : 'regexEmail_before',
        regex :/^(?!.*[_].*[_])[a-z0-9_]{2,12}$/
        // 
    },
    {
        id : 'regexEmail_after',
        regex :/^(?!.*\.\.)[a-z][a-z\d.]{0,10}[a-z\d]$/
        // .이 맨앞에올수없음, .. 연속두번 사용불가능, .최대 두번까지사용가능, 영어소문자만 가능, 특수문자불가능
    }
]

export {regextTotalArray, regexNameArray, regexEmailArray}
