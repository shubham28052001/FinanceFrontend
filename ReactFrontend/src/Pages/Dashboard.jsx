import React from "react";
import SideBar from "../Components/SideBar";
import { Outlet } from "react-router";

export default function Dashboard() {

    return (
        <div className="flex min-h-screen bg-gray-100">

            <SideBar />

            <div className="flex-1">
                <Outlet /> 
            </div>

        </div>
    );
}