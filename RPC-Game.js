const reset=document.querySelector('#reset');
const auto=document.querySelector('#auto-play');
const result=document.querySelector('.display-result');
const moves=document.querySelector('.display-moves');
const score=document.querySelector('.display-score');
const handGameElement=document.querySelectorAll('.game');
let autopalyFlag=false;
let id;
var count;
let temp=localStorage.getItem('values');

auto.addEventListener('click',()=>{
  autoPlay_Loop();
});
handGameElement.forEach((handmove)=>{
  handmove.addEventListener('click',()=>{
    gameRockPaperScissors(handmove.value);
  })
});
reset.addEventListener('click',()=>{
  resetScore();
});

if(temp===null){
  count={
    Wins:0,
    Losses:0,
    Ties:0,
  };
}else{
  count=JSON.parse(temp);
}
updateScore();
function resetScore(){
  count.Wins=0;
  count.Losses=0;
  count.Ties=0;
  localStorage.removeItem('values');
  updateScore();
}
function gameRockPaperScissors(handnum){
  const num=Math.floor(Math.random()*3-1+1);
  let text,text2='You:';
  if(handnum==0){
    if(num==1){
      text='Computer Win';
      count.Losses+=1;
    }else if(num==2){
      text='You win';
      count.Wins+=1;
    }else{
      text='Tie!';
      count.Ties+=1;
    }
  }else if(handnum==1){
    if(num==2){
      text='Computer Win';
      count.Losses+=1;
    }else if(num==0){
      text='You win';
      count.Wins+=1;
    }else{
      text='Tie!';
      count.Ties+=1;
    }
  }else{
    if(num==0){
      text='Computer Win';
      count.Losses+=1;
    }else if(num==1){
      text='You win';
      count.Wins+=1;
    }else{
      text='Tie!';
      count.Ties+=1;
    }
  }
  if(handnum==0) text2+='&#128074';
  else if(handnum==1) text2+='🤚';
  else text2+='✌️';

  if(num==0) text2+='Computer:'+'&#128074;';
  else if(num==1) text2+='Computer:'+'🤚';
  else text2+='Computer:'+'✌️';

  result.innerHTML=text;
  moves.innerHTML=text2;
  updateScore();
}
function updateScore(){
  score.innerHTML=`Wins:${count.Wins},Losses:${count.Losses},Ties:${count.Ties}`;
  temp=JSON.stringify(count);
  localStorage.setItem('values',temp);
}
function autoPlay_Loop(){
  if(!autopalyFlag){
  id=setInterval(
    function(){
      let hand='';
      const p1=Math.floor(Math.random()*3-1+1);
      gameRockPaperScissors(p1);
      autopalyFlag=true;
    },1000);
  }else{
    autopalyFlag=false;
    clearInterval(id);
  }
}