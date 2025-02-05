import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar,  AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";

export default async function Admin() {
  return (
    <div className="max-w-6xl max-auto my-10">
      <div className="flex items-center justify-between my-5">
        <Input className="w-fit" placeholder="Filter by name"></Input>
        <Button>New Company</Button>
      </div>
      <div>
        <Table>
          <TableCaption>
            A list of your recent registered companies
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  
                </Avatar>
              </TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>03-02-2025</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                    <PopoverTrigger><MoreHorizontal></MoreHorizontal></PopoverTrigger>
                    <PopoverContent className="w-32">
                        <div className="flex items-center gap-2 w-fit cursor-pointer"><Edit2 className="w-4"></Edit2><span>Edit</span> </div>
                    </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
