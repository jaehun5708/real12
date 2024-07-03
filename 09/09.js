document.addEventListener('DOMContentLoaded', () => {
    const bt = document.querySelector('#bt');
    const lotto = document.querySelector('#lotto');


    //lotto 번호 저장
    let arr = [] ;

    bt.addEventListener('click', () => {
        //배열 초기화
        // arr= [] ;
        arr.length = 0 ;
        //로또 번호 생성
        while(arr.length < 7){
            const n = Math.floor(Math.random() * 45) + 1;

            if (!arr.includes(n))arr.push(n) ;
            
        }

        //번호 정렬
        arr.sort((a,b)=>a-b) ;
        console.log(arr);

        let tm = arr.map(item => `<span class ="sp${Math.floor(item / 10)}">
        ${item}
        </span>`) ;

        tm.splice(6,0, '<span id ="spplus">+</span>');

        lotto.innerHTML = tm.join('') ;

    })



    // txt1.style.display = 'none';


    // let n = '';
    // let a = 0;

    // bt1.addEventListener('click', () => {
    //     bt1.style.display = 'none';
    //     txt1.style.display = 'inline';
    //     bt2.style.display = 'inline';

    //     //번호 6개 생성
    //     n = '';
    //     for (let i = 0; i < 6; i++) {
    //         a = Math.floor(Math.random() * 45) + 1;
    //         n = n + ' ' + String(a);
    //     }
    //     console.log(n);

    //     //txt1에 넣기

    //     txt1.value = n;
    //     //끝나면 bt2 나와서 누르면 돌아가기
    //     bt2.addEventListener('click', () => {
    //         txt1.style.display = 'none';
    //         bt1.style.display = 'inline';
    //         bt2.style.display = 'none';
    //         txt1.value = '';
    //     })


    // })




}) ;