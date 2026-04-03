"use client"

import * as React from "react"
import Link from "next/link"
import { 
  Package, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  BarChart3,
  User,
  Check,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { register } from "@/actions/create-account-action"
import ErrorMessage from "../AuthUi/ErrorMessage"
import SuccessMessage from "../AuthUi/SuccessMessage"


export default function RegistroFormulario() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [name, setName] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [acceptTerms, setAcceptTerms] = React.useState(false)


   const ref = React.useRef<HTMLFormElement> (null)
      const [state, dispatch] = React.useActionState(register, {
          errors: [],
          success: ''
      })
  
      React.useEffect(()=>{
          if(state.success) {
              ref.current?.reset()
          }
  
      }, [state])



  // Password validation
  const passwordValidation = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  }

  const passwordStrength = Object.values(passwordValidation).filter(Boolean).length
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!passwordsMatch || passwordStrength < 3 || !acceptTerms) return
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500"
    if (passwordStrength <= 3) return "bg-yellow-500"
    if (passwordStrength <= 4) return "bg-blue-500"
    return "bg-green-500"
  }

  const getStrengthText = () => {
    if (passwordStrength <= 2) return "Debil"
    if (passwordStrength <= 3) return "Regular"
    if (passwordStrength <= 4) return "Buena"
    return "Excelente"
  }

  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-pink-500/20 blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-[-10%] left-[30%] w-[600px] h-[600px] rounded-full bg-blue-500/15 blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px"
          }}
        />

        {/* Floating Shapes */}
        <div className="absolute top-[15%] left-[10%] w-20 h-20 border border-purple-500/20 rounded-2xl rotate-12 animate-float" />
        <div className="absolute top-[60%] left-[5%] w-16 h-16 border border-pink-500/20 rounded-full animate-float" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-[30%] right-[8%] w-24 h-24 border border-blue-500/20 rounded-3xl -rotate-12 animate-float" style={{ animationDelay: "0.5s" }} />
        <div className="absolute bottom-[20%] right-[15%] w-12 h-12 border border-purple-500/20 rounded-xl rotate-45 animate-float" style={{ animationDelay: "2s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 mb-8">
          <div className="size-12 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
            <Package className="size-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            ZenithApp
          </span>
        </Link>

        {/* Main Card */}
        <div className="w-full max-w-md">
          {/* Glass Card */}
          <div className="relative">
            {/* Card Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl blur-lg opacity-20" />
            
            <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Crear cuenta
                </h1>
                <p className="text-muted-foreground">
                  Registrate para comenzar a gestionar tu negocio
                </p>
              </div>

              {/* Form */}
              <form action={dispatch} className="space-y-5" ref = {ref}>

                {state.errors?.map(error => <ErrorMessage>{error}</ErrorMessage> ) }
                
                {state.success && <SuccessMessage>{state.success}</SuccessMessage>}
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Nombre completo
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground group-focus-within:text-purple-500 transition-colors" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Tu nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-12 h-12 bg-background/50 border-border/50 rounded-xl focus:border-purple-500 focus:ring-purple-500/20 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Correo electronico
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground group-focus-within:text-purple-500 transition-colors" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      className="pl-12 h-12 bg-background/50 border-border/50 rounded-xl focus:border-purple-500 focus:ring-purple-500/20 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Contraseña
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground group-focus-within:text-purple-500 transition-colors" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 pr-12 h-12 bg-background/50 border-border/50 rounded-xl focus:border-purple-500 focus:ring-purple-500/20 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                    </button>
                  </div>
                  
                  {/* Password Strength */}
                  {password.length > 0 && (
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                            style={{ width: `${(passwordStrength / 5) * 100}%` }}
                          />
                        </div>
                        <span className={`text-xs font-medium ${getStrengthColor().replace('bg-', 'text-')}`}>
                          {getStrengthText()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        {[
                          { check: passwordValidation.minLength, text: "8+ caracteres" },
                          { check: passwordValidation.hasUppercase, text: "Mayuscula" },
                          { check: passwordValidation.hasLowercase, text: "Minuscula" },
                          { check: passwordValidation.hasNumber, text: "Numero" },
                        ].map((item, i) => (
                          <div key={i} className={`flex items-center gap-1 ${item.check ? "text-green-500" : "text-muted-foreground"}`}>
                            {item.check ? <Check className="size-3" /> : <X className="size-3" />}
                            {item.text}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirmar contrasena
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground group-focus-within:text-purple-500 transition-colors" />
                    <Input
                      id="confirmPassword"
                      name="password_confirmation" // 👈 ESTO FALTABA
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="********"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`pl-12 pr-12 h-12 bg-background/50 border-border/50 rounded-xl focus:border-purple-500 focus:ring-purple-500/20 transition-all ${
                        confirmPassword.length > 0 && !passwordsMatch ? "border-red-500 focus:border-red-500" : ""
                      } ${passwordsMatch ? "border-green-500 focus:border-green-500" : ""}`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                    </button>
                  </div>
                  {confirmPassword.length > 0 && !passwordsMatch && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <X className="size-3" />
                      Las contraseñas no coinciden
                    </p>
                  )}
                  {passwordsMatch && (
                    <p className="text-xs text-green-500 flex items-center gap-1">
                      <Check className="size-3" />
                      Las contraseñas coinciden
                    </p>
                  )}
                </div>

                {/* Accept Terms */}
                <div className="flex items-center gap-3">
                  <Checkbox 
                    id="terms" 
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    className="border-border/50 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500" 
                  />
                  <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                    Acepto los terminos y condiciones de uso
                  </Label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading || !passwordsMatch || passwordStrength < 3 || !acceptTerms}
                  className="w-full h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creando cuenta...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Registrarme
                      <ArrowRight className="size-5" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card px-4 text-muted-foreground">
                    O registrate con
                  </span>
                </div>
              </div>

              {/* Social Register */}
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="h-12 rounded-xl border-border/50 hover:bg-background/50 hover:border-purple-500/50 transition-all"
                >
                  <svg className="size-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
                <Button 
                  variant="outline" 
                  className="h-12 rounded-xl border-border/50 hover:bg-background/50 hover:border-purple-500/50 transition-all"
                >
                  <svg className="size-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </Button>
              </div>

              {/* Login Links */}
              <div className="mt-8 space-y-2 text-center">
                <p className="text-sm text-muted-foreground">
                  Ya tienes una cuenta?{" "}
                  <Link 
                    href="login" 
                    className="font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent hover:from-purple-600 hover:to-pink-600 transition-colors"
                  >
                    Inicia sesión
                  </Link>
                </p>
                <p className="text-sm text-muted-foreground">
                  Olvidaste tu contraseña?{" "}
                  <Link 
                    href="recuperar" 
                    className="font-semibold text-purple-500 hover:text-purple-600 transition-colors"
                  >
                    Restablecer
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl">
          {[
            { icon: Sparkles, label: "Facil de usar" },
            { icon: Shield, label: "100% Seguro" },
            { icon: Zap, label: "Ultra rapido" },
            { icon: BarChart3, label: "Analiticas" },
          ].map((feature, index) => (
            <div 
              key={index}
              className="flex flex-col items-center gap-2 text-center"
            >
              <div className="size-10 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center">
                <feature.icon className="size-5 text-purple-500" />
              </div>
              <span className="text-xs text-muted-foreground">{feature.label}</span>
            </div>
          ))}
        </div>

        {/* Terms and Privacy Links */}
        <div className="mt-8 flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <Link href="/terminos" className="hover:text-purple-500 transition-colors">
            Terminos de servicio
          </Link>
          <span className="text-border">|</span>
          <Link href="/privacidad" className="hover:text-purple-500 transition-colors">
            Politica de privacidad
          </Link>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(var(--rotation, 12deg));
          }
          50% {
            transform: translateY(-20px) rotate(var(--rotation, 12deg));
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
