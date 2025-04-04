
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

const ImageUploader = ({ onImageUpload }: ImageUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    
    // Check file type
    if (!file.type.match(/image\/(jpeg|jpg|png)/)) {
      toast.error("Please upload a valid image file (JPEG, JPG, or PNG)");
      return;
    }
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size should be less than 10MB");
      return;
    }
    
    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    
    // Pass the file to parent component
    onImageUpload(file);
    
    // Clean up preview URL when component unmounts
    return () => URL.revokeObjectURL(previewUrl);
  }, [onImageUpload]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxFiles: 1
  });
  
  const removeImage = () => {
    setPreview(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {!preview ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-2xl p-12 transition-all duration-300 glass-panel flex flex-col items-center justify-center cursor-pointer",
            isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
          )}
        >
          <input {...getInputProps()} />
          <div className="w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-medium">Drag & Drop Your SAR Image</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Upload a grayscale Synthetic Aperture Radar (SAR) image in JPEG, JPG, or PNG format
              (max 10MB)
            </p>
            <Button
              className="mt-4 rounded-full"
              type="button"
              size="sm"
            >
              Select File
            </Button>
          </div>
        </div>
      ) : (
        <div className="glass-panel rounded-2xl p-4 overflow-hidden relative">
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute top-4 right-4 z-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={removeImage}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="aspect-video rounded-xl overflow-hidden bg-secondary">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">SAR Image ready for processing</span>
            </div>
            <Button size="sm" className="rounded-full">
              Process Image
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
