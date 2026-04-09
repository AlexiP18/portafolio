export interface EducationItem {
  id: number
  institution: string
  degree: string
  logo: string
  location: string
  startDate: string
  endDate: string
  certificateUrl: string
  institutionUrl: string
}

export type CourseModality = "Presencial" | "Hibrido" | "Virtual"
export type CourseTechnology = "Frontend" | "Backend" | "Bases de datos" | "Despliegue" | "Otros"
export type CourseType = "Curso" | "Diplomado"

export interface Course {
  id: number
  title: string
  platform: string
  platformLogo: string
  modality: CourseModality
  technology: CourseTechnology
  type: CourseType
  hours: string
  year: number
  certificateUrl: string
  courseUrl: string
}

export type EventType = "Seminario" | "Congreso" | "Conferencia"

export interface AcademicEvent {
  id: number
  title: string
  organization: string
  organizationLogo: string
  modality: CourseModality
  type: EventType
  role: string
  duration: string
  year: number
  certificateUrl: string
  eventUrl: string
}

export const educationData: EducationItem[] = [
  {
    id: 1,
    institution: "Universidad Técnica de Ambato",
    degree: "Ingeniería de Software",
    logo: "https://univercimas.com/wp-content/uploads/2021/04/Universidad-Tecnica-de-Ambato.jpg",
    location: "Ambato, Ecuador",
    startDate: "Marzo 2020",
    endDate: "Junio 2026",
    certificateUrl:
      "https://verificarcarnet.uta.edu.ec/?identificacion_fun=02000000AE5C1A4E8DEC45FAB9EA9D35460A882B6F9098A72B6BB9327650063AB5B82AD801227686C071806F66906C3141DD9A00",
    institutionUrl:
      "https://verificarcarnet.uta.edu.ec/?identificacion_fun=02000000AE5C1A4E8DEC45FAB9EA9D35460A882B6F9098A72B6BB9327650063AB5B82AD801227686C071806F66906C3141DD9A00",
  },
]

export const coursesData: Course[] = [
  {
    id: 1,
    title: "SQL - Curso completo de Bases de Datos",
    platform: "UDEMY",
    platformLogo: "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg",
    modality: "Virtual",
    technology: "Bases de datos",
    type: "Curso",
    hours: "25 Horas",
    year: 2024,
    certificateUrl: "https://drive.google.com/file/d/17uA0bEVQWsZDrYDYMGgPVww0T7ngm3XY/view?usp=drive_link",
    courseUrl: "https://www.udemy.com/course/sql-curso-completo/",
  },
  {
    id: 2,
    title: "Angular - The Complete Guide (2025 Edition)",
    platform: "UDEMY",
    platformLogo: "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg",
    modality: "Virtual",
    technology: "Frontend",
    type: "Curso",
    hours: "32 Horas",
    year: 2025,
    certificateUrl: "https://drive.google.com/file/d/1adS7sk4GXfNoIQMs3RvsDyaqPdJJF0w4/view?usp=drive_link",
    courseUrl: "https://drive.google.com/file/d/1adS7sk4GXfNoIQMs3RvsDyaqPdJJF0w4/view?usp=drive_link",
  },
  {
    id: 3,
    title: "Python Essential 2",
    platform: "CISCO",
    platformLogo: "https://www.netacad.com/sfa-assets/images/svg/netacad_logo_black.svg",
    modality: "Hibrido",
    technology: "Otros",
    type: "Curso",
    hours: "20 Horas",
    year: 2024,
    certificateUrl: "https://drive.google.com/file/d/1Sq5KVEsOvKhUVm6kjSxN7cZFQnYk2Kds/view?usp=drive_link",
    courseUrl: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html",
  },
  {
    id: 4,
    title: "Diseño Web con HTML5 y CSS3",
    platform: "UDEMY",
    platformLogo: "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg",
    modality: "Virtual",
    technology: "Frontend",
    type: "Curso",
    hours: "20 Horas",
    year: 2024,
    certificateUrl: "https://drive.google.com/file/d/17vK_nWoBhHQq81BGoC82P8uMxhGGHf9n/view?usp=drive_link",
    courseUrl: "https://www.udemy.com/course/diseno-web-con-html5-css3/",
  },
  {
    id: 5,
    title: "Curso De Jasperreports y Jaspersoft Studio",
    platform: "UDEMY",
    platformLogo: "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg",
    modality: "Virtual",
    technology: "Backend",
    type: "Curso",
    hours: "20 Horas",
    year: 2024,
    certificateUrl: "https://drive.google.com/file/d/1Xp7nTh2T_2J8gGcmij4-A-8dKiYxGLwb/view?usp=drive_link",
    courseUrl: "https://aws.amazon.com/training/course-descriptions/cloud-practitioner-essentials/",
  },
  {
    id: 6,
    title: "SQL Server Analysis",
    platform: "UDEMY",
    platformLogo: "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg",
    modality: "Virtual",
    technology: "Bases de datos",
    type: "Curso",
    hours: "20 Horas",
    year: 2024,
    certificateUrl: "https://drive.google.com/file/d/1BWuNBOUtW1r1TQYlxt-deecLQpUE1OMs/view?usp=drive_link",
    courseUrl: "https://www.udemy.com/course/mongodb-the-complete-developers-guide/",
  },
  {
    id: 7,
    title: "Cisco Networking Academy - Curso de Especialización",
    platform: "CISCO",
    platformLogo: "https://www.netacad.com/sfa-assets/images/svg/netacad_logo_black.svg",
    modality: "Virtual",
    technology: "Otros",
    type: "Curso",
    hours: "20 Horas",
    year: 2025,
    certificateUrl: "https://drive.google.com/file/d/1gdGgawjKW_GetXE9c17CUrtCPV9hgVDf/view?usp=drive_link",
    courseUrl: "https://www.credly.com/badges/5dae5b28-fca1-46a5-b096-0ea26bfd1994/public_url",
  },
]

