import type { Bucket } from "@aws-sdk/client-s3";
import { useState } from "react";
import BucketBrowser from "../components/BucketBrowser";
import UserSettings from "../components/UserSettings";
import BucketPage from "./BucketPage";




function Home() {



    const [selectedBucket, setSelectedBucket ] = useState<Bucket>();



    return (
        <div className="flex flex-row h-screen w-full select-none">
            <div className="flex flex-col flex-shrink-0 w-64 h-full">
                <div className="flex-shrink-0 flex flex-row items-center justify-between py-4 px-6 mb-2">
                    <h2 className="text-gray-100 font-extrabold text-center text-xl">
                        S3 <span className="text-transparent bg-clip-text bg-gradient-to-r to-indigo-600 from-violet-400">client</span>
                    </h2>
                </div>
                <div className="grow">
                    <BucketBrowser setSelectedBucket={setSelectedBucket}></BucketBrowser> 
                </div>
                <div>
                    <UserSettings></UserSettings>
                </div>
            </div>
            
            <div className="grow bg-gray-100">
                { selectedBucket && <BucketPage bucket={selectedBucket}></BucketPage>}
            </div>
        </div>
    )
}

export default Home