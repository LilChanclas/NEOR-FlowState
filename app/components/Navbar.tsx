import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 bg-[#1F1E1E] backdrop-blur"
            style={{ height: "var(--navbar-h)" }}
        >
            <div className="h-full w-full px-6 flex items-center justify-between">
                <Link href="/">
                    <Image
                        src="/LOGO-NEOR-2026.png"
                        alt="Logo"
                        width={120}
                        height={120}
                        className="w-[100px] h-auto md:w-[120px]"
                    />
                </Link>
            </div>
        </nav>
    );
}