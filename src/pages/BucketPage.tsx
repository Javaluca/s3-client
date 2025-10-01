import { paginateListDirectoryBuckets, paginateListObjectsV2, type _Object, type Bucket, type CommonPrefix, type ListObjectsCommandOutput } from "@aws-sdk/client-s3";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "../hooks/ClickOutside";
import { useAuth } from "../contexts/AuthContext";

export default function BucketPage( { bucket }: { bucket: Bucket } ) {

    /* ricerca */
    const searchbox = useRef<HTMLInputElement | null>(null)
    const [ search, setSearch ] = useState(false)
    const [searchText, setSearchText] = useState('');

    useClickOutside(searchbox, () => {
        if (!searchText) {
            setSearch(false);
        }
    });

    const { s3Client } = useAuth();

    useEffect(() => {
        loadObject('');
    }, []);

    const [path, setPath] = useState<string[]>([ ])

    const [ dir, setDir ] = useState<CommonPrefix[]>([]);
    const [ objects, setObjects ] = useState<_Object[]>([]);

    async function loadObject(prefix: string) {

        const paginator = paginateListObjectsV2(
            { client: s3Client!, /* Max items per page */ pageSize: 100  },
            { Bucket: bucket.Name, Prefix: prefix, Delimiter: '/' },
        );

        const oo: _Object[] = [];
        const dd: CommonPrefix[] = [];

        for await (const page of paginator) {
            (page.CommonPrefixes || []).forEach(p => dd.push(p));
            (page.Contents || []).forEach(p => oo.push(p));
        }

        setObjects(oo);
        setDir(dd);
    }

    function navigate(prefix: CommonPrefix) {
        path.push(prefix.Prefix!);
        setPath(path);
        loadObject(path.join('/'));
    }


    return (
        <div className="flex flex-col w-full h-full text-gray-900">
            <div className="h-14 bg-linear-to-t from-gray-200 to-gray-100 border-b-1 border-b-gray-100">
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
            <div className="grow flex flex-col gap-1">
              <div className="breadcrumbs text-sm">
                <ul>
                    {
                        path.map((p, i) => (
                            <li key={p}>
                                {
                                    i == path.length - 1 && <a>{p}</a> || <>{p}</>
                                }
                            </li>
                        ))
                    }
                </ul>
              </div>
              <div className="overflow-x-auto">
                <table className="table table-xs">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Size</th>
                      <th>Last modified</th>
                    </tr>
                  </thead>
                <tbody>
                    {
                        dir && dir.map(o => (
                            <tr key={o.Prefix} className="hover:bg-base-300 cursor-pointer" onClick={() => navigate(o)}>
                                <td>{o.Prefix}</td>
                                <td></td>
                                <td></td>
                            </tr>
                        ))
                    }
                    {
                        objects && objects.map(o => (
                            <tr key={o.Key} className="hover:bg-base-300 cursor-pointer">
                                <td>{o.Key}</td>
                                <td>{o.Size}</td>
                                <td>{o.LastModified?.toISOString()}</td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>
              </div>
            </div>
        </div>
    )
}