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
    //value가 내가 직접
    //textContent는 html에 적혀 있는 느낌
    //innerHTML은 테그 쓰면서 하는 느낌
}) ;