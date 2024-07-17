"use client";

import { useRenameModal } from "@/store/useRenameModal";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogClose, DialogFooter, DialogTitle } from "../ui/dialog";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export const RenameModal = () => {
    const { mutate, pending } = useApiMutation(api.board.update);
    const { isOpen, onClose, initialValues } = useRenameModal();
    const [title, setTitle] = useState(initialValues.title);

    useEffect(() => {
        setTitle(initialValues.title);
    }, [initialValues.title])

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        mutate({ id: initialValues.id, title })
            .then(() => {
                toast.success("Board Renamed");
                onClose();
            })
            .catch(() => {
                toast.error("Couldn't update the title");
                onClose();
            });
    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Edit Board Title
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        Enter a new title for this board
                    </DialogDescription>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <Input disabled={pending} required maxLength={60} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Board Title" />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant={"outline"}>
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button disabled={pending} type="submit">
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}