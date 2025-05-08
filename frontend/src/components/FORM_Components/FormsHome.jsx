import { Link } from "react-router-dom";
import { FaUserMd, FaUserTie, FaWpforms, FaFileSignature, FaClipboardList } from "react-icons/fa";

const FormsHome = () => {
  return (
    <div className="m-10 lg:m-20 p-8 bg-gradient-to-br from-blue-50 to-gray-100 rounded-lg shadow-2xl text-center">
      <h1 className="text-4xl font-extrabold mb-6 text-blue-700 drop-shadow-md">
        Forms & Reports Management
      </h1>
      <p className="text-gray-600 text-lg mb-8">
        Welcome to the Forms and Reports section! Use the tabs below to navigate between different
        forms and management pages.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <FeatureCard
          title="Medical Reports"
          description="Manage all medical reports here."
          color="bg-green-50"
          hoverColor="hover:bg-green-100"
          icon={<FaUserMd className="text-green-500 text-4xl mb-2" />}
          link="/admin/forms-and-reports/medical-reports"
        />
        <FeatureCard
          title="Worker Registration"
          description="Register new workers."
          color="bg-blue-50"
          hoverColor="hover:bg-blue-100"
          icon={<FaUserTie className="text-blue-500 text-4xl mb-2" />}
          link="/admin/forms-and-reports/worker-registration"
        />
        <FeatureCard
          title="Apply Now"
          description="Submit applications easily."
          color="bg-yellow-50"
          hoverColor="hover:bg-yellow-100"
          icon={<FaWpforms className="text-yellow-500 text-4xl mb-2" />}
          link="/admin/forms-and-reports/apply-now"
        />
        <FeatureCard
          title="Agent Registration"
          description="Register new agents here."
          color="bg-purple-50"
          hoverColor="hover:bg-purple-100"
          icon={<FaFileSignature className="text-purple-500 text-4xl mb-2" />}
          link="/admin/forms-and-reports/agent-registration"
        />
        <FeatureCard
          title="Demand Submission"
          description="Recruiters can submit demands for workers here."
          color="bg-orange-50"
          hoverColor="hover:bg-orange-100"
          icon={<FaClipboardList className="text-orange-500 text-4xl mb-2" />}
          link="/admin/forms-and-reports/demand-submission"
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, color, hoverColor, icon, link }) => {
  return (
    <Link to={link} className="group">
      <div
        className={`flex flex-col items-center p-6 rounded-lg shadow-md transition-all duration-300 ${color} ${hoverColor} hover:shadow-xl`}
      >
        <div className="transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{title}</h2>
        <p className="text-gray-600 text-center">{description}</p>
      </div>
    </Link>
  );
};

export default FormsHome;
