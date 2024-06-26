"use client"
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useForm} from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { parseISO, format, formatDistance, differenceInMonths } from 'date-fns';

export default function Home() {
  const ref = useRef()
  const [projectarray, setprojectarray] = useState([])
  const { register, handleSubmit , setValue} = useForm();

  const saveproject = async () => {
    let a = await fetch("/api")
    let projects = localStorage.getItem("projects")
    let project = await a.json();
    if (projects) {
      setprojectarray(JSON.parse(projects))
      // setprojectarray(project)
    }
  }
  useEffect(() => {
    if (!projectarray) localStorage.setItem("projects", JSON.stringify([{ id: uuidv4(), val: { complete: 0, end: "2024-07-27", intern: "Aditya , Deepanshu, Rohit", leader: "Anuj Agrawal", start: "2024-06-20", "title": "Sustainable Development" } }]))
    saveproject()
  }, [])


  const onSubmit = async (val) => {
    if (val.title.length === 0 || val.intern.length === 0 || val.leader.length === 0 || val.start.length===0 || val.end.length===0) {
      alert("field is empty")
    }
    else {
      val.complete = 0
      setprojectarray([...projectarray, { id: uuidv4(), val }])
      let a = await fetch("/api", { method: "POST", body: JSON.stringify({ id: uuidv4(), val }), headers: { 'content-type': 'application/json' } })
      localStorage.setItem("projects", JSON.stringify([...projectarray, { id: uuidv4(), val }]))
      ref.current.reset()
    }
  }

  const handledelete = async (e) => {
    let conf = confirm("do you want to delete the project?")
    let id = e.target.name
    let newprojectarray = projectarray.filter(item => item.id !== id)
    if (conf) {
      let a = await fetch("/api", { method: "DELETE", body: JSON.stringify({ id: id }), headers: { 'content-type': 'application/json' } })
      localStorage.setItem("projects", JSON.stringify(newprojectarray))
      setprojectarray(newprojectarray)
    }
  }

  const handleedit = async (e) => {
    let pro = projectarray.filter(item => item.id === e.target.name)[0]
    setValue("title", pro.val.title);
    setValue("intern", pro.val.intern);
    setValue("leader", pro.val.leader);
    setValue("start", format(pro.val.start , 'yyyy-MM-dd'));
    setValue("end", format(pro.val.start , 'yyyy-MM-dd'));
    let id = e.target.name
    let newprojectarray = projectarray.filter(item => item.id !== id)
    setprojectarray(projectarray.filter(item => item.id !== id))
    localStorage.setItem("projects", JSON.stringify(newprojectarray))
  }
  const progressbar = async (e) => {
    let id = e.target.name;
    let index = projectarray.findIndex(item => {
      return item.id === id
    })
    let newprojectarray = [...projectarray]
    newprojectarray[index].val.complete = e.target.value
    let arr = newprojectarray[index].val
    let a = await fetch("/api", { method: "DELETE", headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: id }) })
    let b = await fetch("/api", { method: "POST", headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id, arr }) })
    localStorage.setItem("projects", JSON.stringify(newprojectarray))
    setprojectarray(newprojectarray)
  }

  return (<>
    <div className="text-center w-[100vw] bg-gradient-to-b from-green-50 to-green-200 h-screen">
      <div className=" text-[40px] px-10 font-bold ">PROJECT-MANAGER</div>
      <div className="text-[20px]">Track your projects</div>
      <form className="mx-auto w-[90vw] lg:w-[50vw] my-5 flex flex-col items-center" onSubmit={handleSubmit(onSubmit)} ref={ref} action="./api/data" method="post" netlify="true">
        <input {...register("title")} className="w-full h-[40px] m-[15px] rounded-[20px] border-[2px] border-green-600 px-7" type="text" placeholder="Enter Title of your project" />
        <div className="flex align-middle justify-evenly relative w-full">
          <img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" alt="" className="w-[30px] h-[30px] absolute top-[1.3em] right-[52%] invisible lg:visible" />
          <input placeholder="Enter Team Members name" className=" w-[48%] h-[40px] my-[15px] rounded-[20px] border-[2px] border-green-600 px-7" type="text"  {...register("intern")} />
          <img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" alt="" className="w-[30px] h-[30px] absolute top-[1.3em] right-[1em] invisible lg:visible" />
          <input placeholder="Enter project head's name" className=" w-[48%] h-[40px] my-[15px]  rounded-[20px] border-[2px] border-green-600 px-7" type="text"  {...register("leader")} />
        </div>
        <div className="flex justify-center items-center flex-col lg:flex-row">
          <p className="font-bold text-[20px] mx-5">Start Date :</p>
          <input className="pasword w-full lg:w-[28%] h-[40px] my-[15px] rounded-[20px] border-[2px] border-green-600 px-7" type="date"  {...register("start")} />
          <p className="font-bold text-[20px] mx-5">End Date :</p>
          <input className="pasword w-full lg:w-[28%] h-[40px] my-[15px] rounded-[20px] border-[2px] border-green-600 px-7" type="date"  {...register("end")} />
        </div>
        <div className="text-center w-full "><button className="w-full h-[40px] m-[15px] rounded-[20px] bg-green-800 text-white" type="submit">Save </button></div>
      </form>
      <div className="text-[20px] font-bold">Project Information</div>
      {projectarray.length == 0 && <div> NO PROJECTS TO SHOW</div>}
      {projectarray.length != 0 &&
        <div className="container w-[80vw] my-[15px] text-center mx-auto">
          <div className="w-[100%] h-auto bg-green-900 text-white flex py-2 border-[2px] border-black flex-col lg:flex-row">
            <div className="flex lg:w-[50%] w-[100%] lg:pb-0 pb-2 mx-0 px-0 items-center align-middle">
              <p className="w-[40%]">TITLE</p>
              <p className="w-[30%]">DATE START</p>
              <p className="w-[30%]">DEADLINE</p>
              <p className="w-[30%]">LEADER</p>
            </div>
            <div className="flex lg:w-[50%] w-[100%] lg:pt-0 pt-2 mx-0 px-0 border-t-2 border-black lg:border-none align-middle">
              <p className="w-[40%]">TEAM MEMBERS</p>
              <p className="w-[40%]">COMPLETION</p>
              <p className="w-[20%]">EDIT</p>
              <p className="w-[20%]">DELETE</p>
            </div>
          </div>
          {
            projectarray.map(item => {
              return (
                <div className="card w-[100%] h-auto bg-green-300 flex border-[2px] border-black text-center items-center py-2 flex-col lg:flex-row" key={item.id}>
                  <div className="flex lg:w-[50%] w-[100%] lg:pb-0 pb-2 mx-0 px-0">
                  <div className="w-[40%]" >{item.val.title}</div>
                  <div className="w-[30%] ">{format(item.val.start ,'d MMMM yyyy')}</div>
                  <div className="w-[30%] ">{format(item.val.end ,'d MMMM yyyy')}</div>
                  <div className="w-[30%] flex flex-row items-center"><img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" alt="" className="w-[35px] h-[35px] mr-2" />{item.val.leader}</div></div>
                  <div className="flex lg:w-[50%] w-[100%] lg:pt-0 pt-2 mx-0 px-0 border-t-2 border-black lg:border-none"><div className="w-[38%] text-wrap px-[0.75%] ">{item.val.intern}</div>
                  <div className="w-[40%] flex justify-center flex-col">
                    <input type="range" min={0} max={100} step={10} onInput={e => { progressbar(e) }} name={item.id} className={"accent-red-{item.val.complete}"} defaultValue={item.val.complete} />
                    <p className="font-bold text-[18px] ml-5">{item.val.complete}</p>
                  </div>
                  <div className="w-[20%] flex justify-center"><img className="w-[25%] h-[55%] mx-auto" src="https://cdn-icons-png.flaticon.com/128/2356/2356780.png" alt="" onClick={handleedit} name={item.id} /></div>
                  <div className="w-[20%] flex justify-center" ><img className="w-[25%] h-[55%] mx-auto" src="https://cdn-icons-png.flaticon.com/128/3405/3405244.png" alt="" onClick={handledelete} name={item.id} /></div></div>
                </div>
              
              )
            })
          }
        </div>}
    </div>
  </>
  );
}
