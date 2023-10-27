import Navbar from "../components/navbar.jsx";

export default function BaseLayout({sidebar, children}){
    return (
        <div className="min-h-screen bg-skin-base">
            <Navbar/>
            <main>
                <div className="flex-col flex justify-between lg:flex-row">
                    <div className="flex-1 w-full lg:w-8/12">
                        {children}
                    </div>
                    <div
                        className="flex-none w-full lg:w-4/12 md:min-h-[calc(100vh-81px)] px-0 md:px-12 lg:px-8 lg:border-l lg:border-gray-200">
                        {sidebar}
                    </div>
                </div>
            </main>
        </div>
    );
};
