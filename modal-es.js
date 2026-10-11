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

const spanishBriefings={
 1:{title:'La prueba de motor es obligatoria. Debes evitar molestias innecesarias.',lead:'La prueba debe realizarse. Tu decisión consiste en elegir cómo ejecutarla teniendo en cuenta las condiciones del entorno.',core:[
  ['TU FUNCIÓN','Planificar operaciones en servicio','Debes mantener la disponibilidad operativa.'],
  ['QUÉ DEBE HACERSE','Realizar la prueba de motor','No se puede cancelar la operación.'],
  ['QUÉ DEBES EQUILIBRAR','Disponibilidad y molestias','Considera tanto a los vecinos como al hábitat.']
 ],rule:'Elige la prueba de motor, compara las tres formas de ejecutarla y decide qué medida permite realizarla con menos molestias evitables.',
 steps:[['Selecciona la operación','Comprueba qué prueba es obligatoria.'],['Compara tres opciones','Evalúa ejecutar ahora, retrasar o trasladar.'],['Decide el control','Elige una alternativa y revisa sus consecuencias.']]},
 2:{title:'Un vuelo obligatorio. Tres rutas posibles.',lead:'Debes realizar un vuelo de entrenamiento ficticio. La decisión consiste en elegir la ruta. Las tres permiten completar la misión, pero generan molestias en zonas diferentes.',core:[
  ['QUÉ DEBE HACERSE','Realizar el vuelo de entrenamiento','No puedes cancelarlo.'],
  ['QUÉ PUEDES CAMBIAR','La ruta','A, B o C.'],
  ['QUÉ QUIERES EVITAR','Molestias innecesarias','Considera las viviendas, el humedal y el corredor de aves.']
 ],rule:'Verás primero la ruta A, después la B y finalmente la C. Lee qué protege y a quién afecta cada ruta. Al terminar podrás compararlas y elegir.',
 steps:[['Observa la ruta A','¿Dónde aumenta la exposición?'],['Continúa con la ruta B','¿Se traslada el problema a otro lugar?'],['Revisa la ruta C','¿Qué equilibrio propone?'],['Compara y decide','Elige una opción y justifícala.']]},
 3:{title:'El plan está aprobado, pero las condiciones ambientales cambian.',lead:'Una actividad ficticia ya está programada. El seguimiento ambiental detecta un aumento temporal de movimientos de fauna cerca del corredor previsto.',core:[
  ['QUÉ DEBE HACERSE','Realizar la actividad','La actividad sigue siendo necesaria.'],
  ['QUÉ CAMBIA','Las condiciones de fauna','La nueva información puede modificar el riesgo.'],
  ['QUÉ DEBES DECIDIR','Adaptar o mantener el plan','Compara las respuestas posibles.']
 ],rule:'Revisa el plan aprobado, consulta la alerta y comprueba si existe un conflicto. Después decide si debes adaptar la respuesta operativa.',
 steps:[['Consulta el plan','Identifica las condiciones iniciales.'],['Examina la alerta','Comprueba qué ha cambiado.'],['Comprueba el conflicto','Decide si el plan debe adaptarse.']]},
 4:{title:'La misma actividad obligatoria en distintas franjas horarias.',lead:'Una validación ficticia de 40 minutos debe completarse antes del relevo de las 00:30. Puedes cambiar cuándo se ejecuta, pero no cancelar la actividad.',core:[
  ['QUÉ DEBE HACERSE','Completar la validación nocturna','Cumple el requisito operativo.'],
  ['QUÉ PUEDES CAMBIAR','El horario','Compara tres franjas.'],
  ['QUÉ CAMBIA CON EL TIEMPO','Sensibilidad y margen','La exposición y el margen operativo dependen de la hora.']
 ],rule:'Revisa las tres franjas una a una y compara la disponibilidad operativa con la sensibilidad de la población y la actividad de fauna.',
 steps:[['Revisa la franja A','Consulta sus condiciones.'],['Observa B y C','Comprueba qué cambia con el horario.'],['Compara los horarios','Elige la opción mejor justificada.']]},
 5:{title:'Una actividad obligatoria produjo más ruido del previsto. Averigua por qué.',lead:'Después de una validación nocturna ficticia, a las 22:18 se registra una queja de los vecinos. Debes reconstruir por qué aumentó la exposición real al ruido.',core:[
  ['QUÉ SE HA OBSERVADO','Mayor exposición al ruido','La queja y el indicador acústico desencadenan la investigación.'],
  ['QUÉ HAY QUE EXPLICAR','Diferencia entre lo previsto y lo real','Comprueba el viento, la hora efectiva y el control final.'],
  ['QUÉ DEBES MEJORAR','El control operacional del ruido','Reduce la repetición del problema sin impedir la actividad obligatoria.']
 ],rule:'Revisa cuatro evidencias: registro acústico, meteorología, horario efectivo y comprobación final. Después identifica el fallo y elige una acción correctiva.',
 steps:[['Examina el registro de ruido','¿Qué cambió en la zona residencial?'],['Comprueba la propagación','¿Cambió el viento?'],['Revisa la hora real','¿Se ejecutó cuando estaba previsto?'],['Revisa el control final','¿Se comprobaron las condiciones antes de empezar?']]},
 6:{title:'¿Puedes demostrar que los controles ambientales funcionaron?',lead:'Esta es la misión final. No se trata de memorizar apartados de ISO 14001, sino de demostrar con evidencias cómo se planificaron, aplicaron, supervisaron y mejoraron los controles.',core:[
  ['QUÉ REVISARÁS','Cinco expedientes de evidencia','Recogen decisiones anteriores y sus resultados.'],
  ['QUÉ NECESITA EL AUDITOR','Decisiones trazables','Debe ser posible justificar los controles.'],
  ['QUÉ HACER CON LOS FALLOS','Registrar y dar seguimiento','Las deficiencias deben quedar visibles y corregirse.']
 ],rule:'Revisa los cinco expedientes, reconoce las evidencias incompletas y formula una conclusión que distinga los controles efectivos de los puntos que requieren seguimiento.',
 steps:[['Revisa las evidencias','Lee los registros de cada misión.'],['Evalúa los cambios','Comprueba adaptación y acciones correctivas.'],['Prepara la conclusión','Basándote en datos, no en impresiones.']]}
};
const spanishIntel={
 1:{title:'Comprueba las condiciones antes de decidir',lead:'Necesitas interpretar cuatro señales: viento, nivel relativo de ruido, sensibilidad del hábitat y conflicto con el plan.',facts:[
  ['VIENTO','24 nudos · suroeste','El viento puede aumentar la exposición acústica a sotavento.'],
  ['NIVEL DE RUIDO','88,5–94,2 dB(A) · datos ficticios','Son señales comparativas del juego, no límites legales.'],
  ['SENSIBILIDAD DEL HÁBITAT','Elevada','La actividad puede afectar a zonas sensibles.'],
  ['CONFLICTO DE RUIDO','Detectado','La exposición prevista requiere revisar el plan.']
 ],bottom:'La pregunta es cómo realizar la operación requerida controlando las molestias evitables.'},
 2:{title:'Solo necesitas comprender cuatro aspectos',lead:'No necesitas dominar la planificación aérea. Debes observar hacia dónde desplaza las molestias cada ruta.',facts:[
  ['POBLACIÓN','Personas que viven cerca de la ruta','Una mayor exposición puede provocar más molestias o quejas.'],
  ['HUMEDAL','Hábitat sensible','Alejarse de las viviendas no siempre mejora la situación si se afecta al humedal.'],
  ['CORREDOR DE AVES','Actividad estacional de fauna','También debe tenerse en cuenta al comparar las rutas.'],
  ['DISPONIBILIDAD','Margen operativo','Una ruta más larga puede consumir más tiempo sin impedir la misión.']
 ],bottom:'¿Qué ruta completa la operación necesaria y evita mejor las molestias innecesarias en conjunto?'},
 3:{title:'Una alerta en directo indica que ha cambiado el contexto',lead:'La pregunta es si el plan original sigue siendo adecuado después de recibir nueva información.',facts:[
  ['PLAN APROBADO','Decisión basada en datos anteriores','La aprobación no garantiza que las condiciones permanezcan iguales.'],
  ['ACTIVIDAD DE FAUNA','Aumento temporal de movimientos','Puede surgir un nuevo conflicto durante la actividad.'],
  ['SEÑAL PARA ACTUAR','Se activa el solapamiento','Hay que comprobar si el plan coincide con la nueva zona sensible.'],
  ['CONTROL ADAPTATIVO','Cambiar la respuesta cuando cambian las condiciones','La supervisión debe servir para tomar decisiones.']
 ],bottom:'Una alerta debe provocar una evaluación y, cuando proceda, una adaptación del control operacional.'},
 4:{title:'La sensibilidad nocturna cambia con el horario',lead:'En este escenario ficticio solo necesitas comparar tres indicadores relativos.',facts:[
  ['SENSIBILIDAD DE LOS VECINOS','Cuánto afecta una actividad en cada franja','No todas las horas producen las mismas molestias.'],
  ['ACTIVIDAD DEL HÁBITAT','Nivel de actividad de la fauna','También varía durante la noche.'],
  ['MARGEN OPERATIVO','Tiempo disponible antes del relevo','Un retraso puede reducir la capacidad de recuperación.'],
  ['CONTROL DEL HORARIO','Elegir cuándo, no si se realiza la operación','El objetivo es cumplir la misión con menos molestias evitables.']
 ],bottom:'No hay un horario universalmente mejor: compara el conjunto de condiciones.'},
 5:{title:'Interpreta el cambio de exposición sin inventar un incumplimiento legal',lead:'Necesitas cuatro conceptos para investigar el episodio ficticio de ruido.',facts:[
  ['INDICADOR ACÚSTICO','Muestra que ha cambiado la exposición','Los valores dB(A) permiten comparar el episodio, no establecer por sí solos una infracción.'],
  ['PROPAGACIÓN','El viento determina hacia dónde llega el sonido','Una misma prueba puede generar exposiciones diferentes.'],
  ['HORA REAL DE EJECUCIÓN','Importa cuándo se realiza la actividad','Un retraso puede coincidir con una franja más sensible.'],
  ['CONTROL OPERACIONAL','El plan debe actualizarse a las condiciones reales','Comprobar antes de ejecutar reduce errores evitables.']
 ],bottom:'La conclusión debe basarse en evidencias sobre la propagación, el horario y el control aplicado.'},
 6:{title:'El auditor busca una cadena de evidencias',lead:'En este escenario, revisa el sistema mediante cuatro preguntas sencillas.',facts:[
  ['CONTROL','¿Qué estaba previsto hacer?','Debe existir un control definido.'],
  ['APLICACIÓN','¿Qué se hizo realmente?','La evidencia debe documentar su ejecución.'],
  ['CAMBIOS Y SEGUIMIENTO','¿Qué ocurrió al cambiar las condiciones?','Es necesario comprobar si se adaptó la respuesta.'],
  ['MEJORA','¿Qué sucedió cuando falló un control?','La investigación y la acción correctiva deben quedar registradas.']
 ],bottom:'Una auditoría fiable distingue los resultados demostrados de los aspectos pendientes.'}
};
function localizeSupporting(root){
 const eyebrow=root.querySelector('.eyebrow')?.textContent?.trim()||'';
 const match=eyebrow.match(/Mission\s+0?([1-6])/i);
 const m=match?Number(match[1]):null;
 if(!m)return false;
 const brief=root.querySelectorAll('.coreCard').length>0;
 const intel=root.querySelectorAll('.fact').length>0;
 const data=brief?spanishBriefings[m]:intel?spanishIntel[m]:null;
 if(!data)return false;
 heading(root,'MISIÓN '+String(m).padStart(2,'0')+' · '+(brief?'PRESENTACIÓN':'INFORMACIÓN'),data.title,data.lead);
 if(brief){
  root.querySelectorAll('.coreCard').forEach((card,i)=>{
    const v=data.core[i];if(!v)return;
    set(card,'small',v[0]);set(card,'strong',v[1]);set(card,'span',v[2]);
  });
  set(root,'.ruleBox',data.rule);
  root.querySelectorAll('.plainStep').forEach((step,i)=>{if(data.steps[i]){set(step,'strong',data.steps[i][0]);set(step,'span',data.steps[i][1])}});
 }else{
  root.querySelectorAll('.fact').forEach((fact,i)=>{
   const v=data.facts[i];if(!v)return;
   set(fact,'small',v[0]);set(fact,'strong',v[1]);set(fact,'em',v[2]);
  });
  set(root,'.intelExplain',data.bottom);
 }
 // The existing buttons retain all click handlers; replace labels only.
 const buttons=root.querySelectorAll('.modalActions button');
 buttons.forEach((btn,i)=>{
   btn.textContent=brief
    ? (i===buttons.length-1?'INICIAR MISIÓN':'VER EXPLICACIÓN')
    : 'VOLVER A LA MISIÓN';
 });
 return true;
}

function localize(root){
 if(!es||!root)return;
 if(decision(root))return;
 if(localizeSupporting(root))return;
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