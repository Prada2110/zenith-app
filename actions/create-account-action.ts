'use server'

import { BackendResponseSchema, ErrorResponseSchema, registerSchema, } from "@/src/schemas"

type ActionStateType = {
    errors: string[] ;
    success: string
} 


export async function register( prevState: ActionStateType,  formData: FormData ) {
    console.log( formData )

    const registerData = {
        email: formData.get('email'),
        name: formData.get('name'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
    }

    // validar

    const register = registerSchema.safeParse(registerData)



    if(!register.success) {
        const errors = register.error.issues.map(error => error.message)
        return {
            errors,
            success: prevState.success
        }
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/usuario/crear-usuario`

    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: register.data.name,
            password: register.data.password,
            email: register.data.email
        })
    })

    const json = await req.json()


    // if(req.status === 400 ){
    //     const {error} = ErrorResponseSchema.parse(json)
    //     return {
    //         errors: [error],
    //         success: ''
    //     }
    // }

    
    
    const success = BackendResponseSchema.safeParse(json)

    console.log(success)

       if (!success.success) {
    return {
      errors: ["Error al procesar la respuesta del servidor"],
      success: ""
    }
  }

  const data = success.data

  


    return {
        errors: [],
        success: data.objectResponse
    }
  
}