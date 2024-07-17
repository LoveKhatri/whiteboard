"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "@/convex/_generated/api";
import { ConfirmModal } from "./ConfirmModal";
import { Button } from "./ui/button";
import { useRenameModal } from "@/store/useRenameModal";

interface ActionProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffSet?: DropdownMenuContentProps["sideOffset"];
    id: string;
    title: string;
}

export const Actions = ({ children, side, sideOffSet, id, title }: ActionProps) => {
    const { onOpen } = useRenameModal();

    const onCopyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/board/${id}`)
            .then(() => { toast.success("Link Copied") })
            .catch(() => { toast.error("Failed to copy link") });
    }

    const { mutate, pending } = useApiMutation(api.board.remove);

    const onDelete = () => {
        mutate({ id })
            .then(() => { toast.success("Board Deleted") })
            .catch(() => { toast.error("Failed to delete board") });
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {children}
                </DropdownMenuTrigger>
                <DropdownMenuContent side={side} sideOffset={sideOffSet} className="w-55" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenuItem className="p-3 cursor-pointer" onClick={onCopyLink}>
                        <Link2 className="h-4 w-4 mr-2" />
                        Copy Link
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-3 cursor-pointer" onClick={() => onOpen(id, title)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Rename
                    </DropdownMenuItem>
                    <ConfirmModal onConfirm={onDelete} header="Delete Board?" description="This will delete the board and all of it's content" disabled={pending}>
                        <Button className="p-3 cursor-pointer text-sm w-full justify-start font-normal text-rose-500" variant={"ghost"}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                    </ConfirmModal>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}