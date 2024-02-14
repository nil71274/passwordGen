import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [len, setLen] = useState(8);
  const [password, setPassword] = useState("");
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const passwordGenerator =
    useCallback(() => {
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUWXYZabcdefghijklmnopqrstuvwxyz";
      if (numAllowed) str += "0123456789";
      if (charAllowed) str += "~!@#$%^&*()-+><:_";

      for (let i = 1; i <= len; i++) {
        let char = Math.ceil(Math.random() * str.length);
        pass += str.charAt(char);
      }

      setPassword(pass);
    }, [len, numAllowed, charAllowed, setPassword]);


  const copyPassword = useCallback(()=>{
    refPassword.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const refPassword = useRef(null);

  useEffect(() => {
    passwordGenerator();
  }, [len, numAllowed, charAllowed, passwordGenerator]);

  return (
    <div className=" py-16 w-full h-screen bg-black">
      <div className=" px-10 py-5 rounded-2xl mx-auto mx-8 w-full max-w-lg bg-slate-500 ">
        <h1 className=" text-white text-4xl text-center">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
          ref={refPassword}
            type="text"
            value={password}
            className=" rounded-3xl outline-none w-full py-1 px-3 my-1"
            placeholder="Password"
            readOnly
          />
          <button 
          className=" hover:border-t-gray-950 bg-orange-300 mx-2 px-4 my-1 rounded-3xl"
          onClick={copyPassword}
          >Copy
          </button>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={4}
            max={32}
            value={len}
            className=" cursor-pointer"
            onChange={(e) => {
              setLen(e.target.value);
            }}
          />
          <label className=" bg-green-400 px-2 rounded-lg">{len}</label>

          <div className=" bg-cyan-500 flex gap-4 px-4 rounded-lg mx-5">
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numAllowed}
                onChange={() => setNumAllowed((prev) => !prev)}
              />
              <label>Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
              />
              <label className="">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
