document.addEventListener('DOMContentLoaded',()=>{
    const bt = document.querySelector('#bt') ;
    const sps = document.querySelector('#s1') ;

    
   

    bt.addEventListener('click', ()=>{
        let arr = [];
        while (arr.length<7){
            const n=Math.floor(Math.random() * 45) + 1;
            if (!arr.includes(n)) arr.push(n);
        }
        
        arr.sort((a,b)=>a-b);
        console.log(arr);
        let tm = arr.map(item=>`<span id='sp${Math.floor(item/10)}'>${item}</span> `);
        tm.splice(6,0,'<span id="spp">+</span>');
        sps.innerHTML = tm.join('');
    })
    
});