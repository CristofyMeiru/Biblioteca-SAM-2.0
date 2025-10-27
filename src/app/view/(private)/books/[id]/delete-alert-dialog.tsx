"use client";

import { BookParamsDTO } from "@/app/api/books/[id]/book.dto";
import { BookSelectDTO } from "@/app/api/books/books.dto";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Spinner } from "@/components/ui/spinner";
import apiClient from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DeleteAlertDialog({ bookData }: { bookData: BookSelectDTO }) {
  const router = useRouter();

  const { mutate: mutateDeleteBook, isPending: pendingDeleteBook } = useMutation<
    unknown,
    AxiosError<{ message: string }>,
    BookParamsDTO,
    any
  >({
    mutationKey: ["delete-book", bookData.id],
    mutationFn: async (data: BookParamsDTO) => {
      const response = await apiClient.delete(`/books/${data.id}`);

      return response;
    },
    onMutate: () => {
      const toastId = toast.loading("Deletando livro...");
      return { toastId };
    },
    onSuccess: (_data, _variables, context) => {
      toast.success("Livro deletado com sucesso.", {
        id: context?.toastId,
      });
      router.replace("/view/books");
    },
    onError: (error, _variables, context) => {
      toast.error("Não foi possível deletar o livro.", {
        description: error.response?.data.message,
        id: context?.toastId,
      });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger className={buttonVariants({ variant: "destructive" })}>
        <Icon name="trash" /> Deletar livro
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Ao excluir este livro, todo o histórico de empréstimos associado será permanentemente removido. Esta ação é
            irreversível e não será possível recuperar o livro posteriormente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Icon name="x" /> Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              mutateDeleteBook({ id: bookData.id });
            }}
            className={buttonVariants({ variant: "destructive" })}
          >
            {" "}
            {pendingDeleteBook ? (
              <Spinner />
            ) : (
              <>
                <Icon name="trash" /> Deletar
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
