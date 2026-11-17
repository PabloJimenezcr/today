
const items=[
{id:"speed",name:"Rapidez de entrega",desc:"Recibir el pedido en el menor tiempo posible."},
{id:"price",name:"Precios económicos",desc:"Encontrar comida a precios accesibles."},
{id:"variety",name:"Variedad de restaurantes",desc:"Tener muchas opciones y tipos de comida."},
{id:"tracking",name:"Seguimiento del pedido",desc:"Ver dónde está el pedido en tiempo real."},
{id:"deals",name:"Promociones y descuentos",desc:"Acceder a cupones y ofertas."},
{id:"easy",name:"Facilidad de uso",desc:"Encontrar y pedir comida sin complicaciones."},
{id:"payment",name:"Métodos de pago",desc:"Poder pagar con diferentes medios."},
{id:"support",name:"Atención al cliente",desc:"Recibir ayuda si ocurre un problema."}
];
// Cada atributo aparece dos veces en el ejercicio para facilitar la demostración.
const sets=[["speed","price","variety","tracking"],["deals","easy","payment","support"],["speed","deals","easy","payment"],["price","variety","tracking","support"]];
let round=0,best=null,worst=null;
const tally=Object.fromEntries(items.map(x=>[x.id,{best:0,worst:0}]));
const $=id=>document.getElementById(id);
function render(){
 $("round").textContent=`Ronda ${round+1} de ${sets.length}`;
 $("percent").textContent=`${Math.round(round/sets.length*100)}% completado`;
 $("bar").style.width=`${round/sets.length*100}%`;
 $("cards").innerHTML="";
 sets[round].forEach(id=>{
  const x=items.find(i=>i.id===id),state=best===id?"best":worst===id?"worst":"";
  const b=document.createElement("button");b.className=`option ${state}`;
  b.innerHTML=`<span class="tag">${state==="best"?"MÁS IMPORTANTE":state==="worst"?"MENOS IMPORTANTE":""}</span><strong>${x.name}</strong><small>${x.desc}</small>`;
  b.onclick=()=>choose(id);$("cards").appendChild(b);
 });
 $("next").disabled=!(best&&worst);
 $("next").textContent=round===sets.length-1?"Ver resultados":"Siguiente ronda →";
}
function choose(id){
 if(best===id)best=null;
 else if(worst===id)worst=null;
 else if(!best)best=id;
 else if(!worst)worst=id;
 else {best=id;worst=null}
 render();
}
function next(){
 tally[best].best++;tally[worst].worst++;
 if(round<sets.length-1){round++;best=null;worst=null;render()}else results();
}
function results(){
 $("exercise").classList.add("hidden");$("results").classList.remove("hidden");
 $("bar").style.width="100%";$("percent").textContent="100% completado";
 const sorted=items.map(x=>({...x,score:tally[x.id].best-tally[x.id].worst})).sort((a,b)=>b.score-a.score);
 const max=Math.max(1,...sorted.map(x=>Math.abs(x.score)));
 $("ranking").innerHTML=sorted.map((x,i)=>`<div class="rankrow"><b>${i+1}.</b><div class="rankname">${x.name}<small>Más: ${tally[x.id].best} · Menos: ${tally[x.id].worst}</small></div><div class="ranktrack"><div class="rankfill" style="width:${Math.max(5,(x.score+max)/(2*max)*100)}%"></div></div><div class="score">${x.score>0?"+":""}${x.score}</div></div>`).join("");
 $("insight").innerHTML=`En esta simulación, <b>${sorted[0].name}</b> obtuvo la prioridad relativa más alta y <b>${sorted.at(-1).name}</b> la más baja. Es el resultado de una sola persona: para conocer tendencias del público, compara las respuestas de varios participantes.`;
}
function reset(){round=0;best=null;worst=null;items.forEach(x=>{tally[x.id]={best:0,worst:0}});$("exercise").classList.remove("hidden");$("results").classList.add("hidden");render()}
$("next").onclick=next;$("reset").onclick=reset;$("again").onclick=reset;
$("csv").onclick=()=>{const rows=[["Característica","Más importante","Menos importante","Puntaje"]];items.forEach(x=>rows.push([x.name,tally[x.id].best,tally[x.id].worst,tally[x.id].best-tally[x.id].worst]));const csv=rows.map(r=>r.map(v=>`"${String(v).replaceAll('"','""')}"`).join(",")).join("\n");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8"}));a.download="resultados-maxdiff.csv";a.click();URL.revokeObjectURL(a.href)};
render();
