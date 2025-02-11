import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Fevereiro 2025</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-xl bg-muted/50">
                <div className="block rounded shadow">
                  <div className="flex justify-between">
                    <div className="text-sm font-bold leading-snug text-left">
                      Title number {i + 1}
                    </div>
                  </div>
                  <div className="max-h-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing...
                  </div>
                </div>
                <div className="flex justify-between items-baseline">
                  <div className="text-sm">
                    {Math.floor(Math.random() * 28) + 1}/Fev
                  </div>
                  <div className="mt-2">
                    <span
                      className={`px-2 py-1 leading-tight inline-flex items-center rounded ${
                        (i + 1) % 3 === 0
                          ? "bg-teal-500"
                          : (i + 1) % 3 === 1
                          ? "bg-rose-500"
                          : (i + 1) % 3 === 2
                          ? "bg-purple-500"
                          : "bg-zinc-400"
                      }`}
                    >
                      <svg
                        className={`h-2 w-2 ${
                          (i + 1) % 3 === 0
                            ? "text-teal-700"
                            : (i + 1) % 3 === 1
                            ? "text-rose-700"
                            : (i + 1) % 3 === 2
                            ? "text-purple-700"
                            : "text-zinc-700"
                        }`}
                        viewBox="0 0 8 8"
                        fill="currentColor"
                      >
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                      <span className="text-sm ml-2 font-medium">
                        {(i + 1) % 3 === 0
                          ? "Done"
                          : (i + 1) % 3 === 1
                          ? "Urgent"
                          : (i + 1) % 3 === 2
                          ? "Progress"
                          : "text-zinc-700"}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
