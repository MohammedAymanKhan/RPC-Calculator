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
let exp="";

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
   exp='';
   s=[];
   display.innerHTML=s;
}

function removeOne(){
   if(exp!=''){
      exp=exp.substring(0,exp.length-1);
   }else{
      if(Number.isInteger(s[s.length-1])){
         exp=s.pop();
         exp=exp.substring(0,exp.length-1);
         if(exp!='') s.push(exp);
         exp='';
      }else{
         s.pop();
      }
      console.log(s);
   }
   display.innerHTML=s+exp;
}

number.forEach((n)=>{
   n.addEventListener('click',()=>{
      exp+=n.innerText;
      display.innerHTML=s+exp;
   });
})

operator.forEach((op)=>{
   op.addEventListener('click',()=>{
      if(exp!=''){
          s.push(exp);
          exp='';
      }    
      s.push(op.innerText);
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
       case '/':return (a/b).toFixed(4);
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
      if(Number.isInteger(Number(s[i]))||Number.parseFloat(Number(s[i]))){
         val.push(Number(s[i]));
         console.log(val);
      }else if(s[i]==opbrack.innerText){
         op.push(s[i]);
      }else if(s[i]==closebrack.innerText){
         while(op[op.length-1]!=opbrack.innerText){
            val.push(perfOpertion(val.pop(), val.pop(), op.pop()));
         }
         op.pop();
      }else{
         while(op.length!=0&&checkPrec(op[op.length-1])>=checkPrec(s[i])){
            val.push(perfOpertion(val.pop(), val.pop(), op.pop()));
         }
            op.push(s[i]);
      }
   }
   while(op.length!=0){
      val.push(perfOpertion(val.pop(),val.pop(),op.pop()));
      console.log("val array 4:"+val);
   }
   s=[];
   if(val[0]!=0)s.push(String(val.pop()));
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
      }else if(op.length==0||s[i]==opbrack.innerText){
         op.push(s[i]);
      }else if(s[i]==closebrack.innerText){
         while(op[op.length-1]!=opbrack.innerText){
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
      if(Number.isInteger(Number(s[i]))||Number.parseFloat(Number(s[i]))){
         valexp.push(s[i]);
      }else if(op.length==0||s[i]==opbrack.innerText){
         op.push(s[i]);
      }else if(s[i]==closebrack.innerText){
         while(op[op.length-1]!=opbrack.innerText){
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


