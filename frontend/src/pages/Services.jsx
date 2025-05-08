import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ServicesSidebar from '../components/sidebar_components/ServicesSidebar';
import StechBanner from '../components/home_components/StechBanner';

const Services = () => {
    const [servicesData, setServicesData] = useState([]);
    const [loading, setLoading] = useState(true);  // To track loading state
    const { serviceSlug } = useParams();
  
    // Fetch services data on component mount
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL;
                const res = await fetch(`${apiUrl}/services/`);
                const data = await res.json();
                setServicesData(data);  // Update state with fetched data
            } catch (error) {
                console.error("Error fetching services:", error);
            } finally {
                setLoading(false);  // Set loading to false once data is fetched
            }
        };

        fetchServices();
    }, []);  // Empty dependency array ensures it runs once when the component mounts

    // Find the service based on the slug from the URL params
    const service = servicesData.find(service => service.slug === serviceSlug);

    // Show loading message until data is fetched
    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    // Show message if service is not found
    if (!service) {
        return <div className="text-center mt-10">Service not found</div>;
    }

    return (
        <div className="relative">
            <ServicesSidebar/>
            {/* Hero Section */}
 
            <div className="bg-white pb-6 sm:pb-8 lg:pb-12 pt-24" style={{ backgroundColor: service.heroBgColor, color: service.heroTextColor }}>
                <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                    <section className="flex flex-col justify-between gap-6 sm:gap-10 md:gap-16 lg:flex-row">
                        {/* Content - start */}
                        <div className="flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12 xl:py-24">
                            <p className="mb-4 font-semibold  md:mb-6 md:text-lg xl:text-xl">{service.tagline}</p>
                            <h1 className="mb-8 text-4xl font-bold  sm:text-5xl md:mb-12 md:text-6xl">{service.title}</h1>
                            <p className="mb-8 leading-relaxed  md:mb-12 lg:w-4/5 xl:text-lg">{service.description}</p>
                            <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start">
                            </div>
                        </div>
                        {/* Content - end */}

                        {/* Image - start */}
                        <div className="h-48 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:h-[500px] lg:w-[700px]">
                            <img src={service.heroImage} loading="lazy" alt={service.altText} className="h-full w-full object-cover object-center"  />
                        </div>
                        {/* Image - end */}
                    </section>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white py-6 sm:py-8 lg:py-12"  style={{ backgroundColor: service.featuresBgColor, color: service.featuresTextColor }}>
                <div className="mx-auto max-w-screen-2xl px-4 md:px-8" >
                    <div className="mb-10 md:mb-16" >
                        <p className="mx-auto max-w-screen-md text-center md:text-lg">{service.featuresDescription}</p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 md:gap-12 xl:grid-cols-3 xl:gap-16"> 
                        {service.features.map((feature, index) => (
                            <div key={index} className="flex gap-4 md:gap-6">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg shadow-lg md:h-14 md:w-14 md:rounded-xl" style={{ backgroundColor: service.heroTextColor, color: service.heroBgColor }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">

                                    <path
                        d={
                            feature.iconPath
                                ? feature.iconPath
                                : "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                        }
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                    />

                                    </svg>
                                </div>
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold md:text-xl">{feature.title}</h3>
                                    <p className="mb-2 ">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
      
        </div>
    );
};

export default Services;
