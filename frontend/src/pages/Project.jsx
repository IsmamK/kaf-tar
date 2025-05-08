import ProjectCard from "../components/project/ProjectCard";
import ProjectGallery from "../components/project/ProjectGallery";

const Project = () => {
    return (
        <div>
            <div>
                <ProjectGallery></ProjectGallery>
            </div>
            <div>
                <ProjectCard></ProjectCard>
            </div>
        </div>
    );
};

export default Project;