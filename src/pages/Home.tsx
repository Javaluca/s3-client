import { useState } from "react";
import { useAuth } from "../contexts/AuthContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";


type Bucket = {
    id: number,
    name: string
}

const initialBuckets: Bucket[]  = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

function Home() {

    const { user, logout } = useAuth();

    const [ buckets, setBuckets ] = useState<Bucket[]>(initialBuckets);

    return (
        <div className="flex flex-row h-screen w-full select-none">
            <div className="flex flex-col flex-shrink-0 w-64">
                <div className="flex-shrink-0 flex flex-row items-center justify-between py-4 px-6 mb-2">
                    <h2 className="text-gray-100 font-extrabold text-center text-xl">
                        S3 <span className="text-transparent bg-clip-text bg-gradient-to-r to-indigo-600 from-violet-400">client</span>
                    </h2>
                </div>
                <nav className="flex-grow flex flex-col gap-2">
                    {
                        buckets && buckets.map((b: Bucket) => (
                            <a key={b.id} className="block text-sm py-2.5 px-4 mx-2 font-semibol rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">{b.name}</a> 
                        ))
                    }
                </nav>
                <div>
                <a className="flex flex-row gap-2 items-center text-sm p-4 py-4 font-semibol hover:bg-gray-800 focus:bg-gray-800 focus:outline-none focus:shadow-outline" href="#">
                    <FontAwesomeIcon icon={faUser} />
                    <div>
                        { user?.accesskey }
                    </div>
                </a> 
            </div>
            </div>
            
            <div className="flex grow bg-gray-100">
                
            </div>
        </div>
    )
}

export default Home