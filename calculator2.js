const number=document.querySelectorAll('.num');
const operator=document.querySelectorAll('.op');
const display=document.querySelector('#display');
const sumbit=document.querySelector('#sumbit');
const remove=document.querySelector('#erase');
const infix=document.querySelector('#infix');
const prefix=document.querySelector('#prefix');
const postfix=document.querySelector('#postfix');
const opbrack=document.getElementById('opbrackect');
const closebrack=document.getElementById('closebracket');
const clear=document.querySelector('.clear');

infix.addEventListener("click",displayInfix);
postfix.addEventListener("click",infixToPostfix);
prefix.addEventListener("click",infixToPrefix);
erase.addEventListener("click",removeOne);
sumbit.addEventListener("click",infixEvaluated);
clear.addEventListener("click",earseALL);

let s=[];
s[0]='';
let exp="";
let idx=0;

function displayInfix(){
   display.innerHTML=displayArray();
}

function displayArray(){
   let disexp="";
   for(let idx=0;idx<s.length;idx++){
      disexp+=s[idx];
   }
   return disexp;
}

function earseALL(){
   idx=0;
   exp='';
   s=[];
   s[0]='';
   display.innerHTML=s;
}

function removeOne(){
   if(s[idx]!=''){
     s[idx]=s[idx].slice(0,s.length);
   }else{
      s[idx-1]='';
      idx-=2;
   }
   display.innerHTML=s;
}

number.forEach((n)=>{
   n.addEventListener('click',()=>{
      s[idx]+=n.innerText;
      console.log(exp);
      display.innerHTML=s+exp;
   });
})

operator.forEach((op)=>{
   op.addEventListener('click',()=>{
      s[idx+1]=op.innerText;
      idx+=2;
      s[idx]='';
      display.innerHTML=s;
   })
})

function checkPrec(op){
   switch (op){
       case '/':
       case '*':return 2;
       case '-':
       case '+':return 1;
   }
   return 0;
}

 function perfOpertion(b, a, op){
   switch (op){
       case '/':return a/b;
       case '*':return a*b;
       case '-':return a-b;
       case '+':return a+b;
   }
   return 0;
}

function infixEvaluated(){
   if(exp!=''){
      s.push(exp);
      exp='';
   }
   let val=[];
   let op=[];
   for(let i=0;i<s.length;i++){
      if(Number.isInteger(Number(s[i]))){
         val.push(Number(s[i]));
      }else if(s[i]==opbrack.textContent){
         op.push(s[i]);
      }else if(s[i]==closebrack.textContent){
         while(op[op.length-1]!=opbrack.textContent){
            val.push(Number(perfOpertion(val.pop(), val.pop(), op.pop())));
         }
         op.pop();
      }else{
         while(op.length!=0&&checkPrec(op[op.length-1])>=checkPrec(s[i])){
            val.push(Number(perfOpertion(val.pop(), val.pop(), op.pop())));
         }
            op.push(s[i]);
      }
   }
   while(op.length!=0){
      val.push(Number(perfOpertion(val.pop(),val.pop(),op.pop())));
      console.log("val array 4:"+val);
   }
     s=[];
     s.push(String(val.pop()));
     idx=0;
     display.innerHTML="Result:"+s; 
}

function infixToPrefix(){
   if(exp!=""){
      s.push(exp);
      exp="";
      }
   var prefixexp="";
   let valexp=[];
   let op=[];
   for(let i=0;i<s.length;i++){
      let x=Number(s[i]);
      if(Number.isNaN(x)==false){
         valexp.push(s[i]);
      }else if(op.length==0||s[i]==opbrack.textContent){
         op.push(s[i]);
      }else if(s[i]==closebrack.textContent){
         while(op[op.length-1]!=opbrack.textContent){
            let v2=valexp.pop();
            let v1=valexp.pop();
            valexp.push(op.pop()+v1+v2);
         }
         op.pop();
      }else{
         while(checkPrec(s[i])<=checkPrec(op[op.length-1])){
            let v2=valexp.pop();
            let v1=valexp.pop();
            valexp.push(op.pop()+v1+v2);
         }
         op.push(s[i]);
      }
   }
   while(op.length!=0){
      let v2=valexp.pop();
      let v1=valexp.pop();
      valexp.push(op.pop()+v1+v2);
   }
   prefixexp=valexp.pop();
   display.innerHTML="Prefix exp:"+prefixexp;
}

function infixToPostfix(){
   if(exp!=""){
      s.push(exp);
      exp="";
      }
   var postfixexp="";
   let valexp=[];
   let op=[];
   for(let i=0;i<s.length;i++){
      let num=Number(s[i]);
      if(Number.isNaN(num)==false){
         valexp.push(s[i]);
      }else if(op.length==0||s[i]==opbrack.textContent){
         op.push(s[i]);
      }else if(s[i]==closebrack.textContent){
         while(op[op.length-1]!=opbrack.textContent){
            let v2=valexp.pop();
            let v1=valexp.pop();
            valexp.push(v1+v2+op.pop());
         }
         op.pop();
      }else{
         while(checkPrec(s[i])<=checkPrec(op[op.length-1])){
            let v2=valexp.pop();
            let v1=valexp.pop();
            valexp.push(v1+v2+op.pop());
         }
         op.push(s[i]);
      }
   }
   while(op.length!=0){
      let v2=valexp.pop();
      let v1=valexp.pop();
      valexp.push(v1+v2+op.pop());
   }
   postfixexp=valexp.pop();
   display.innerHTML="Postfix exp:"+postfixexp;
}


