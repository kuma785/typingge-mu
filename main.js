//htmlの取得
const untyped = document.getElementById('untyped');
const kanji = document.getElementById('kanji');
const typed = document.getElementById('typed');
const timer = document.getElementById('timer');

//テキスト
//テキストリスト
const textList1=[
  'kireinaumi','tanosiikyuujitsu','yuukyuukyuuka','taipinguge-mu'
];
const textList2=[
  'きれいな海','楽しい休日','有給休暇','タイピングゲーム'
];

//変数の宣言
let untypedText = '';
let typedText = '';
let score = 0;
let Missscore = 0;

//ランダムに文章を生成
const textMake = () =>{
  let num = Math.floor(Math.random()*textList1.length);
  untypedText=textList1[num];
  untyped.textContent=untypedText;
  kanji.textContent=textList2[num];
};

 //正誤判定 
const keyPress=()=>{
  addEventListener('keypress',e=> {
    if(e.key===untypedText.substring(0,1)){  
      score++; 
      typedText += untypedText.substring(0,1);
      untypedText = untypedText.substring(1); 
      untyped.textContent = untypedText;
      typed.textContent = typedText;        
    }

    else {
    //  console.log('不正解');
      Missscore++;
      const missadd =()=>{document.getElementById("main").classList.add("misstyped")} ;
      setTimeout(missadd,0);
      const missremove =()=>{ document.getElementById("main").classList.remove("misstyped")};
      setTimeout(missremove,200);
      return; 
    };

    if(untypedText.length===0){ 
      untypedText='';
      typedText='';
      untyped.textContent = untypedText;
      typed.textContent = typedText;
      textMake();
    };  
  });
};



//ゲーム終了
const gemeSet=()=>{
  //作業できないようにする
  //結果表示
  const result=window.confirm(
    'あなたのミスタイプは'+Missscore+'回です。\nあなたの正しいタイプは'+score+'回です',
  ) ;
  if(result==true){
    location.reload();
  }
  else{
  };
  
  
};


//カウントダウンタイマー
let time = timer.textContent; 

const count = () => {
 const tiMer = setInterval(()=>{
  time--;
  timer.textContent = time;

  if(time<=0){
    clearInterval(tiMer);
    //結果表示の関数
    gemeSet();
  }
  },1000); 
};




//ボタン
const botton = document.getElementById('start');
botton.addEventListener('click',() =>{
  textMake();
  count();
  keyPress();
  document.getElementById("start").style.display ="none";
});



