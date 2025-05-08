import React, { useEffect,useState } from 'react';



const FeaturedVideo = () => {
  const [featuredVideoData,setfeaturedVideoData] = useState({
    "title": "",
    "description": "",
    "button1": {
      "text": "",
      "link": ""
    },
    "button2": {
      "text": "e",
      "link": ""
    },
    "videoSrc": "",
    "colors": {
      "bgColor": "",
      "textColor": ""
    }
  })
  const apiUrl = import.meta.env.VITE_API_URL;


  useEffect(()=>{
    fetch(`${apiUrl}/home/featured-video/`)
    .then(res=>res.json())
    .then(data=>setfeaturedVideoData(data))
  },[])

  return (
    <div className='relative' style={{ backgroundColor: featuredVideoData.colors.bgColor, color: featuredVideoData.colors.textColor }}>
      {/* Divider */}

      <section className="">
        <div className="pb-20 pt-20 px-20  mx-auto max-w-screen-xl grid lg:grid-cols-2 gap-8 lg:gap-16 ">
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">{featuredVideoData.title}</h1>
            <p className="mb-8 text-lg font-normal lg:text-xl">{featuredVideoData.description}</p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0">
              <a href={featuredVideoData.button1.link} className="inline-flex justify-center items-center py-3 px-5 font-medium text-center  rounded-lg  focus:ring-4 focus:ring-blue-300" style={{border: `1px solid ${featuredVideoData.colors.textColor}` }}>
                {featuredVideoData.button1.text}
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a>
              <a href={featuredVideoData.button2.link} className="py-3 px-5 sm:ms-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700" style={{backgroundColor:featuredVideoData.colors.textColor,color:featuredVideoData.colors.bgColor}}>
                {featuredVideoData.button2.text}
              </a>
            </div>
          </div>
          <div>
            <iframe className="mx-auto w-full lg:max-w-xl h-64 rounded-lg sm:h-96 shadow-xl" src={featuredVideoData.videoSrc} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedVideo;
