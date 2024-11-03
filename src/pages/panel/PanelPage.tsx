import { DialogComp } from '@/components/DialogComp';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBuilding, FaIdCard } from 'react-icons/fa';
import { FormUpdateUser } from './components/FormUpdateUser';
import { useSelector } from 'react-redux';
import { AppStore } from '@/redux/store';

const PanelPage = () => {
  const userState = useSelector((state: AppStore) => state.user);
  console.log(userState);

  return (
    <main className="col-span-11 grid grid-cols-4 h-full max-h-screen overflow-auto bg-customSteelblue p-7 gap-4">
      <section className="rounded-3xl bg-white p-2 flex items-center flex-col">
        <div className="flex items-center flex-col">
          <Avatar className="size-40">
            <AvatarImage src={userState.picture} alt={`${userState.firstName} `} />
            <AvatarFallback>{`${userState.firstName.charAt(0)}`}</AvatarFallback>
          </Avatar>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-10 col-span-3 flex flex-col gap-4">
        <h1 className="text-2xl font-extrabold tracking-tight lg:text-5xl">INFORMACIÓN PERSONAL</h1>
        <div className="border rounded-2xl p-6 bg-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4 border-b pb-2 border-sky-600">Detalles Personales</h2>
          <div className="flex flex-col space-y-4 mt-2">
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <FaUser className="text-gray-600" />
                <span className="font-semibold text-lg text-gray-700">Nombre:</span>
              </div>
              <span className="text-lg text-gray-900">{`${userState.firstName} `}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <FaEnvelope className="text-gray-600" />
                <span className="font-semibold text-lg text-gray-700">Email:</span>
              </div>
              <span className="text-lg text-gray-900">{userState.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <FaPhone className="text-gray-600" />
                <span className="font-semibold text-lg text-gray-700">Teléfono:</span>
              </div>
              <span className="text-lg text-gray-900">{userState.phone}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <FaMapMarkerAlt className="text-gray-600" />
                <span className="font-semibold text-lg text-gray-700">Dirección:</span>
              </div>
              <span className="text-lg text-gray-900">{userState.address}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <FaBuilding className="text-gray-600" />
                <span className="font-semibold text-lg text-gray-700">Empresa:</span>
              </div>
              <span className="text-lg text-gray-900">{userState.company}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <FaIdCard className="text-gray-600" />
                <span className="font-semibold text-lg text-gray-700">ID sheet:</span>
              </div>
              <span className="text-lg text-gray-900">{userState.sheetId}</span>
            </div>
          </div>
        </div>
        <DialogComp
          title="Editar perfil"
          description='Realiza cambios en tu perfil aquí. Haz clic en "Guardar" cuando hayas terminado.'
          buttonTrigger={<Button>Editar perfil</Button>}
        >
          <FormUpdateUser />
        </DialogComp>
      </section>
    </main>
  );
};

export default PanelPage;
