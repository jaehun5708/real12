//사용자와 컴퓨터 랜덤수 생성
// DOM 생성이 되면
document.addEventListener('DOMContentLoaded', () => {
    //img, button 요소를 가져오기
    const imgCom = document.querySelector('#com') ;
    const imgUser = document.querySelector('#user') ;
    const bts = document.querySelectorAll('#divContent button') ;
    const msg =document.querySelector('#msg') ;
    console.log('bts');
    //button 클릭이 되는 경우를 찾아야 함
    for(let bt of bts) {
        bt.addEventListener('click', () => {
            //랜덤수를 발생 1~6
            const nCom = Math.floor(Math.random() * 6) + 1;
            // console.log(`${n}.png`);
            //user
             //첫글자 가져오기
            const nUser = parseInt(bt.textContent.charAt(0)); 
    
            console.log('nUser', nUser)
    
            //img src 속성을 변경
            imgCom.setAttribute('src', `./img/${nCom}.png`);
            imgUser.setAttribute('src', `./img/${nUser}.png`);

            //숫자 비교
            //js파일에 id를 줘도 css파일에서 수정 가능
            if (nCom == nUser) {
                msg.innerHTML = '<h1 id="msgRed">맞음</h1>';
            }
            else {
                msg.innerHTML = '<h1 id="msgBlue">틀림</h1>';
            }
        });
    }
});

/* div, p, h1 등 은 블록 레벨 요소로 자기가 속한 영역의 너비를 모두 차지 !
span, a 등은 인라인 요소로 자기에게 필요한 만큼의 공간만 차지 !
display 를 통해 서로 (인라인 블록) 여부를 바꿔줄 수 있음 !! */

/* flex VS inline-flex
flex 는 옆으로 배치 가능
inline-flex 는 inline 요소이지만 span 처럼 박스를 칠 수 있다 */

/* span 태그로는 margin과 padding을 못줌
-> 그래서 inline 을 통해서 margin padding 을 주는거임 */