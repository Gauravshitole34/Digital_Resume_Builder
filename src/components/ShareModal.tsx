import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Mail, Linkedin, Link, ExternalLink } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShareModal({ open, onOpenChange }: ShareModalProps) {
  const [shareLink] = useState(`${window.location.origin}/resume/${Date.now()}`);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    toast({
      title: "✅ Resume link copied!",
      description: "Share this link to showcase your resume",
    });
  };

  const shareViaEmail = () => {
    const subject = "Check out my resume";
    const body = `Hi,\n\nI'd like to share my resume with you. You can view it here: ${shareLink}\n\nBest regards`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const shareOnLinkedIn = () => {
    const text = "Check out my updated resume!";
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareLink)}&title=${encodeURIComponent(text)}`;
    window.open(linkedInUrl, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-gradient-card border-0 shadow-large">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent flex items-center gap-2">
            <Link className="w-5 h-5" />
            Share Resume
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 p-6">
          {/* Share Link */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Share Link</label>
            <div className="flex gap-2">
              <Input 
                value={shareLink} 
                readOnly 
                className="bg-muted border-border"
              />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={copyToClipboard}
                className="shrink-0"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Share Options */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Share via</label>
            <div className="grid gap-3">
              <Button 
                variant="outline" 
                onClick={shareViaEmail}
                className="justify-start gap-3 h-12"
              >
                <Mail className="w-5 h-5 text-blue-500" />
                <div className="text-left">
                  <div className="font-medium">Email</div>
                  <div className="text-sm text-muted-foreground">Share via email</div>
                </div>
                <ExternalLink className="w-4 h-4 ml-auto" />
              </Button>

              <Button 
                variant="outline" 
                onClick={shareOnLinkedIn}
                className="justify-start gap-3 h-12"
              >
                <Linkedin className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                  <div className="font-medium">LinkedIn</div>
                  <div className="text-sm text-muted-foreground">Share on LinkedIn</div>
                </div>
                <ExternalLink className="w-4 h-4 ml-auto" />
              </Button>

              <Button 
                variant="outline" 
                onClick={copyToClipboard}
                className="justify-start gap-3 h-12"
              >
                <Copy className="w-5 h-5 text-green-500" />
                <div className="text-left">
                  <div className="font-medium">Copy Link</div>
                  <div className="text-sm text-muted-foreground">Copy to clipboard</div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}