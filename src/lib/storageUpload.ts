import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage, isFirebaseConfigured } from "@/lib/firebase";

const MAX_IMAGE_DIMENSION = 1600;
const IMAGE_QUALITY = 0.82;

// Phone camera photos can be several MB at full resolution, which made
// pages painfully slow to load on mobile data once uploaded photos
// actually started rendering. Downscale/recompress before upload so what
// lands in Storage is already web-sized — PDFs (documents, constitution)
// pass through untouched since this only runs for image/* files.
async function compressImage(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(
    1,
    MAX_IMAGE_DIMENSION / Math.max(bitmap.width, bitmap.height)
  );
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.drawImage(bitmap, 0, 0, width, height);

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => resolve(blob ?? file),
      "image/jpeg",
      IMAGE_QUALITY
    );
  });
}

// Uploads a file under a folder, returning its public download URL.
// Filenames are timestamp-prefixed to avoid collisions between uploads.
export async function uploadFile(folder: string, file: File): Promise<string> {
  if (!isFirebaseConfigured || !storage) {
    throw new Error("Firebase isn't configured yet.");
  }
  const data = file.type.startsWith("image/")
    ? await compressImage(file)
    : file;
  const path = `${folder}/${Date.now()}-${file.name}`;
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, data);
  return getDownloadURL(fileRef);
}

export async function deleteFileByUrl(url: string) {
  if (!isFirebaseConfigured || !storage) return;
  try {
    await deleteObject(ref(storage, url));
  } catch {
    // Best-effort — file may already be gone, or the URL wasn't a Storage ref.
  }
}
