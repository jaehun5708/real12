document.addEventListener('DOMContentLoaded', ()=>{
    //DOM요소 가져오기
    const txt1 = document.querySelector('#txt1');
    const txt2 = document.querySelector('#txt2');

    const bt1 = document.querySelector('#bt1') ;
    const bt2 = document.querySelector('#bt2') ;

    //회문 확인 form으로 묶여있으니까 e 넣기
    bt1.addEventListener('click', (e)=>{
        //html에 form으로 묶어서
        e.preventDefault();

        if (txt1.value == '') return;
        console.log(txt1.value) ;  
        console.log(txt1.value.length) ;
        console.log(txt1.value.charAt(0)) ;
        for (let i=0; i<txt1.value.length; i++){
            console.log(txt1.value.charAt(i)) ;
        }

        //문자열 뒤집기
        let tm =''
        for (let i=txt1.value.length-1; i>=0; i--){
            tm = tm +txt1.value[i] ;
            //console.log(txt1.value.charAt(i)) ;
        }
        console.log(tm) ;
        
        //띄어쓰기를 다 없앰
        let txt = txt1.value.replaceAll(' ','');
        //split으로 글자 마다 짜르고 reverse로 뒤집고,
        // join으로 한단어로 만들기
        tm= txt.split('').reverse().join('');
        console.log(tm)

        //문자열 공백 제거
        //회문 확인
        if (txt == tm){
            txt2.value = '회문입니다.'
        }
        else {
            txt2.value = '회문이 아닙니다.'
        }

        //숫자 합계 form으로 묶여있으니까 e 넣기
        bt2.addEventListener('click', (e)=>{
            //form으로 묶여있으니까
            e.preventDefault() ;

            if (txt1.value == ''){
                alert('글자를 입력하세요');
                txt1.focus();
                return;
            }

            let sum = 0;
            for (let c of txt1.value) {
                if(!isNaN(c)) { 
                    //숫자인지 확인 숫자이면 isNaN() 결과는 false
                    sum=sum+parseInt(c);
                }
            }

            txt2.value = sum;
        })
    })
})