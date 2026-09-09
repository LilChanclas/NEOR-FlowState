export default function Sidebar() {
    return (
        <aside
            className="hidden md:block fixed top-5 left-0 bottom-0 text-white p-5 overflow-y-auto z-40 bg-[#1A1A1A]"
            style={{ width: "var(--sidebar-w)", paddingTop: "var(--navbar-h)" }}
        >
            <nav className="flex flex-col gap-2">
                <a href="#" className="px-4 py-2 rounded-lg bg-[#C98D0E] hover:bg-[#9E6D00]">
                    Inicio
                </a>
                <a href="#" className="px-4 py-2 rounded-lg hover:bg-gray-800">
                    XXXX
                </a>
                <a href="#" className="px-4 py-2 rounded-lg hover:bg-gray-800">
                    XXXX
                </a>
            </nav>
        </aside>
    );
}