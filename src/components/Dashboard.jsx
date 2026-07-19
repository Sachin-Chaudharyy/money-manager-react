import Menubar from "./Menubar";
import Sidebar from "../components/Sidebar";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

const Dashboard = ({children, activeMenu}) => {
    const {user} = useContext(AppContext);
    return (
        <div>
            <Menubar activeMenu={activeMenu}/>

            {user && (
                <div className="flex">
                    <div className="max-[1080px]:hidden">
                    {/* Side bar content */}
                        <Sidebar activeMenu={activeMenu}/>
                    </div>
                    <div className="grow mx-5">{children}</div>
                </div>
            )}
        </div>
    )
}

export default Dashboard;