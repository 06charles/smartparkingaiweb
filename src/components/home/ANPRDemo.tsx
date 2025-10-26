import { Card } from "@/components/ui/card";
import { Camera, Clock } from "lucide-react";

const ANPRDemo = () => {

  return (
    <Card className="p-8 bg-gradient-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
          <Camera className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">ANPR Live Demo</h3>
          <p className="text-sm text-muted-foreground">Automatic Number Plate Recognition</p>
        </div>
      </div>

      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden mb-4">
        <iframe
          className="absolute inset-0 w-full h-full"
          src="https://www.youtube.com/embed/Hy5He-B3ZGM?autoplay=1&mute=1&loop=1&playlist=Hy5He-B3ZGM&controls=0&showinfo=0&rel=0"
          title="ANPR Live Demo"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-muted rounded-lg">
          <div className="text-2xl font-bold text-primary">99.8%</div>
          <div className="text-xs text-muted-foreground">Accuracy</div>
        </div>
        <div className="p-3 bg-muted rounded-lg">
          <div className="text-2xl font-bold text-success">0.3s</div>
          <div className="text-xs text-muted-foreground">Detection Time</div>
        </div>
        <div className="p-3 bg-muted rounded-lg">
          <div className="text-2xl font-bold text-accent">AI</div>
          <div className="text-xs text-muted-foreground">Powered</div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-primary mt-0.5" />
          <div className="flex-1">
            <p className="font-medium text-sm mb-1">How it works:</p>
            <p className="text-xs text-muted-foreground">
              Our AI system uses YOLO object detection and OCR technology to automatically 
              identify license plates, log entry/exit times, and process automated billing.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ANPRDemo;
