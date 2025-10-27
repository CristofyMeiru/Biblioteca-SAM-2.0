import CreateCourseDialog from "./create-course-dialog";

export default function CoursesPage() {
  return (
    <main className=" w-full p-8 ">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Cursos</h1>
          <p className="text-muted-foreground mt-1">Gerencie os cursos cadastrados</p>
        </div>
        <CreateCourseDialog />
      </div>
    </main>
  );
}
