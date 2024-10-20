interface GeneralMessageProps {
  message: string;
}

export const GeneralMessage: React.FC<GeneralMessageProps> = ({ message }) => (
  <h1 className="lg:text-[70px] text-white text-opacity-15 font-bold text-center ">{message}</h1>
);
