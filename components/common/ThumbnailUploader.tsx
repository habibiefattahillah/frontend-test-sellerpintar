import { Image } from "lucide-react";

type Props = {
  thumbnail: File | null;
  setThumbnail: (file: File | null) => void;
};

export default function ThumbnailUploader({ thumbnail, setThumbnail }: Props) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Thumbnails</label>
      <div>
        <label
          htmlFor="thumbnail"
          className="flex items-center justify-center border border-dashed border-gray-300 rounded-md p-6 h-48 cursor-pointer hover:border-gray-500 transition overflow-hidden"
        >
          {thumbnail ? (
            <img
              src={URL.createObjectURL(thumbnail)}
              alt="Thumbnail preview"
              className="object-contain max-h-full"
            />
          ) : (
            <div className="flex flex-col items-center text-center text-gray-500">
              <Image className="h-8 w-8 mb-2" />
              <p className="text-sm">Click to select files</p>
              <p className="text-xs text-muted-foreground">
                Support file type: .jpg or .png
              </p>
            </div>
          )}
        </label>
        <input
          id="thumbnail"
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setThumbnail(file);
          }}
        />
      </div>
    </div>
  );
}
