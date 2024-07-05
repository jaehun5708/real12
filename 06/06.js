/*
업다운게임
1. DOM 요소 가져오기

2. 확인 버튼 처경
    -확인 버튼 내용이 '확인'이 아니면 초기화
    -랜덤수 생성 (초기화되기 전까지 한번만 생성) => flag 변수
    -텍스트박스의 숫자와 비교 : 크면 -> 다운, 같으면 -> 성공, 작으면 -> 업
    -비교후 이미지 변경

3. 성공하면
    -텍스트 박스를 숨김
    -버튼의 글자를 변경

4. 초기화
    -이미지는 what
    -텍스트 상자가 보이게
    -버튼의 이름을 확인으로
    -랜덤 변수가 생성될 수 있도록 => flag변수
*/

document.addEventListener('DOMContentLoaded', () => {
    //1. DOM 요소 가져오기
    const img = document.querySelector('img');  //태크셀렉터
    const txt1 = document.querySelector('input[type=number]');  //속성셀렉터
    const btok = document.querySelector('#btok')  //아이디 셀렉터
    const btcancel = document.querySelector('#btno')

    //랜덤수 생서 제어 변수
    let flag = true;  //true이면 랜덤수 생성 가능, false이면 랜덤수 생성불가


    //랜덤수
    let n = 0;
    //확인버튼이 아닌 경우 그림 다시 what으로 만들고 글자 바꾸기 flag 초기화
    const init = () => {
        img.setAttribute('src', './img/what.png');
        txt1.value = ' ';
        txt1.style.display = 'inline';  // none 안보임
        btok.textContent = '확인';
        btcancel.style.display = 'inline';
        flag = true;

    }

    //초기화 확인
    btok.addEventListener('click', () => {
        //form으로 묶었으면 e.preventDefault();

        //이게 업다운 게임 맞추고 다시 시작하기 위해서
        if (btok.textContent != '확인') {
            init() ; //함수 호출
            return;

        }
        //랜덤숫자생성
        if (flag == true) {
            n = Math.floor(Math.random() * 100) + 1;
            flag = false;
        }
        //숫자 입력 안하면 경고문 뜨게하기
        if (txt1.value == '') {
            alert('숫자를 입력하세요.');
            txt1.focus(); //커서위치
            return;
        }
        //비교하기 위해 컴퓨터가 생성한 숫자를 숫자 취급
        let usern = parseInt(txt1.value);
        if (n > usern) { // up
            img.setAttribute('src', './img/up.png');
        }
        else if (n < usern) { //down
            img.setAttribute('src', './img/down.png');
        }
        else { //성공
            img.setAttribute('src', './img/good.png');
            txt1.style.display = 'none';
            btok.textContent = '번호를 다시 생성하세요.'
            btcancel.style.display = 'none';
        }
        //console.log(n);
    });
})
