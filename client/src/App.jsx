import "./App.css";

function App() {
  return (
    <>
      <main className="p-10 max-w-[900px] m-0 mx-auto">
        <header className=" flex justify-between mb-8 items-center">
          <a href="#" className="no-underline text-inherit font-bold text-xl">
            Mohammed Blog
          </a>
          <nav className="flex gap-4">
            <a href="#" className="">
              Login
            </a>
            <a href="#" className="">
              Register
            </a>
          </nav>
        </header>
        <div className="grid grid-cols-2 gap-5 mb-4">
          <div className="">
            <img
              src="https://picsum.photos/900/300"
              alt="post-image"
              className="max-w-full"
            />
          </div>
          <div className="">
            <h1 className="font-bold m-0 text-xl">
              Whispers of Time: Echoes from Forgotten Dreams and Distant
              Memories
            </h1>
            <p className="text-sm my-[6px] mx-0 flex gap-3">
              <a href="#" className="text-gray-500">
                Babai
              </a>
              <time className="text-gray-500">2024-04-04 16:45</time>
            </p>
            <p className="my-2 mx-0 leading-5">
              In the midst of swirling mist, shadows danced, whispering secrets
              lost to time. Each breath carried echoes of forgotten tales,
              lingering in the air like gentle melodies.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
