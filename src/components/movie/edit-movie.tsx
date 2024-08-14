"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";
import useGetMovie from "@/hooks/useGetMovie";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { updateMovie } from "@/services/movie";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  year: z.string({ message: "Publishing year is required" }).min(2),
  remember: z.boolean().default(false).optional(),
});

interface IEditMovie {
  movieId: string;
}

const EditMovie = ({ movieId }: IEditMovie) => {
  const { movie } = useGetMovie(movieId);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop: useCallback((acceptedFiles: File[]) => {
        const file = new FileReader();
        file.onload = function () {
          setPreview(file.result);
        };
        file.readAsDataURL(acceptedFiles[0]);
      }, []),
    });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const movieData = new FormData();
    movieData.append("name", values.title);
    movieData.append("publishedYear", values.year);
    movieData.append("file", acceptedFiles[0]);

    try {
      const response = await updateMovie(movieId, movieData);
      if (response.status === 200) {
        toast.success("Movie updated successfully!");
        router.push("/");
      }
    } catch (error) {
      toast.error("Failed to update movie. Try again!");
    }
  }

  useEffect(() => {
    if (movie) {
      form.reset({
        title: movie.name,
        year: movie.publishedYear?.toString(),
      });
      setPreview(movie.posterImage);
    }
  }, [movie, form]);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
      <div className="w-full border-2 border-dotted min-h-[32rem] flex items-center flex-col gap-3 justify-center rounded-md">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <>
              <span className="text-sm text-center my-4 mt-4 block">
                {" "}
                Drag and drop image
              </span>
              {typeof preview === "string" ? (
                <Image
                  src={preview}
                  width={350}
                  height={150}
                  alt="selected Image"
                  className="rounded-lg"
                />
              ) : (
                <div className="flex items-center justify-center flex-col gap-3 cursor-pointer">
                  <span>
                    <Download />
                  </span>
                  <span className="text-sm"> Drag and drop image</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="w-10/12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Title"
                      className="bg-input text-muted placeholder:text-muted"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Publishing Year"
                      {...field}
                      className="w-3/5 bg-input text-muted placeholder:text-muted"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-x-10">
              <Button variant={"outline"}>Cancel</Button>
              <Button type="submit" variant={"default"}>
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditMovie;
