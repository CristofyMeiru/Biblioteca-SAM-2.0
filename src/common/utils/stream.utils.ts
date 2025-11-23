export async function startCamera(): Promise<MediaStream> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    return stream;
  } catch (error) {
    throw new Error('Erro ao acessar a câmera:' + error);
  }
}

export function convertQrCodeDataToJson<T>(data: string): T {
  try {
    const lines = data.split('\n');
    const result: { [key: string]: string } = {};

    for (const line of lines) {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join(':').trim();
        result[key] = value;
      }
    }
    return result as T;
  } catch (error) {
    throw error;
  }
}
