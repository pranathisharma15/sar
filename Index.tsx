
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FadeInSection = ({ children, delay = 0, className = "" }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.2 });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Index = () => {
  const features = [
    {
      title: "Accurate Colorization",
      description: "Our AI model has been trained on thousands of SAR images to provide realistic and accurate colorization.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a4.5 4.5 0 0 0 0 9 4.5 4.5 0 0 1 0 9 10 10 0 0 0 0-18z"></path>
          <path d="M12 2c5.5 0 10 4.5 10 10"></path>
        </svg>
      )
    },
    {
      title: "Fast Processing",
      description: "Upload your SAR images and get colorized results in seconds with our optimized processing pipeline.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
        </svg>
      )
    },
    {
      title: "Detailed Analysis",
      description: "View detailed comparisons between original and colorized images to better understand SAR data.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      )
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeInSection className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>AI-Powered Technology</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Transform SAR Images
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
                  With AI Colorization
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl">
                Convert grayscale Synthetic Aperture Radar (SAR) images into realistic, 
                color-enhanced versions that reveal hidden details and improve interpretation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/upload">
                  <Button size="lg" className="rounded-full px-8 shadow-md hover:shadow-lg">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                
                <Link to="/about">
                  <Button variant="outline" size="lg" className="rounded-full px-8">
                    Learn More
                  </Button>
                </Link>
              </div>
            </FadeInSection>
            
            <FadeInSection delay={0.2} className="relative">
              <div className="aspect-video relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-400/20 mix-blend-overlay"></div>
                <img 
                  src="/placeholder.svg" 
                  alt="SAR Image Colorization" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs text-white/80">Original SAR Image</p>
                        <h4 className="text-sm font-medium text-white">Grayscale Terrain Scan</h4>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-white/80">AI Colorized</p>
                        <h4 className="text-sm font-medium text-white">Enhanced Visualization</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl -z-10"></div>
            </FadeInSection>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <FadeInSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Advanced Features
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our AI-powered platform offers cutting-edge capabilities for SAR image colorization
                and analysis to enhance your remote sensing workflow.
              </p>
            </FadeInSection>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FadeInSection key={index} delay={index * 0.1} className="glass-panel hover-lift rounded-xl p-6">
                <div className="w-12 h-12 mb-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20">
        <div className="container px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <FadeInSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How It Works
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our simple three-step process makes it easy to transform your SAR images
              </p>
            </FadeInSection>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeInSection delay={0.1} className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Upload</h3>
              <p className="text-muted-foreground">
                Upload your grayscale SAR image through our user-friendly interface
              </p>
            </FadeInSection>
            
            <FadeInSection delay={0.2} className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Process</h3>
              <p className="text-muted-foreground">
                Our AI model analyzes the image and generates a colorized version
              </p>
            </FadeInSection>
            
            <FadeInSection delay={0.3} className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Download</h3>
              <p className="text-muted-foreground">
                View, compare, and download your colorized image in high resolution
              </p>
            </FadeInSection>
          </div>
          
          <FadeInSection delay={0.4} className="mt-16 text-center">
            <Link to="/upload">
              <Button size="lg" className="rounded-full px-8 shadow-md hover:shadow-lg">
                Try It Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </FadeInSection>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-blue-400/5">
        <div className="container px-6 max-w-5xl mx-auto">
          <FadeInSection className="glass-panel rounded-3xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Enhance Your SAR Imagery?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of remote sensing professionals who are using our AI colorization 
              tool to get more insights from their SAR data.
            </p>
            <Link to="/upload">
              <Button size="lg" className="rounded-full px-8 shadow-lg hover:shadow-xl">
                Start Colorizing Now
              </Button>
            </Link>
          </FadeInSection>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
