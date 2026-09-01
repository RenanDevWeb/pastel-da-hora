import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Rotas internacionalizadas: tudo exceto api, _next, _vercel e arquivos estáticos
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
