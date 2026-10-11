/* Accessible mission presentation.
   Original map/scenario DOM and its click handlers are moved (not cloned),
   so route selections, mission state and decision callbacks are preserved. */
(function(){
  'use strict';
  const parts={
    2:['.m2-mission-chip','.m2-goal','.m2-terrain','.m2-route-panel','.m2-bottom-simple'],
    3:['.m3-chip','.m3-goal','.m3-map','.m3-status','.m3-timeline'],
    4:['.m4-chip','.m4-goal','.m4-main','.m4-panel','.m4-bottom'],
    5:['.m5-chip','.m5-goal','.m5-main','.m5-status','.m5-bottom'],
    6:['.m6-chip','.m6-goal','.m6-main','.m6-panel','.m6-bottom']
  };
  const missionNames={
    es:{2:'Conflicto de rutas de entrenamiento',3:'Alerta de fauna',4:'Operaciones nocturnas',5:'Investigación de una queja por ruido',6:'Auditoría ambiental final'},
    en:{2:'Training Route Conflict',3:'Migration Alert',4:'Night Operations',5:'Noise Complaint Investigation',6:'Final ISO 14001 Audit'}
  };
  function localized(){return new URLSearchParams(location.search).get('hubLang')==='es'}
  function el(tag,cls,text){const n=document.createElement(tag);n.className=cls||'';if(text!==undefined)n.textContent=text;return n}
  const strings={
    'MISSION 02 · ONE ROUTE AT A TIME':'MISIÓN 02 · UNA RUTA CADA VEZ',
    'MISSION 03 · LIVE CONDITIONS':'MISIÓN 03 · CONDICIONES EN TIEMPO REAL',
    'MISSION 04 · TIME CONTROL':'MISIÓN 04 · CONTROL DEL HORARIO',
    'MISSION 05 · ENVIRONMENTAL NOISE':'MISIÓN 05 · RUIDO AMBIENTAL',
    'MISSION 06 · FINAL AUDIT':'MISIÓN 06 · AUDITORÍA FINAL',
    'TRAINING ROUTE CONFLICT':'CONFLICTO DE RUTAS DE ENTRENAMIENTO',
    'MIGRATION ALERT':'ALERTA DE FAUNA',
    'NIGHT OPERATIONS':'OPERACIONES NOCTURNAS',
    'NOISE COMPLAINT INVESTIGATION':'INVESTIGACIÓN DE UNA QUEJA POR RUIDO',
    'ISO 14001 EVIDENCE REVIEW':'REVISIÓN DE EVIDENCIAS ISO 14001',
    'YOUR TASK':'TU OBJETIVO','ONE TASK':'TU OBJETIVO','WHAT HAPPENS?':'¿QUÉ OCURRE?',
    'Complete the training sortie and choose where the route should pass.':'Realiza el vuelo de entrenamiento obligatorio y decide qué ruta debe seguir.',
    'Review A, B and C one by one. Look for disturbance moved toward the community, wetland or bird corridor.':'Revisa las rutas A, B y C una por una. Comprueba cómo cambia la exposición de los vecinos, el humedal y el corredor de aves.',
    'WHAT DO I DO NOW?':'¿QUÉ DEBO HACER AHORA?','WHAT AM I READING?':'¿QUÉ ESTOY VIENDO?',
    'PREVIOUS ROUTE':'RUTA ANTERIOR','NEXT ROUTE':'SIGUIENTE RUTA','COMPARE A · B · C':'COMPARAR A · B · C',
    'READINESS':'DISPONIBILIDAD','MISSION READINESS':'DISPONIBILIDAD OPERATIVA',
    'COMMUNITY DISTURBANCE':'MOLESTIAS A LA POBLACIÓN','HABITAT DISTURBANCE':'ALTERACIÓN DEL HÁBITAT',
    'COMMUNITY':'POBLACIÓN','WETLAND':'HUMEDAL','BIRD CORRIDOR':'CORREDOR DE AVES','START · BASE':'INICIO · BASE',
    'WATCH:':'ATENCIÓN:','In plain language:':'En otras palabras:',
    'FICTIONAL TRAINING SCENARIO':'ESCENARIO FICTICIO DE ENTRENAMIENTO',
    'Read this route, then go to the next one.':'Lee las consecuencias de esta ruta y pasa a la siguiente.',
    'You have reached the last route.':'Has llegado a la última ruta.',
    'Do not choose yet. The game will show you all three options before asking for a decision.':'Todavía no elijas. Primero debes conocer las tres rutas.',
    'When you are ready, compare A, B and C side by side and choose the trade-off you can justify.':'Compara las rutas y elige el equilibrio que puedas justificar.',
    'VERY HIGH':'MUY ALTA','HIGH':'ALTA','MODERATE':'MODERADA','MED–HIGH':'MEDIA-ALTA','LOW':'BAJA','LOW–MOD':'BAJA-MODERADA','ELEVATED':'ELEVADA',
    'Review the same plan at three moments in time.':'Revisa el mismo plan en tres momentos diferentes.',
    'Use the main button to reveal the next update. Any state you have already seen stays available in the timeline.':'Avanza con el botón principal. Puedes volver a cualquier estado que hayas revisado.',
    'WILDLIFE ACTIVITY':'ACTIVIDAD DE FAUNA','OVERLAP WITH APPROVED PLAN':'SOLAPAMIENTO CON EL PLAN APROBADO',
    'What does this mean?':'¿Qué significa?','PREVIOUS STATE':'ESTADO ANTERIOR','SHOW WILDLIFE ALERT':'MOSTRAR ALERTA DE FAUNA',
    'SHOW CONFLICT':'MOSTRAR CONFLICTO','COMPARE RESPONSES':'COMPARAR RESPUESTAS',
    'LIVE CONDITION TIMELINE · CLICK ANY REVEALED STATE TO REVIEW IT':'EVOLUCIÓN DE LAS CONDICIONES · PULSA UN ESTADO PARA REVISARLO',
    'PLAN APPROVED':'PLAN APROBADO','WILDLIFE ALERT':'ALERTA DE FAUNA','CONFLICT ACTIVE':'CONFLICTO ACTIVO',
    'Habitat activity low.':'Actividad de fauna baja.','Temporary movement increases.':'Aumenta temporalmente la actividad de fauna.',
    'Approved plan overlaps the alert.':'El plan coincide con la zona de alerta.',
    'Complete one mandatory night validation activity before the fictional 00:30 handover.':'Realiza una validación nocturna obligatoria antes del relevo ficticio de las 00:30.',
    'Review three possible time windows. The operation is the same; community sensitivity, habitat activity and readiness margin change with time.':'Compara tres horarios. La operación no cambia, pero sí la sensibilidad de la población, la actividad de fauna y el margen operativo.',
    'CURRENT WINDOW':'FRANJA SELECCIONADA','FICTIONAL HANDOVER':'RELEVO FICTICIO',
    '40 MIN ACTIVITY REQUIRED':'ACTIVIDAD DE 40 MINUTOS','COMMUNITY CONTEXT':'CONTEXTO RESIDENCIAL',
    'Nearby residential receptor':'Zona residencial próxima','HABITAT ACTIVITY':'ACTIVIDAD DEL HÁBITAT',
    'Night habitat interaction':'Interacción nocturna con el hábitat','READINESS MARGIN':'MARGEN OPERATIVO',
    'Time remaining after activity':'Tiempo restante después de la actividad','COMMUNITY SENSITIVITY':'SENSIBILIDAD DE LA POBLACIÓN',
    'PREVIOUS WINDOW':'FRANJA ANTERIOR','SHOW NEXT WINDOW':'MOSTRAR FRANJA SIGUIENTE','COMPARE 3 WINDOWS':'COMPARAR 3 FRANJAS',
    'Read this window, then reveal the next one. Do not choose yet.':'Revisa esta franja y avanza a la siguiente antes de decidir.',
    'You have reviewed all three windows. Compare them before choosing.':'Ya has revisado los tres horarios. Compáralos antes de elegir.',
    'EARLY WINDOW':'FRANJA TEMPRANA','BUFFER WINDOW':'FRANJA INTERMEDIA','LATE WINDOW':'FRANJA TARDÍA',
    'Explain why community noise exposure became worse than expected.':'Averigua por qué la exposición al ruido de los vecinos superó lo previsto.',
    'The activity was mandatory. Investigate what changed in propagation, timing and the final operational noise control.':'La actividad era obligatoria. Investiga qué cambió en la propagación del sonido, el horario y el control aplicado.',
    'NOISE CASE · COMMUNITY RECEPTOR':'CASO DE RUIDO · ZONA RESIDENCIAL',
    '22:18 complaint received':'Queja recibida a las 22:18',
    'The complaint is the trigger for the investigation. Your question is narrower:':'La queja activa la investigación. La pregunta clave es:',
    'why did the actual noise exposure become worse than the planned exposure?':'¿por qué fue mayor la exposición real al ruido que la prevista?',
    'NOISE TRACE':'REGISTRO DE RUIDO','WEATHER / PROPAGATION':'METEOROLOGÍA / PROPAGACIÓN',
    'ACTUAL START TIME':'HORA REAL DE INICIO','FINAL NOISE RECHECK':'COMPROBACIÓN FINAL DEL RUIDO',
    'REVIEWED':'REVISADO','OPEN':'PENDIENTE','PENDING':'PENDIENTE',
    'Read this noise evidence, then reveal the next item.':'Examina esta evidencia y pasa a la siguiente.',
    'You now have the full noise-control story. Build the finding before choosing a corrective action.':'Ya tienes todas las evidencias. Identifica la causa antes de elegir una acción correctiva.',
    'FOLLOW THE NOISE CHAIN':'SIGUE LA SECUENCIA DE EVIDENCIAS',
    'HOW DO I READ THIS?':'¿CÓMO INTERPRETO ESTO?','PREVIOUS EVIDENCE':'EVIDENCIA ANTERIOR',
    'SHOW NEXT EVIDENCE':'MOSTRAR SIGUIENTE EVIDENCIA','BUILD NOISE FINDING':'FORMULAR CONCLUSIÓN',
    'WHAT THIS TELLS YOU':'QUÉ INDICA ESTA EVIDENCIA',
    'Demonstrate that the environmental controls used during the campaign form a traceable management loop.':'Demuestra que los controles ambientales de la campaña forman un ciclo de gestión trazable.',
    'Review one audit file at a time. You are proving evidence and follow-up — not memorising clause numbers.':'Revisa cada expediente. Debes demostrar evidencias y seguimiento, no memorizar apartados de la norma.',
    'AUDIT STATUS · LIVE':'ESTADO DE LA AUDITORÍA','Build the evidence trail':'Construye la trazabilidad',
    'The final mission asks whether the decisions can be explained, traced and improved — not whether every earlier choice was perfect.':'La auditoría comprueba si las decisiones pueden explicarse, documentarse y mejorarse.',
    'READY EVIDENCE':'EVIDENCIAS COMPLETAS','PARTIAL EVIDENCE':'EVIDENCIAS PARCIALES','CONTROL GAPS':'DEFICIENCIAS DE CONTROL',
    'Read this audit file, then open the next one.':'Revisa este expediente y pasa al siguiente.',
    'All five files are visible. Build the final audit case.':'Ya dispones de los cinco expedientes. Prepara la conclusión.',
    'ONE ACTION AT A TIME':'UNA ACCIÓN CADA VEZ','WHAT IS THE AUDITOR LOOKING FOR?':'¿QUÉ BUSCA EL AUDITOR?',
    'PREVIOUS FILE':'EXPEDIENTE ANTERIOR','OPEN NEXT FILE':'ABRIR SIGUIENTE EXPEDIENTE',
    'BUILD AUDIT CASE':'PREPARAR CONCLUSIÓN',
    'AUDITOR QUESTION':'PREGUNTA DEL AUDITOR','Record from your campaign:':'Registro de la campaña:',
    'WHAT MAKES THIS EVIDENCE USEFUL?':'¿POR QUÉ ES ÚTIL ESTA EVIDENCIA?',
    'CAMPAIGN EVIDENCE':'EVIDENCIAS DE LA CAMPAÑA'
  };
  const routeCopy={
   a:{name:'Corredor directo',plain:'Ruta más rápida, pero pasa muy cerca de la zona residencial.',watch:'POBLACIÓN',meaning:'Mantienes un margen operativo alto, pero concentras más molestias cerca de los vecinos.'},
   b:{name:'Desvío oriental',plain:'Se aleja de los vecinos, pero cruza el humedal y una zona de actividad de aves.',watch:'HUMEDAL Y AVES',meaning:'Reduces las molestias a los vecinos, pero trasladas más perturbación hacia el hábitat.'},
   c:{name:'Arco de separación',plain:'Ruta algo más larga, pero aumenta la distancia respecto a los vecinos y las zonas de fauna.',watch:'TIEMPO DE VUELO',meaning:'Reduces la exposición de varios receptores, a costa de un margen operativo menor.'}
  };
  const replacementByMission={
    2(){
      const key=['a','b','c'][Math.max(0,Math.min(2,typeof routeReviewIndex2==='number'?routeReviewIndex2:0))],info=routeCopy[key];
      const stage=document.querySelector('.readableMission');
      const panel=stage?.querySelector('.m2-route-panel');
      if(!panel)return;
      const heading=panel.querySelector('h3');if(heading)heading.textContent=info.name;
      const plain=panel.querySelector('.plain');if(plain)plain.textContent=info.plain;
      const meaning=panel.querySelector('.meaning');if(meaning)meaning.textContent='En otras palabras: '+info.meaning;
      const watch=panel.querySelector('.watch');if(watch)watch.textContent='ATENCIÓN: '+info.watch;
      const label=stage.querySelector('.route-label');if(label)label.textContent='RUTA '+key.toUpperCase()+' · '+info.name.toUpperCase();
    }
  };
  function translateStage(root,mission){
    if(!localized())return;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    for(const node of nodes){
       const txt=node.nodeValue||'',trim=txt.trim();
       if(!trim)continue;
       if(strings[trim]){node.nodeValue=txt.replace(trim,strings[trim]);continue;}
       let translated=txt;
       for(const [en,es] of Object.entries(strings)){
         if(en.length>13 && translated.includes(en))translated=translated.split(en).join(es);
       }
       translated=translated.replace(/\bROUTE (\d+) OF 3\b/g,'RUTA $1 DE 3')
        .replace(/\bROUTE ([ABC])\b/g,'RUTA $1')
        .replace(/\bSTATE (\d+) \/ 3\b/g,'ESTADO $1 DE 3')
        .replace(/\bWINDOW (\d+) OF 3\b/g,'FRANJA $1 DE 3')
        .replace(/\bEVIDENCE (\d+) OF 4\b/g,'EVIDENCIA $1 DE 4')
        .replace(/\bAUDIT FILE (\d+) OF 5\b/g,'EXPEDIENTE $1 DE 5')
        .replace(/\bLOOK ONLY AT\b/g,'OBSERVA SOLO')
        .replace(/\bEVIDENCE ([A-D])\b/g,'EVIDENCIA $1');
       if(translated!==txt)node.nodeValue=translated;
    }
    replacementByMission[mission]?.();
  }
  function build(shell,mission){
    if(!parts[mission])return;
    const root=el('section','readableMission');
    root.setAttribute('aria-label',(localized()?'Misión ':'Mission ')+mission+' – '+missionNames[localized()?'es':'en'][mission]);
    const nav=el('nav','readableNav');
    nav.appendChild(el('strong','',(localized()?'MISIÓN ':'MISSION ')+String(mission).padStart(2,'0')+' / 06'));
    const menus=[
      ['briefing',localized()?'Presentación':'Briefing'],
      ['intel',localized()?'Explicación':'How it works'],
      ['rewards',localized()?'Logros':'Achievements'],
    ];
    for(const [name,label] of menus){
      const btn=el('button','',label);btn.type='button';
      btn.onclick=()=>{const hit=[...shell.querySelectorAll('.hit')].find(e=>e.getAttribute('aria-label')?.toLowerCase()===(name==='intel'?'intel':name));if(hit)hit.click();};
      nav.appendChild(btn);
    }
    root.appendChild(nav);
    for(const selector of parts[mission]){
      const elem=shell.querySelector(':scope > '+selector);
      if(elem)root.appendChild(elem);
    }
    shell.appendChild(root);
    translateStage(root,mission);
  }
  window.buildReadableMission=build;
})();