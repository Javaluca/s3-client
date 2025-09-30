import { faDoorClosed, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../contexts/AuthContext";
import { useRef, useState } from "react";
import { useClickOutside } from "../hooks/ClickOutside";


function Base({ setAction }: { setAction: (value: boolean) => void }) {

    const { user } = useAuth();

    return (
        <a className="flex flex-row gap-2 items-center text-sm p-4 py-4 font-semibol bg-gray-800 hover:bg-gray-700 focus:outline-none focus:shadow-outline border-t-1 border-t-gray-500" href="#" onClick={() => setAction(true)}>
            <FontAwesomeIcon icon={faUser} />
            <div>
                { user?.accesskey }
            </div>
        </a> 
    );
}

function Actions({ setAction }: { setAction: (value: boolean) => void }) {

    const ref = useRef<HTMLDivElement | null>(null)
    useClickOutside(ref, () => setAction(false));
    const { logout } = useAuth();

    return (
        <div ref={ref} className="bg-gray-200 rounded-t-2xl mx-2 text-gray-900 bg-[repeating-linear-gradient(45deg,_#e1e1e1_0,_#e1e1e1_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed" >
            <ul>
                <li className="p-3">
                    <a href="#" className="flex flex-row gap-2 items-center text-sm p-2 rounded-xl font-semibol hover:bg-red-800 hover:text-gray-100" onClick={logout}>
                        <FontAwesomeIcon icon={faDoorClosed} />
                        <div>Logout</div>
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default function UserSettings() {

    const [ action, setAction ] = useState(false);

    if (action) {
        return <Actions setAction={setAction}></Actions>
    }

    return <Base setAction={setAction}></Base>


}