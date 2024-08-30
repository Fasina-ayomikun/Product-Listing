import firebaseConfig from "@/config/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

initializeApp(firebaseConfig);

export async function uploadImageFn(file: File | null): Promise<string> {
  if (!file) throw new Error("No Image file provided");

  const storage = getStorage();
  const imageRef = ref(storage, `/images/${Date.now()}-${file.name}}`);

  try {
    const snapshot = await uploadBytes(imageRef, file);
    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    console.error("Upload failed:", error);
    throw new Error("Image upload failed");
  }
}
