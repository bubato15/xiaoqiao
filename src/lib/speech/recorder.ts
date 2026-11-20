export interface Recording {
  samples: Float32Array;
  sampleRate: number;
  blob: Blob;
}

/**
 * Records from the microphone until `stop()` is called.
 * MediaRecorder + decodeAudioData works the same in Chrome, Edge, Safari and Firefox,
 * unlike ScriptProcessor (deprecated) or AudioWorklet (needs a separate module file).
 */
export async function startRecording(): Promise<{ stop: () => Promise<Recording>; level: () => number }> {
  // Created before the first await so it still counts as started by the user's click;
  // otherwise browsers keep it suspended and the live meter stays at zero.
  const meterCtx = new AudioContext();
  const stream = await navigator.mediaDevices
    .getUserMedia({
      // Browser voice processing flattens pitch movement, which is exactly what we measure.
      audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
    })
    .catch((err) => {
      void meterCtx.close();
      throw err;
    });
  const recorder = new MediaRecorder(stream);
  // A separate analyser feeds the live loudness meter; it does not touch the recording.
  void meterCtx.resume();
  const analyser = meterCtx.createAnalyser();
  analyser.fftSize = 1024;
  meterCtx.createMediaStreamSource(stream).connect(analyser);
  const buf = new Float32Array(analyser.fftSize);
  const level = () => {
    analyser.getFloatTimeDomainData(buf);
    let sum = 0;
    for (let i = 0; i < buf.length; i++) sum += buf[i] * buf[i];
    return Math.min(1, Math.sqrt(sum / buf.length) * 6);
  };
  const chunks: Blob[] = [];
  recorder.ondataavailable = (e) => chunks.push(e.data);
  recorder.start();

  return {
    level,
    stop: () =>
      new Promise((resolve, reject) => {
        recorder.onstop = async () => {
          stream.getTracks().forEach((t) => t.stop());
          void meterCtx.close();
          try {
            const blob = new Blob(chunks, { type: recorder.mimeType });
            const ctx = new AudioContext();
            const buffer = await ctx.decodeAudioData(await blob.arrayBuffer());
            await ctx.close();
            resolve({ samples: buffer.getChannelData(0), sampleRate: buffer.sampleRate, blob });
          } catch (err) {
            reject(err);
          }
        };
        recorder.stop();
      }),
  };
}
