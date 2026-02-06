import { Scene } from '@/components/3d/Scene'

export default function Home() {
  return (
    <main className="relative h-screen">
      <Scene />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-4xl font-bold text-white">3D Background Working</h1>
      </div>
    </main>
  )
}