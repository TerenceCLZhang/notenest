import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/notes/Header";
import { Link } from "react-router-dom";

const Notes = () => {
  return (
    <div className="px-5 pt-8 md:px-13 md:py-15 lg:w-[90vw] 2xl:w-[75vw] m-auto">
      <Header />

      <main className="lg:grid lg:grid-cols-3">
        <section className="shadow-md rounded-2xl p-6 md:p-8 lg:p-10 space-y-4 border border-gray-300 h-full">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
            lorem
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil
            animi dolorem sunt est ratione id, accusamus voluptatem minima
            veniam cum exercitationem reiciendis vero tempora nobis corrupti
            dignissimos magnam impedit officia?
          </p>
        </section>

        <Link
          to="/notes/create"
          className="flex items-center justify-center border border-gray-500 min-h-75 h-full w-full border-dotted rounded-2xl hover:border-black hover:border-2 hover:font-bold transition-animation"
        >
          <span className="">
            Create New Note <FontAwesomeIcon icon={faPlus} />
          </span>
        </Link>
      </main>
    </div>
  );
};

export default Notes;
