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
            const nUser = parseInt(bt.textContent.charAt(0));
            console.log('nUser', nUser)
    
            //img src 속성을 변경
            imgCom.setAttribute('src', `./img/${nCom}.png`);
            imgUser.setAttribute('src', `./img/${nUser}.png`);

            //숫자 비교
            if (nCom == nUser) {
                msg.innerHTML = '<h1 id="msgRed">맞음</h1>';
            }
            else {
                msg.innerHTML = '<h1 id="msgBlue">틀림</h1>';
            }
        });
    }


    


});