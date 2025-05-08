
import WhyChooseUs from "../components/home_components/WhyUs";
import ServiceCard from "../components/service_components/ServiceCard";

import ServiceList from "../components/service_components/ServiceList";
import ServiceModel from "../components/service_components/ServiceModel";

const Service = () => {
    return (
        <div>
            <div>
                <ServiceList></ServiceList>
                
            </div>
            <div>
               <ServiceModel></ServiceModel>
            </div>
            <div>
                {/* <ServiceDetail></ServiceDetail> */}
            </div>

        </div>
    
        
    );
};

export default Service;