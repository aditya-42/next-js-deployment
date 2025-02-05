import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup} from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button"


export default async function Signup() {
  return (
    <div className="flex item-center justify-center max-w-7xl mx-auto">
      <form
        action=""
        className="w-1/2 border border-black-200 rounded-md p-4 my-10"
      >
        <h1 className="font-bold text-xl mb-5"> LogIn</h1>
        
        <div className="my-2">
          <Label className="font-bold">Email</Label>
          <Input type="email" placeholder="Enter Email" required></Input>
        </div>
        
        <div className="my-2">
          <Label className="font-bold">Password</Label>
          <Input type="password" placeholder="Enter Password" required></Input>
        </div>
        <div className="flex items-center justfy-between">
          <RadioGroup className="flex items-center gap-4 my-5">
            <div className="flex items-center space-x-2">
                <input type="radio" name="role" value="job-finder" className="cursor-pointer"></input>
              <Label htmlFor="r1">Job Finder</Label>
            </div>
            <div className="flex items-center space-x-2">
            <input type="radio" name="role" value="recruiter" className="cursor-pointer"></input>
              <Label htmlFor="r2">Recruiter</Label>
            </div>
          </RadioGroup>
        </div>
        
        <Button type="submit" className="w-full my-4">Log In</Button>
        <span className="text-sm">Don't have an account ?<a href="/auth/signup" className="text-blue-600"> Sign up</a></span>
      </form>
    </div>
  );
}
