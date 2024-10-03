import { useUserStorage } from '../../common/hooks/useUserStorage';
import GeneralInformation from './components/GeneralInformation';

const PanelAdmin = () => {
  const { user } = useUserStorage();

  return (
    <section className="grid grid-cols-3 w-full h-full bg-customSteelblue p-28 gap-6">
      <div className="grid grid-rows-3 gap-4  ">
        <div className="bg-white row-span-1 rounded-xl flex justify-between items-center p-6 shadow-lg shadow-slate-700 relative">
          {/* Imagen del usuario */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={user?.picture || 'https://www.svgrepo.com/show/535711/user.svg'}
                alt="Profile image"
                className="object-cover rounded-full w-32 h-32 border-4 border-blue-500"
              />
              {/* Círculo decorativo */}
              <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
            </div>

            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-700">{user?.firstName}</h1>
              <p className="text-lg text-gray-500">Miembro desde 2022</p>
            </div>
          </div>

          {/* Decoraciones adicionales */}
          <div className="flex flex-col items-end space-y-2">
            <div className="size-4 bg-blue-500 rounded-full"></div>
            <div className="w-6 h-6 bg-sky-500 rounded-full"></div>
            <div className="size-8 bg-customSteelblue rounded-full"></div>
          </div>

          {/* Líneas decorativas */}
          <div className="absolute inset-0 pointer-events-none">
            <svg
              className="absolute top-0 right-0 h-full w-full opacity-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </div>
        </div>
      </div>
      <div className="  col-span-2 bg-white p-4 shadow-md rounded-xl ">{user && <GeneralInformation {...user} />}</div>
    </section>
  );
};

export default PanelAdmin;
