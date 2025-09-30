import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function Login() {

  const [host, setHost] = useState('');
  const [accesskey, setAccessKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(host, accesskey, secretKey);
    } catch(error: unknown) {
      const known = error as { message: string };
      setError(known.message);
    }
  };

  return (
    <>
    <div className="flex h-full w-full flex-col select-none justify-center items-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-gray-100 text-4xl font-extrabold md:text-5xl lg:text-6xl text-center">
        S3 <span className="text-transparent bg-clip-text bg-gradient-to-r to-indigo-600 from-violet-400">client</span>
        </h2>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your s3 instance</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="host" className="block text-sm/6 font-medium text-gray-100">Host</label>
            <div className="mt-2">
              <input id="host" type="text" name="host" required 
              value={host} onChange={(e) => setHost(e.target.value)}
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
            </div>
          </div>

          <div>
            <label htmlFor="accesskey" className="block text-sm/6 font-medium text-gray-100">Accesskey</label>
            <div className="mt-2">
              <input id="accesskey" type="text" name="accesskey" required 
              value={accesskey} onChange={(e) => setAccessKey(e.target.value)}
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
            </div>
          </div>

          <div>
            <label htmlFor="secretkey" className="block text-sm/6 font-medium text-gray-100">Secretkey</label>
            <div className="mt-2">
              <input id="secretkey" type="password" name="secretkey" required 
              value={secretKey} onChange={(e) => setSecretKey(e.target.value)}
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
            </div>
          </div>
          { error && <div>{error}</div> }
          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign in</button>
          </div>
        </form>
      </div>
    </div>

    {
      isLoading && <div
      className="select-none fixed inset-0 z-[9999] grid h-screen w-screen place-items-center bg-black opacity-60 backdrop-blur-sm">Authenticating</div>
    }
    </>
  )
}

export default Login