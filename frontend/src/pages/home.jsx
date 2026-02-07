import {useNavigate} from 'react-router-dom'


function Home() {
    const navigate = useNavigate()
  return (
    <div className='h-100 w-full flex justify-center items-center gap-2'>
      <button onClick={()=>{navigate("/signup")}} className="border h-10 w-20 text-white bg-black rounded-2xl cursor-pointer">sign in</button>
      <button onClick={()=>{navigate("/login")}} className="border h-10 w-20 text-white bg-black rounded-2xl cursor-pointer">log in</button>
    </div>
  )
}

export default Home
