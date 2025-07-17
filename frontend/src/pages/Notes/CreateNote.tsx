import BackBtn from "../../components/notes/BackBtn";
import CreateNewNoteForm from "../../components/notes/CreateNewNoteForm";
import Header from "../../components/notes/Header";

const CreateNote = () => {
  return (
    <div className="reg-page-layout">
      <Header />
      <main className="gap-7">
        <BackBtn />
        <h2 className="font-bold text-3xl xl:text-5xl">Create New Note</h2>
        <CreateNewNoteForm />
      </main>
    </div>
  );
};

export default CreateNote;
