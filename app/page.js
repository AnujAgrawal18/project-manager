"use client"

import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return (
    <div className="bg-blue-600 text-gray-800 overflow-x-hidden">
      <section className="bg-[url('https://t4.ftcdn.net/jpg/03/20/48/11/360_F_320481159_jHPOQEiPU26ZkjHeKIxV1sQyWQWMirCH.jpg')] bg-cover text-white text-center py-5 flex flex-row justify-evenly items-center ">
        <div className="w-[40vw]">
          <h1 className="text-5xl font-bold mb-4">Welcome to IONOTS-TASK-MANAGER</h1>
          <p className="text-xl mb-8">To save time, faster growth, and provide the ideal Experience</p>
          <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row">
            <a className="bg-blue-900 text-white py-3 px-6 rounded-full text-lg hover:cursor-pointer mr-5 hover:bg-blue-800" onClick={() => router.push('/intern')}>Assigned task for intern</a>
            <a className="bg-blue-900 text-white py-3 px-6 rounded-full text-lg hover:cursor-pointer hover:bg-blue-800" onClick={() => router.push('/company')}>Assign task to intern</a>
          </div>
          <a className="bg-blue-900 text-white my-3 py-3 px-3 rounded-full text-lg hover:cursor-pointer hover:bg-blue-800 w-[65%]" onClick={() => router.push('/internscore')}>Check Intern's Score</a></div>
        </div>
        <div>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtO17bU49IwrHZQQyhFEuv-VNbfRB0HH6t4A&s" alt="" className="h-[565px] w-[40vw] rounded-full" />
        </div>
      </section>

      <section id="about" className="py-8 bg-white">
        <div className="mx-20 text-left flex justify-evenly items-center">
          <div className="w-[500px]">
            <h2 className="text-4xl font-bold mb-8">About Us</h2>
            <p className="text-lg mb-8">At IONOTS-TASK-MANAGER, we harness the potential of real-time, project-based learning to empower individuals in the fields of Data Science and Artificial Intelligence. Our platform is designed to provide a dynamic educational experience that bridges the gap between theory and practical application. With a focus on hands-on projects, we cultivate an environment where learners can develop essential skills that prepare them for the demands of the tech industry.</p>
          </div>
          <div className="w-[500px]">
            <img src="https://www.simplilearn.com/ice9/free_resources_article_thumb/Top_5_Roles_of_an_Effective_Project_Manager.jpg" alt="About Us" className="rounded-lg" />
          </div>
        </div>
      </section>

      <section id="features" className="py-8 bg-gray-100">
        <div className="mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Explore Our Features</h2>
          <div className="flex flex-row justify-evenly">
            <div>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0gdR5_5f7zn2UO9JdQXUwt1NzRnP_iqF4yw&s" alt="" className="h-[650px] w-[600px]" />
            </div>
            <div className="">
              <div className="bg-white p-5 rounded-lg shadow-md flex flex-row w-[700px]">
                <img src="https://www.kendomanager.com/wp-content/uploads/2019/10/project-manager.png" alt="Feature 1" className="h-[160px] w-[120px]" />
                <div className="ml-[30px] text-left">
                  <h3 className="text-2xl font-bold mb-2">Project Assignment Module </h3>
                  <p> Streamline your learning experience with our Project Assignment Module. This feature allows candidates to view, accept, and manage their project assignments effectively. Our user-friendly interface ensures that you can easily track your progress and stay organized as you navigate through your learning journey.</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-md flex flex-row w-[700px] my-4">
                <img src="https://www.kendomanager.com/wp-content/uploads/2019/10/project-manager.png" alt="Feature 2" className="h-[160px] w-[120px]" />
                <div className="ml-[30px] text-left">
                  <h3 className="text-2xl font-bold mb-2">Progress Tracking and Scoring System</h3>
                  <p> Stay informed about your development with our Progress Tracking and Scoring System. This innovative mechanism monitors your progress and calculates scores based on task completion. With dynamic data storage and display, you can visualize your growth and achievements throughout your training.</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-md flex flex-row w-[700px]">
                <img src="https://www.kendomanager.com/wp-content/uploads/2019/10/project-manager.png" alt="Feature 3" className="h-[160px] w-[120px]" />
                <div className="ml-[30px] text-left">
                  <h3 className="text-2xl font-bold mb-2">Expert Guidance and Support</h3>
                  <p> Benefit from the expertise of our dedicated support team. At IONOTS-TASK-MANAGER, we provide guidance and resources to help you navigate your projects successfully. Our commitment to your learning experience ensures that you have the support you need to thrive in your data science and AI journey.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
