import { useState, useCallback,useEffect,useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength]=useState(8)
const [numAllowed, setNumAllowed] = useState(false)
const[charAllowed, setCharAllowed]= useState(true);
const [password, setPassword] = useState("")

// useREF hook
const passwordRef = useRef(null)



const passwordGenerator = useCallback(()=>{
let pass ="";
let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
 if (numAllowed) str += "0123456789";
 if(charAllowed) str += "!@#$%^&*{}[]~`";

for (let i =1; i<= length; i++){
  let char = Math.floor(Math.random()* str.length);
pass += str.charAt(char);

}
setPassword(pass);

},[length , numAllowed,charAllowed,setPassword]);


const copyPasswordToClipboard =useCallback(()=> {
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0,100);


  window.navigator.clipboard.writeText(password)
},[password])


useEffect(()=> {
  passwordGenerator()
},[length, numAllowed, charAllowed,passwordGenerator])

  return (
    <>
  
     <div className=' w-full max-w-md mx-auto shadow-lg rounded-lg px-6 mt-30 text-indigo-300 bg-gray-900'> 
      <h1 className='text-white  font-bold text-2xl text-center'> Password Generator</h1>
<div className='flex shadow rounded-lg overflow-hidden mb-4'>
  <input
type="text"
value={password}
className='outline-none font-bold bg-gray-700 w-full py-1 px-3 '
placeholder="Password"
readOnly
ref={passwordRef}
/>
<button 
onClick={copyPasswordToClipboard}
className=" outline-none font-bold bg-blue-600 text-white px-3 py-0.5 shrink-0  hover:bg-blue-800 hover:scale-105 transition-all duration-200">COPY</button>

</div>

<div className='flex text-sm gap-x-2'>
<div className='flex items-center gap-x-1'>
<input 
type ="range"
min={6}
max={100}
value={length}
className='cursor-pointer'
onChange={(e) => {setLength(e.target.value)}}
/>


<label  className="font-bold"> Length :{length}</label>
</div>
<div className='flex items-center gap-x-1'>
<input 
type="checkbox"
defaultChecked={numAllowed}
id="numberInput"
onChange={()=>{
  setNumAllowed((prev) => !prev);
}}
/>
<label className="font-bold" htmlFor='numberInput'>Numbers</label>
</div>
<div className='flex items-center gap-x-1'>
<input 
type="checkbox"
defaultChecked={charAllowed}
id="characterInput"
onChange={()=>{
  setCharAllowed((prev) => !prev);
}}
/>
<label className="font-bold" htmlFor='characterInput'>Characters</label>
</div>
</div>
     </div>
     
    </>
  )
}

export default App
