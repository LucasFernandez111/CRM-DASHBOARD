import { DialogComp } from '@/components/DialogComp';
import { Button } from '@/components/ui/button';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBuilding, FaIdCard, FaWallet, FaLink } from 'react-icons/fa';
import { FormUpdateUser } from './components/FormUpdateUser';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '@/redux/store';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useNotification } from '@/hooks';
import { RiRobot3Fill } from 'react-icons/ri';
import { modifyBot } from '@/redux/states/bot.state';
import { instance } from '@/api';

const PanelPage = () => {
  const userState = useSelector((state: AppStore) => state.user);
  const botState = useSelector((state: AppStore) => state.bot);
  const dispatch = useDispatch();
  const { alertError } = useNotification();

  const handleBot = async (value: boolean) => {
    try {
      const response = await instance.put('/bot', { status: value });
      dispatch(modifyBot(response.data));
    } catch (error) {
      alertError('Error al actualizar el Bot');
    }
  };

  return (
    <main className="col-span-11 grid grid-cols-full h-full max-h-screen overflow-auto bg-customSteelblue p-7 gap-4">
      <section className="rounded-3xl bg-white p-10 col-span-3 flex flex-col ">
        <div className="border rounded-2xl p-6 bg-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4 border-b pb-2 border-sky-600">Detalles Personales</h2>
          <div className="flex flex-col space-y-4 mt-2">
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <FaUser color="#094B81" />
                <span className="font-semibold text-lg text-gray-700">Nombre:</span>
              </div>
              <span className="text-lg text-gray-900">{userState.firstName}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <FaEnvelope color="#094B81" />
                <span className="font-semibold text-lg text-gray-700">Email:</span>
              </div>
              <span className="text-lg text-gray-900">{userState.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <FaPhone color="#094B81" />
                <span className="font-semibold text-lg text-gray-700">Teléfono:</span>
              </div>
              <span className="text-lg text-gray-900">{userState.phone}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <FaMapMarkerAlt color="#094B81" />
                <span className="font-semibold text-lg text-gray-700">Dirección:</span>
              </div>
              <span className="text-lg text-gray-900">{userState.address}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <FaBuilding color="#094B81" />
                <span className="font-semibold text-lg text-gray-700">Empresa:</span>
              </div>
              <span className="text-lg text-gray-900">{userState.company}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <FaIdCard color="#094B81" />
                <span className="font-semibold text-lg text-gray-700">ID sheet:</span>
              </div>
              <div className="flex items-center gap-2">
                <FaLink color="#094B81" />
                <a
                  href={`https://docs.google.com/spreadsheets/d/${userState.sheetId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-gray-900 hover:underline  "
                >
                  {userState.sheetId}
                </a>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <FaWallet color="#094B81" />
                <span className="font-semibold text-lg text-gray-700">Alias:</span>
              </div>
              <span className="text-lg text-gray-900">{userState.alias}</span>
            </div>
          </div>
          <div className="flex justify-end mt-3">
            <DialogComp
              title="Editar perfil"
              description='Realiza cambios en tu perfil aquí. Haz clic en "Guardar" cuando hayas terminado.'
              buttonTrigger={<Button>Editar perfil</Button>}
            >
              <FormUpdateUser />
            </DialogComp>
          </div>
        </div>

        <div className="border rounded-2xl p-6 bg-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4 border-b pb-2 border-sky-600">Administrar BOT</h2>
          <div className="flex gap-2 items-center justify-between">
            <div className="flex justify-center items-center gap-2">
              <RiRobot3Fill color="#094B81" />
              <span className="font-semibold text-lg text-gray-700">Estado:</span>
            </div>
            <Select onValueChange={(value) => handleBot(value === 'true' ? true : false)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={botState.status ? 'Activo' : 'Inactivo'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Activo</SelectItem>
                <SelectItem value="false">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <div className="border rounded-2xl p-6 bg-white text-2xl shadow-xl w-full text-center">
            <h2 className="font-bold">ATENCION AL CLIENTE</h2>
            <h2>+54 9 11-24084029</h2>
            <h2>Comercial@okeycorp.com</h2>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PanelPage;
