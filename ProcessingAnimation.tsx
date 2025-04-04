
import { cn } from "@/lib/utils";

interface ProcessingAnimationProps {
  className?: string;
}

const ProcessingAnimation = ({ className }: ProcessingAnimationProps) => {
  return (
    <div className={cn("w-full flex flex-col items-center justify-center py-8", className)}>
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 rounded-full border-t-4 border-primary animate-spin-slow opacity-30"></div>
        <div className="absolute inset-2 rounded-full border-t-4 border-primary animate-spin-slow opacity-50" style={{ animationDuration: '2.5s' }}></div>
        <div className="absolute inset-4 rounded-full border-t-4 border-primary animate-spin-slow opacity-70" style={{ animationDuration: '2s' }}></div>
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-primary animate-pulse-slow"></div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center space-y-2 max-w-xs mx-auto fade-in">
        <h3 className="text-lg font-medium">Processing Your Image</h3>
        <p className="text-sm text-muted-foreground">
          Our AI is analyzing and colorizing your SAR image. This typically takes 15-30 seconds.
        </p>
      </div>
      
      <div className="w-full max-w-md mt-8">
        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full animate-shimmer w-3/4"></div>
        </div>
        <div className="mt-2 flex justify-end">
          <span className="text-xs text-muted-foreground">75%</span>
        </div>
      </div>
    </div>
  );
};

export default ProcessingAnimation;
