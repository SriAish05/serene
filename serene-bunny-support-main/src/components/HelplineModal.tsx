import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface HelplineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelplineModal: React.FC<HelplineModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border text-card-foreground">
        <DialogHeader>
          <DialogTitle className="text-primary text-lg font-semibold">
            988 Suicide & Crisis Lifeline
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            For immediate support on suicide prevention or mental health crises, contact the 988 Lifeline (24/7 confidential support for college students).
          </p>
          <div className="bg-accent p-4 rounded-lg border border-border">
            <h3 className="font-medium text-foreground mb-2">Available 24/7</h3>
            <p className="text-sm text-muted-foreground">
              • Call or text 988<br/>
              • Chat online at 988lifeline.org<br/>
              • Confidential and free support
            </p>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              onClick={onClose}
              variant="outline"
              className="border-border text-foreground hover:bg-accent"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
