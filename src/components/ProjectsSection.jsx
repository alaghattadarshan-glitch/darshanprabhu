import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

const ProjectsSection = () => {
  return (
    <section id="projects" className="section container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', padding: '4rem 0' }}>
      <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable={true} glareMaxOpacity={0.2} scale={1.02} style={{ width: '100%' }}>
        <a 
          href="https://github.com/alaghattadarshan-glitch?tab=repositories" 
          target="_blank" 
          rel="noreferrer"
          style={{ textDecoration: 'none', display: 'block', position: 'relative', width: '100%' }}
          className="project-link-massive"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', padding: '2rem' }}
          >
            <h2 className="project-title-massive">
              PROJECTS
            </h2>
            <div className="project-hover-text">
              View on GitHub <ExternalLink size={24} />
            </div>
          </motion.div>
        </a>
      </Tilt>
    </section>
  );
};

export default ProjectsSection;
