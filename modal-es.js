/* Hand-authored Spanish for decision dialogs; never substitute isolated words. */
(function(){
"use strict";
const es=new URLSearchParams(location.search).get('hubLang')==='es';
const names={
 'VERY HIGH':'MUY ALTA','HIGH':'ALTA','MED–HIGH':'MEDIA-ALTA','LOW':'BAJA','LOWER':'MENOR',
 'MODERATE':'MODERADA','LOW–MOD':'BAJA-MODERADA','MEDIUM':'MEDIA','ELEVATED':'ELEVADA',
 'WEAK':'DÉBIL','STRONG':'SÓLIDO','BALANCED':'EQUILIBRADO','UNCHANGED':'SIN CAMBIOS',
 'PARTIAL':'PARCIAL','READY':'COMPLETO','GAP':'DEFICIENCIA','NONE':'NINGUNO',
 'HIGHER':'MAYOR','WIDE':'AMPLIO','GOOD':'ADECUADO','TIGHT':'AJUSTADO','ACCEPTED':'ACEPTADO',
 'OVER-CONTROL':'EXCESIVO','REVISE':'REVISAR','SHIFTED':'DESPLAZADO'
};
function set(root,sel,val){const e=root.querySelector(sel);if(e&&val!==undefined)e.textContent=val}
function setAll(root,sel,values){[...root.querySelectorAll(sel)].forEach((el,i)=>{if(values[i]!==undefined)el.textContent=values[i]})}
function heading(root,eye,title,lead){set(root,'.eyebrow',eye);set(root,'h2',title);set(root,'.lead',lead)}
function buttons(root,d){for(const [sel,title] of Object.entries(d))set(root,sel,title)}
function badges(root){
 [...root.querySelectorAll('.outcomePill small')].forEach(e=>{
  const map={'Mission readiness':'Disponibilidad operativa','Community exposure':'Exposición de la población','Community noise':'Ruido en la zona residencial','Habitat interaction':'Interacción con el hábitat','Control risk':'Riesgo de control','Cumulative exposure':'Exposición acumulada','Community interaction':'Interacción comunitaria','Adaptive control':'Control adaptativo','Habitat activity':'Actividad de fauna','Community sensitivity':'Sensibilidad de la población','Readiness margin':'Margen operativo','Noise finding':'Conclusión sobre el ruido','Recurrence risk':'Riesgo de repetición','Noise-control quality':'Calidad del control de ruido','Ready evidence':'Evidencias completas','Partial evidence':'Evidencias parciales','Control gaps':'Deficiencias de control','Audit reasoning':'Conclusión de auditoría'};
  e.textContent=map[e.textContent.trim()]||e.textContent;
 });
 [...root.querySelectorAll('.outcomePill strong,.metricLine strong,.mini strong,.m2-compare-card .mini strong')].forEach(e=>{
  e.textContent=names[e.textContent.trim()]||e.textContent;
 });
}
const route=[
 ['Corredor directo','Ruta más rápida, pero pasa muy cerca de la zona residencial.'],
 ['Desvío oriental','Se aleja de los vecinos, pero cruza el humedal y una zona de actividad de aves.'],
 ['Arco de separación','Ruta algo más larga que mantiene mayor distancia tanto de las viviendas como de las zonas de fauna.']
];
const windowData=[
 ['Franja temprana','Permite el mayor margen operativo, pero todavía hay un evento comunitario próximo.'],
 ['Franja intermedia','La actividad comunitaria ha terminado y todavía existe suficiente margen para el relevo.'],
 ['Franja tardía','Aumenta la sensibilidad nocturna de los vecinos y queda poco margen ante imprevistos.']
];
const findingData=[
 ['La queja por ruido era inevitable','La operación era obligatoria, así que habría que aceptar el aumento de las molestias.'],
 ['94,2 dB(A) demuestra un incumplimiento legal','El valor mostrado sería suficiente por sí solo para demostrar que se superó un límite legal.'],
 ['El control de ruido no se volvió a validar antes de la ejecución','Cambió el viento, la operación empezó más tarde y no consta una nueva comprobación antes del inicio.']
];
const actionData=[
 ['Responder a la queja y mantener el procedimiento','No se cambia el control que permitió la exposición.'],
 ['Prohibir todas las actividades nocturnas futuras','Elimina flexibilidad operativa sin demostrar que sea necesario en todos los casos.'],
 ['Comprobación obligatoria del ruido antes de iniciar la actividad','Verificar el viento, la hora real y la sensibilidad de los receptores antes de autorizar la ejecución.']
];
function decision(root){
 const marker=root.querySelector('[data-choose-route],[data-choice],[data-response3],[data-window4],[data-finding5],[data-action5],[data-conclusion6]');
 if(!marker)return false;
 if(marker.hasAttribute('data-choose-route')){
   heading(root,'MISIÓN 02 · DECISIÓN','Ya has visto las tres rutas. ¿Qué equilibrio eliges?','El vuelo debe realizarse. Escoge la ruta que mejor equilibre disponibilidad operativa, molestias a los vecinos e interacción con la fauna.');
   set(root,'.m2-compare-note','No busques una respuesta «verde». Compara lo que protege cada ruta y dónde genera molestias.');
   [...root.querySelectorAll('[data-choose-route]')].forEach((b,i)=>{
     const parent=b.closest('.m2-compare-card');if(!parent)return;
     set(parent,'small','RUTA '+String.fromCharCode(65+i));set(parent,'h3',route[i][0]);set(parent,'p',route[i][1]);
     setAll(parent,'.mini div span',['Disponibilidad operativa','Población','Hábitat']);
     b.textContent='ELEGIR RUTA '+String.fromCharCode(65+i);
   });
   buttons(root,{'#reviewAgain2':'VOLVER A REVISAR LAS RUTAS'});
 }else if(marker.hasAttribute('data-choice')){
   heading(root,'MISIÓN 01 · DECISIÓN','La misma prueba obligatoria de motor. Tres formas de realizarla.','Elige el control operacional que determina cuándo o dónde se realiza la prueba.');
   [...root.querySelectorAll('[data-choice]')].forEach((b,i)=>{
      set(b,'.code','OPCIÓN '+String.fromCharCode(65+i));
      set(b,'h3',['Ejecutar ahora','Retrasar 30 minutos','Trasladar la zona de pruebas'][i]);
      set(b,'p',['Máxima disponibilidad, pero persiste el conflicto de exposición al ruido.','Cambiar el horario permite cumplir el plazo y reducir la exposición prevista.','Disminuye la exposición de los vecinos, pero aumenta la interacción con el hábitat.'][i]);
   });
   buttons(root,{'#confirmDecision1':'UTILIZAR ESTE CONTROL'});
 }else if(marker.hasAttribute('data-response3')){
   heading(root,'MISIÓN 03 · DECISIÓN','El plan aprobado ya no responde a las condiciones actuales del hábitat.','La actividad debe realizarse hoy. Decide cómo responder a la alerta temporal de fauna.');
   set(root,'.m3-compare-note','Nuevo aprendizaje: adaptar un control operacional cuando cambian las condiciones.');
   [...root.querySelectorAll('[data-response3]')].forEach((b,i)=>{
      set(b,'.code','OPCIÓN '+String.fromCharCode(65+i));
      set(b,'h3',['Continuar según lo aprobado','Esperar 25 minutos y reevaluar','Cambiar a la zona alternativa'][i]);
      set(b,'p',['Mantienes el margen operativo máximo, pero aceptas el conflicto activo con la fauna.','Esperas brevemente y compruebas si disminuye la actividad temporal de fauna.','Te alejas de la zona de fauna, pero aumentas la interacción con los vecinos.'][i]);
      setAll(b,'.metricLine span',i===2?['Disponibilidad','Población']:['Disponibilidad','Hábitat']);
   });
   buttons(root,{'#m3Review':'REVISAR LAS ALERTAS','#m3Confirm':'UTILIZAR ESTA RESPUESTA'});
 }else if(marker.hasAttribute('data-window4')){
   heading(root,'MISIÓN 04 · COMPARACIÓN DE HORARIOS','La operación es la misma. Solo cambia la hora de ejecución.','Elige la franja que mejor puedas justificar antes del relevo ficticio de las 00:30.');
   set(root,'.m4-compare-note','Compara el margen operativo, la sensibilidad de los vecinos y la actividad de fauna. Son indicadores relativos de un escenario ficticio, no límites legales.');
   [...root.querySelectorAll('[data-window4]')].forEach((b,i)=>{
      set(b,'.code','FRANJA '+String.fromCharCode(65+i)+' · '+['20:30','22:00','23:30'][i]);
      set(b,'h3',windowData[i][0]);set(b,'p',windowData[i][1]);
      setAll(b,'.metricLine span',['Disponibilidad','Población','Hábitat']);
   });
   buttons(root,{'#m4Review':'REVISAR HORARIOS','#m4Confirm':'UTILIZAR ESTA FRANJA'});
 }else if(marker.hasAttribute('data-finding5')){
   heading(root,'MISIÓN 05 · CONCLUSIÓN SOBRE EL RUIDO','¿Por qué fue mayor de lo previsto la exposición al ruido de los vecinos?','Relaciona cuatro evidencias: medición de ruido, propagación, horario real y registro final del control. Un valor ficticio de dB(A) no demuestra por sí solo un incumplimiento legal.');
   [...root.querySelectorAll('[data-finding5]')].forEach((b,i)=>{
      set(b,'.code','HIPÓTESIS '+String.fromCharCode(65+i));
      set(b,'h3',findingData[i][0]);set(b,'p',findingData[i][1]);
      set(b,'.evidence-strength',i===2?'AJUSTE A LAS EVIDENCIAS · SÓLIDO':'AJUSTE A LAS EVIDENCIAS · BAJO');
   });
   buttons(root,{'#m5ReviewEvidence':'REVISAR EVIDENCIAS','#m5FindingNext':'UTILIZAR ESTA CONCLUSIÓN'});
 }else if(marker.hasAttribute('data-action5')){
   const f=root.querySelector('h2')?.textContent||'';
   heading(root,'MISIÓN 05 · ACCIÓN CORRECTIVA','Conclusión: '+(findingData.find(x=>f.includes('noise control')&&x===findingData[2])?.[0]||'revisar el control del ruido'),'La acción correctiva debe abordar la causa identificada sin impedir innecesariamente la actividad obligatoria.');
   set(root,'.ruleBox','Mejora el control de ruido usando las condiciones meteorológicas y operativas reales. Evita restricciones generales que no se apoyen en las evidencias.');
   [...root.querySelectorAll('[data-action5]')].forEach((b,i)=>{
      set(b,'.code','ACCIÓN '+String.fromCharCode(65+i));
      set(b,'h3',actionData[i][0]);setAll(b,'.metricLine span',['Riesgo de repetición','Disponibilidad','Calidad del control de ruido']);
   });
   buttons(root,{'#m5BackFinding':'VOLVER A LA CONCLUSIÓN','#m5ActionNext':'APLICAR MEDIDA CORRECTIVA'});
 }else if(marker.hasAttribute('data-conclusion6')){
   heading(root,'MISIÓN 06 · AUDITORÍA FINAL','¿Qué puedes concluir realmente a partir de las evidencias?','Una auditoría sólida identifica qué está controlado, qué evidencias existen y qué deficiencias siguen pendientes.');
   set(root,'.ruleBox','Revisa las evidencias de las cinco misiones y elige una conclusión que reconozca los controles y los puntos pendientes de seguimiento.');
   [...root.querySelectorAll('[data-conclusion6]')].forEach((b,i)=>{
      set(b,'.code','CONCLUSIÓN '+String.fromCharCode(65+i));
      set(b,'h3',['Todas las misiones se completaron, por tanto el sistema es eficaz','Los controles son trazables y las deficiencias requieren seguimiento','No hay nuevas quejas visibles, así que la auditoría puede cerrarse'][i]);
      set(b,'p',['Completar las misiones no demuestra, por sí solo, la eficacia de los controles.','Las evidencias muestran controles, seguimiento, adaptación, investigación y acciones correctivas. Los puntos débiles deben mantenerse abiertos.','La ausencia de quejas no demuestra por sí sola que el sistema funcione correctamente.'][i]);
   });
   buttons(root,{'#m6Review':'REVISAR EXPEDIENTES','#m6Confirm':'ENVIAR CONCLUSIÓN DE AUDITORÍA'});
   [...root.querySelectorAll('.m6-summary')].forEach((e,i)=>{set(e,'small','EXPEDIENTE '+String(i+1).padStart(2,'0'))});
 }
 badges(root);
 return true;
}
function localize(root){
 if(!es||!root)return;
 if(decision(root))return;
 const mapTitles={
 'Mission 01 · Quick Intel':['MISIÓN 01 · INFORMACIÓN','La prueba de motor y sus condiciones'],
 'Mission 02 · Quick Intel':['MISIÓN 02 · INFORMACIÓN','Solo necesitas comprender tres aspectos'],
 'Mission 03 · Quick Intel':['MISIÓN 03 · INFORMACIÓN','Cómo interpretar los cambios de fauna'],
 'Mission 04 · Quick Intel':['MISIÓN 04 · INFORMACIÓN','Cómo comparar los horarios'],
 'Mission 05 · Quick Intel':['MISIÓN 05 · INFORMACIÓN','Cómo interpretar las evidencias de ruido'],
 'Mission 06 · Quick Intel':['MISIÓN 06 · INFORMACIÓN','Cómo interpretar las evidencias de auditoría']
 };
 const text=root.querySelector('.eyebrow')?.textContent?.trim()||'';
 if(mapTitles[text]){
   set(root,'.eyebrow',mapTitles[text][0]);
   set(root,'h2',mapTitles[text][1]);
 }
 badges(root);
}
window.localizeGameDialog=localize;
})();