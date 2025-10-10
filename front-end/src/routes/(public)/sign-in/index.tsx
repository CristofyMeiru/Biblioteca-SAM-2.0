import bookBg from "@/assets/books-background.png";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/sign-in/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className=" flex w-full h-screen  ">
      <section className="  h-full flex flex-1 justify-center items-center "></section>
      <aside className=" flex-1 ">
        <img className=" h-full " src={bookBg} alt="books-background" />
      </aside>
    </main>
  );
}
