# 3Lance

3Lance is a Decentralized Freelance platform that abstracts the Web3 complexity and provides cross-platform reputation system thanks to the Ethereum Attestation Service (EAS). A resolver contract exists, which tracks the status of the job, and only pays the Freelancer on successful completion.

Using Base (sepolia), a user can register as a Freelancer, Client or Both and create Jobs (as a Freelancer) which registers a new EAS schema on-chain.

When a Client wants to pay for the job, they attest and send payment to the Admin wallet, which performs the transaction for them (I wanted Biconomy here, but couldn't get working in time).

On job completion, the Resolver contract triggers payment to the freelancer.



## swaggy images

## Home page
<img width="902" alt="Screenshot 2024-04-21 at 11 38 18" src="https://github.com/Web3MADE/Eth-Dubai-3lance/assets/115392932/79b39424-0eb5-4df1-8b10-6452cc821dec">


## Job Board
<img width="914" alt="Screenshot 2024-04-21 at 11 38 28" src="https://github.com/Web3MADE/Eth-Dubai-3lance/assets/115392932/8a7fb5bf-722c-4e9e-92a7-67a6fa148662">


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


