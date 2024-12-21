"use client"
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { parseISO, format, formatDistance, differenceInMonths } from 'date-fns';

export default function Home() {
    const ref = useRef()
    const [projectarray, setprojectarray] = useState([])
    const [filter, setfilter] = useState([])

    const saveproject = async () => {
        let a = await fetch("/api")
        let project = await a.json();
        if (project) {
            setprojectarray(project)
        }
        filter.end="null"
        filter.status="null"
    }
    useEffect(() => {
        saveproject()
    }, [])


    const progressbar = async (e) => {
        let id = e.target.name;
        let index = projectarray.findIndex(item => {
            return item.id === id
        })
        let newprojectarray = [...projectarray]
        newprojectarray[index].val.complete = e.target.value;
        (e.target.value == 100) ? newprojectarray[index].val.status = "completed" : newprojectarray[index].val.status = "pending"
        newprojectarray[index].id = id
        let arr = newprojectarray[index].val
        let a = await fetch("/api", { method: "DELETE", body: JSON.stringify({ id }), headers: { 'content-type': 'application/json' } })
        let b = await fetch("/api", { method: "POST", body: JSON.stringify({ id, val: arr }), headers: { 'content-type': 'application/json' } })
        setprojectarray(newprojectarray)
    }
    const changestatus = async (e) => {
        let id = e.target.name;
        let index = projectarray.findIndex(item => {
            return item.id === id
        })
        let newprojectarray = [...projectarray]
        newprojectarray[index].val.status = e.target.value
        newprojectarray[index].id = id
        let arr = newprojectarray[index].val
        let a = await fetch("/api", { method: "DELETE", body: JSON.stringify({ id }), headers: { 'content-type': 'application/json' } })
        let b = await fetch("/api", { method: "POST", body: JSON.stringify({ id, val: arr }), headers: { 'content-type': 'application/json' } })
        setprojectarray(newprojectarray)
    }

    const onfilterdate = (e) => {
        setfilter({ end: e.target.value, status: filter.status });
    };
    const onfilterstatus = (e) => {
        setfilter({ end: filter.end, status: e.target.value });
    };

    return (<>
        <div className="text-center w-[98.9vw] bg-gradient-to-b from-green-50 to-green-200 min-h-screen">
            <div className=" text-[40px] px-10 font-bold ">PROJECT-MANAGER</div>
            <div className="text-[20px]">Track your projects</div>
            <div className="text-[20px] font-bold">Project Information</div>
            <div className="flex flex-row justify-end items-center mr-16">
                <p className="font-bold text-[15px] mx-5 justify-center items-center">Filter By- </p>
                <div className="flex flex-row justify-end items-center "><p className="font-bold text-[15px] mx-5">deadline :</p>
                    <input className="w-[60%] h-[40px] mr-2 rounded-[20px] border-[2px] border-green-600 px-7" type="date" onChange={(e) => { onfilterdate(e) }} value={filter.end} />
                </div>
                <div className="flex flex-row justify-end items-center"><p className="font-bold text-[15px]  w-[50%]">Status :</p>
                    <select name="status" className="w-[80%] h-[40px]  rounded-[20px] border-[2px] border-green-600 pl-5" onChange={(e) => { onfilterstatus(e) }} value={filter.status}>
                        <option value="null" >select</option>
                        <option value="completed">completed</option>
                        <option value="pending">pending</option>
                        <option value="unaccepted">unaccepted</option>
                        <option value="rejected">rejected</option>
                    </select>
                    <button className="w-[70%] h-[40px] ml-5 text-[12px] text-white rounded-[20px] border-[2px] border-green-600 px-7 bg-green-950" onClick={(e)=>{setfilter({end:"null", status:"null"})}} >remove filters</button>
                </div>
            </div>
            {projectarray.length == 0 && <div> NO PROJECTS TO SHOW</div>}
            {(projectarray.length == 0) ? null :
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
                                (filter.end == "null" || new Date(item.val.end) >= new Date(filter.end) && (filter.status == "null" || item.val.status == filter.status)) ?
                                    <tr key={item.id} className="bg-green-300 text-center">
                                        <td className="border border-gray-500 px-4 py-2">{item.val.title}</td>
                                        <td className="border border-gray-500 px-4 py-2">{format(item.val.start, 'd MMMM yyyy')}</td>
                                        <td className="border border-gray-500 px-4 py-2">{format(item.val.end, 'd MMMM yyyy')}</td>
                                        <td className="border border-gray-500 px-4 py-2">{item.val.leader}</td>
                                        <td className="border border-gray-500 px-4 py-2">{item.val.intern}</td>
                                        <td className="border border-gray-500 px-4 py-2">
                                            <div className="flex items-center justify-center">
                                                <input type="range" min={0} max={100} step={10} onInput={e => { progressbar(e) }} name={item.id} className={"accent-red-{item.val.complete}"} defaultValue={item.val.complete} />
                                                <p className="font-bold text-[18px] ml-5">{item.val.complete}</p>
                                            </div>
                                        </td>
                                        <td className="border border-gray-500 px-4 py-2">{(item.val.status == "unaccepted") ?
                                            <div><button className="bg-blue-900 text-white py-2 px-2 rounded-full text-sm hover:cursor-pointer mr-5 hover:bg-blue-800" onClick={(e) => { changestatus(e) }} name={item.id} value={"accept"}>Accept</button>
                                                <button className="bg-red-900 text-white py-2 px-2 rounded-full text-sm hover:cursor-pointer hover:bg-red-800" onClick={(e) => { changestatus(e) }} name={item.id} value={"reject"}>Reject</button></div>
                                            : item.val.status
                                        }</td>
                                    </tr> : null))}
                        </tbody>
                    </table>
                </div>}
        </div>
    </>
    );
}