export const eventsData: AcademicEvent[] = [
  {
    id: 1,
    title: "III International Conference on Computer Science, Electronics and Industrial Engineering (CSEI 2021)",
    organization: "CSEI 2021",
    organizationLogo: "https://univercimas.com/wp-content/uploads/2021/04/Universidad-Tecnica-de-Ambato.jpg",
    modality: "Virtual",
    type: "Congreso",
    role: "Asistente",
    duration: "8 horas - 5 días",
    year: 2021,
    certificateUrl: "https://csei.uta.edu.ec/csei2025/#/inicio",
    eventUrl: "https://csei.uta.edu.ec/csei2025/#/inicio",
  },
  {
    id: 2,
    title: "IV International Conference on Computer Science, Electronics and Industrial Engineering (CSEI 2022)",
    organization: "CSEI 2022",
    organizationLogo: "https://univercimas.com/wp-content/uploads/2021/04/Universidad-Tecnica-de-Ambato.jpg",
    modality: "Virtual",
    type: "Congreso",
    role: "Asistente",
    duration: "8 horas - 5 días",
    year: 2022,
    certificateUrl: "https://csei.uta.edu.ec/csei2025/#/inicio",
    eventUrl: "https://csei.uta.edu.ec/csei2025/#/inicio",
  },
  {
    id: 3,
    title: "V International Conference on Computer Science, Electronics and Industrial Engineering (CSEI 2023)",
    organization: "CSEI 2023",
    organizationLogo: "https://univercimas.com/wp-content/uploads/2021/04/Universidad-Tecnica-de-Ambato.jpg",
    modality: "Virtual",
    type: "Congreso",
    role: "Asistente",
    duration: "8 horas - 5 días",
    year: 2023,
    certificateUrl: "https://csei.uta.edu.ec/csei2025/#/inicio",
    eventUrl: "https://csei.uta.edu.ec/csei2025/#/inicio",
  },
  {
    id: 4,
    title: "VI International Conference on Computer Science, Electronics and Industrial Engineering (CSEI 2024)",
    organization: "CSEI 2024",
    organizationLogo: "https://univercimas.com/wp-content/uploads/2021/04/Universidad-Tecnica-de-Ambato.jpg",
    modality: "Virtual",
    type: "Congreso",
    role: "Asistente",
    duration: "8 horas - 5 días",
    year: 2024,
    certificateUrl: "https://csei.uta.edu.ec/csei2025/#/inicio",
    eventUrl: "https://csei.uta.edu.ec/csei2025/#/inicio",
  },
  {
    id: 5,
    title: "VII International Conference on Computer Science, Electronics and Industrial Engineering (CSEI 2025)",
    organization: "CSEI 2025",
    organizationLogo: "https://univercimas.com/wp-content/uploads/2021/04/Universidad-Tecnica-de-Ambato.jpg",
    modality: "Virtual",
    type: "Congreso",
    role: "Asistente",
    duration: "8 horas - 5 días",
    year: 2025,
    certificateUrl: "https://csei.uta.edu.ec/csei2025/#/inicio",
    eventUrl: "https://csei.uta.edu.ec/csei2025/#/inicio",
  },
]
