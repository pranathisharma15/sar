
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Download, ArrowLeft, Share2, ThumbsUp, ThumbsDown, RotateCcw } from "lucide-react";

// Sample images for demo
const SAMPLE_ORIGINAL = "/placeholder.svg";
const SAMPLE_COLORIZED = "/placeholder.svg";

const Results = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState<"positive" | "negative" | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  
  // This effect is to simulate coming from the colorization process
  // In a real app, you'd get these images from context or API
  useEffect(() => {
    const hasUploadedImage = sessionStorage.getItem("hasUploadedImage");
    
    if (!hasUploadedImage) {
      // For demo purposes, we'll just set this to true
      sessionStorage.setItem("hasUploadedImage", "true");
      // In a real app, if no image was processed, we'd redirect:
      // navigate("/upload");
    }
  }, [navigate]);
  
  const handleDownload = () => {
    // In a real app, this would trigger a download of the colorized image
    toast.success("Image downloaded successfully");
  };
  
  const handleRecolorize = () => {
    navigate("/upload");
  };
  
  const handleRating = (type: "positive" | "negative") => {
    setRating(type);
    
    // In a real app, you'd send this feedback to your API
    toast.success(`Thank you for your ${type === "positive" ? "positive" : "negative"} feedback!`);
  };
  
  // Image comparison slider functionality
  const updateSliderPosition = (clientX: number) => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const position = ((clientX - containerRect.left) / containerWidth) * 100;
    
    // Clamp position between 0 and 100
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    updateSliderPosition(e.clientX);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    updateSliderPosition(e.clientX);
  };
  
  const handleMouseUp = () => {
    isDragging.current = false;
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    updateSliderPosition(e.touches[0].clientX);
  };
  
  // Add mouse up and touch end listeners to window
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDragging.current = false;
    };
    
    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("touchend", handleGlobalMouseUp);
    
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchend", handleGlobalMouseUp);
    };
  }, []);
  
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
              onClick={() => navigate("/upload")}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Upload
            </Button>
          </div>
          
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Colorization Results
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Compare your original SAR image with our AI-generated colorized version.
              Drag the slider to see the difference.
            </p>
          </div>
          
          {/* Image Comparison */}
          <div className="mb-16">
            <div 
              ref={containerRef}
              className="relative rounded-xl overflow-hidden shadow-lg aspect-video max-w-5xl mx-auto img-comp-container"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
            >
              {/* Colorized Image (Background) */}
              <img 
                src={SAMPLE_COLORIZED} 
                alt="Colorized SAR Image" 
                className="w-full h-full object-cover"
              />
              
              {/* Original Image (Foreground with clip path) */}
              <div 
                className="absolute top-0 left-0 h-full"
                style={{ 
                  width: `${sliderPosition}%`, 
                  overflow: 'hidden',
                  position: 'absolute'
                }}
              >
                <img 
                  src={SAMPLE_ORIGINAL} 
                  alt="Original SAR Image" 
                  className="w-full h-full object-cover"
                  style={{ 
                    width: `${100 / (sliderPosition / 100)}%`, 
                    maxWidth: `${100 / (sliderPosition / 100)}%`,
                    minWidth: '100%'
                  }}
                />
              </div>
              
              {/* Slider */}
              <div 
                className="img-comp-slider"
                style={{ 
                  left: `${sliderPosition}%`, 
                  top: '50%' 
                }}
              ></div>
              
              {/* Labels */}
              <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-medium">
                Original
              </div>
              <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-medium">
                Colorized
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            <Card className="p-6 glass-panel shadow-sm hover-lift">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl mx-auto">
                  <Download className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium">Download Result</h3>
                <p className="text-sm text-muted-foreground">
                  Get your colorized image in high resolution
                </p>
                <Button onClick={handleDownload} className="rounded-full w-full">
                  Download Image
                </Button>
              </div>
            </Card>
            
            <Card className="p-6 glass-panel shadow-sm hover-lift">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl mx-auto">
                  <Share2 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium">Share Result</h3>
                <p className="text-sm text-muted-foreground">
                  Share your colorized image with others
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" className="rounded-full w-full">
                        Copy Share Link
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Coming soon!</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </Card>
            
            <Card className="p-6 glass-panel shadow-sm hover-lift">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl mx-auto">
                  <RotateCcw className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium">Try Another</h3>
                <p className="text-sm text-muted-foreground">
                  Process another SAR image
                </p>
                <Button
                  variant="outline"
                  onClick={handleRecolorize}
                  className="rounded-full w-full"
                >
                  Colorize New Image
                </Button>
              </div>
            </Card>
          </div>
          
          {/* Feedback */}
          <div className="max-w-3xl mx-auto">
            <div className="glass-panel rounded-xl p-8 text-center">
              <h3 className="text-xl font-medium mb-6">Rate the Colorization Quality</h3>
              
              <div className="flex justify-center gap-4">
                <Button
                  variant={rating === "positive" ? "default" : "outline"}
                  size="lg"
                  className={`rounded-full px-6 ${
                    rating === "positive" ? "" : "hover:bg-green-50 hover:text-green-600"
                  }`}
                  onClick={() => handleRating("positive")}
                >
                  <ThumbsUp className="mr-2 h-5 w-5" />
                  Good Quality
                </Button>
                
                <Button
                  variant={rating === "negative" ? "default" : "outline"}
                  size="lg"
                  className={`rounded-full px-6 ${
                    rating === "negative" ? "" : "hover:bg-red-50 hover:text-red-600"
                  }`}
                  onClick={() => handleRating("negative")}
                >
                  <ThumbsDown className="mr-2 h-5 w-5" />
                  Needs Improvement
                </Button>
              </div>
              
              {rating && (
                <p className="mt-4 text-sm text-muted-foreground">
                  Thank you for your feedback! This helps us improve our colorization model.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Results;
