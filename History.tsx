
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Download, Calendar, Clock, Trash2 } from "lucide-react";

// Demo data for the history page
const SAMPLE_HISTORY = [
  {
    id: "001",
    originalImage: "/placeholder.svg",
    colorizedImage: "/placeholder.svg",
    date: "2023-06-15",
    time: "14:32",
  },
  {
    id: "002",
    originalImage: "/placeholder.svg",
    colorizedImage: "/placeholder.svg",
    date: "2023-06-10",
    time: "09:15",
  },
  {
    id: "003",
    originalImage: "/placeholder.svg",
    colorizedImage: "/placeholder.svg",
    date: "2023-06-05",
    time: "16:47",
  },
  {
    id: "004",
    originalImage: "/placeholder.svg",
    colorizedImage: "/placeholder.svg",
    date: "2023-05-28",
    time: "11:23",
  },
];

const History = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState(SAMPLE_HISTORY);
  
  const handleDownload = (id: string) => {
    // In a real app, this would trigger a download of the colorized image
    toast.success("Image downloaded successfully");
  };
  
  const handleDelete = (id: string) => {
    // Filter out the deleted item
    setHistory(history.filter(item => item.id !== id));
    toast.success("Image removed from history");
  };
  
  const handleViewResult = (id: string) => {
    // In a real app, you'd navigate to the specific result
    navigate("/results");
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
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Your Colorization History
              </h1>
              <p className="text-muted-foreground">
                View and manage your previously colorized SAR images
              </p>
            </div>
            
            <Button
              className="rounded-full"
              onClick={() => navigate("/upload")}
            >
              Colorize New Image
            </Button>
          </div>
          
          {history.length === 0 ? (
            <div className="glass-panel rounded-xl p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No History Found</h3>
              <p className="text-muted-foreground mb-6">
                You haven't colorized any SAR images yet. Try colorizing your first image!
              </p>
              <Button
                className="rounded-full"
                onClick={() => navigate("/upload")}
              >
                Start Colorizing
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {history.map((item) => (
                <Card key={item.id} className="glass-panel hover-lift overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="relative aspect-video cursor-pointer" onClick={() => handleViewResult(item.id)}>
                      <img 
                        src={item.colorizedImage} 
                        alt="Colorized SAR Image" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                        <span className="text-white text-sm font-medium">Click to view result</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-base">SAR Image #{item.id}</CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => handleDownload(item.id)}
                    >
                      <Download className="h-3 w-3" />
                      Download
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                      Remove
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default History;
