import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage, isFirebaseConfigured } from "@/lib/firebase";

// Uploads a file under a folder, returning its public download URL.
// Filenames are timestamp-prefixed to avoid collisions between uploads.
export async function uploadFile(folder: string, file: File): Promise<string> {
  if (!isFirebaseConfigured || !storage) {
    throw new Error("Firebase isn't configured yet.");
  }
  const path = `${folder}/${Date.now()}-${file.name}`;
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, file);
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
