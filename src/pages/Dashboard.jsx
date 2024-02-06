import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector,useDispatch} from "react-redux"
import GoalForm from "../Components/GoalForm"
import Spinner from "../Components/Spinner"
import { getGoals,reset } from "../features/goals/goalSlice"
import GoalItem from "../Components/GoalItem"
const Dashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state)=>state.auth)
    const {goals,isLoading,isError,message}=useSelector((state)=>state.goals)

    useEffect(() => {
        console.log("Effect triggered");
        if (isError.length>0) {
            console.log("Error:", message);
        }
        if (!user) {
         
            navigate('/login');
            return () => dispatch(reset())
        }
    
        dispatch(getGoals());
    
       
            
    }, [user, navigate, isError, message,dispatch]);
    
    if(isLoading){
        return <Spinner/>
    }
  return (
    <>
    <section className="heading">
        <h1>welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
    </section>
    <GoalForm/>

    <section className="content">
        {goals.length>0 ? (
        <div className="goals">
            {goals.map((goal,index)=>(
                <GoalItem key={index} goal={goal}/>
            ))}
        </div>) 
        
        
        :(<h3>You have not set any goals</h3>)}
    </section>
    </>
  )
}

export default Dashboard