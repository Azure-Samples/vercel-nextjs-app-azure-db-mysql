import Head from 'next/head'
import Product from '../components/Product'
import prisma from '../lib/prisma'

export default function Home({ products }) {
  return (
    <div>
      <Head>
        <title> Next.js and Azure Database for MySQL Quickstart</title>
        <meta name="description" content="Next.js and Azure Database for MySQL Quickstart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-10 mx-auto max-w-4xl">
        <h1 className="text-6xl font-bold mb-4 text-center">Next.js and Azure Database for MySQL Quickstart</h1>
        <p className="mb-20 text-xl text-center">
          🔥 Shop from the hottest items in the world 🔥
        </p>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-items-center  gap-4">
          {products.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      </main>

      <footer>
          <p> Innovate faster with fully managed MySQL and an <a href="https://azure.microsoft.com/en-us/free/mysql/">Azure free account</a>. Get started with 12 months of free services </p>
      </footer>
    </div>
  )
}

export async function getStaticProps(context) {
  const data = await prisma.product.findMany({
    include: {
      category: true,
    },
  })

  //convert decimal value to string to pass through as json
  const products = data.map((product) => ({
    ...product,
    price: product.price.toString(),
  }))
  return {
    props: { products },
  }
}
