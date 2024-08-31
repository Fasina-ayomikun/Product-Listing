import { uploadImageFn } from "@/utils/firebase";
import { useMutation } from "@tanstack/react-query";

export function useUploadImage() {
  const {
    mutate: uploadImage,
    isPending: isUploadingImage,
    isSuccess,
  } = useMutation({
    mutationFn: (data: File | null) => uploadImageFn(data),

    onError: (err) => {
      console.log(err);
    },
  });
  return { uploadImage, isUploadingImage, isSuccess };
}
