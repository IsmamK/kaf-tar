import { useEffect, useState } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${apiUrl}/home/testimonials/`);
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        const data = await response.json();
        setTestimonials(data.testimonials || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7bbf42]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#f9b414] text-[#040404] p-4 rounded-lg text-center">
        Error loading testimonials: {error}
      </div>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#040404] mb-4">
            What Our Clients Say
          </h2>
          <div className="w-24 h-1.5 bg-[#7bbf42] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border-l-4 border-[#7bbf42] transform transition-all hover:scale-105 hover:shadow-xl"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-[#f9b414] flex items-center justify-center text-white font-bold">
                      {testimonial.clientName.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-[#040404]">
                      {testimonial.clientName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {testimonial.clientTitle}
                    </p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex text-[#f9b414]">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-[#f9b414]' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 italic">
                  {testimonial.comment}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-[#7bbf42]">
                    {testimonial.project}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(testimonial.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="bg-[#7bbf42] hover:bg-[#6aa637] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md">
            View More Testimonials
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;