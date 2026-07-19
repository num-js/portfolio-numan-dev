export type SemMark = {
  sem: string;
  marks: string;
  link: string;
};

export type AcademicEntry = {
  id: string;
  icon: "college" | string;
  course: string;
  board: string;
  institution: string;
  timeline: string;
  stream?: string;
  marks: {
    label: string;
    percentage: string;
    docTitle: string;
    link: string;
    semMarks?: {
      headers: string[];
      rows: SemMark[];
    };
  };
};

export const academicsContent: AcademicEntry[] = [
  {
    id: "bca",
    icon: "college",
    institution: "George College",
    timeline: "2017 - 2020",
    board: "Maulana Abul Kalam Azad University of Technology (MAKAUT)",
    course: "Bachelor of Computer Application (BCA)",
    marks: {
      label: "DGPA:",
      percentage: "8.01 / 10",
      docTitle: "Bachelor Degree",
      link: "https://raw.githubusercontent.com/mdnmnahmed/personal-resourses/certi/certifications/BCA-Provisional%20Certificate.jpg",
      semMarks: {
        headers: ["Semester", "Marks", ""],
        rows: [
          {
            sem: "1st Sem",
            marks: "7.57",
            link: "https://raw.githubusercontent.com/mdnmnahmed/personal-resourses/certi/marksheets/bca/sem-1.jpg",
          },
          {
            sem: "2nd Sem",
            marks: "7.29",
            link: "https://raw.githubusercontent.com/mdnmnahmed/personal-resourses/certi/marksheets/bca/sem-2.jpg",
          },
          {
            sem: "3rd Sem",
            marks: "6.86",
            link: "https://raw.githubusercontent.com/mdnmnahmed/personal-resourses/certi/marksheets/bca/sem-3.jpg",
          },
          {
            sem: "4th Sem",
            marks: "7.74",
            link: "https://raw.githubusercontent.com/mdnmnahmed/personal-resourses/certi/marksheets/bca/sem-4.jpg",
          },
          {
            sem: "5th Sem",
            marks: "8.68",
            link: "https://raw.githubusercontent.com/mdnmnahmed/personal-resourses/certi/marksheets/bca/sem-5.jpg",
          },
          {
            sem: "6th Sem",
            marks: "9.93",
            link: "https://raw.githubusercontent.com/mdnmnahmed/personal-resourses/certi/marksheets/bca/sem-6.jpg",
          },
        ],
      },
    },
  },
  {
    id: "hs",
    icon: "12",
    institution: "Islampur High School",
    timeline: "2015 - 2017",
    board: "West Bengal Council of Higher Secondary Education (WBCHSE)",
    course: "Higher Secondary Education (10+2)",
    stream: "Commerce & Computer Application",
    marks: {
      label: "Marks:",
      percentage: "68%",
      docTitle: "Higher Secondary Result",
      link: "https://raw.githubusercontent.com/mdnmnahmed/personal-resourses/certi/marksheets/hs/HS-Marksheet.jpg",
    },
  },
];
