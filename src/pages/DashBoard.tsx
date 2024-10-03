import { Suspense } from 'react';
import Header from '../common/components/Header';
import SectionComponent, { Sections } from '../sections/SectionComponent';
import SideBar from '../common/components/SideBar';
import { useUser } from '../common/hooks/useUser';
import { useAuth } from '../common/hooks/useAuth';

interface Props {
  section: Sections;
}

const DashBoard = ({ section }: Props) => {
  const { setUserLocalStorage } = useAuth();
  const { user, loading } = useUser();

  if (user && !loading) setUserLocalStorage(user);

  return (
    <div className="grid min-h-screen lg:grid-cols-8 lg:grid-rows-[auto,1fr]">
      <Header />
      <SideBar />
      <main className="bg-customSteelblue lg:col-span-7 shadow-inner shadow-slate-700 rounded-tl-xl flex justify-center items-center ">
        <Suspense fallback={<div>Cargando...</div>}>
          <SectionComponent section={section} />
        </Suspense>
      </main>
    </div>
  );
};

export default DashBoard;
