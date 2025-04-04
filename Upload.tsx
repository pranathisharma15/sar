
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageUploader from "@/components/ImageUploader";
import ProcessingAnimation from "@/components/ProcessingAnimation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const Upload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const navigate = useNavigate();
  
  const handleImageUpload = (file: File) => {
    setUploadedImage(file);
  };
  
  const handleProcessImage = () => {
    if (!uploadedImage) {
      toast.error("Please upload an image first");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      
      // Normally this would be set by the actual API response
      // For demo purposes, we're just navigating to the results page
      navigate("/results");
    }, 3000);
    
    // In a real application, you would send the image to your backend:
    /*
    const formData = new FormData();
    formData.append("image", uploadedImage);
    
    fetch("/api/colorize", {
      method: "POST",
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        setIsProcessing(false);
        // Store results in state or context
        navigate("/results");
      })
      .catch(error => {
        setIsProcessing(false);
        toast.error("Error processing image");
        console.error("Error:", error);
      });
    */
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container px-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </div>
          
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Upload Your SAR Image
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Upload a grayscale Synthetic Aperture Radar (SAR) image to transform it into a 
              realistic, colorized version using our advanced AI model.
            </p>
          </div>
          
          {isProcessing ? (
            <ProcessingAnimation />
          ) : (
            <div className="space-y-8">
              <ImageUploader onImageUpload={handleImageUpload} />
              
              {uploadedImage && (
                <div className="flex justify-center mt-8">
                  <Button 
                    size="lg" 
                    className="rounded-full px-8 shadow-md hover:shadow-lg"
                    onClick={handleProcessImage}
                  >
                    Colorize Image
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Upload;
