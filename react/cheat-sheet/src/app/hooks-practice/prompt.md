## Custom Hooks Practice

### Step 1
Build a `useFetch` custom hook that takes a URL and returns `{ data, loading, error }`.

### Step 2
Use `useFetch` in the component to fetch posts from the endpoint and render the list (title + body).

### Step 3
Handle the loading and error states in the UI.

### Step 4
Generalize `useFetch` with a TypeScript generic so it can be reused for any response shape, not just `Post[]`.
