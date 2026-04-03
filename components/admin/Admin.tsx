'use client'

import { logout } from "@/actions/logout-user-action"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


import { User } from "@/src/schemas"
import { ChevronDown, LogOut, Settings, Users } from "lucide-react"
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"

export default function AdminMenu({ user }: { user: User }) {
  return (


    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="cursor-pointer" size="lg">
              <Avatar className="size-8">
                <AvatarImage src="/placeholder-user.jpg" alt="Usuario" />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium text-sm">{user.name}</span>
                <span className="text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
              <ChevronDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" side="top" align="start">
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-200">
              <Users className="mr-2 size-4" />
              Mi Perfil
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-200">
              <Settings className="mr-2 size-4" />
              Preferencias
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive cursor-pointer hover:bg-gray-200">
              <LogOut className="mr-2 size-4" />
              <button className="cursor-pointer" onClick={async () => {
                await logout()
              }}>
                Cerrar Sesión
              </button>

            </DropdownMenuItem>
          </DropdownMenuContent>


        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>


  )
}
