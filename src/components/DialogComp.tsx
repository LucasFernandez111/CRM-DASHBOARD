import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Props {
  children: React.ReactNode;
  title: string;
  description: string;
  buttonTrigger: React.ReactNode;
}

export const DialogComp: React.FC<Props> = ({ title, description, children, buttonTrigger }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{buttonTrigger}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px] lg:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="font-bold text-3xl">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};
