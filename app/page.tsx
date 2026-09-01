import { redirect } from 'next/navigation';

// O middleware redireciona para o locale detectado,
// mas esta rota serve de fallback seguro.
export default function RootPage() {
  redirect('/pt-BR');
}
