
const consent=document.getElementById("consent"),accept=document.getElementById("accept"),decline=document.getElementById("decline"),status=document.getElementById("status");
accept.disabled=true;
consent.addEventListener("change",()=>accept.disabled=!consent.checked);
accept.addEventListener("click",()=>{
 const record={decision:"accepted",timestamp:new Date().toISOString(),notice:"Demo educativa de consentimiento"};
 localStorage.setItem("ux-demo-legal-consent",JSON.stringify(record));
 status.className="status ok";
 status.textContent="Consentimiento registrado en este navegador para la demostración. Fecha: "+new Date(record.timestamp).toLocaleString();
 accept.disabled=true;decline.disabled=true;consent.disabled=true;
});
decline.addEventListener("click",()=>{
 const record={decision:"declined",timestamp:new Date().toISOString(),notice:"Demo educativa de consentimiento"};
 localStorage.setItem("ux-demo-legal-consent",JSON.stringify(record));
 status.className="status no";
 status.textContent="Has rechazado participar. En una investigación real, no deberías continuar con la prueba.";
 accept.disabled=true;decline.disabled=true;consent.disabled=true;
});
document.getElementById("showDetails").addEventListener("click",()=>document.getElementById("details").classList.add("open"));
document.getElementById("closeDetails").addEventListener("click",()=>document.getElementById("details").classList.remove("open"));
document.getElementById("clear").addEventListener("click",()=>{
 localStorage.removeItem("ux-demo-legal-consent");status.className="status";status.textContent="";
 consent.checked=false;consent.disabled=false;accept.disabled=true;decline.disabled=false;
});
const prior=localStorage.getItem("ux-demo-legal-consent");
if(prior){const r=JSON.parse(prior);status.className="status "+(r.decision==="accepted"?"ok":"no");status.textContent=`Decisión guardada previamente: ${r.decision==="accepted"?"Aceptó":"Rechazó"} · ${new Date(r.timestamp).toLocaleString()}`;}
