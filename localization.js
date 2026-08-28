(function () {
  "use strict";

  const params = new URLSearchParams(location.search);
  const language = params.get("hubLang") === "es" ? "es" : "en";
  const exact = new Map([
    ["Noise & Habitat — Missions 01–06 · Course Edition", "Ruido y hábitat — Misiones 01–06 · Edición curso"],
    ["Noise & Habitat · Campaign Briefing", "Ruido y hábitat · Briefing de campaña"],
    ["Campaign briefing · Before Mission 01", "Briefing de campaña · Antes de la Misión 01"],
    ["What are you actually doing in this game?", "¿Qué vas a hacer realmente en este curso?"],
    ["You are the In-Service Operations Planner for a fictional air-base scenario. Across six missions, required activities create different interactions with environmental noise, nearby communities and sensitive habitat. Your job is to understand the situation, compare realistic control choices and see what each decision changes.", "Eres responsable de planificación de operaciones en servicio en un escenario ficticio de base aérea. A lo largo de seis misiones, distintas actividades necesarias interactúan con el ruido ambiental, las comunidades cercanas y hábitats sensibles. Tu trabajo consiste en comprender la situación, comparar controles realistas y observar qué cambia con cada decisión."],
    ["Campaign objective", "Objetivo de la campaña"],
    ["You are the In-Service Operations Planner for a", "Eres responsable de planificación de operaciones en servicio en un"],
    ["fictional air-base scenario", "escenario ficticio de base aérea"],
    [". Across six missions, required activities create different interactions with environmental noise, nearby communities and sensitive habitat. Your job is to understand the situation, compare realistic control choices and see what each decision changes.", ". A lo largo de seis misiones, distintas actividades necesarias interactúan con el ruido ambiental, las comunidades cercanas y hábitats sensibles. Tu trabajo consiste en comprender la situación, comparar controles realistas y observar qué cambia con cada decisión."],
    ["Maintain operational readiness while identifying and controlling avoidable environmental disturbance.", "Mantener la disponibilidad operativa identificando y controlando las molestias ambientales evitables."],
    ["Connected missions", "Misiones conectadas"], ["How you play", "Cómo se desarrolla"],
    ["Same logic throughout the campaign", "La misma lógica durante toda la campaña"],
    ["Read the situation", "Analiza la situación"],
    ["ARIA and the screen tell you what is mandatory and what has changed.", "ARIA y la pantalla indican qué es obligatorio y qué ha cambiado."],
    ["Compare controls", "Compara controles"],
    ["Timing, location, route, monitoring or corrective action may change the outcome.", "El momento, la ubicación, la ruta, el seguimiento o la acción correctiva pueden cambiar el resultado."],
    ["Make the decision", "Toma la decisión"],
    ["Choose the trade-off you can justify. Readiness remains part of the problem.", "Elige la compensación que puedas justificar. La disponibilidad sigue siendo parte del problema."],
    ["Learn from the result", "Aprende del resultado"],
    ["After each mission you unlock a short theory class explaining the concept behind it.", "Tras cada misión desbloquearás una breve clase teórica que explica el concepto aplicado."],
    ["Your six missions", "Tus seis misiones"], ["Read this once now · revisit from Help if needed", "Léelo ahora · puedes volver desde Ayuda"],
    ["THE THREAD THAT CONNECTS THE CAMPAIGN", "EL HILO QUE CONECTA LA CAMPAÑA"],
    ["PLAN → CONTROL → MONITOR → ADAPT → INVESTIGATE → CORRECT → VERIFY", "PLANIFICAR → CONTROLAR → SUPERVISAR → ADAPTAR → INVESTIGAR → CORREGIR → VERIFICAR"],
    ["The missions gradually build this management loop. You do not need prior knowledge of acoustics, ecology or ISO 14001; the game introduces each concept when it becomes relevant.", "Las misiones construyen gradualmente este ciclo de gestión. No necesitas conocimientos previos de acústica, ecología o ISO 14001; el curso introduce cada concepto cuando resulta pertinente."],
    ["Campaign orientation · 0 / 6 missions complete", "Orientación de campaña · 0 / 6 misiones completadas"],
    ["← Back to cover", "← Volver a la portada"], ["Start Mission 01 →", "Iniciar Misión 01 →"],
    ["Engine Test Window", "Ventana para prueba de motor"], ["Operational noise control", "Control operacional del ruido"],
    ["Training Route Conflict", "Conflicto de ruta de entrenamiento"], ["Spatial planning", "Planificación espacial"],
    ["Migration Alert", "Alerta de migración"], ["Adaptive environmental control", "Control ambiental adaptativo"],
    ["Night Operations", "Operaciones nocturnas"], ["Time-window control", "Control de franja horaria"],
    ["Noise Complaint Investigation", "Investigación de queja por ruido"], ["Noise investigation + corrective action", "Investigación de ruido + acción correctiva"],
    ["Final ISO 14001 Audit", "Auditoría ISO 14001 final"], ["Evidence + continual improvement", "Evidencia + mejora continua"],
    ["A mandatory engine test must be completed while wind, community exposure and habitat interaction create a conflict.", "Debe completarse una prueba de motor obligatoria mientras el viento, la exposición comunitaria y la interacción con el hábitat crean un conflicto."],
    ["Compare how the same test changes if you run it now, delay it or move the test area.", "Compara cómo cambia la misma prueba si la ejecutas ahora, la retrasas o trasladas la zona de prueba."],
    ["A required fictional training sortie can follow different corridors, each affecting sensitive receptors differently.", "Una salida de entrenamiento ficticia obligatoria puede seguir distintos corredores, cada uno con efectos diferentes sobre receptores sensibles."],
    ["Review three routes and choose without simply moving disturbance from the community to habitat.", "Revisa tres rutas y elige sin limitarte a trasladar las molestias de la comunidad al hábitat."],
    ["A plan was already approved, but live wildlife conditions change before the activity takes place.", "El plan ya estaba aprobado, pero las condiciones de la fauna cambian antes de realizar la actividad."],
    ["Follow the updates, identify the trigger point and adapt the response when the original plan no longer fits the conditions.", "Sigue las actualizaciones, identifica el punto de activación y adapta la respuesta cuando el plan original ya no se ajusta a las condiciones."],
    ["The same required night activity can occur in three windows with different community sensitivity, habitat activity and readiness margin.", "La misma actividad nocturna obligatoria puede realizarse en tres franjas con distinta sensibilidad comunitaria, actividad del hábitat y margen de disponibilidad."],
    ["Compare the windows and use timing as an environmental operational control.", "Compara las franjas y utiliza el momento como control operacional ambiental."],
    ["Community-side noise exposure is higher than expected after an operation has already occurred.", "La exposición al ruido en la comunidad supera lo previsto después de realizarse la operación."],
    ["Use the noise trace, weather, actual timing and control log to identify why the noise control failed and how to prevent recurrence.", "Utiliza la traza de ruido, la meteorología, el horario real y el registro de control para identificar por qué falló el control de ruido y cómo evitar su repetición."],
    ["The final mission asks whether the previous decisions form a traceable environmental management loop.", "La misión final comprueba si las decisiones anteriores forman un ciclo trazable de gestión ambiental."],
    ["Review evidence from Missions 01–05, identify strengths and gaps, and build a defensible audit conclusion.", "Revisa la evidencia de las Misiones 01–05, identifica fortalezas y carencias y construye una conclusión de auditoría defendible."],
    ["What you do:", "Qué haces:"], ["Mission completed", "Misión completada"], ["Learning debrief", "Debrief de aprendizaje"],
    ["Core theory", "Teoría esencial"], ["Read before continuing", "Lee antes de continuar"],
    ["How this connects to the mission:", "Cómo se relaciona con la misión:"], ["KEY TAKEAWAY", "IDEA CLAVE"],
    ["← Mission result", "← Resultado de la misión"], ["Complete campaign →", "Completar campaña →"],
    ["OPEN THEORY CLASS →", "ABRIR CLASE TEÓRICA →"],
    ["Environmental noise and operational control", "Ruido ambiental y control operacional"],
    ["Why the same required activity can create different consequences", "Por qué una misma actividad necesaria puede producir consecuencias distintas"],
    ["Spatial planning, sensitive receptors and habitat interaction", "Planificación espacial, receptores sensibles e interacción con el hábitat"],
    ["Moving an operation is useful only when the overall interaction is understood", "Desplazar una operación solo es útil si se comprende la interacción global"],
    ["Adaptive management and changing habitat conditions", "Gestión adaptativa y cambios en las condiciones del hábitat"],
    ["Why an approved plan may need to change when the environment changes", "Por qué un plan aprobado puede necesitar cambios cuando cambia el entorno"],
    ["Night-time noise, sensitivity and scheduling control", "Ruido nocturno, sensibilidad y control de programación"],
    ["How timing can change the consequence of the same operation", "Cómo el momento puede cambiar la consecuencia de una misma operación"],
    ["Environmental noise investigation and corrective action", "Investigación del ruido ambiental y acción correctiva"],
    ["From complaint to evidence, cause and prevention", "De la queja a la evidencia, la causa y la prevención"],
    ["Environmental Management System audits and ISO 14001 logic", "Auditorías del sistema de gestión ambiental y lógica de ISO 14001"],
    ["What an audit is really trying to establish", "Qué pretende establecer realmente una auditoría"],
    ["CORE CONCEPT", "CONCEPTO ESENCIAL"], ["READING THE SIGNAL", "INTERPRETAR LA SEÑAL"],
    ["OPERATIONAL CONTROL", "CONTROL OPERACIONAL"], ["MANAGEMENT SYSTEM LINK", "VÍNCULO CON EL SISTEMA DE GESTIÓN"],
    ["SPATIAL THINKING", "PENSAMIENTO ESPACIAL"], ["IMPACT TRANSFER", "TRANSFERENCIA DE IMPACTOS"],
    ["HABITAT CONTEXT", "CONTEXTO DEL HÁBITAT"], ["CUMULATIVE VIEW", "VISIÓN ACUMULATIVA"],
    ["DYNAMIC CONDITIONS", "CONDICIONES DINÁMICAS"], ["MONITORING", "SEGUIMIENTO"], ["TRIGGER POINTS", "PUNTOS DE ACTIVACIÓN"],
    ["ADAPTIVE CONTROL", "CONTROL ADAPTATIVO"], ["TIME MATTERS", "EL MOMENTO IMPORTA"],
    ["READINESS MARGIN", "MARGEN DE DISPONIBILIDAD"], ["HABITAT AT NIGHT", "HÁBITAT NOCTURNO"],
    ["SCHEDULING AS CONTROL", "LA PROGRAMACIÓN COMO CONTROL"], ["COMPLAINT ≠ CONCLUSION", "QUEJA ≠ CONCLUSIÓN"],
    ["SOURCE–PATH–RECEPTOR", "FUENTE–VÍA–RECEPTOR"], ["ROOT CAUSE", "CAUSA RAÍZ"], ["CORRECTIVE ACTION", "ACCIÓN CORRECTIVA"],
    ["PURPOSE OF AN AUDIT", "FINALIDAD DE UNA AUDITORÍA"], ["AUDIT TRAIL", "TRAZA DE AUDITORÍA"], ["FINDINGS", "HALLAZGOS"],
    ["ISO 14001 MANAGEMENT LOOP", "CICLO DE GESTIÓN ISO 14001"], ["AUDITOR MINDSET", "ENFOQUE DEL AUDITOR"],
    ["LIMIT OF THIS SIMULATION", "LÍMITE DE ESTA SIMULACIÓN"], ["Mission navigation", "Navegación de misiones"],
    ["← Back", "← Atrás"], ["↻ Restart", "↻ Reiniciar"], ["⌂ Home", "⌂ Inicio"], ["? Help", "? Ayuda"],
    ["How to play", "Cómo se desarrolla"], ["Close", "Cerrar"], ["Open ARIA guide", "Abrir guía ARIA"],
    ["Hide mission guide", "Ocultar guía de misión"], ["ARIA mission guide", "ARIA, guía de misión"],
    ["LISTEN", "ESCUCHAR"], ["BACK", "ATRÁS"], ["GOT IT", "ENTENDIDO"], ["NEXT", "SIGUIENTE"],
    ["Loading tactical data…", "Cargando datos tácticos…"],
    ["Preparing the mission display before guidance appears", "Preparando la pantalla de misión antes de mostrar la guía"],
    ["Mission 01 · Before you start", "Misión 01 · Antes de empezar"],
    ["Your job: complete the engine test without creating an avoidable conflict.", "Tu tarea: completar la prueba de motor sin crear un conflicto evitable."],
    ["The engine test has to happen. You are deciding how to run it under the conditions around the base.", "La prueba de motor debe realizarse. Tú decides cómo ejecutarla bajo las condiciones existentes alrededor de la base."],
    ["The engine test has to happen. You are deciding", "La prueba de motor debe realizarse. Tú decides"],
    ["how to run it", "cómo ejecutarla"], ["under the conditions around the base.", "bajo las condiciones existentes alrededor de la base."],
    ["Start campaign briefing", "Iniciar briefing de campaña"],
    ["WHO YOU ARE", "QUIÉN ERES"], ["In-Service Operations Planner", "Responsable de planificación de operaciones en servicio"],
    ["You plan required activities at a fictional air base.", "Planificas actividades necesarias en una base aérea ficticia."],
    ["WHAT MUST HAPPEN", "QUÉ DEBE OCURRIR"], ["Complete the engine test", "Completar la prueba de motor"],
    ["Two aircraft need testing before tomorrow's operational window.", "Dos aeronaves necesitan pruebas antes de la ventana operativa de mañana."],
    ["WHAT YOU BALANCE", "QUÉ DEBES EQUILIBRAR"], ["Readiness + disturbance", "Disponibilidad + molestias"],
    ["Keep aircraft ready while controlling noise, community and habitat interaction.", "Mantén las aeronaves disponibles controlando el ruido y la interacción con la comunidad y el hábitat."],
    ["Choose the required operation", "Elige la operación necesaria"], ["Start with the Ground Run engine test.", "Empieza por la prueba de motor en tierra."],
    ["Compare 3 ways to execute it", "Compara 3 formas de ejecutarla"], ["Run now, delay 30 minutes or move test area.", "Ejecuta ahora, retrasa 30 minutos o traslada la zona de prueba."],
    ["See what your choice causes", "Observa qué provoca tu elección"], ["Readiness, community and habitat respond differently.", "La disponibilidad, la comunidad y el hábitat responden de forma distinta."],
    ["WHAT DO THE INDICATORS MEAN?", "¿QUÉ SIGNIFICAN LOS INDICADORES?"], ["START PLANNING", "EMPEZAR A PLANIFICAR"],
    ["Environmental Intel · Mission 01", "Información ambiental · Misión 01"], ["Read the situation before acting", "Analiza la situación antes de actuar"],
    ["Read four signals only: wind, relative dB level, habitat stress and whether the current plan creates a conflict.", "Interpreta solo cuatro señales: viento, nivel relativo de dB, presión sobre el hábitat y si el plan actual crea un conflicto."],
    ["Wind", "Viento"], ["Downwind receptors can receive higher exposure.", "Los receptores a sotavento pueden recibir mayor exposición."],
    ["dB level", "Nivel de dB"], ["A relative game signal, not a real-world limit.", "Una señal relativa del ejercicio, no un límite real."],
    ["Habitat stress", "Presión sobre el hábitat"], ["Elevated", "Elevada"], ["Potential disturbance interaction.", "Posible interacción perturbadora."],
    ["Noise conflict", "Conflicto de ruido"], ["Detected", "Detectado"], ["The plan deserves an operational control.", "El plan requiere un control operacional."],
    ["BACK TO MAP", "VOLVER AL MAPA"], ["Mission 01 · Decision Point", "Misión 01 · Punto de decisión"],
    ["Same mandatory engine test. Three ways to execute it.", "La misma prueba de motor obligatoria. Tres formas de ejecutarla."],
    ["Choose the operational control that determines when or where the test happens.", "Elige el control operacional que determina cuándo o dónde se realiza la prueba."],
    ["OPTION A", "OPCIÓN A"], ["OPTION B", "OPCIÓN B"], ["OPTION C", "OPCIÓN C"],
    ["Run now", "Ejecutar ahora"], ["Delay 30 min", "Retrasar 30 min"], ["Move test area", "Trasladar la zona de prueba"],
    ["USE THIS CONTROL", "USAR ESTE CONTROL"], ["What happened?", "¿Qué ocurrió?"], ["WHY?", "¿POR QUÉ?"],
    ["Sustainability insight unlocked", "Aprendizaje de sostenibilidad desbloqueado"], ["FINISH MISSION 01", "FINALIZAR MISIÓN 01"],
    ["Mission readiness", "Disponibilidad de misión"], ["Community noise", "Ruido comunitario"],
    ["Habitat interaction", "Interacción con el hábitat"], ["Control risk", "Riesgo del control"],
    ["Map", "Mapa"], ["Briefing", "Briefing"], ["Intel", "Información"], ["Rewards", "Logros"],
    ["Deploy squad", "Desplegar equipo"], ["OPS GUIDE", "GUÍA OPERATIVA"], ["Mission rewards", "Logros de misión"],
    ["Choose the operational control that determines", "Elige el control operacional que determina"],
    ["when or where", "cuándo o dónde"], ["the test happens.", "se realiza la prueba."],
    ["Maximum readiness, but current exposure conflict remains.", "Máxima disponibilidad, pero se mantiene el conflicto de exposición actual."],
    ["Timing control: retain the deadline with lower predicted exposure.", "Control temporal: conserva el plazo con una exposición prevista menor."],
    ["Community exposure falls, but habitat interaction increases.", "La exposición comunitaria disminuye, pero aumenta la interacción con el hábitat."],
    ["Start here: this is the operation you must plan.", "Empieza aquí: esta es la operación que debes planificar."],
    ["This screen is your planning desk.", "Esta pantalla es tu mesa de planificación."],
    ["I'm your mission guide.", "Soy tu guía de misión."],
    ["Mission 01 asks you to plan one mandatory operation: the", "La Misión 01 te pide planificar una operación obligatoria: la"],
    ["engine test.", "prueba de motor."], ["ARIA · OPS GUIDE · ORIENTATION 1/4", "ARIA · GUÍA OPERATIVA · ORIENTACIÓN 1/4"],
    ["ACTIVE CONDITIONS", "CONDICIONES ACTIVAS"], ["NOISE CONFLICT", "CONFLICTO DE RUIDO"],
    ["TACTICAL TIMELINE", "CRONOLOGÍA TÁCTICA"], ["R-01 community", "comunidad R-01"],
    ["H-02 wetland corridor", "corredor de humedal H-02"], ["SELECT GROUND RUN", "SELECCIONAR PRUEBA EN TIERRA"],
    ["COMPARE 3 OPTIONS", "COMPARAR 3 OPCIONES"], ["OPEN THEORY CLASS", "ABRIR CLASE TEÓRICA"],
    ["START WITH ROUTE A", "EMPEZAR POR LA RUTA A"], ["START WITH PLAN APPROVED", "EMPEZAR POR EL PLAN APROBADO"],
    ["START WITH WINDOW A", "EMPEZAR POR LA FRANJA A"], ["START WITH NOISE TRACE", "EMPEZAR POR LA TRAZA DE RUIDO"],
    ["OPEN AUDIT FILE 1", "ABRIR ARCHIVO DE AUDITORÍA 1"],
    ["ARIA · OPS GUIDE · MISSION 01 DEBRIEF", "ARIA · GUÍA OPERATIVA · DEBRIEF DE MISIÓN 01"],
    ["ARIA · OPS GUIDE · MISSION 02 DEBRIEF", "ARIA · GUÍA OPERATIVA · DEBRIEF DE MISIÓN 02"],
    ["ARIA · OPS GUIDE · MISSION 03 DEBRIEF", "ARIA · GUÍA OPERATIVA · DEBRIEF DE MISIÓN 03"],
    ["ARIA · OPS GUIDE · MISSION 04 DEBRIEF", "ARIA · GUÍA OPERATIVA · DEBRIEF DE MISIÓN 04"],
    ["ARIA · OPS GUIDE · MISSION 05 DEBRIEF", "ARIA · GUÍA OPERATIVA · DEBRIEF DE MISIÓN 05"],
    ["ARIA · OPS GUIDE · FINAL MISSION", "ARIA · GUÍA OPERATIVA · MISIÓN FINAL"],
    ["ARIA · OPS GUIDE · CAMPAIGN COMPLETE", "ARIA · GUÍA OPERATIVA · CAMPAÑA COMPLETADA"],
    ["The training sortie must happen.", "La salida de entrenamiento debe realizarse."],
    ["spatial planning", "planificación espacial"], ["adaptive control", "control adaptativo"],
    ["time-window control", "control de franja horaria"], ["environmental noise.", "ruido ambiental."],
    ["adaptive noise control", "control adaptativo del ruido"],
    ["You are not being tested on ISO clause numbers.", "No se evalúa tu memoria de las cláusulas ISO."],
    ["plan → control → monitor → adapt → investigate → improve → demonstrate evidence.", "planificar → controlar → supervisar → adaptar → investigar → mejorar → demostrar evidencia."],
    ["Mission 01 · What your decision caused", "Misión 01 · Consecuencias de tu decisión"],
    ["ELEVATED", "ELEVADA"], ["MISSION ACHIEVED · CONTROL WEAK", "MISIÓN CUMPLIDA · CONTROL DÉBIL"],
    ["You completed the mandatory test immediately. Readiness is maximised, but the known wind condition still directs more noise toward sensitive receptors.", "Completaste inmediatamente la prueba obligatoria. La disponibilidad es máxima, pero la condición de viento conocida sigue dirigiendo más ruido hacia receptores sensibles."],
    ["Nothing about the operation was adjusted. The aircraft requirement is met, but the avoidable exposure remains.", "No se ajustó ningún aspecto de la operación. Se cumple el requisito de la aeronave, pero permanece la exposición evitable."],
    ["Completing the task is not the same as controlling its environmental interaction.", "Completar la tarea no equivale a controlar su interacción ambiental."],
    ["Timing, location, weather and receptor sensitivity can change the consequence of the same required operation.", "El momento, la ubicación, la meteorología y la sensibilidad del receptor pueden cambiar las consecuencias de una misma operación necesaria."],
    ["TRAINING ROUTE CONFLICT", "CONFLICTO DE RUTA DE ENTRENAMIENTO"], ["YOUR TASK", "TU TAREA"],
    ["COMMUNITY", "COMUNIDAD"], ["WETLAND", "HUMEDAL"], ["BIRD CORRIDOR", "CORREDOR DE AVES"],
    ["COMMUNITY DISTURBANCE", "MOLESTIA COMUNITARIA"], ["HABITAT DISTURBANCE", "ALTERACIÓN DEL HÁBITAT"],
    ["START ROUTE REVIEW", "INICIAR REVISIÓN DE RUTAS"], ["REVIEW ROUTES AGAIN", "REVISAR DE NUEVO LAS RUTAS"],
    ["FINISH MISSION 02", "FINALIZAR MISIÓN 02"], ["MIGRATION ALERT", "ALERTA DE MIGRACIÓN"],
    ["WILDLIFE ACTIVITY", "ACTIVIDAD DE FAUNA"], ["OVERLAP WITH APPROVED PLAN", "SOLAPAMIENTO CON EL PLAN APROBADO"],
    ["PLAN APPROVED", "PLAN APROBADO"], ["WILDLIFE ALERT", "ALERTA DE FAUNA"], ["CONFLICT ACTIVE", "CONFLICTO ACTIVO"],
    ["Continue as approved", "Continuar según lo aprobado"], ["Hold 25 min and reassess", "Esperar 25 min y reevaluar"],
    ["Switch to backup zone", "Cambiar a la zona alternativa"], ["REVIEW LIVE UPDATES", "REVISAR ACTUALIZACIONES"],
    ["USE THIS RESPONSE", "USAR ESTA RESPUESTA"], ["FINISH MISSION 03", "FINALIZAR MISIÓN 03"],
    ["START LIVE MONITORING", "INICIAR SEGUIMIENTO EN VIVO"], ["NIGHT OPERATIONS", "OPERACIONES NOCTURNAS"],
    ["CURRENT WINDOW", "FRANJA ACTUAL"], ["COMMUNITY SENSITIVITY", "SENSIBILIDAD COMUNITARIA"],
    ["REVIEW WINDOWS", "REVISAR FRANJAS"], ["USE THIS WINDOW", "USAR ESTA FRANJA"],
    ["FINISH MISSION 04", "FINALIZAR MISIÓN 04"], ["START WINDOW REVIEW", "INICIAR REVISIÓN DE FRANJAS"],
    ["NOISE COMPLAINT INVESTIGATION", "INVESTIGACIÓN DE QUEJA POR RUIDO"], ["NOISE TRACE", "TRAZA DE RUIDO"],
    ["WEATHER / PROPAGATION", "METEOROLOGÍA / PROPAGACIÓN"], ["ACTUAL START TIME", "HORA REAL DE INICIO"],
    ["FINAL NOISE RECHECK", "COMPROBACIÓN FINAL DE RUIDO"], ["REVIEW NOISE EVIDENCE", "REVISAR EVIDENCIA DE RUIDO"],
    ["USE THIS FINDING", "USAR ESTE HALLAZGO"], ["APPLY NOISE CONTROL", "APLICAR CONTROL DE RUIDO"],
    ["FINISH MISSION 05", "FINALIZAR MISIÓN 05"], ["START NOISE INVESTIGATION", "INICIAR INVESTIGACIÓN DE RUIDO"],
    ["ISO 14001 EVIDENCE REVIEW", "REVISIÓN DE EVIDENCIA ISO 14001"], ["AUDITOR QUESTION", "PREGUNTA DEL AUDITOR"],
    ["READY EVIDENCE", "EVIDENCIA LISTA"], ["PARTIAL EVIDENCE", "EVIDENCIA PARCIAL"], ["CONTROL GAPS", "CARENCIAS DE CONTROL"],
    ["START FINAL AUDIT", "INICIAR AUDITORÍA FINAL"], ["BACK TO AUDIT FILES", "VOLVER A LOS ARCHIVOS DE AUDITORÍA"],
    ["REVIEW AUDIT FILES", "REVISAR ARCHIVOS DE AUDITORÍA"], ["SUBMIT AUDIT CONCLUSION", "ENVIAR CONCLUSIÓN DE AUDITORÍA"],
    ["MISSION 06 COMPLETE", "MISIÓN 06 COMPLETADA"], ["CAMPAIGN COMPLETE", "CAMPAÑA COMPLETADA"],
    ["MISSION ACCOMPLISHED", "MISIÓN CUMPLIDA"], ["COURSE LEARNING PATH COMPLETED", "RECORRIDO FORMATIVO DEL CURSO COMPLETADO"],
    ["OPEN CAMPAIGN REWARDS", "ABRIR LOGROS DE CAMPAÑA"], ["VIEW COMPLETION CERTIFICATE", "VER REGISTRO DE FINALIZACIÓN"],
    ["Certificate of completion", "Registro de finalización"], ["course certificate", "registro del curso"],
    ["CLOSE CAMPAIGN", "CERRAR CAMPAÑA"], ["BACK TO MISSION", "VOLVER A LA MISIÓN"],
    ["HIGH", "ALTA"], ["LOW", "BAJA"], ["MODERATE", "MODERADA"], ["VERY HIGH", "MUY ALTA"],
    ["READY", "LISTA"], ["PARTIAL", "PARCIAL"], ["GAP", "CARENCIA"]
  ]);

  [
    ["5–7 min theory class", "clase teórica de 5–7 min"], ["6–8 min theory class", "clase teórica de 6–8 min"], ["7–10 min theory class", "clase teórica de 7–10 min"],
    [". This class converts the decision you just made into the environmental-management concept behind the mission.", ". Esta clase convierte la decisión que acabas de tomar en el concepto de gestión ambiental que sustenta la misión."],
    ["Noise is source + path + receptor", "El ruido es fuente + vía + receptor"],
    ["Environmental noise is not defined by the source alone. The consequence depends on what produces the sound, how it propagates through the environment and who or what receives it. Weather, distance, barriers, terrain and operating conditions can all change the exposure at a receptor.", "El ruido ambiental no está definido únicamente por la fuente. La consecuencia depende de qué produce el sonido, cómo se propaga por el entorno y quién o qué lo recibe. La meteorología, la distancia, las barreras, el terreno y las condiciones operativas pueden modificar la exposición en un receptor."],
    ["What dB(A) tells you — and what it does not", "Qué indica el dB(A), y qué no indica"],
    ["A-weighted decibels are used to describe sound in a way that broadly reflects human hearing sensitivity. A displayed dB(A) value can help compare scenarios, but one number by itself does not prove legal compliance or non-compliance. Location, duration, measurement method and applicable criteria also matter.", "Los decibelios ponderados A describen el sonido de una forma que refleja de manera aproximada la sensibilidad del oído humano. Un valor de dB(A) puede ayudar a comparar escenarios, pero una cifra aislada no demuestra cumplimiento o incumplimiento legal. También importan la ubicación, la duración, el método de medición y los criterios aplicables."],
    ["Reduce avoidable disturbance without cancelling the mission", "Reducir las molestias evitables sin cancelar la misión"],
    ["Operational control can act on the source, timing, location, duration or procedure. In an In-Service context the goal is often not “zero noise”; it is to complete a required activity while avoiding disturbance that could reasonably be reduced through planning and control.", "El control operacional puede actuar sobre la fuente, el momento, la ubicación, la duración o el procedimiento. En un contexto de servicio, el objetivo no suele ser el «ruido cero», sino completar una actividad necesaria evitando molestias que puedan reducirse razonablemente mediante planificación y control."],
    ["From environmental aspect to controlled operation", "Del aspecto ambiental a la operación controlada"],
    ["In an environmental management system, significant interactions need appropriate controls. A useful control is clear enough to be implemented, linked to the actual operating conditions and capable of being checked. If the conditions that justified the original plan change, the control may need to be reassessed.", "En un sistema de gestión ambiental, las interacciones significativas necesitan controles adecuados. Un control útil es suficientemente claro para implantarse, está vinculado a las condiciones operativas reales y puede verificarse. Si cambian las condiciones que justificaron el plan original, puede ser necesario reevaluar el control."],
    ["Mission 01 simulated this by keeping the engine test mandatory while allowing you to change when or where it happened.", "La Misión 01 lo simuló manteniendo obligatoria la prueba de motor y permitiéndote cambiar cuándo o dónde se realizaba."],
    ["A noisy activity can be operationally necessary and still be environmentally managed. The key is to understand the conditions that determine exposure and to use proportionate controls.", "Una actividad ruidosa puede ser operacionalmente necesaria y, aun así, gestionarse ambientalmente. La clave es comprender las condiciones que determinan la exposición y utilizar controles proporcionados."],

    ["A map is a control tool, not just a picture", "Un mapa es una herramienta de control, no solo una imagen"],
    ["Spatial planning identifies where an activity overlaps with communities, protected or sensitive habitats, wildlife movement areas and other receptors. It helps planners see consequences that are easy to miss when looking only at the operation itself.", "La planificación espacial identifica dónde se solapa una actividad con comunidades, hábitats protegidos o sensibles, zonas de movimiento de fauna y otros receptores. Ayuda a visualizar consecuencias que pueden pasar inadvertidas si solo se observa la operación."],
    ["Reducing one impact can increase another", "Reducir un impacto puede aumentar otro"],
    ["Moving a route away from a residential receptor may reduce community disturbance but increase interaction with habitat. A credible sustainability decision therefore asks: where did the impact go? A local improvement is not automatically an overall improvement.", "Alejar una ruta de un receptor residencial puede reducir las molestias comunitarias y aumentar la interacción con el hábitat. Por tanto, una decisión de sostenibilidad creíble pregunta: ¿adónde se trasladó el impacto? Una mejora local no es automáticamente una mejora global."],
    ["Sensitivity varies across space and time", "La sensibilidad varía en el espacio y el tiempo"],
    ["Habitat value is not uniform. Different areas may provide feeding, breeding, resting or connectivity functions, and wildlife activity can vary seasonally or temporarily. Spatial controls are stronger when they use the best available context rather than treating every area as identical.", "El valor del hábitat no es uniforme. Las distintas zonas pueden cumplir funciones de alimentación, reproducción, descanso o conectividad, y la actividad de la fauna puede variar estacional o temporalmente. Los controles espaciales son más sólidos cuando utilizan el mejor contexto disponible en lugar de tratar todas las zonas como idénticas."],
    ["Look beyond the most visible receptor", "Mira más allá del receptor más visible"],
    ["A route may interact with several receptors during one activity. Good planning considers the combined pattern of disturbance, not only the single hotspot that is easiest to see. This prevents solving one problem by transferring it elsewhere.", "Una ruta puede interactuar con varios receptores durante una actividad. Una buena planificación considera el patrón combinado de molestias, no solo el punto crítico más visible. Así se evita resolver un problema trasladándolo a otro lugar."],
    ["Mission 02 made you compare three fictional corridors and forced you to consider both community and habitat instead of choosing the route with the simplest visual line.", "La Misión 02 te hizo comparar tres corredores ficticios y considerar conjuntamente comunidad y hábitat, en vez de elegir la ruta con la línea visual más sencilla."],
    ["Spatial sustainability means choosing location with awareness of sensitive receptors, habitat functions and impact transfer — not simply moving the disturbance off one map point.", "La sostenibilidad espacial implica elegir la ubicación con conocimiento de los receptores sensibles, las funciones del hábitat y la transferencia de impactos; no consiste simplemente en apartar la molestia de un punto del mapa."],

    ["Environmental conditions are not static", "Las condiciones ambientales no son estáticas"],
    ["Wildlife presence, weather, habitat use and operational context can change between planning and execution. A plan may be reasonable when approved and still become inappropriate later if a relevant condition changes.", "La presencia de fauna, la meteorología, el uso del hábitat y el contexto operacional pueden cambiar entre la planificación y la ejecución. Un plan razonable al aprobarse puede dejar de ser adecuado si cambia una condición pertinente."],
    ["Monitoring only matters if it can inform action", "El seguimiento solo importa si puede orientar la acción"],
    ["Collecting live information is not an environmental control by itself. The useful question is: what decision changes when the signal changes? Monitoring should be linked to trigger points, review rules or contingency actions.", "Recopilar información en vivo no constituye por sí mismo un control ambiental. La pregunta útil es: ¿qué decisión cambia cuando cambia la señal? El seguimiento debe vincularse a puntos de activación, reglas de revisión o acciones de contingencia."],
    ["Separate “new information” from “action required”", "Distinguir «información nueva» de «acción necesaria»"],
    ["Not every environmental update requires a change. A practical system distinguishes between information to watch and a condition that actually crosses a defined decision trigger — for example, a new overlap with a sensitive area during the planned window.", "No toda actualización ambiental exige un cambio. Un sistema práctico distingue entre información que debe vigilarse y una condición que supera un punto de decisión definido; por ejemplo, un nuevo solapamiento con una zona sensible durante la franja prevista."],
    ["Prepare alternatives before the conflict occurs", "Preparar alternativas antes de que ocurra el conflicto"],
    ["Adaptive management is stronger when the team already knows what alternatives are available: wait, reassess, use a backup zone, modify timing or apply another approved control. This preserves readiness while making the response faster and more defensible.", "La gestión adaptativa es más sólida cuando el equipo conoce de antemano las alternativas disponibles: esperar, reevaluar, utilizar una zona alternativa, modificar el momento o aplicar otro control aprobado. Esto preserva la disponibilidad y permite una respuesta más rápida y defendible."],
    ["Mission 03 showed the same plan at three moments: acceptable, alert, and active conflict. The decision only became necessary when the live condition overlapped the approved plan.", "La Misión 03 mostró el mismo plan en tres momentos: aceptable, alerta y conflicto activo. La decisión solo fue necesaria cuando la condición en vivo se solapó con el plan aprobado."],
    ["An environmental plan is not a one-time approval. It is a controlled decision that may need to adapt when relevant conditions change.", "Un plan ambiental no es una aprobación puntual. Es una decisión controlada que puede necesitar adaptación cuando cambian las condiciones pertinentes."],

    ["The same source can be experienced differently at different times", "Una misma fuente puede percibirse de forma distinta en momentos diferentes"],
    ["Community sensitivity can change with time of day because normal activities, background sound and expectations are different. Night periods are generally more sensitive to disturbance, particularly where people are resting or sleeping.", "La sensibilidad comunitaria puede cambiar según la hora porque varían las actividades normales, el sonido de fondo y las expectativas. Los periodos nocturnos suelen ser más sensibles a las molestias, especialmente cuando las personas descansan o duermen."],
    ["Later is not automatically better", "Más tarde no significa automáticamente mejor"],
    ["Delaying an operation can reduce one interaction but leave less time to recover from technical problems, repeat a test or meet a readiness handover. A timing decision therefore needs to consider environmental sensitivity and operational margin together.", "Retrasar una operación puede reducir una interacción, pero deja menos tiempo para recuperarse de problemas técnicos, repetir una prueba o cumplir un relevo de disponibilidad. Por ello, una decisión temporal debe considerar conjuntamente la sensibilidad ambiental y el margen operacional."],
    ["Ecological activity can also vary by time", "La actividad ecológica también puede variar con el tiempo"],
    ["Many species change their activity through the day and night. A time window that is quieter for the community is not automatically lower-impact for habitat. Timing controls should therefore read both human and ecological receptors where relevant.", "Muchas especies cambian su actividad durante el día y la noche. Una franja más tranquila para la comunidad no implica automáticamente un menor impacto sobre el hábitat. Los controles temporales deben considerar receptores humanos y ecológicos cuando proceda."],
    ["Use the window as part of the procedure", "Utilizar la franja como parte del procedimiento"],
    ["A robust scheduling control defines when an activity is preferable, what conditions must be checked and what margin must remain. It should not rely on a vague assumption such as “earlier is always better” or “night is always prohibited”.", "Un control de programación sólido define cuándo es preferible una actividad, qué condiciones deben comprobarse y qué margen debe conservarse. No debe basarse en supuestos vagos como «cuanto antes, mejor» o «la noche siempre está prohibida»."],
    ["Mission 04 kept the activity identical and changed only the window, so you could see how community sensitivity, habitat activity and readiness margin move independently.", "La Misión 04 mantuvo idéntica la actividad y cambió solo la franja, para mostrar cómo varían de forma independiente la sensibilidad comunitaria, la actividad del hábitat y el margen de disponibilidad."],
    ["Timing is an environmental control when it is chosen deliberately from current sensitivity and operational constraints — not simply from habit or convenience.", "El momento es un control ambiental cuando se elige deliberadamente a partir de la sensibilidad actual y las restricciones operativas, no por hábito o conveniencia."],

    ["A complaint is a signal that deserves investigation", "Una queja es una señal que merece investigación"],
    ["A community complaint can indicate meaningful disturbance, but it does not by itself prove the cause or a legal exceedance. Investigation starts by reconstructing what happened, when, under which conditions and at which receptor.", "Una queja comunitaria puede indicar una molestia significativa, pero no demuestra por sí sola la causa ni una superación legal. La investigación comienza reconstruyendo qué ocurrió, cuándo, bajo qué condiciones y en qué receptor."],
    ["Investigate the full acoustic chain", "Investigar toda la cadena acústica"],
    ["Useful evidence can include source activity, timing, duration, weather and propagation, receptor location, monitoring records and the operational control that was expected to be applied. This helps distinguish the measured consequence from the underlying cause.", "La evidencia útil puede incluir la actividad de la fuente, el momento, la duración, la meteorología y la propagación, la ubicación del receptor, los registros de seguimiento y el control operacional previsto. Esto ayuda a distinguir la consecuencia medida de la causa subyacente."],
    ["Do not stop at the visible symptom", "No detenerse en el síntoma visible"],
    ["“The noise was high” describes an outcome. Root-cause thinking asks why the control allowed that outcome to become more likely. In the game, changed wind and timing mattered because the pre-execution noise condition was not revalidated.", "«El ruido fue alto» describe un resultado. El análisis de causa raíz pregunta por qué el control permitió que ese resultado fuera más probable. En el ejercicio, los cambios de viento y horario importaron porque no se revalidó la condición de ruido antes de la ejecución."],
    ["Fix the cause and verify recurrence risk", "Corregir la causa y verificar el riesgo de repetición"],
    ["A corrective action should address the identified cause and be proportionate. After implementation, the organisation still needs to verify whether the new control is being used and whether it actually reduces recurrence. Closing the complaint is not the same as improving the control.", "Una acción correctiva debe abordar la causa identificada y ser proporcionada. Tras implantarla, la organización debe verificar si se utiliza el nuevo control y si realmente reduce la repetición. Cerrar la queja no equivale a mejorar el control."],
    ["Mission 05 deliberately separated four evidence items before asking you to build a finding. That sequence mirrors good investigation logic: evidence first, conclusion second, corrective action third.", "La Misión 05 separó deliberadamente cuatro evidencias antes de pedirte construir un hallazgo. La secuencia refleja una buena lógica de investigación: primero evidencia, después conclusión y por último acción correctiva."],
    ["Sustainable noise management learns from unwanted outcomes. The objective is not to defend the old plan, but to strengthen the control using evidence.", "La gestión sostenible del ruido aprende de los resultados no deseados. El objetivo no es defender el plan anterior, sino reforzar el control mediante evidencia."],

    ["Evidence, conformity and effectiveness", "Evidencia, conformidad y eficacia"],
    ["An environmental management system audit is a structured review of whether defined requirements and controls are being implemented and whether the system can produce reliable environmental management. It is evidence-based; it is not a search for a perfect organisation.", "Una auditoría del sistema de gestión ambiental revisa de forma estructurada si se implantan los requisitos y controles definidos y si el sistema puede producir una gestión ambiental fiable. Se basa en evidencia; no busca una organización perfecta."],
    ["Follow the chain from requirement to evidence", "Seguir la cadena del requisito a la evidencia"],
    ["A useful audit trail connects the environmental issue to a control, shows how the control was implemented, checks records or observations, and follows what happened when conditions changed or a failure occurred. Statements such as “we normally do this” are weaker than traceable evidence.", "Una traza de auditoría útil conecta la cuestión ambiental con un control, muestra cómo se implantó, comprueba registros u observaciones y sigue lo ocurrido cuando cambiaron las condiciones o se produjo un fallo. Afirmaciones como «normalmente hacemos esto» son más débiles que la evidencia trazable."],
    ["Strengths, partial evidence and gaps can coexist", "Fortalezas, evidencia parcial y carencias pueden coexistir"],
    ["An audit conclusion can recognise controls that work and still identify gaps requiring follow-up. Hiding weaknesses makes the conclusion less credible. A management system is stronger when it can detect a problem, record it, correct it and verify improvement.", "Una conclusión de auditoría puede reconocer controles eficaces e identificar a la vez carencias que requieren seguimiento. Ocultar debilidades reduce la credibilidad. Un sistema de gestión es más sólido cuando puede detectar, registrar y corregir un problema, y verificar la mejora."],
    ["Plan, operate, evaluate and improve", "Planificar, operar, evaluar y mejorar"],
    ["The standard uses a management-system logic built around environmental aspects, objectives and controls, operational implementation, monitoring and evaluation, corrective action and continual improvement. The exact audit scope and criteria must always be defined for the real organisation.", "La norma utiliza una lógica de sistema de gestión basada en aspectos, objetivos y controles ambientales, implantación operacional, seguimiento y evaluación, acción correctiva y mejora continua. El alcance y los criterios exactos de auditoría deben definirse siempre para la organización real."],
    ["Ask “show me” rather than “tell me”", "Pedir «muéstrame» en lugar de «dime»"],
    ["The auditor looks for objective evidence: records, monitoring data, decisions, responsibilities, corrective actions and follow-up. The question is not whether every result was favourable; it is whether the organisation can demonstrate control and learning.", "El auditor busca evidencia objetiva: registros, datos de seguimiento, decisiones, responsabilidades, acciones correctivas y seguimiento. La cuestión no es si todos los resultados fueron favorables, sino si la organización puede demostrar control y aprendizaje."],
    ["Training logic, not certification", "Lógica formativa, no certificación"],
    ["This mission illustrates environmental-management and audit reasoning. It does not determine conformity with ISO 14001, replace a real audit programme or provide formal auditor qualification.", "Esta misión ilustra el razonamiento de gestión ambiental y auditoría. No determina conformidad con ISO 14001, no sustituye un programa real de auditoría ni proporciona una cualificación formal de auditor."],
    ["Mission 06 reused evidence from Missions 01–05 so the final conclusion depended on the controls and decisions you actually made instead of on memorising clause numbers.", "La Misión 06 reutilizó la evidencia de las Misiones 01–05 para que la conclusión final dependiera de los controles y decisiones realmente adoptados, no de memorizar cláusulas."],
    ["A credible environmental management system is visible in the evidence chain: identify → control → monitor → adapt → investigate → correct → verify → improve.", "Un sistema de gestión ambiental creíble se hace visible en la cadena de evidencia: identificar → controlar → supervisar → adaptar → investigar → corregir → verificar → mejorar."],

    ["You delayed the same mandatory test by 30 minutes and still met the operational deadline. In this fictional scenario, a slightly better weather window reduces exposure.", "Retrasaste 30 minutos la misma prueba obligatoria y aun así cumpliste el plazo operacional. En este escenario ficticio, una ventana meteorológica ligeramente mejor reduce la exposición."],
    ["You changed when the test happens, not whether it happens. This keeps readiness high while reducing avoidable disturbance.", "Cambiaste cuándo se realiza la prueba, no si se realiza. Esto mantiene una disponibilidad alta y reduce las molestias evitables."],
    ["Timing can be an environmental control without cancelling the mission.", "El momento puede actuar como control ambiental sin cancelar la misión."],
    ["MISSION ACHIEVED · BETTER CONTROL", "MISIÓN CUMPLIDA · CONTROL MEJORADO"],
    ["Route B", "Ruta B"], ["Eastern Diversion", "Desvío oriental"], ["MISSION ACHIEVED · IMPACT SHIFTED", "MISIÓN CUMPLIDA · IMPACTO TRASLADADO"],
    ["Community exposure falls, but the diversion crosses the fictional H-03 wetland and B-04 bird-activity corridor.", "La exposición comunitaria disminuye, pero el desvío cruza el humedal ficticio H-03 y el corredor de actividad de aves B-04."],
    ["The spatial control solved one problem and created another. Route planning must consider all relevant receptors together.", "El control espacial resolvió un problema y creó otro. La planificación de rutas debe considerar conjuntamente todos los receptores pertinentes."],
    ["Avoiding a community receptor is not enough if the route transfers disturbance into sensitive habitat.", "Evitar un receptor comunitario no basta si la ruta traslada la molestia a un hábitat sensible."],
    ["Mission 02 · Route outcome", "Misión 02 · Resultado de la ruta"],
    ["The fictional training sortie is complete. Now evaluate what your spatial control did to the rest of the system.", "La salida de entrenamiento ficticia ha terminado. Evalúa ahora qué produjo tu control espacial en el resto del sistema."],
    ["The route itself can be an operational environmental control. The important question is not whether the line moved, but whether total interaction with sensitive receptors was actually reduced.", "La propia ruta puede ser un control ambiental operacional. La cuestión importante no es si se desplazó la línea, sino si realmente se redujo la interacción total con receptores sensibles."],
    ["spatial planning must consider impact transfer and cumulative exposure, not only the most visible receptor.", "la planificación espacial debe considerar la transferencia de impactos y la exposición acumulativa, no solo el receptor más visible."],
    ["Mission 03 · Adaptive response outcome", "Misión 03 · Resultado de la respuesta adaptativa"],
    ["You pause briefly, keep the activity inside the fictional operating window and reassess after the temporary wildlife pulse has reduced.", "Realizas una pausa breve, mantienes la actividad dentro de la ventana operativa ficticia y reevaluas cuando se reduce el pulso temporal de fauna."],
    ["You use time as a dynamic control. The operation still happens, but the control responds to the changed condition instead of relying on the old approval.", "Utilizas el tiempo como control dinámico. La operación se realiza, pero el control responde a la condición modificada en lugar de apoyarse en la aprobación anterior."],
    ["Monitoring only adds value when new information can change the decision.", "El seguimiento solo aporta valor cuando la información nueva puede cambiar la decisión."],
    ["Operational controls are not necessarily static. Monitoring, trigger points and contingency responses can matter when environmental conditions vary over time.", "Los controles operacionales no son necesariamente estáticos. El seguimiento, los puntos de activación y las respuestas de contingencia importan cuando las condiciones ambientales varían con el tiempo."],
    ["“approved” describes the plan at one point in time; live conditions can still require a new decision.", "«aprobado» describe el plan en un momento concreto; las condiciones en vivo aún pueden exigir una decisión nueva."],
    ["Mission 04 · Time-window outcome", "Misión 04 · Resultado de la franja horaria"], ["Buffer Window", "Franja de equilibrio"],
    ["MISSION ACHIEVED · BALANCED TIME CONTROL", "MISIÓN CUMPLIDA · CONTROL TEMPORAL EQUILIBRADO"],
    ["The same mandatory activity is completed inside the readiness deadline, but after the temporary community sensitivity has reduced.", "La misma actividad obligatoria se completa dentro del plazo de disponibilidad, pero después de que se reduzca la sensibilidad comunitaria temporal."],
    ["You changed when the operation happens, not whether it happens. The time control preserves a useful readiness margin while reducing avoidable interaction.", "Cambiaste cuándo se realiza la operación, no si se realiza. El control temporal conserva un margen útil de disponibilidad y reduce la interacción evitable."],
    ["A time window can be an operational environmental control when it preserves the mission and reduces avoidable disturbance.", "Una franja horaria puede ser un control ambiental operacional cuando preserva la misión y reduce las molestias evitables."],
    ["Time-of-day can change operational margin and receptor sensitivity. A useful timing control compares those conditions instead of assuming that earlier or later is automatically better.", "La hora puede cambiar el margen operacional y la sensibilidad del receptor. Un control temporal útil compara esas condiciones en vez de suponer que antes o después es automáticamente mejor."],
    ["schedule the same required activity when the overall interaction is lower, while preserving the operational requirement.", "programa la misma actividad necesaria cuando la interacción global sea menor, preservando el requisito operacional."],
    ["Mission 05 · Noise investigation outcome", "Misión 05 · Resultado de la investigación de ruido"],
    ["Mandatory pre-execution noise-condition check", "Comprobación obligatoria de las condiciones de ruido antes de la ejecución"],
    ["The investigation is complete. The question was never “can we make no noise?” It was", "La investigación ha terminado. La pregunta nunca fue «¿podemos eliminar todo el ruido?», sino"],
    ["why did exposure become worse than expected, and how can the required activity be better controlled?", "¿por qué la exposición fue peor de lo previsto y cómo puede controlarse mejor la actividad necesaria?"],
    ["Immediately before execution, the operator rechecks wind direction, actual start window, community sensitivity and any active noise-conflict signal, records acknowledgement, and reassesses the plan when conditions have materially changed.", "Inmediatamente antes de la ejecución, el operador vuelve a comprobar la dirección del viento, la franja real de inicio, la sensibilidad comunitaria y cualquier señal activa de conflicto de ruido; registra la comprobación y reevaluá el plan cuando las condiciones han cambiado materialmente."],
    ["This directly addresses the failure shown by the evidence while keeping the mandatory activity possible when the current conditions are acceptable.", "Esto aborda directamente el fallo mostrado por la evidencia y mantiene posible la actividad obligatoria cuando las condiciones actuales son aceptables."],
    ["Noise management becomes adaptive when the final decision uses current weather, timing and receptor conditions.", "La gestión del ruido se vuelve adaptativa cuando la decisión final utiliza la meteorología, el momento y las condiciones actuales del receptor."],
    ["Environmental noise from a required operation is not fixed. Community exposure can change with propagation conditions and actual timing. Sustainable operational control means using that current information to reduce avoidable disturbance while preserving the mission requirement.", "El ruido ambiental de una operación necesaria no es fijo. La exposición comunitaria puede cambiar con las condiciones de propagación y el horario real. El control operacional sostenible utiliza esa información actual para reducir molestias evitables y preservar el requisito de misión."],
    ["higher exposure → check propagation → check actual timing → verify the control used current conditions.", "mayor exposición → comprobar propagación → comprobar horario real → verificar que el control utilizó las condiciones actuales."],
    ["Mission 06 · Audit case accepted", "Misión 06 · Caso de auditoría aceptado"], ["Final audit reasoning accepted", "Razonamiento final de auditoría aceptado"],
    ["You used the evidence as it exists: effective controls are visible and remaining gaps stay open for follow-up.", "Utilizaste la evidencia tal como existe: los controles eficaces son visibles y las carencias restantes permanecen abiertas para seguimiento."],
    ["Before campaign completion", "Antes de completar la campaña"],
    ["The practical audit is finished. The last learning step is the theory debrief: what an environmental management system audit is actually trying to establish.", "La auditoría práctica ha terminado. El último paso de aprendizaje es el debrief teórico sobre qué pretende establecer una auditoría del sistema de gestión ambiental."],
    ["FINAL THEORY CLASS UNLOCKED", "CLASE TEÓRICA FINAL DESBLOQUEADA"], ["Environmental Management System audits", "Auditorías del sistema de gestión ambiental"],
    ["Review audit purpose, evidence trails, findings, corrective action and continual improvement before the final campaign celebration.", "Revisa la finalidad de la auditoría, las trazas de evidencia, los hallazgos, la acción correctiva y la mejora continua antes del cierre final de campaña."],
    ["OPEN FINAL THEORY CLASS", "ABRIR CLASE TEÓRICA FINAL"],
    ["Noise & Habitat · Campaign Complete", "Ruido y hábitat · Campaña completada"],
    ["You completed the six missions, the six theory debriefs and the final evidence-based audit.", "Completaste las seis misiones, los seis debriefs teóricos y la auditoría final basada en evidencia."],
    ["Missions complete", "Misiones completadas"], ["Operational control", "Control operacional"], ["Adaptive response", "Respuesta adaptativa"],
    ["Time-window judgement", "Decisión sobre franja horaria"], ["Noise investigation", "Investigación de ruido"], ["Audit closure", "Cierre de auditoría"],
    ["Competence unlocked", "Aprendizaje demostrado"], ["Read environmental context", "Interpretar el contexto ambiental"],
    ["Choose proportionate controls", "Elegir controles proporcionados"], ["Explain the management logic", "Explicar la lógica de gestión"],
    ["You did not just finish the simulation — you completed the theory behind every mission.", "No solo terminaste la simulación: completaste la teoría que sustenta cada misión."],
    ["The campaign now combines practical decisions with the environmental-management concepts that explain why those decisions matter.", "La campaña combina ahora decisiones prácticas con los conceptos de gestión ambiental que explican por qué importan."],
    ["Environmental noise + source/path/receptor thinking.", "Ruido ambiental + razonamiento fuente/vía/receptor."],
    ["Community, habitat and impact-transfer thinking.", "Razonamiento sobre comunidad, hábitat y transferencia de impactos."],
    ["Monitoring, triggers and changing conditions.", "Seguimiento, puntos de activación y condiciones cambiantes."],
    ["Night sensitivity + readiness margin.", "Sensibilidad nocturna + margen de disponibilidad."],
    ["Evidence, cause and corrective action.", "Evidencia, causa y acción correctiva."], ["Evidence trail + continual improvement.", "Traza de evidencia + mejora continua."],
    ["Noise, habitat, timing, propagation and receptor sensitivity.", "Ruido, hábitat, momento, propagación y sensibilidad del receptor."],
    ["Use timing, location, monitoring and corrective action without treating sustainability as automatic mission cancellation.", "Utilizar el momento, la ubicación, el seguimiento y la acción correctiva sin tratar la sostenibilidad como cancelación automática de la misión."],
    ["Connect operations to evidence, auditability and improvement.", "Conectar las operaciones con la evidencia, la auditabilidad y la mejora."]
  ].forEach(([source, target]) => exact.set(source, target));

  [
    ["Mission 01 simulated this by keeping the engine test mandatory while allowing you to change", "La Misión 01 lo simuló manteniendo obligatoria la prueba de motor y permitiéndote cambiar"],
    ["it happened.", "se realizaba."],
    ["I will show Route A, then Route B, then Route C. Read one plain-language consequence for each. After the third route, you will compare them side by side and choose.", "Te mostraré la Ruta A, después la Ruta B y finalmente la Ruta C. Lee una consecuencia en lenguaje claro para cada una. Tras la tercera ruta, las compararás conjuntamente y elegirás."],
    ["What trade-off does it make?", "¿Qué compensación implica?"], ["Compare & choose", "Comparar y elegir"], ["Make one final decision.", "Toma una decisión final."],
    ["The sortie must still happen. Choose the route that gives the most defensible balance for this fictional scenario.", "La salida debe realizarse. Elige la ruta que ofrece el equilibrio más defendible para este escenario ficticio."],
    ["The plan is approved. Then the environment changes.", "El plan está aprobado. Después cambia el entorno."], ["WHAT CHANGES", "QUÉ CAMBIA"],
    ["The fictional activity still has to happen today. Choose how you respond to the temporary wildlife alert.", "La actividad ficticia debe realizarse hoy. Elige cómo respondes a la alerta temporal de fauna."],
    ["Use a short timing hold, then check whether the temporary pulse has reduced.", "Aplica una espera breve y comprueba después si se ha reducido el pulso temporal."],
    ["WHAT CHANGES WITH TIME", "QUÉ CAMBIA CON EL TIEMPO"], ["Compare & schedule", "Comparar y programar"],
    ["Mission 04 · Compare the time windows", "Misión 04 · Comparar las franjas horarias"],
    ["The operation is identical. Only the timing changes.", "La operación es idéntica. Solo cambia el momento."],
    ["The mandatory night activity is complete. Now read what changed because of the time you selected.", "La actividad nocturna obligatoria ha terminado. Observa ahora qué cambió debido a la franja seleccionada."],
    ["The fictional night validation activity has already happened. At 22:18 a nearby community receptor reports unexpected disturbance. Your job is to reconstruct", "La actividad ficticia de validación nocturna ya se ha realizado. A las 22:18, un receptor comunitario cercano comunica una molestia inesperada. Tu tarea es reconstruir"],
    ["— not to decide whether noise exists.", "— no decidir si existe ruido."], ["Reduce recurrence while keeping the required activity possible.", "Reduce la repetición manteniendo posible la actividad necesaria."],
    ["Use the complete chain:", "Utiliza la cadena completa:"], ["noise trace → propagation change → actual timing → final noise-control record", "traza de ruido → cambio de propagación → horario real → registro final de control de ruido"],
    [". Do not turn a fictional dB(A) signal into a legal conclusion.", ". No conviertas una señal ficticia de dB(A) en una conclusión legal."],
    ["Now improve the noise control.", "Mejora ahora el control de ruido."],
    ["The activity is still required. Choose an action that reduces avoidable community noise exposure by using current conditions, without inventing a blanket ban or a legal threshold.", "La actividad sigue siendo necesaria. Elige una acción que reduzca la exposición comunitaria evitable utilizando las condiciones actuales, sin inventar una prohibición general ni un umbral legal."],
    ["OVER-CONTROL", "CONTROL EXCESIVO"], ["What changes?", "¿Qué cambia?"],
    ["This is the final mission. It is", "Esta es la misión final. No es"], ["not a clause-memory test", "una prueba de memoria de cláusulas"],
    [". An auditor asks for evidence that the campaign used a management loop: plan controls, monitor conditions, adapt when needed, investigate failures and improve the control.", ". Un auditor solicita evidencia de que la campaña utilizó un ciclo de gestión: planificar controles, supervisar condiciones, adaptar cuando sea necesario, investigar fallos y mejorar el control."],
    ["What was controlled, why, under which conditions and what happened next.", "Qué se controló, por qué, bajo qué condiciones y qué ocurrió después."],
    ["The noise control was not revalidated before execution", "El control de ruido no se revalidó antes de la ejecución"],
    ["The audit can close because no new complaint is visible", "La auditoría puede cerrarse porque no se observa ninguna queja nueva"],
    ["Plan", "Planificar"], ["Monitor", "Supervisar"], ["Adapt", "Adaptar"], ["Investigate", "Investigar"], ["Correct", "Corregir"], ["Verify", "Verificar"]
  ].forEach(([source, target]) => exact.set(source, target));

  const phrases = [
    ["MISSION ", "MISIÓN "], ["Operational noise control", "Control operacional del ruido"],
    ["Spatial planning", "Planificación espacial"], ["Adaptive environmental control", "Control ambiental adaptativo"],
    ["Time-window control", "Control de franja horaria"], ["Noise investigation + corrective action", "Investigación de ruido + acción correctiva"],
    ["Evidence + continual improvement", "Evidencia + mejora continua"],
    ["Mission ", "Misión "], ["Theory debrief", "Debrief teórico"], ["missions completed", "misiones completadas"],
    ["Mission readiness", "Disponibilidad de misión"], ["Community exposure", "Exposición comunitaria"],
    ["Community interaction", "Interacción comunitaria"], ["Cumulative exposure", "Exposición acumulativa"],
    ["Habitat interaction", "Interacción con el hábitat"], ["Habitat activity", "Actividad del hábitat"],
    ["Community sensitivity", "Sensibilidad comunitaria"], ["Readiness margin", "Margen de disponibilidad"],
    ["Adaptive control", "Control adaptativo"], ["Sustainability insight unlocked", "Aprendizaje de sostenibilidad desbloqueado"],
    ["Remember:", "Recuerda:"], ["Important:", "Importante:"], ["ISO 14001 connection:", "Conexión con ISO 14001:"],
    ["Sustainability connection:", "Conexión con la sostenibilidad:"], ["How the game works:", "Cómo funciona:"],
    ["How the mission works:", "Cómo funciona la misión:"], ["Review evidence", "Revisar evidencia"],
    ["Check adaptation", "Comprobar la adaptación"], ["Build the audit case", "Construir el caso de auditoría"],
    ["Community", "Comunidad"], ["Habitat", "Hábitat"], ["Noise", "Ruido"], ["Evidence", "Evidencia"],
    ["Readiness", "Disponibilidad"], ["Decision Point", "Punto de decisión"]
  ];

  /* Presentation-only safety net for short labels assembled from live values.
     It never reads or rewrites script source, attributes used as selectors, or state. */
  const words = new Map(Object.entries({
    "the":"el", "a":"un", "an":"un", "and":"y", "or":"o", "of":"de", "to":"a", "from":"desde",
    "in":"en", "on":"sobre", "at":"en", "by":"por", "with":"con", "without":"sin", "for":"para",
    "is":"es", "are":"son", "was":"fue", "were":"fueron", "be":"ser", "been":"sido", "being":"siendo",
    "this":"este", "that":"ese", "these":"estos", "those":"esos", "it":"ello", "its":"su", "your":"tu",
    "you":"tú", "we":"nosotros", "they":"ellos", "their":"su", "what":"qué", "when":"cuándo", "where":"dónde",
    "why":"por qué", "how":"cómo", "which":"cuál", "who":"quién", "not":"no", "only":"solo", "still":"aún",
    "can":"puede", "could":"podría", "should":"debería", "must":"debe", "may":"puede", "will":"va a",
    "has":"ha", "have":"han", "had":"había", "do":"hacer", "does":"hace", "did":"hizo", "done":"realizado",
    "all":"todos", "each":"cada", "one":"uno", "two":"dos", "three":"tres", "four":"cuatro", "five":"cinco", "six":"seis",
    "same":"misma", "different":"diferente", "more":"más", "less":"menos", "most":"mayor", "before":"antes", "after":"después",
    "now":"ahora", "then":"entonces", "again":"de nuevo", "already":"ya", "next":"siguiente", "final":"final",
    "mission":"misión", "missions":"misiones", "campaign":"campaña", "course":"curso", "class":"clase", "theory":"teoría",
    "learning":"aprendizaje", "learn":"aprender", "player":"participante", "game":"ejercicio", "simulation":"simulación",
    "operation":"operación", "operations":"operaciones", "operational":"operacional", "activity":"actividad", "activities":"actividades",
    "required":"necesaria", "mandatory":"obligatoria", "plan":"plan", "planned":"planificado", "planning":"planificación",
    "control":"control", "controls":"controles", "controlled":"controlado", "monitor":"supervisar", "monitoring":"seguimiento",
    "adapt":"adaptar", "adaptive":"adaptativo", "investigate":"investigar", "investigation":"investigación", "improve":"mejorar",
    "improvement":"mejora", "correct":"corregir", "corrective":"correctiva", "verify":"verificar", "review":"revisar",
    "evidence":"evidencia", "audit":"auditoría", "auditor":"auditor", "finding":"hallazgo", "findings":"hallazgos",
    "conclusion":"conclusión", "decision":"decisión", "decisions":"decisiones", "response":"respuesta", "result":"resultado",
    "outcome":"resultado", "feedback":"retroalimentación", "choice":"elección", "choose":"elige", "selected":"seleccionado",
    "option":"opción", "route":"ruta", "routes":"rutas", "window":"franja", "time":"tiempo", "timing":"momento",
    "location":"ubicación", "area":"zona", "conditions":"condiciones", "condition":"condición", "change":"cambio", "changed":"cambió",
    "current":"actual", "live":"en vivo", "available":"disponible", "approved":"aprobado", "active":"activo", "complete":"completar",
    "completed":"completado", "completion":"finalización", "continue":"continuar", "start":"iniciar", "finish":"finalizar", "close":"cerrar",
    "open":"abrir", "back":"volver", "previous":"anterior", "return":"volver", "use":"usar", "apply":"aplicar", "show":"mostrar",
    "read":"lee", "look":"observa", "compare":"compara", "explain":"explica", "understand":"comprender", "identify":"identificar",
    "build":"construir", "reduce":"reducir", "reduces":"reduce", "increase":"aumentar", "increases":"aumenta", "falls":"disminuye",
    "keep":"mantener", "keeps":"mantiene", "move":"trasladar", "moving":"trasladar", "delay":"retrasar", "delaying":"retrasar",
    "noise":"ruido", "sound":"sonido", "acoustic":"acústico", "exposure":"exposición", "disturbance":"molestia", "community":"comunidad",
    "communities":"comunidades", "habitat":"hábitat", "wildlife":"fauna", "environment":"entorno", "environmental":"ambiental",
    "sustainability":"sostenibilidad", "sensitive":"sensible", "receptor":"receptor", "receptors":"receptores", "wetland":"humedal",
    "bird":"aves", "corridor":"corredor", "weather":"meteorología", "wind":"viento", "propagation":"propagación",
    "source":"fuente", "path":"vía", "risk":"riesgo", "readiness":"disponibilidad", "margin":"margen", "interaction":"interacción",
    "impact":"impacto", "cumulative":"acumulativo", "sensitivity":"sensibilidad", "high":"alta", "low":"baja", "medium":"media",
    "moderate":"moderada", "strong":"sólido", "weak":"débil", "better":"mejor", "good":"bueno", "ready":"lista", "partial":"parcial",
    "gap":"carencia", "gaps":"carencias", "effective":"eficaz", "effectiveness":"eficacia", "traceable":"trazable", "traceability":"trazabilidad",
    "record":"registro", "records":"registros", "follow-up":"seguimiento", "cause":"causa", "recurrence":"repetición", "quality":"calidad",
    "system":"sistema", "management":"gestión", "requirement":"requisito", "requirements":"requisitos", "procedure":"procedimiento",
    "process":"proceso", "purpose":"finalidad", "context":"contexto", "technical":"técnico", "fictional":"ficticio", "real":"real",
    "legal":"legal", "compliance":"cumplimiento", "certificate":"registro", "competence":"aprendizaje", "skills":"capacidades",
    "strengths":"fortalezas", "available":"disponible", "unlocked":"desbloqueado", "achieved":"cumplida", "accepted":"aceptada",
    "very":"muy", "new":"nuevo", "original":"original", "remaining":"restantes", "relevant":"pertinentes", "overall":"global",
    "immediately":"inmediatamente", "briefly":"brevemente", "together":"conjuntamente", "instead":"en su lugar", "however":"sin embargo"
  }));

  function translate(value) {
    const compact = value.replace(/\s+/g, " ").trim();
    if (!compact) return value;
    let result = exact.get(compact) || compact;
    if (result === compact) {
      for (const [source, target] of [...exact.entries()].sort((a, b) => b[0].length - a[0].length)) {
        if (source.length > 5 && result.includes(source)) result = result.split(source).join(target);
      }
    }
    if (result === compact) for (const [from, to] of phrases) result = result.split(from).join(to);
    if (result === compact && /\b(?:the|this|that|with|without|from|into|while|when|where|which|what|why|how|your|you|they|their|should|would|could|must|is|are|was|were|has|have|had|not|and|or|of|to|in|on|at|by|for)\b/i.test(compact)) {
      result = compact.replace(/\b[A-Za-z][A-Za-z’-]*\b/g, token => {
        const translated = words.get(token.toLowerCase());
        if (!translated) return token;
        return token === token.toUpperCase() ? translated.toUpperCase() : translated;
      });
    }
    if (result === compact) return value;
    return value.match(/^\s*/)[0] + result + value.match(/\s*$/)[0];
  }

  function localise(root) {
    if (language !== "es") return;
    root.querySelectorAll?.("p,h1,h2,h3").forEach(element => {
      const compact = element.textContent.replace(/\s+/g, " ").trim();
      if (exact.has(compact)) element.textContent = exact.get(compact);
    });
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (node.parentElement && !node.parentElement.closest("script,style,noscript")) node.nodeValue = translate(node.nodeValue);
    });
    root.querySelectorAll?.("[aria-label],[title],[placeholder]").forEach(element => {
      ["aria-label", "title", "placeholder"].forEach(attribute => {
        if (element.hasAttribute(attribute)) element.setAttribute(attribute, translate(element.getAttribute(attribute)));
      });
    });
  }

  function changeLanguage(nextLanguage) {
    const next = new URL(location.href);
    next.searchParams.set("hubLang", nextLanguage);
    location.assign(next.href);
  }

  function addControls() {
    const controls = document.createElement("div");
    controls.id = "hubLanguageControls";
    controls.className = "hubLanguageControls";
    controls.setAttribute("aria-label", language === "es" ? "Idioma y navegación del Hub" : "Hub language and navigation");
    const hub = `https://aug79-droid.github.io/sustainability-navigator/?lang=${language}#applications`;
    controls.innerHTML = `<a href="${hub}">${language === "es" ? "← Volver al Hub" : "← Return to Hub"}</a><button type="button" data-lang="es" aria-pressed="${language === "es"}">ES</button><button type="button" data-lang="en" aria-pressed="${language === "en"}">EN</button>`;
    controls.querySelectorAll("button").forEach(button => button.addEventListener("click", () => changeLanguage(button.dataset.lang)));
    document.body.appendChild(controls);
    const style = document.createElement("style");
    style.textContent = `.hubLanguageControls{position:fixed;right:1rem;bottom:1rem;z-index:99999;display:flex;align-items:center;gap:.35rem;padding:.45rem;background:#07172eee;border:1px solid #64d7ff;border-radius:.55rem;box-shadow:0 .35rem 1.2rem #0008;font:700 .78rem/1.2 system-ui,sans-serif}.hubLanguageControls a,.hubLanguageControls button{color:#fff;background:#102b4d;border:1px solid #7bcce6;border-radius:.35rem;padding:.55rem .68rem;text-decoration:none;cursor:pointer}.hubLanguageControls button[aria-pressed="true"]{color:#06111f;background:#7de2ff}.hubLanguageControls a:focus-visible,.hubLanguageControls button:focus-visible{outline:3px solid #ffd166;outline-offset:3px}@media(max-width:520px){.hubLanguageControls{right:.5rem;bottom:.5rem;max-width:calc(100vw - 1rem);font-size:.72rem}.hubLanguageControls a,.hubLanguageControls button{padding:.48rem .55rem}}`;
    document.head.appendChild(style);
  }

  document.documentElement.lang = language;
  document.title = language === "es" ? "Ruido y hábitat — Misiones 01–06" : "Noise & Habitat — Missions 01–06";
  addControls();
  localise(document.body);
  if (language === "es") {
    new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) localise(node);
      else if (node.nodeType === Node.TEXT_NODE && node.parentElement && !node.parentElement.closest("script,style,noscript")) node.nodeValue = translate(node.nodeValue);
    }))).observe(document.body, { childList: true, subtree: true });
  }
})();
