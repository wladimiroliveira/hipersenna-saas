import SideBar from '@/app/ui/vencimento/sidebar/sidebar';

export default function Page(){
  return (
    <div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
      <div className='w-full flex-none md:w-64'>
        <SideBar />
      </div>
      <div className='flex-grow p-6 md:overflow-y-auto md:p-12'>

      </div>
    </div>
  );
}