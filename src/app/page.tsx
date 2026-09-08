
export default function Home() {
  return (
   <div>
    <ProjectsDashboardPage/>
   </div>
  );

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/crm-module");

}
