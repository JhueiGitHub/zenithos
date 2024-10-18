// /root/components/modals/initial-modal.tsx

"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UploadCareButton from "@/components/uploadcare-button";
import AnimatedBackground from "@/components/animated-background";
import axios from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Desktop name is required.",
  }),
  imageUrl: z.string().min(1, {
    message: "Desktop background image is required.",
  }),
});

export const InitialModal = () => {
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/desktops", values);

      form.reset();
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AnimatedBackground />
      <Dialog open>
        <DialogContent className="bg-black bg-opacity-30 text-[#ABC4C3] p-0 overflow-hidden border border-[#292929]">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold text-[#ABC4C3]">
              Create Your Desktop
            </DialogTitle>
            <DialogDescription className="text-center text-[#748393]">
              Give your desktop a name and choose a background image. You can
              always change these later.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-8 px-6">
                <div className="flex items-center justify-center text-center">
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <UploadCareButton
                            onUpload={async (cdnUrl) => {
                              field.onChange(cdnUrl);
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-[#748393]">
                        Desktop name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="bg-[#292929] border-0 focus-visible:ring-0 text-[#ABC4C3] focus-visible:ring-offset-0"
                          placeholder="Enter desktop name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[#FF5F57]" />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className="bg-[#292929] px-6 py-4">
                <Button
                  variant="primary"
                  disabled={isLoading}
                  className="bg-[#010203] text-[#ABC4C3] hover:bg-[#010203]/80"
                >
                  Create
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
