interface Props {
  message: string;
}

export const GeneralMessage: React.FC<Props> = ({ message }) => (
  <h1 className="lg:text-[70px] text-white text-opacity-15 font-bold text-center ">{message}</h1>
);
