
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { verifySession } from '@/src/auth/dal';
import AdminMenu from '@/components/admin/Admin';
import { Analytics } from "@vercel/analytics/next";
import { AppSidebar } from "@/components/AppSidebar";

export const dynamic = 'force-dynamic'


export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 

    const {user} = await verifySession ()

  return (
    <>
    <SidebarProvider>
    
                <AppSidebar>
                  <AdminMenu user={user} />
                </AppSidebar>
              
              <SidebarInset>
                <Analytics />
                {children}
              </SidebarInset>
            </SidebarProvider>
    
    </>
  );
}