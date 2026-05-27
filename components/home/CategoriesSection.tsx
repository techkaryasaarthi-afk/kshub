import Link from 'next/link'
import { CATEGORIES } from '@/lib/utils'

export function CategoriesSection() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Browse by Category</h2>
          <p className="text-gray-500 text-sm">Find documents in your area of interest</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/search?category=${cat.slug}`}
              className="flex flex-col items-center gap-3 p-5 bg-[#F9FAFB] rounded-2xl hover:bg-[#1E7B85]/5 hover:shadow-md hover:-translate-y-1 transition-all duration-200 group"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-[#1E7B85] transition-colors text-center">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
