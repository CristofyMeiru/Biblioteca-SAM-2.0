import { convertQrCodeDataToJson, startCamera } from '@/common/utils/stream.utils';
import { BookQrCodeData, StudentQrCodeData } from '@/types/qr-code-data';
import jsQR from 'jsqr';
import { useEffect, useRef } from 'react';
import { useBookLoansPageContext } from './context';

export default function DialogQrcodeReader() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setStudentData, readerState, setReaderState, setBookData } = useBookLoansPageContext();

  const lastScanTime = useRef<number>(0);

  const scanLoop = () => {
    if (videoRef.current && canvasRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const now = Date.now();
      if (now - lastScanTime.current < 500) {
        requestAnimationFrame(scanLoop);
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

        console.log('Ta lendo');

        if (code) {
          try {
            const parsedData = convertQrCodeDataToJson<any>(code.data);

            if (readerState === 'student' && isStudentQrCode(parsedData)) {
              setStudentData(parsedData);
              setReaderState('book');
            } else if (readerState === 'book' && isBookQrCode(parsedData)) {
              setBookData(parsedData);
            }
          } catch (e) {
            console.error('Error parsing QR code data:', e);
          }
        }
      }
    }
    requestAnimationFrame(scanLoop);
  };

  function isStudentQrCode(data: any): data is StudentQrCodeData {
    return 'Nome' in data && 'Série' in data && 'Curso' in data && 'Número da Chamada' in data;
  }

  function isBookQrCode(data: any): data is BookQrCodeData {
    return 'Id' in data && 'Titulo' in data && 'Autor' in data && 'Genero' in data;
  }

  async function start() {
    if (videoRef.current) {
      try {
        videoRef.current.srcObject = await startCamera();
        await videoRef.current.play();
        requestAnimationFrame(scanLoop);
      } catch (error) {
        console.error('Error starting video stream:', error);
      }
    }
  }

  useEffect(() => {
    start();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

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
