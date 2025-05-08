import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout";
import AdminLayout from "./layouts/AdminLayout";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import useScrollAnimation from "./useScrollAnimation";
import WorkerApplication from "./pages/WorkerApplication";
import AgentRegistration from "./pages/AgentRegistration";
import MedicalReport from "./pages/MedicalReport";
import DemandSubmission from "./pages/DemandSubmission";
import ApplyForJobs from "./pages/ApplyForJobs";
import FormsHome from "./components/FORM_Components/FormsHome";
import MedicalReportsManagement from "./components/FORM_Components/MedicalReportsManagement";
import ApplyNowManagement from "./components/FORM_Components/ApplyNowManagement";
import AgentRegistrationManagement from "./components/FORM_Components/AgentRegistrationManagement";
import WorkerRegistrationManagement from "./components/FORM_Components/WorkerRegistrationManagement";
import DemandSubmissionManagement from "./components/FORM_Components/DemandSubmissionManagement";
import ImageUpload from "./pages/ImageUpload";
import ContactUs from "./pages/ContactUs";
import Service from "./pages/Service";
import Project from "./pages/Project";
import QuoteForm from "./pages/QuoteForm";
import Sustainability from "./pages/Sustainability";
import CareersPage from "./pages/Career";

// Lazy-loaded pages
const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Gallery = React.lazy(() => import("./pages/Gallery"));
const Projects = React.lazy(() => import("./pages/Projects"));
const Services = React.lazy(() => import("./pages/Services"));
const Login = React.lazy(() => import("./components/Login"));

// Lazy-loaded admin pages
const HomeEditor = React.lazy(() =>
  import("./components/editor_components/HomeEditor")
);
const AboutEditor = React.lazy(() =>
  import("./components/editor_components/AboutEditor")
);
const ContactEditor = React.lazy(() =>
  import("./components/editor_components/ContactEditor")
);
const GalleryEditor = React.lazy(() =>
  import("./components/editor_components/GalleryEditor")
);
const ProjectsEditor = React.lazy(() =>
  import("./components/editor_components/ProjectsEditor")
);
const LayoutsEditor = React.lazy(() =>
  import("./components/editor_components/LayoutsEditor")
);
const ServicesEditor = React.lazy(() =>
  import("./components/editor_components/ServicesEditor")
);
const CreateAdmin = React.lazy(() => import("./components/CreateAdmin"));
const MessagesList = React.lazy(() => import("./components/MessagesList"));

const App = () => {
  useScrollAnimation();

  const router = createBrowserRouter([
    {
      path: "/login",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "home",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "about",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <About />
            </Suspense>
          ),
        },
        {
          path: "sustainability",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Sustainability></Sustainability>
            </Suspense>
          ),
        },
        
        {
          path: "career",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <CareersPage></CareersPage>
            </Suspense>
          ),
        },

        {
          path: "service",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Service></Service>
            </Suspense>
          ),
        },
        {
          path: "project",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Project></Project>
            </Suspense>
          ),
        },

        {
          path: "contact",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Contact />
            </Suspense>
          ),
        },
        {
          path: "gallery",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Gallery />
            </Suspense>
          ),
        },
        {
          path: "training",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Projects />
            </Suspense>
          ),
        },
        {
          path: "quote",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <QuoteForm></QuoteForm>
            </Suspense>
          ),
        },
        {
          path: "services",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Services />
            </Suspense>
          ),
          children: [
            {
              path: ":serviceSlug", // Dynamic route for individual services
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <Services />
                </Suspense>
              ),
            },
          ],
        },
        // {
        //   path: "demand-submission",
        //   element: (
        //     <Suspense fallback={<div>Loading...</div>}>
        //       <DemandSubmission />
        //     </Suspense>
        //   ),
        // },
        // {
        //   path: "medical-report",
        //   element: (
        //     <Suspense fallback={<div>Loading...</div>}>
        //       <MedicalReport />
        //     </Suspense>
        //   ),
        // },
        {
          path: "contact-us",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <ContactUs />
            </Suspense>
          ),
        },
        {
          path: "worker-registration",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <WorkerApplication />
            </Suspense>
          ),
        },
        {
          path: "apply-jobs-now",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <ApplyForJobs />
            </Suspense>
          ),
        },
        {
          path: "agent-registration",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <AgentRegistration />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/admin",
      element: <PrivateRoute element={<AdminLayout />} />,
      children: [
        { path: "image-upload", element: <ImageUpload /> },
        {
          path: "",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <HomeEditor />
            </Suspense>
          ),
        },
        {
          path: "home",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <HomeEditor />
            </Suspense>
          ),
        },
        {
          path: "about",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <AboutEditor />
            </Suspense>
          ),
        },
        {
          path: "contact",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <ContactEditor />
            </Suspense>
          ),
        },
        
        {
          path: "gallery",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <GalleryEditor />
            </Suspense>
          ),
        },
        {
          path: "projects",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <ProjectsEditor />
            </Suspense>
          ),
        },
        {
          path: "layouts",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <LayoutsEditor />
            </Suspense>
          ),
        },
        // {
        //   path: "services",
        //   element: (
        //     <Suspense fallback={<div>Loading...</div>}>
        //       <ServicesEditor />
        //     </Suspense>
        //   ),
        //   children: [
        //     {
        //       path: ":serviceSlug",  // Dynamic route for editing individual services
        //       element: (
        //         <Suspense fallback={<div>Loading...</div>}>
        //           <ServicesEditor />
        //         </Suspense>
        //       ),
        //     },
        //   ],
        // },
        {
          path: "create-admin",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <CreateAdmin />
            </Suspense>
          ),
        },
        {
          path: "messages-list",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <MessagesList />
            </Suspense>
          ),
        },
        {
          path: "forms-and-reports",
          children: [
            {
              path: "",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <FormsHome />
                </Suspense>
              ),
            },
            {
              path: "medical-reports",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <MedicalReportsManagement />
                </Suspense>
              ),
            },
            {
              path: "worker-registration",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <WorkerRegistrationManagement />
                </Suspense>
              ),
            },
            {
              path: "apply-now",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <ApplyNowManagement />
                </Suspense>
              ),
            },
            {
              path: "agent-registration",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <AgentRegistrationManagement />
                </Suspense>
              ),
            },
            {
              path: "demand-submission",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <DemandSubmissionManagement />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
