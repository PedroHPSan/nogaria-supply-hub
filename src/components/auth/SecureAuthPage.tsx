
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft, Eye, EyeOff } from 'lucide-react';

const SecureAuthPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
  });

  // Rate limiting for login attempts
  const MAX_LOGIN_ATTEMPTS = 5;
  const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

  useEffect(() => {
    // Redirect authenticated users
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const validatePassword = (password: string): string[] => {
    const errors = [];
    if (password.length < 8) errors.push('Senha deve ter pelo menos 8 caracteres');
    if (!/(?=.*[a-z])/.test(password)) errors.push('Senha deve conter pelo menos uma letra minúscula');
    if (!/(?=.*[A-Z])/.test(password)) errors.push('Senha deve conter pelo menos uma letra maiúscula');
    if (!/(?=.*\d)/.test(password)) errors.push('Senha deve conter pelo menos um número');
    return errors;
  };

  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check rate limiting
    if (loginAttempts >= MAX_LOGIN_ATTEMPTS) {
      toast({
        title: "Muitas tentativas de login",
        description: `Aguarde ${Math.ceil(LOCKOUT_TIME / 60000)} minutos antes de tentar novamente.`,
        variant: "destructive",
      });
      return;
    }

    // Validate input
    if (!isEmailValid(signInData.email)) {
      toast({
        title: "E-mail inválido",
        description: "Por favor, insira um e-mail válido.",
        variant: "destructive",
      });
      return;
    }

    if (!signInData.password) {
      toast({
        title: "Senha obrigatória",
        description: "Por favor, insira sua senha.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await signIn(signInData.email.trim().toLowerCase(), signInData.password);
      
      if (error) {
        setLoginAttempts(prev => prev + 1);
        
        // Provide user-friendly error messages
        let errorMessage = "Credenciais inválidas";
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = "E-mail ou senha incorretos";
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = "Por favor, confirme seu e-mail antes de fazer login";
        } else if (error.message.includes('Too many requests')) {
          errorMessage = "Muitas tentativas. Tente novamente em alguns minutos";
        }
        
        toast({
          title: "Erro no login",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        setLoginAttempts(0); // Reset on successful login
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo de volta.",
        });
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    if (!isEmailValid(signUpData.email)) {
      toast({
        title: "E-mail inválido",
        description: "Por favor, insira um e-mail válido.",
        variant: "destructive",
      });
      return;
    }

    const passwordErrors = validatePassword(signUpData.password);
    if (passwordErrors.length > 0) {
      toast({
        title: "Senha não atende aos requisitos",
        description: passwordErrors[0],
        variant: "destructive",
      });
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      toast({
        title: "Senhas não coincidem",
        description: "As senhas inseridas não são iguais.",
        variant: "destructive",
      });
      return;
    }

    if (!signUpData.companyName || signUpData.companyName.trim().length < 2) {
      toast({
        title: "Nome da empresa obrigatório",
        description: "Por favor, insira o nome da sua empresa.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp(
        signUpData.email.trim().toLowerCase(), 
        signUpData.password, 
        {
          company_name: signUpData.companyName.trim(),
        }
      );
      
      if (error) {
        let errorMessage = "Erro ao criar conta";
        if (error.message.includes('User already registered')) {
          errorMessage = "Este e-mail já está cadastrado. Tente fazer login.";
        } else if (error.message.includes('Password should be at least')) {
          errorMessage = "A senha deve ter pelo menos 6 caracteres";
        }
        
        toast({
          title: "Erro no cadastro",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Sua conta foi criada. Você já pode fazer login.",
        });
        // Switch to login tab - Fixed TypeScript error
        const signInTab = document.querySelector('[value="signin"]') as HTMLElement;
        if (signInTab) {
          signInTab.click();
        }
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Erro no cadastro",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-navy to-sky-blue flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="text-white hover:bg-white/10 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao site
        </Button>

        <Card className="border-0 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-gotham text-dark-navy">
              Acesse sua conta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Entrar</TabsTrigger>
                <TabsTrigger value="signup">Cadastrar</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <Label htmlFor="signin-email">E-mail</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      value={signInData.email}
                      onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                      required
                      className="mt-1"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="signin-password">Senha</Label>
                    <div className="relative">
                      <Input
                        id="signin-password"
                        type={showPassword ? "text" : "password"}
                        value={signInData.password}
                        onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                        required
                        className="mt-1 pr-10"
                        disabled={loading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  {loginAttempts > 0 && (
                    <p className="text-sm text-orange-600">
                      Tentativas restantes: {MAX_LOGIN_ATTEMPTS - loginAttempts}
                    </p>
                  )}
                  
                  <Button
                    type="submit"
                    className="w-full bg-grass-green hover:bg-neon-green"
                    disabled={loading || loginAttempts >= MAX_LOGIN_ATTEMPTS}
                  >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Entrar
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div>
                    <Label htmlFor="signup-company">Nome da Empresa *</Label>
                    <Input
                      id="signup-company"
                      type="text"
                      value={signUpData.companyName}
                      onChange={(e) => setSignUpData({ ...signUpData, companyName: e.target.value })}
                      required
                      className="mt-1"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-email">E-mail *</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                      required
                      className="mt-1"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-password">Senha *</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        value={signUpData.password}
                        onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                        required
                        className="mt-1 pr-10"
                        disabled={loading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Mínimo 8 caracteres, incluindo maiúscula, minúscula e número
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="signup-confirm">Confirmar Senha *</Label>
                    <Input
                      id="signup-confirm"
                      type="password"
                      value={signUpData.confirmPassword}
                      onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                      required
                      className="mt-1"
                      disabled={loading}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-grass-green hover:bg-neon-green"
                    disabled={loading}
                  >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Cadastrar
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecureAuthPage;
