// DOM 생성이 되면
document.addEventListener('DOMContentLoaded', () => {
    //img, button 요소를 가져오기
    const img = document.querySelector('#divContent img')
    const bt = document.querySelector('#divContent button')
    //button 클릭이 되는 경우를 찾아야 함
    bt.addEventListener('click', () => {
        //랜덤수를 발생 1~6
        const n = Math.floor(Math.random() * 6) + 1;
        console.log(`${n}.png`);

        //img src 속성을 변경
        img.setAttribute('src', `./img/${n}.png`);

    });
});