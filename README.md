# Next.js + Azure Database for MySQL

This is a [Next.js](https://nextjs.org/) project that uses [Prisma](https://www.prisma.io/) to connect to a [Azure database for MySQL](https://learn.microsoft.com/azure/mysql/) database and [Tailwind CSS](https://tailwindcss.com/) for styling.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- Create [Azure database for MySQL Flexible Server](https://learn.microsoft.com/azure/mysql/flexible-server/quickstart-create-server-portal) in Azure. Create a [free Azure account](https://azure.microsoft.com/en-us/free/) if you dont have one.

## Set up the database
In the [Azure portal](https://portal.azure.com), go to MySQL Flexible server resource and select **Add** to create new datbase called `products`.

![image](https://user-images.githubusercontent.com/3684166/215588422-f5735f74-dace-4da4-9995-903ed618eaf5.png)

## Set up the starter Next.js app

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app nextjs-azure-mysql
# or
yarn create next-app nextjs-azure-mysql
# or
pnpm create next-app nextjs-azure-mysql
```

## Download SSL certificate

Azure database for MySQL Flexible Server using a public SSL CA certificate to connect. Place the [DigiCertGlobalRootCA.crt.pem](https://dl.cacerts.digicert.com/DigiCertGlobalRootCA.crt.pem) in the `prisma` folder will help with authentication over SSL to work seamlessly. 

## MySQL connection string
Now you need to create a connection string in the following format for the Azure database for MySQL Flexible Server. When creating the server, you provided an admin username and password which you will use in the connection string.  Note that SSL is enabled by default on Azure database for MySQL Flexible server and hence please use `sslaccept=strict` in the connection string. If you have [disabled SSL](https://learn.microsoft.com/azure/mysql/flexible-server/how-to-connect-tls-ssl#disable-ssl-enforcement-on-your-flexible-server) on the server, you can remove it from the connection string.

```text
mysql://<USERNAME>:<PLAIN_TEXT_PASSWORD>@<ACCESS_HOST_URL>/<DATABASE_NAME>?sslaccept=strict
```

Example
```text
mysql://demoadminuser:adminpassword@summysqlserver1.mysql.database.azure.com/products?sslaccept=strict
```

Add the connection string as environment variable in the Vercel project configuration

![image](https://user-images.githubusercontent.com/3684166/215590298-08e34ff7-7f40-4a78-aa0e-d75b1da32593.png)


## Push the schema into the database
Push the database schema to your Azure database for MySQL Flexible Server database `products` using Prisma.

`npx prisma db push`

Run the seed script to populate your database with `Product` and `Category` data.

`npm run seed`

## Run the App

Run the app with following command:

`npm run dev`

Open your browser at [localhost:3000](localhost:3000) to see the running application.

## Deploy your own

After you've got your application running locally, it's time to deploy it. Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/mksuni/nextjs-app-azure-db-mysql&repository-name=nextjs-app-azure-db-mysql&env=DATABASE_URL)

