document.addEventListener('DOMContentLoaded', () => {
    const bt1 = document.querySelector('#bt1');
    const bt2 = document.querySelector('#bt2');
    const txt1 = document.querySelector('#txt1');


    txt1.style.display = 'none';
    bt2.style.display = 'none';


    let n = '';
    let a = 0;

    bt1.addEventListener('click', () => {
        bt1.style.display = 'none';
        txt1.style.display = 'inline';
        bt2.style.display = 'inline';

        //번호 6개 생성
        n = '';
        for (let i = 0; i < 6; i++) {
            a = Math.floor(Math.random() * 45) + 1;
            n = n + ' ' + String(a);
        }
        console.log(n);

        //txt1에 넣기

        txt1.value = n;
        //끝나면 bt2 나와서 누르면 돌아가기
        bt2.addEventListener('click', () => {
            txt1.style.display = 'none';
            bt1.style.display = 'inline';
            bt2.style.display = 'none';
            txt1.value = '';
        })


    })




})