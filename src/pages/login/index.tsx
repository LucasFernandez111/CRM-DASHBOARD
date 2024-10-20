export const LoginPage: React.FC<{}> = () => {
  return (
    <div className="flex items-center justify-center min-h-screen   bg-gradient-to-r from-customSteelblue via-blue-500 to-blue-900 animate-gradient-x  flex-col">
      <div className=" lg:px-5 lg:py-20 sm:px-2 sm:py-10 sm:m-3 rounded-3xl bg-slate-100 shadow-2xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-44 w-auto"
            src="https://i.postimg.cc/DwXfrjpH/Mesa-de-trabajo-3.png"
            alt="Your Company"
          />
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-customSteelblue">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="http://localhost:3000/auth/google" method="GET">
            <button className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 font-medium text-sm">
              <img
                src=" https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg "
                className=" w-5 h-5 mr-2"
                alt=""
              />
              Iniciar sesión con Google
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            ¿Tienes algún problema?{' '}
            <a
              href="mailto:devfernandez@okeycorp.com"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Contacta al desarrollador
            </a>
          </p>

          <div className="mt-6 text-sm text- text-gray-600 text-center  font-bold">
            <a href="#" className="underline hover:text-gray-800">
              Política de Privacidad
            </a>{' '}
            ·{' '}
            <a href="#" className="underline hover:text-gray-800">
              Términos de Servicio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
