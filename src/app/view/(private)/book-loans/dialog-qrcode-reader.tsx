import { convertQrCodeDataToJson, startCamera } from '@/common/utils/stream.utils';
import { BookQrCodeData, StudentQrCodeData } from '@/types/qr-code-data';
import jsQR from 'jsqr';
import { useCallback, useEffect, useRef } from 'react';
import { useBookLoansPageContext } from './context';

export default function DialogQrcodeReader() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setStudentData, readerState, setReaderState, setBookData } = useBookLoansPageContext();

  const lastScanTime = useRef<number>(0);
  const animationFrameId = useRef<number | null>(null);

  const isStudentQrCode = useCallback((data: any): data is StudentQrCodeData => {
    return 'Nome' in data && 'Série' in data && 'Curso' in data && 'Número da Chamada' in data;
  }, []);

  const isBookQrCode = useCallback((data: any): data is BookQrCodeData => {
    return 'Id' in data && 'Titulo' in data && 'Autor' in data && 'Genero' in data;
  }, []);

  const scanLoop = useCallback(() => {
    if (videoRef.current && canvasRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const now = Date.now();
      if (now - lastScanTime.current < 500) {
        animationFrameId.current = requestAnimationFrame(scanLoop);
        return;
      }

      lastScanTime.current = now;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        });

        if (code) {
          try {
            console.log('tá lendo');
            const parsedData = convertQrCodeDataToJson<any>(code.data);

            console.log(parsedData);
            console.log(isBookQrCode(parsedData));

            if (isStudentQrCode(parsedData)) {
              setStudentData(parsedData);
              setReaderState('book');
            } else if (isBookQrCode(parsedData)) {
              setBookData(parsedData);
            }
          } catch (e) {
            console.error('Error parsing QR code data:', e);
          }
        }
      }
    }
    animationFrameId.current = requestAnimationFrame(scanLoop);
  }, [readerState, setStudentData, setReaderState, setBookData, isStudentQrCode, isBookQrCode]); // Dependencies for useCallback

  async function startCameraAndScan() {
    if (videoRef.current) {
      try {
        videoRef.current.srcObject = await startCamera();
        await videoRef.current.play();
        animationFrameId.current = requestAnimationFrame(scanLoop);
      } catch (error) {
        console.error('Error starting video stream:', error);
      }
    }
  }

  useEffect(() => {
    const videoEl = videoRef.current; // snapshot
    const animationIdEl = animationFrameId.current; // snapshot

    startCameraAndScan();

    return () => {
      if (animationIdEl) {
        cancelAnimationFrame(animationIdEl);
      }

      if (videoEl && videoEl.srcObject) {
        const stream = videoEl.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [scanLoop, startCameraAndScan]); // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <div className="relative size-120 bg-black rounded-md overflow-hidden">
      <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
      <canvas ref={canvasRef} className="hidden" />
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-center truncate">
        Aponte para o QrCode do{' '}
        <b className=" text-primary underline ">{readerState === 'student' ? 'Aluno' : 'Livro'}</b>
      </div>
    </div>
  );
}
