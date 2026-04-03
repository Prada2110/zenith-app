import { z } from 'zod'

export const registerSchema = z.object({
        email: z.string()
        .min(1, {message:'El Email es obligatorio'})
        .email({message: 'Email no valido'}),

        name: z.string()
        .min(1, {message:'Tu nombre no puede ir vacio'}),
        password: z.string()

        .min(8, {message: 'La contraseña es muy corta, minimo 8 caracteres'}),

        password_confirmation: z.string(),
        
    }).refine( (data) => data.password === data.password_confirmation,{
        message: 'Las contraseñas no son iguales',
        path: ['password_confirmation']
    })

export const LoginSchema = z.object({
        email: z.string()
                .min(1, {message: 'El Email es Obligatorio'})
                .email( {message: 'Email no válido'}),
        password: z.string()
                .min(1, {message: 'El Password no puede ir vacio'})
                
}) 



export const DraftBudgetSchema = z.object({
  nombre: z.string().min(1, { message: 'El Nombre del producto es obligatorio' }),

  precio: z
    .string()
    .min(1, { message: 'Cantidad no válida' })
    .transform((val) => val.replace(/\./g, "")) // quita puntos
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: 'Cantidad no válida'
    })
});




export const BackendResponseSchema = z.object({
  message: z.string(),
  objectResponse: z.string(),
  objectId: z.number(),
  statusCode: z.number()
})

export const ErrorResponseSchema = z.object({
  message: z.string(),
  objectResponse: z.any().nullable(),
  objectId: z.number(),
  statusCode: z.number()
})


export const TokenSchema = z.string({message: 'Token no valido'})
                        .min(6, {message: 'Token no valido'})
                        .max(6, {message: 'Token no valido'})

export const BackendCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  image: z.string().nullable(),
  isActive: z.boolean(),
})

export const CategoryResponseSchema = z.object({
  message: z.string(),
  objectResponse: z.array(BackendCategorySchema),
  objectId: z.number(),
  statusCode: z.number(),
})

export type BackendCategory = z.infer<typeof BackendCategorySchema>







// export const ProductResponseSchema = z.object({
//   message: z.string(),

//   objectResponse: z.object({
//     idProducto: z.number(),
//     nombre: z.string(),
//     descripcion: z.string().nullable(),
//     precio: z.number(),
//     imagen: z.string().nullable(),
//     activo: z.boolean()
//   }),

//   objectId: z.number(),
//   statusCode: z.number()
// });


export const BackendProductSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  description: z.string().nullable(),
  sku: z.string(),
  barcode: z.string().nullable(),
  category: z.union([z.string(), z.number()]).nullable(),  // ← acepta string o número
  supplier: z.string().nullable(),                          // ← puede ser null
  costPrice: z.number().nullable(),                         // ← puede ser null
  salePrice: z.number().nullable(),                         // ← puede ser null
  stock: z.number().nullable(),
  minStock: z.number().nullable(),
  maxStock: z.number().nullable(),
  location: z.string().nullable(),                          // ← puede ser null
  weight: z.number().nullable(),
  dimensions: z.string().nullable(),                        // ← puede ser null
  isActive: z.boolean(),
  isFeatured: z.boolean(),
})

export const ProductResponseSchema = z.object({
  message: z.string(),
  objectResponse: z.array(BackendProductSchema),
  objectId: z.number(),
  statusCode: z.number(),
})

export const SessionSchema = z.object({
  message: z.string(),
  objectResponse: z.object({
    name: z.string(),
    email: z.string().email()
  }),
  objectId: z.number(),
  statusCode: z.number()
})

export const UserSchema = z.object({
  email: z.string().email(),
  name: z.string(),

})

export const VentaItemSchema = z.object({
  id: z.number(),
  product: z.number(),
  quantity: z.number(),
  subtotal: z.number(),
  notes: z.string().nullable(),
})

export const VentaSchema = z.object({
  id: z.number(),
  tableNumber: z.string(),
  customerCount: z.number(),
  waiter: z.string(),
  notes: z.string().nullable(),
  paymentMethod: z.string(),
  items: z.array(VentaItemSchema),
  subtotal: z.number(),
  tip: z.number(),
  total: z.number(),
})

export const VentaResponseSchema = z.object({
  message: z.string(),
  objectResponse: z.array(VentaSchema),
  objectId: z.number(),
  statusCode: z.number(),
})

export type Venta = z.infer<typeof VentaSchema>

export type BackendProduct = z.infer<typeof BackendProductSchema>
export type ProductResponse = z.infer<typeof ProductResponseSchema>

export type User = z.infer<typeof UserSchema >