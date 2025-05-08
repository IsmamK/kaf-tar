import React from 'react'
import Services from '../home_components/Services'
import { servicesData } from '../../servicesData'
import { FaInfoCircle, FaUsers, FaQuestionCircle, FaBuilding } from 'react-icons/fa';

const ServicesSidebar = () => {
  return (

    <div className="hidden lg:block fixed top-64 -right-20 h-full text-white w-64 z-20">
      <div className="flex flex-col items-center pt-8 space-y-6 pl-4">

        {/* About Us */}
        {servicesData.map((service)=>(

        <a
         href={service.slug}
        className="group flex items-center justify-center space-x-4 p-4 w-16 h-16 bg-[#e6b800] text-black rounded-full transition-all duration-300 ease-in-out transform hover:w-48 hover:rounded-lg hover:bg-gray-700 hover:pr-28 hover:py-20 "
        >
            <FaBuilding className="text-xl group-hover:mr-4 transition-all duration-300" />
                 <span className="hidden group-hover:inline text-sm">{service.title}</span>
            </a>
        ))}
             
        

       
      </div>
    </div>
      

  )
}

export default ServicesSidebar
