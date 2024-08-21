# fetchx (fetch eXtended)
This is imported from https://github.com/ahuigo/deno-fetchx/tree/main/test

## Install
    npm install deno-fetchx

## Usage

```
  import fetchx from deno-fetchx

  const res = await fetchx.
    setCredentials('omit').
    setMode('cors').
    post("https://httpbin.org/post", {
      params: {
        "name": "Alex",
      },
      // credentials: 'omit', // is ok
      mode: "cors",
    }).then((res: Response) => res.json());
```
