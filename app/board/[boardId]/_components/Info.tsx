"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Hint } from "@/components/Hint";
import { useRenameModal } from "@/store/useRenameModal";
import { Actions } from "@/components/Actions";
import { Menu } from "lucide-react";

interface InfoProps {
    boardId: string;
}

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
})

const TabSeparator = () => {
    return (
        <div className="text-neutral-300 px-1.5">
            |
        </div>
    )
}

const Info = ({ boardId }: InfoProps) => {
    const { onOpen } = useRenameModal();

    const data = useQuery(api.board.get, {
        id: boardId as Id<"boards">
    })

    if (!data) return <InfoSkeleton />



    return (
        <>
            <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
                <Hint label="Go to Boards" side="bottom" sideOffset={10}>
                    <Link href={"/"}>
                        <Button className="px-2 " variant={"board"}>
                            <Image src="/logo.svg" width={40} height={40} alt="Logo" />
                            <span className={cn("font-semibold, text-xl ml-2 text-black", font.className)}>
                                WhiteBoard
                            </span>
                        </Button>
                    </Link>
                </Hint>
                <TabSeparator />
                <Hint label="Edit Title" side="bottom" sideOffset={10}>
                    <Button variant={"board"} className="text-base font-normal px-2" onClick={() => onOpen(data?._id, data?.title)}>
                        {data.title}
                    </Button>
                </Hint>
                <TabSeparator />
                <Actions id={data._id} title={data.title} side="bottom" sideOffSet={10}>
                    <div>
                        <Hint label="Main Menu" side="bottom" sideOffset={10}>
                            <Button size={"icon"} variant={"board"}>
                                <Menu className="h-6 w-6"/>
                            </Button>
                        </Hint>
                    </div>
                </Actions>
            </div>
        </>
    )
}

export default Info;

export const InfoSkeleton = () => {
    return (
        <div className="absolute top-2 left-2 bg-white rounde-md px-1.5 h-12 flex items-center shadow-md w-[300px]" />
    )
}