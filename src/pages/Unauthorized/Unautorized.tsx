import { FiAlertCircle } from 'react-icons/fi';
const Unautorized = () => {
  return (
    <div className="bg-customSteelblue flex h-screen flex-col items-center justify-center space-y-10 text-white font-normal text-xl ">
      <FiAlertCircle size={100} color="white" />
      <div className="text-center">
        <h1>Acceso no autorizado</h1>
        <p>No estás autorizado para usar este CRM. Por favor, contactanos para más información o asistencia.</p>
        <a className="font-bold" href="https://www.okeycorp.com" target="_blank">
          Comercial@okeycorp.com
        </a>
      </div>
    </div>
  );
};

export default Unautorized;
