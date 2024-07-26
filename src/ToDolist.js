import { useState,useEffect } from "react";


export const ToDolist = () => {

    function  getStored(){
        let data=localStorage.getItem("todos")
        let jsondata = JSON.parse(data)
            return jsondata || []
    }

    const [todos,setTodos]=useState(getStored)

    useEffect(()=>{
        localStorage.setItem("todos",JSON.stringify(todos))
    },[todos])

    function handleSubmitTask(e){
        e.preventDefault();
        let task=e.target.task.value;
        if(!task){
            alert("Plese provide a valid task!")
            return
        }
        setTodos([...todos, {task:task,completed:false}])
        e.target.reset()
    }

    function changestatus(index){
        let newTodoList = [...todos]
        newTodoList[index].completed=!newTodoList[index].completed
        setTodos(newTodoList)
    }

    function deleteTask(index){
        let newTodoList=[...todos]
        newTodoList.splice(index,1)
        setTodos(newTodoList)
    }

    function updateTask(index){
        let newTodoList = [...todos]
        let data=newTodoList[index].task
        let updatedData=prompt("update the task ",data)
        if(updatedData){
            newTodoList[index].task=updatedData
        }
        else{
            alert("enter task to update")
        }
        setTodos(newTodoList)
    }

  return (
    <div className="container my-3">
        <div className="mx-auto rounded border p-4 " style={{backgroundColor:"#ba74e6",maxWidth:"600px"}}>
            <h1 className="text-white text-center mb-5 ">My ToDo List</h1>
            <form className="d-flex" onSubmit={handleSubmitTask}>
                <input className="form-control me-2" placeholder="New Task" name="task"/>
                <button className="btn btn-outline-light" typr="submit">Add</button>
            </form>
            <div className="overflow-scroll" style={{height:"400px",scrollbarWidth:"none"}}>
            {
                todos.map((todo,index)=>{
                    return(
                        <div key={index} className="rounded mt-4 p-2 d-flex" 
                            style={{ backgroundColor: todo.completed ? "#82cfde" : "lightgray"}}>
                           <i className={"me-2 "+(todo.completed?"bi bi-check-square text-success ":"bi bi-square text-black")}
                             style={{cursor:"pointer"}} 
                             onClick={()=>{changestatus(index)}}></i>
                           <div className="me-auto">
                            {todo.task}
                           </div>
                           <div >
                            <i className="me-2 text-primary-emphasis bi bi-pencil-square" style={{cursor:"pointer"}} onClick={()=>{updateTask(index)}}></i>
                            <i className="bi bi-trash text-danger" style={{cursor:"pointer"}} onClick={()=>{deleteTask(index)}}></i>
                           </div>
                        </div>
                    );
                })
            }
            </div>
            
        </div>
    </div>
  )
}
