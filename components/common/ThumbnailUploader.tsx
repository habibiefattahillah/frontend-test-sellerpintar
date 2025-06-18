import { Image, X, RefreshCw } from "lucide-react";

type Props = {
  thumbnail: File | null;
  setThumbnail: (file: File | null) => void;
};

export default function ThumbnailUploader({ thumbnail, setThumbnail }: Props) {
  const inputId = "thumbnail-uploader-input";

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Thumbnails</label>
      <div>
        <label
          htmlFor={thumbnail ? undefined : inputId}
          className="flex items-center justify-center border border-dashed border-gray-300 rounded-md p-6 h-48 cursor-pointer hover:border-gray-500 transition overflow-hidden relative"
          style={{ cursor: thumbnail ? "default" : "pointer" }}
        >
          {thumbnail ? (
            <>
              <img
                src={URL.createObjectURL(thumbnail)}
                alt="Thumbnail preview"
                className="object-contain max-h-full"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  type="button"
                  title="Change"
                  onClick={() => {
                    // Trigger file input click
                    document.getElementById(inputId)?.click();
                  }}
                  className="bg-white rounded-full p-1 shadow hover:bg-gray-100 transition"
                >
                  <RefreshCw className="h-4 w-4 text-gray-600" />
                </button>
                <button
                  type="button"
                  title="Delete"
                  onClick={() => setThumbnail(null)}
                  className="bg-white rounded-full p-1 shadow hover:bg-gray-100 transition"
                >
                  <X className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </>
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
          id={inputId}
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
