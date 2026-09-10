import Dropdown from "./components/Dropdown";

export default function Home() {
  return (
    <section className="bg-gray-800 w-full h-full flex">
      <div className="">
        <Dropdown></Dropdown>
         <p className="m-auto text-white">AQUI VA UN TABLERO TIPO KANBAN</p>
      </div>
    </section>
  );
}