// Injected by Playwright before Aris loads. All sessions and content are synthetic.
export function mockAris({ screen, theme }) {
  const meeting = {
    id: 'demo-1', title: 'Lanzamiento de Atlas · Demo', state: 'ready',
    createdAt: '2026-11-23T13:00:00Z', endedAt: '2026-11-23T13:24:38Z',
    durationMs: 1_478_000, dir: '/demo/sessions/demo-1', recovered: false,
    discontinuities: 0, lastError: null,
  };
  const sessions = [
    meeting,
    { ...meeting, id: 'demo-2', title: 'Revisión de propuesta', createdAt: '2026-11-20T15:00:00Z' },
    { ...meeting, id: 'demo-3', title: 'Planificación de diciembre', createdAt: '2026-11-18T19:30:00Z' },
  ];
  const dialogue = [
    [0, 4_000, 'El objetivo de hoy es cerrar el alcance de la prueba piloto de Atlas.'],
    [1, 10_000, 'Propongo invitar a dos equipos internos para probar el flujo completo la próxima semana.'],
    [2, 17_000, 'Puedo preparar una guía breve. Me gustaría incluir un ejemplo de principio a fin.'],
    [0, 24_000, 'Perfecto. Dejemos el jueves para recoger comentarios de los dos equipos.'],
    [1, 30_000, 'Me encargo de enviar las invitaciones y confirmar quiénes pueden participar.'],
    [2, 36_000, 'El viernes revisamos qué mejoras podemos incorporar antes del lanzamiento.'],
  ];
  const names = ['Yo', 'Elena', 'Mateo'];
  const segments = dialogue.map(([voice, startMs, text], index) => ({
    id: index + 1, track: voice ? 'system' : 'microphone',
    speaker: names[voice], speakerId: voice || undefined,
    startMs, endMs: startMs + 5_000, text, language: 'es', sourceFile: 'demo.wav',
  }));
  const live = segments.map(segment => ({
    ...segment, speaker: segment.track === 'system' ? 'Participantes' : 'Yo',
  }));
  const tracks = [
    ['microphone', -18, 'Micrófono del Mac'],
    ['system', -29, 'Audio del sistema'],
  ].map(([kind, rmsDb, device]) => ({
    kind, adapter: 'demo', state: 'active', device, sampleRate: 48_000,
    rmsDb, peakDb: rmsDb + 7, recordedMs: 42_000, segments: 1,
    discontinuities: 0, digitalSilenceMs: 0, lastError: null, lastErrorCode: null,
  }));
  const status = {
    sessionId: 'demo-live', title: 'Prueba piloto de Atlas', state: 'recording',
    activeMs: 42_000, tracks, warnings: [], freeDiskBytes: 48_000_000_000, autoStopped: null,
  };
  const models = [
    ['small', 'transcription', 465_000_000, true],
    ['base', 'transcription', 148_000_000, false],
    ['minutes', 'minutes', 4_400_000_000, true],
    ['pyannote', 'speakers', 6_000_000, true],
    ['campplus', 'speakers', 28_000_000, true],
  ].map(([id, kind, sizeBytes, installed]) => ({
    id, kind, label: id, license: 'Demo', sizeBytes, installed,
    partialBytes: 0, importable: false, downloading: false,
  }));
  const responses = {
    get_app_info: {
      name: 'Aris', version: '0.1.0', identifier: 'com.rhumblabs.aris',
      os: 'macos', osVersion: '15.7', arch: 'aarch64', dataDir: '/demo',
      freeDiskBytes: status.freeDiskBytes, systemAudioAdapter: 'Core Audio',
      systemAudioSupported: true, helperAvailable: true, theme,
    },
    get_permissions: { microphone: 'granted', systemAudio: 'granted', detail: null },
    list_sessions: sessions,
    take_recovery_notices: [],
    get_recorder_status: screen === 'recording' ? status : null,
    get_live_transcript: live,
    get_transcription_setup: {
      binary: 'whisper-cli', modelsDir: '/demo/models',
      models: [{ name: 'small', file: 'small.bin', available: true, sizeBytes: 465_000_000 }],
      model: 'small', language: 'es', live: true, running: null,
    },
    list_models: models,
    get_launch_at_login: false,
    get_meeting_detection: {
      enabled: true, supported: true, muted: [],
      prompt: screen === 'meeting-alert' ? { bundleId: 'us.zoom.xos', name: 'Zoom' } : null,
    },
    get_transcript: {
      sessionId: meeting.id, engine: 'whisper.cpp', languageOption: 'es', createdAt: meeting.endedAt,
      segments, diarization: { engine: 'sherpa-onnx', speakers: 2, requestedSpeakers: null, processingMs: 4_000 },
      stats: { audioMs: meeting.durationMs, durationMs: meeting.durationMs, processingMs: 32_000,
        chunksRun: 5, chunksResumed: 0, chunksSkippedSilent: 0, segmentsDroppedSilent: 0 },
    },
    get_minutes: {
      schemaVersion: 1, sessionId: meeting.id, engine: 'llama.cpp', createdAt: meeting.endedAt,
      processingMs: 76_000, parts: 1,
      minutes: {
        summary: 'Se aprobó una prueba piloto de Atlas con dos equipos internos. El jueves se recogerán comentarios sobre el flujo y la guía, y el viernes se priorizarán los ajustes.',
        summaryTopics: [],
        decisions: [
          { status: 'agreed', title: 'Prueba con dos equipos', text: 'Validar el flujo completo la próxima semana.' },
          { status: 'needs_discussion', title: 'Fecha de lanzamiento', text: 'Revisarla tras evaluar los comentarios de la prueba.' },
        ],
        nextSteps: [
          { owner: 'Elena', title: 'Enviar las invitaciones', text: 'Confirmar quiénes participarán de cada equipo.' },
          { owner: 'Mateo', title: 'Preparar la guía', text: 'Incluir un ejemplo de principio a fin.' },
        ],
        details: [{ title: 'Revisión del viernes', text: 'Ordenar las mejoras según los comentarios de los equipos.' }],
      },
    },
    panel_fit: null,
  };

  let nextCallback = 0;
  window.__TAURI_EVENT_PLUGIN_INTERNALS__ = { unregisterListener() {} };
  window.__TAURI_INTERNALS__ = {
    metadata: { currentWindow: { label: ['menu-bar', 'meeting-alert'].includes(screen) ? 'tray' : 'main' } },
    transformCallback: () => ++nextCallback,
    async invoke(command) {
      if (command === 'plugin:event|listen') return ++nextCallback;
      if (command === 'plugin:event|unlisten') return;
      if (!Object.hasOwn(responses, command)) throw new Error(`No demo response for ${command}`);
      return responses[command];
    },
  };
}
