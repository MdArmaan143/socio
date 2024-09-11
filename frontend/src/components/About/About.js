import React from "react";

const About = () => {
  return (
    <div className="pt-24 h-screen">
      <h1 className="font-bold text-5xl mb-2">
        Connecting the <span className="text-indigo-700">Campus Community</span>
      </h1>
      <h5 className="font-medium text-2xl mb-6">
        Campus Connect provides a comprehensive platform for students, colleges,
        and societies to engage, collaborate, and thrive.
      </h5>
      <div className="border-t border-slate-400 mx-8"></div>
      <div className="flex justify-between flex-wrap">
        <div className="text-left flex-1 m-8">
          <h1 className="font-bold text-3xl mb-2">For College</h1>
          <h5 className="font-medium text-xl mb-2 text-slate-600">
            Discover your perfect college, connect with like-minded students,
            and get involved in campus life.
          </h5>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-md p-2 hover:bg-indigo-100">
              <h3 className="font-bold text-3xl">
                <i class="fa-solid fa-magnifying-glass"></i>
              </h3>
              <h5 className="font-semibold text-2xl mb-2">Find Colleges</h5>
              <p className="font-meduim">
                Exlore colleges and programs that matches your interest.
              </p>
            </div>
            <div className="rounded-md p-2 hover:bg-indigo-100">
              <h3 className="font-bold text-3xl">
                <i class="fa-solid fa-people-roof"></i>
              </h3>
              <h5 className="font-semibold text-2xl mb-2">Join Communties</h5>
              <p className="font-meduim">
                connect with the student who share your passion and interset.
              </p>
            </div>
            <div className="rounded-md p-2 hover:bg-indigo-100">
              <h3 className="font-bold text-3xl">
                <i class="fa-regular fa-calendar"></i>
              </h3>
              <h5 className="font-semibold text-2xl mb-2">Attend Events</h5>
              <p className="font-meduim">
                Discover and participate in campus events and activities.
              </p>
            </div>
            <div className="rounded-md p-2 hover:bg-indigo-100">
              <h3 className="font-bold text-3xl">
                <i class="fa-solid fa-person"></i>
              </h3>
              <h5 className="font-semibold text-2xl mb-2">Manage Profile</h5>
              <p className="font-meduim">
                Showcase your achivement and interest to colleges and societies.
              </p>
            </div>
          </div>
        </div>

        <div className="text-left flex-1 m-8">
          <h1 className="font-bold text-3xl mb-2">For Student</h1>
          <h5 className="font-medium text-xl mb-2 text-slate-600">
            Attract top talent, engage with your student community, and showcase
            your campus.
          </h5>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-md p-2 hover:bg-indigo-100">
              <h3 className="font-bold text-3xl">
              <i class="fa-regular fa-building"></i>  
              </h3>
              <h5 className="font-semibold text-2xl mb-2">Create Profile</h5>
              <p className="font-meduim">
                Showcase your campuss, programs, and student life to prospective students.
              </p>
            </div>
            <div className="rounded-md p-2 hover:bg-indigo-100">
              <h3 className="font-bold text-3xl">
              <i class="fa-regular fa-bag-shopping"></i>
              </h3>
              <h5 className="font-semibold text-2xl mb-2">Manage Admisions</h5>
              <p className="font-meduim">
                Streamline your admission process and connect with qualified applicants.
              </p>
            </div>
            <div className="rounded-md p-2 hover:bg-indigo-100">
              <h3 className="font-bold text-3xl">
              <i class="fa-solid fa-people-roof"></i>
              </h3>
              <h5 className="font-semibold text-2xl mb-2">Engage Communities</h5>
              <p className="font-meduim">
                Foster a vibrant campus community and connect with student socities.
              </p>
            </div>
            <div className="rounded-md p-2 hover:bg-indigo-100">
              <h3 className="font-bold text-3xl">
              <i class="fa-solid fa-circle-exclamation"></i>
              </h3>
              <h5 className="font-semibold text-2xl mb-2">Analyze Insights</h5>
              <p className="font-meduim">
                Gain valuable insight into your student community and admision trends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
