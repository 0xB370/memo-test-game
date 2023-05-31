# Memo Test Game

Memory Game made using Next.js 13, in which the user has to match pairs of the same cards among several ones.

## To Run it Locally

- First, run the backend found in the following repository:

  [memo-test-game-backend](https://github.com/0xB370/memo-test-game-backend)

- Clone this repository, create an **.env.local** file in the root of the project, which should have an [unsplash](https://unsplash.com/) access key (since it is used as image API).

        NEXT_PUBLIC_UNSPLASH_ACCESS_KEY = 'your_unsplash_access_key'

- Install dependencies and run the development server:

  ```bash
  npm install
  
  npm run dev
  # or
  yarn dev
  # or
  pnpm dev
  ```

- Open [http://localhost:3000](http://localhost:3000) with your browser.

_Note: For testing purposes, you can uncomment the line next to "// Ordered images to test" in game/page.tsx and comment out the next one. With these changes, matching images will appear next to each other._