import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { RiBarChart2Fill, RiTeamFill, RiParkingFill, RiBookmark3Fill, RiLogoutBoxLine, RiDashboardLine } from '@remixicon/react';

const Sidebar = () => {
  const auth = getAuth();
  return (
    <div className="bg-red-700 text-white flex flex-col items-center p-4 h-screen">
      <div className="mb-8">
        <RiDashboardLine
          size={62}
          color='black'
        />
      </div>
      <div className="flex flex-col space-y-4">
        <div className="bg-gray-200 rounded flex items-center space-x-2 cursor-pointer p-1">
          <RiBarChart2Fill 
            size={42}
            color='black'
            
          />
        </div>
        <div className="bg-gray-200 rounded p-1 flex items-center space-x-2 cursor-pointer">
          <RiTeamFill 
            size={42}
            color='black'
          />
        </div>
        <div className="bg-gray-200 rounded p-1 flex items-center space-x-2 cursor-pointer">
          <RiParkingFill
            size={42}
            color='black'
          />
        </div>
        <div className="bg-gray-200 rounded p-1 flex items-center space-x-2 cursor-pointer">
          <RiBookmark3Fill 
            size={42}
            color='black'

          />
        </div>
        <div className="bg-gray-200 rounded p-1 align-bottom flex items-center space-x-2 cursor-pointer">
          <RiLogoutBoxLine 
            size={42}
            color='black'
            //OnClick cambiar de pagina href="/login"
            onClick= {()=> {
              signOut(auth)
              window.location.href = "/";}}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;