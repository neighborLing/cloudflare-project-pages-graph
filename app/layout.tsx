import type { Metadata } from 'next'
import './globals.css'
import { ApolloWrapper } from './components/ApolloWrapper'

export const metadata: Metadata = {
  title: 'LLM Chat with GraphQL',
  description: 'A Next.js chat application using GraphQL for LLM APIs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          {children}
        </ApolloWrapper>
      </body>
    </html>
  )
}