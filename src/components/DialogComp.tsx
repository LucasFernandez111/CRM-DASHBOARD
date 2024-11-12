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
  title?: string;
  description?: string;
  buttonTrigger: React.ReactNode;

  isOpen?: boolean;
}

export const DialogComp: React.FC<Props> = ({ title = '', description = '', children, buttonTrigger, isOpen }) => {
  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>{buttonTrigger}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px] lg:max-w-[700px] xl:max-w-[900px]">
        <DialogHeader>
          <DialogTitle className="font-bold text-3xl">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
