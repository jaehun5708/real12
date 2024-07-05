document.addEventListener('DOMContentLoaded', ()=>{
    //DOM 요소 가져오기
    const txt1 = document.querySelector('#txt1') ;
    const btadds = document.querySelectorAll('.btadd') ;
    const btdels = document.querySelectorAll('.btdel') ;
    const btchanges = document.querySelectorAll('.btchange') ;
    //배열 만들기
    let arr = [] ;
    //오브젝트
    let obj = {
        '사과' : '🍎',
        '바나나' : '🍌',
        '오렌지' : '🍊',
        '수박' : '🍉',
        '오이' : '🥒',
        '당근' : '🥕',
        '가지' : '🍆',
        '브로콜리' : '🥦'
    }
    //반복문이긴 한디 여기서 btadds에서 나오는거 하는 느낌
    for (let bt of btadds) {
        bt.addEventListener('click', ()=>{
            console.log(bt.textContent)

            // if (bt.textContent == '사과') {
            //     arr.push('🍎')
            // }
            // else if (bt.textContent == '바나나') {
            //     arr.push('🍌')
            // }
            // else if (bt.textContent == '오렌지') {
            //     arr.push('🍊')
            // }
            // else if (bt.textContent == '수박') {
            //     arr.push('🍉')
            // }
            console.log(arr) ;
            
            //A.push()가 ()안의 내용을 배열에 추가하는 느낌
            //배열안에는 이모지 넣기, 
            //bt.textContent 가 key니까 뒤에 이모지가 들어감
            arr.push(obj[bt.textContent])

            //띄어쓰기 기준으로 이모지 넣음
            txt1.value = arr.join(' ')
        }) ;
    }

    //삭제 버튼
    for (let bt of btdels) {
        bt.addEventListener('click', ()=>{
            //삭제란 단어를 공백으로 바꾸기
            const btkey = bt.textContent.replace('삭제','') ;
            console.log(btkey) ;

            // arr = arr.filter((item) => {return item != obj[btkey]}) ;
            //filter가 지금 obj에 없는 item을 다 가져오는 갬성
            arr = arr.filter(item => item != obj[btkey]) ;

            //filter 지나간 친구들 띄어쓰기로 출력 갬성
            txt1.value = arr.join(' ')
            

        })
    }

    //변경 버튼
    for (let bt of btchanges) {
        bt.addEventListener('click', () => {
            //→기준으로 0은 앞 1은 뒤
            const w1 = bt.textContent.split('→')[0] ;
            const w2 = bt.textContent.split('→')[1] ;
            console.log(w1,w2)

            //map은 배열과 수가 같음
            //obj에 들어있는 w1의 이모지랑 
            //txt1의 이모지가 같으면 w2의 이모지로 변경 
            //arr = arr.map((item) => {return item == obj[w1] ? obj[w2] : item }) ;
            arr = arr.map(item => item == obj[w1] ? obj[w2] : item ) 
            txt1.value = arr.join(' ')
            //
        })
    }
}) ;