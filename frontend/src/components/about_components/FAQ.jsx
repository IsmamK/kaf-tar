import React , {useState,useEffect} from 'react';
import { FaChevronRight, FaChevronDown, FaQuestionCircle } from 'react-icons/fa';

const FAQ = () => {

    const [faq, setFaq] = useState({
      "title": "",
      "subtitle": "",
      "bgColor": "",
      "textColor": "",
      "faqBgColor": "",
      "faqTextColor": "",
      "faqs": [
        
      ]
    }
    );
 
    const apiUrl = import.meta.env.VITE_API_URL;


  const [activeIndex, setActiveIndex] = useState(null);

   useEffect(() => {
      const fetchData = async () => {
        try {
          
          const [faqData] = await Promise.all([
 
            fetch(`${apiUrl}/about/faq`).then(res => res.json()),

          ]);
  
         
          setFaq(faqData);
        } catch (err) {
          setError('Failed to fetch data');
        } finally {
          
        }
      };
  
      fetchData();
    }, [apiUrl]);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold">{faq.title}</h2>
          <p className="text-lg text-gray-400 mt-4">{faq.subtitle}</p>
        </div>

        {/* FAQ Content with Side Nav */}
        <div className="flex flex-col lg:flex-row gap-10 justify-center">
          {/* Left Sidebar for Quick Navigation */}
          

          {/* Main FAQ Cards */}
          <div className="w-full space-y-6">
            {faq.faqs.map((faqItem, index) => (
              <div
                key={index}
                className={`transition-all duration-500 rounded-xl bg-white shadow-lg overflow-hidden ${
                  activeIndex === index ? 'border-l-4 border-alf' : ''
                }`}
              >
                {/* FAQ Question */}
                <div
                  className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-100 transition-all duration-300"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex items-center gap-4">
                    <FaQuestionCircle className="text-alf" size={24} />
                    <h3 className="text-sm lg:text-lg font-semibold text-black">{faqItem.question}</h3>
                  </div>
                  {activeIndex === index ? (
                    <FaChevronDown className="text-alf" />
                  ) : (
                    <FaChevronRight className="text-alf" />
                  )}
                </div>

                {/* FAQ Answer */}
                {activeIndex === index && (
                  <div className="px-6 py-4 bg-gray-50">
                    <p className="text-sm lg:text-lg text-gray-700">{faqItem.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
