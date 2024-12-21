"use client"
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { parseISO, format, formatDistance, differenceInMonths } from 'date-fns';

export default function Home() {
    const [projectarray, setprojectarray] = useState([])
    const [names, setnames] = useState([])
    const [namescore, setnamescore] = useState([])

    const saveproject = async () => {
        let a = await fetch("/api")
        let project = await a.json();
        if (project) {
            setprojectarray(project)
        }
        project.forEach((item) => {
            if (!names.includes(item.val.intern)) {
                names.push(item.val.intern)
                namescore.push({name:item.val.intern, score: parseInt(item.val.complete, 10), max:100}); 
            }
            else{
                addScore(item.val.intern,parseInt(item.val.complete, 10),100);
            }
        })
    }
    useEffect(() => {
        saveproject()
    }, [])

    const addScore = (targetName,sscore,max) => {
        setnamescore((prevNames) =>
          prevNames.map((person) =>
            person.name === targetName
              ? { ...person, score: person.score + sscore , max: person.max+100}
              : person
          )
        );
      };

    return (<>
        <div className="text-center w-[98.9vw] bg-gradient-to-b from-green-50 to-green-200 min-h-screen">
            <div className=" text-[40px] px-10 font-bold ">PROJECT-MANAGER</div>
            <div className="text-[20px]">Check your Intern's Progress</div>
            <div className="text-[20px] font-bold mb-10">Intern's Score Information</div>
            {projectarray.length == 0 && <div> NO INTERNS TO SHOW</div>}
            {(projectarray.length == 0) ? null :
                namescore.map((name) => (
                    <div>
                        <p className="text-[20px] px-10 font-bold uppercase">{name.name}</p>
                        <p className="text-[20px] px-10 font-bold uppercase">score ={Math.round(name.score/name.max*100)}</p>
                        <div className="container w-[90vw] my-[15px] text-center mx-auto">
                            <table className="table-auto w-full border-collapse border border-gray-500">
                                <thead>
                                    <tr className="bg-green-900 text-white">
                                        <th className="border border-gray-500 px-4 py-2">TITLE</th>
                                        <th className="border border-gray-500 px-4 py-2">DATE START</th>
                                        <th className="border border-gray-500 px-4 py-2">DEADLINE</th>
                                        <th className="border border-gray-500 px-4 py-2">LEADER</th>
                                        <th className="border border-gray-500 px-4 py-2">TEAM MEMBERS</th>
                                        <th className="border border-gray-500 px-4 py-2">COMPLETION</th>
                                        <th className="border border-gray-500 px-4 py-2">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projectarray.map((item) => (
                                        (item.val.intern == name.name) ?
                                        
                                            <tr key={item.id} className="bg-green-300 text-center">
                                                <td className="border border-gray-500 px-4 py-2">{item.val.title}</td>
                                                <td className="border border-gray-500 px-4 py-2">{format(item.val.start, 'd MMMM yyyy')}</td>
                                                <td className="border border-gray-500 px-4 py-2">{format(item.val.end, 'd MMMM yyyy')}</td>
                                                <td className="border border-gray-500 px-4 py-2">{item.val.leader}</td>
                                                <td className="border border-gray-500 px-4 py-2">{item.val.intern}</td>
                                                <td className="border border-gray-500 px-4 py-2">
                                                    <div className="flex items-center justify-center">
                                                        <p className="font-bold text-[18px] ml-5">{item.val.complete}</p>
                                                    </div>
                                                </td>
                                                <td className="border border-gray-500 px-4 py-2">{
                                                    item.val.status
                                                }</td>
                                            </tr> : null))}
                                </tbody>
                            </table>
                        </div></div>
                ))
            }
        </div>
    </>
    );
}
