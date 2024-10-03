import React, { useState } from 'react';
import { toast } from 'sonner';
import { axiosCustom } from '../../../api/axios';
import { UpdateUser } from '../../../common/interfaces/user/update-user.interface';
import { UserResponse } from '../../../common/interfaces/api/response.interface';

const GeneralInformation: React.FC<UserResponse> = ({
  firstName = '',
  email = '',
  address = '',
  phone = '',
  sheetId = '',
  company = '',
}) => {
  const [updateUser, setUpdateUser] = useState<UpdateUser>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const promise = axiosCustom.put('user', updateUser);

    return toast.promise(promise, {
      loading: 'Cargando...',
      success: 'Datos actualizados exitosamente',
      error: 'Error',
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 text-center mb-8">INFORMACIÓN GENERAL</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">
            Nombre Personal
          </label>
          <input
            type="text"
            id="first_name"
            value={firstName}
            readOnly
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
          />
        </div>

        <div>
          <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900">
            Nombre del local
          </label>
          <input
            type="text"
            id="company"
            onChange={(e) => setUpdateUser({ ...updateUser, company: e.target.value })}
            className="bg-gray-50 placeholder:text-gray-800 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            placeholder={company}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
            Teléfono
          </label>
          <input
            type="tel"
            id="phone"
            onChange={(e) => setUpdateUser({ ...updateUser, phone: e.target.value })}
            className="bg-gray-50 placeholder:text-gray-800 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            placeholder={phone}
          />
        </div>

        <div>
          <label htmlFor="localidad" className="block mb-2 text-sm font-medium text-gray-900">
            Localidad
          </label>
          <input
            type="text"
            id="localidad"
            onChange={(e) => setUpdateUser({ ...updateUser, address: e.target.value })}
            className="bg-gray-50 border placeholder:text-gray-800 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            placeholder={address}
          />
        </div>

        <div>
          <label htmlFor="sheet-id" className="block mb-2 text-sm font-medium text-gray-900">
            Sheet ID
          </label>
          <input
            type="text"
            id="sheet-id"
            onChange={(e) => setUpdateUser({ ...updateUser, sheet: e.target.value })}
            className="bg-gray-50 placeholder:text-gray-800 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            placeholder={sheet}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
            Email @
          </label>
          <input
            type="email"
            id="email"
            value={email}
            readOnly
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-3"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Actualizar Información
        </button>
      </div>
    </form>
  );
};

export default GeneralInformation;
