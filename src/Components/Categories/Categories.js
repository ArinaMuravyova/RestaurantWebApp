import React,{useState,useEffect} from "react";
import './Categories.css'

const Categories=(props)=>{
    
  let [categories,setCategories]=useState([])

  useEffect(() => {
    const getCategories = async () => {
      const requestOptions = {
        method: "GET",
      };
      return await fetch("api/Category", requestOptions)
        .then((response) => response.json())
        .then(
          (data) => {
            console.log("DataCategory", data);
            setCategories(data);
          },
          (error) => {
            console.log(error);
          }
        );
    };
    getCategories();
  }, [setCategories]);
  
  
  return(
     <div className="categories">
       {
        categories.map(el=>(
            <div onClick={()=>props.chooseCategory(el.id)} key={el.id}>{el.name}</div>
        ))
       }
     </div>
  )
}
export default Categories