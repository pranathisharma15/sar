
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft, Send } from "lucide-react";

const About = () => {
  const navigate = useNavigate();
  
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send the form data to your backend
    toast.success("Message sent! We'll get back to you soon.");
    
    // Reset form
    const form = e.target as HTMLFormElement;
    form.reset();
  };
  
  const faqs = [
    {
      question: "What is Synthetic Aperture Radar (SAR)?",
      answer: "Synthetic Aperture Radar (SAR) is a form of radar that creates high-resolution images of objects by using the motion of the radar antenna over a target region to provide finer spatial resolution than conventional beam-scanning radars. SAR can penetrate clouds, vegetation, and even some structures to provide detailed imagery regardless of lighting conditions or weather."
    },
    {
      question: "How does the AI colorization work?",
      answer: "Our AI colorization process uses deep learning models trained on thousands of paired SAR and optical satellite imagery. The model analyzes patterns, textures, and backscatter characteristics in grayscale SAR images and applies realistic color based on learned relationships between radar reflectivity and surface features like vegetation, water bodies, urban areas, and various terrain types."
    },
    {
      question: "What can colorized SAR images be used for?",
      answer: "Colorized SAR images have numerous applications including environmental monitoring, disaster response, urban planning, agriculture management, defense and intelligence, forestry, geological surveys, and maritime surveillance. The colorization makes SAR data more intuitive to interpret and can reveal subtle features that might be missed in grayscale imagery."
    },
    {
      question: "How accurate is the colorization?",
      answer: "While our AI model provides highly realistic colorization based on patterns learned from extensive training data, the colors represent the most probable colors based on the radar reflectivity patterns rather than actual ground truth. The colorization is optimized for visual interpretation and should be considered as an enhancement tool rather than a perfect representation of true color."
    },
    {
      question: "Can I colorize any type of SAR image?",
      answer: "Our tool works best with standard SAR amplitude or intensity images from common sensors like Sentinel-1, RADARSAT, or TerraSAR-X. For specialized SAR products like interferograms or polarimetric decompositions, results may vary. The model is continuously being improved to support more SAR data types and formats."
    }
  ];
  
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
          
          {/* About Section */}
          <section className="mb-20">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                About SAR Colorization
              </h1>
              
              <div className="glass-panel rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-semibold mb-4">Understanding SAR Imaging</h2>
                <p className="text-muted-foreground mb-4">
                  Synthetic Aperture Radar (SAR) is a form of radar imaging that provides 
                  high-resolution imagery regardless of weather conditions or time of day.
                  Unlike optical sensors, SAR can penetrate clouds, light rain, and works
                  equally well day or night.
                </p>
                <p className="text-muted-foreground mb-4">
                  SAR operates by actively illuminating the Earth's surface with microwave
                  energy and measuring the backscattered signal. The intensity of this 
                  backscatter depends on the surface roughness, geometric structure, and
                  dielectric properties of the target.
                </p>
                <p className="text-muted-foreground">
                  While SAR provides valuable information, the resulting images are 
                  inherently grayscale and can be challenging to interpret for those
                  unfamiliar with radar imagery. This is where our AI colorization tool
                  steps in to make SAR data more accessible and intuitive.
                </p>
              </div>
              
              <div className="glass-panel rounded-xl p-8">
                <h2 className="text-2xl font-semibold mb-4">Our AI Colorization Technology</h2>
                <p className="text-muted-foreground mb-4">
                  Our colorization technology employs advanced deep learning models that have
                  been trained on thousands of paired SAR and optical satellite imagery datasets.
                  These models learn the complex relationships between radar backscatter patterns
                  and real-world colors.
                </p>
                <p className="text-muted-foreground mb-4">
                  The AI analyzes the grayscale SAR image, identifying features such as:
                </p>
                <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                  <li>Urban areas and built structures</li>
                  <li>Vegetation types and density</li>
                  <li>Water bodies and wetlands</li>
                  <li>Geological features</li>
                  <li>Agricultural fields</li>
                </ul>
                <p className="text-muted-foreground">
                  Based on these identified features, the model applies realistic 
                  colorization that enhances the visual interpretation of the SAR data
                  while maintaining the original information content and spatial resolution.
                </p>
              </div>
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="mb-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                Frequently Asked Questions
              </h2>
              
              <Accordion type="single" collapsible className="glass-panel rounded-xl p-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left px-4 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
          
          {/* Contact Section */}
          <section>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                Contact Us
              </h2>
              
              <div className="glass-panel rounded-xl p-8">
                <p className="text-muted-foreground mb-6 text-center">
                  Have questions about our SAR colorization technology or need assistance? 
                  Feel free to reach out to our team.
                </p>
                
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input 
                        id="name" 
                        name="name"
                        placeholder="Your name" 
                        required 
                        className="rounded-lg"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email" 
                        placeholder="Your email address" 
                        required 
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input 
                      id="subject" 
                      name="subject"
                      placeholder="Message subject" 
                      required 
                      className="rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea 
                      id="message" 
                      name="message"
                      placeholder="Your message" 
                      required 
                      rows={6} 
                      className="rounded-lg resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="rounded-full w-full md:w-auto px-8"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
