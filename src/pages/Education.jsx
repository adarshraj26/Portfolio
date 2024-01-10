import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import { CTA } from "../components";
import { educations } from "../constants";

import "react-vertical-timeline-component/style.min.css";

const Education = () => {
  return (
    <section className="max-container">
      {/* <h1 className='head-text'>
          Hello, I'm{" "}
          <span className='blue-gradient_text font-semibold drop-shadow'>
            {" "}
            Adarsh Raj
          </span>{" "}
          👋
        </h1>
  
        <div className='mt-5 flex flex-col gap-3 text-slate-500'>
          <p>
            Frontend Developer, specializing in technical
            education through hands-on learning and building applications.
          </p>
        </div> */}

      <div>
        <h1 className="head-text">
          My{" "}
          <span className="blue-gradient_text drop-shadow font-semibold">
            Education
          </span>
        </h1>
        <div className="mt-5 flex flex-col gap-3 text-slate-500">
          <p>
            I have completed my education from different school and colleges.
            Here's the rundown:
          </p>
        </div>

        <div className="mt-12 flex">
          <VerticalTimeline>
            {educations.map((education, index) => (
              <VerticalTimelineElement
                key={education.company_name}
                date={education.date}
                iconStyle={{ background: education.iconBg }}
                icon={
                  <div className="flex justify-center items-center w-full h-full">
                    {/* <img
                        src={education.icon}
                        alt={education.company_name}
                        className='w-[60%] h-[60%] object-contain'
                      /> */}
                  </div>
                }
                contentStyle={{
                  borderBottom: "8px",
                  borderStyle: "solid",
                  borderBottomColor: education.iconBg,
                  boxShadow: "none",
                }}
              >
                <div>
                  <h3 className="text-black text-xl font-poppins font-semibold">
                    {education.title}
                  </h3>
                  <p
                    className="text-black-500 font-medium text-base"
                    style={{ margin: 0 }}
                  >
                    {education.company_name}
                  </p>
                </div>

                <ul className="my-5 list-disc ml-5 space-y-2">
                  {education.points.map((point, index) => (
                    <li
                      key={`experience-point-${index}`}
                      className="text-black-500/50 font-normal pl-1 text-sm"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>

      <hr className="border-slate-200" />

      <CTA />
    </section>
  );
};

export default Education;
