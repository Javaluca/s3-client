import type { Bucket } from "@aws-sdk/client-s3";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { useClickOutside } from "../hooks/ClickOutside";

export default function BucketPage( { bucket }: { bucket: Bucket } ) {

    const searchbox = useRef<HTMLInputElement | null>(null)
    const [ search, setSearch ] = useState(false);

    const [searchText, setSearchText] = useState('');

    useClickOutside(searchbox, () => {
        if (!searchText) {
            setSearch(false);
        }
    });

    return (
        <div className="flex flex-col w-full h-full">
            <div className="h-14 bg-linear-to-t from-gray-200 to-gray-100 border-1 border-b-gray-100">
                <div className="h-full w-full p-4 flex flex-row align-middle text-gray-800 gap-2" onClick={() => { setSearch(true); }}>
                    <FontAwesomeIcon icon={faSearch} className="m-1" />
                    {
                        search && <input type="text" id="searchbox" name="searchbox" ref={searchbox} placeholder="Search" autoFocus
                        className="border-0 no-focus bg-transparent w-full h-full border-transparent !outline-none" value={searchText}
                        onChange={e => setSearchText(e.target.value)}></input>
                        || <div>{bucket.Name}</div>
                    }
                </div>
            </div>
            <div className="grow">Files</div>
        </div>
    )
}