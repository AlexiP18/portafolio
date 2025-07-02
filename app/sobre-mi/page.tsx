"use client"

import { User, Briefcase, Heart, Award, Target, Star } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

interface Section {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  technologies?: string[];
}

const aboutMeData: Record<string, Section> = {
  introduction: {
    title: "Sobre mí",
    description: "¡Hola! Soy Alexis Poaquiza, futuro ingeniero de software apasionado por la tecnología y el desarrollo de soluciones innovadoras. Me considero una persona creativa y comprometida con el aprendizaje continuo.",
    icon: User
  },
  experience: {
    title: "Experiencia y especialización",
    description: "Me especializo en el área de Frontend y DevOps, pero también tengo conocimientos en tecnologías Backend. Aquí están algunas de las tecnologías que domino:",
    technologies: [
      "React", "Next.js", "TypeScript", "Tailwind CSS", "Docker", "AWS", "Node.js", "Python"
    ],
    icon: Briefcase
  },
  passion: {
    title: "Pasión y motivaciones",
    description: "La ingeniería de software me apasiona porque me permite transformar ideas en soluciones reales que impactan positivamente en las personas. Mi motivación principal es seguir aprendiendo y desarrollando proyectos que me desafíen y me permitan crecer profesionalmente.",
    icon: Heart,
    technologies: []
  },
  achievements: {
    title: "Logros relevantes",
    description: "A lo largo de mi trayectoria, he trabajado en proyectos destacados como aplicaciones web interactivas y sistemas automatizados. También he recibido reconocimientos en concursos de programación y he liderado equipos en proyectos colaborativos.",
    icon: Award,
    technologies: []
  },
  focus: {
    title: "Enfoque actual, lo que busco...",
    description: "Actualmente, busco oportunidades para crecer en el ámbito profesional, especialmente en roles que me permitan aplicar mis conocimientos en Frontend y DevOps, mientras sigo desarrollando habilidades en Backend. Mis objetivos a corto y mediano plazo incluyen contribuir a proyectos innovadores y consolidarme como un ingeniero de software integral.",
    icon: Target,
    technologies: []
  },
  hobbies: {
    title: "Hobbies",
    description: "Fuera del ámbito profesional, disfruto del senderismo, realizar actividades manuales como papercraft y origami, y explorar mi creatividad a través del dibujo artístico.",
    icon: Star,
    technologies: []
  },
  

};

export default function AboutMe() {
  return (
    <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-screen">
      {/* Introduction */}
      <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border flex flex-col justify-center items-center min-h-[400px] h-full w-full p-8">
        <div className="flex items-center mb-4">
          <aboutMeData.introduction.icon className="w-8 h-8 text-blue-500 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800 text-center">{aboutMeData.introduction.title}</h1>
        </div>
        <p className="text-gray-600 text-center max-w-xs lg:max-w-sm">{aboutMeData.introduction.description}</p>
      </div>

      {/* Accordion for other sections */}
      <div className="lg:col-span-2 w-full flex flex-col justify-center p-2 sm:p-4 md:p-8">
        <Accordion type="single" collapsible>
          {Object.entries(aboutMeData).map(([key, section]) => (
            key !== "introduction" && (
              <AccordionItem key={key} value={key} className="w-full">
                <AccordionTrigger className="flex items-center">
                  <section.icon className="w-6 h-6 text-blue-500 mr-2" />
                  <span className="text-lg font-semibold text-gray-800">{section.title}</span>
                </AccordionTrigger>
                <AccordionContent className="max-h-[300px] overflow-y-auto">
                  <p className="text-gray-600 mb-4">{section.description}</p>
                  {section.technologies && section.technologies.length > 0 && (
                    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {section.technologies.map((tech) => (
                        <li key={tech} className="text-gray-600 bg-gray-100 p-2 rounded shadow-sm text-center">{tech}</li>
                      ))}
                    </ul>
                  )}
                </AccordionContent>
              </AccordionItem>
            )
          ))}
        </Accordion>
      </div>
    </div>
  );
}
