import type { Bucket, ListBucketsCommandOutput } from "@aws-sdk/client-s3";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function BucketBrowser( { setSelectedBucket }: { setSelectedBucket: (bucket: Bucket) => void}) {

    const [ buckets, setBuckets ] = useState<Bucket[]>();

    const [ searchText, setSearchText ] = useState('');

    const { s3Client } = useAuth();

    useEffect(() => {
        loadBucket();
    }, []);

    async function loadBucket() {
        const bb: ListBucketsCommandOutput | undefined = await s3Client?.listBuckets();
        setBuckets(bb?.Buckets);
    }

    return (
        <div className="flex flex-col gap-1">
            <div className="py-2 px-2 mx-2 bg-gray-800 rounded-2xl flex flex-row align-middle gap-2 focus-within:bg-gray-600">
                <FontAwesomeIcon icon={faSearch} className="m-1" />
                <input type="text" placeholder="Search" className="border-0 no-focus bg-transparent w-full h-full border-transparent !outline-none"
                value={searchText} onChange={e => setSearchText(e.target.value)}/>
            </div>
            <nav className="grow flex flex-col gap-2 overflow-y-scroll overflow-x-hidden">
                {
                    buckets && buckets
                        .filter((b: Bucket) => b.Name?.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
                        .map((b: Bucket) => (
                        <a key={b.Name} style={{whiteSpace:"nowrap"}} 
                            className="block text-sm py-2.5 px-4 mx-2 font-semibol rounded-lg hover:text-gray-900
                                focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200" href="#"
                                onClick={() => setSelectedBucket(b)}>{b.Name}</a> 
                    ))
                }
            </nav>
        </div>
    );
}